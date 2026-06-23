import { pool } from "@/lib/db";

const ML_SERVICE_URL =
  process.env.NEXT_PUBLIC_ML_SERVICE_URL || "http://127.0.0.1:8000";

export async function createAnalysis(
  reportFile: File | null,
  xrayFile: File | null,
  userId: string,
) {
  const formData = new FormData();

  if (reportFile) {
    formData.append("report_file", reportFile);
  }

  if (xrayFile) {
    formData.append("xray_file", xrayFile);
  }

  const response = await fetch(`${ML_SERVICE_URL}/analysis/complete`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Analysis service failed");
  }

  const result = await response.json();

  const saved = await pool.query(
    `
      INSERT INTO analyses
      (
        user_id,
        prediction,
        confidence,
        region,
        severity,
        summary,
        heatmap_path,
        analysis_json
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8
      )
      RETURNING id
      `,
    [
      userId,
      result.xray_analysis?.prediction,
      result.xray_analysis?.confidence,
      result.xray_analysis?.region,
      result.xray_analysis?.severity,
      result.combined_analysis?.summary,
      result.xray_analysis?.heatmap_image,
      JSON.stringify(result),
    ],
  );

  return {
    analysisId: saved.rows[0].id,
    result,
  };
}

export async function getUserAnalyses(userId: string) {
  const result = await pool.query(
    `
      SELECT *
      FROM analyses
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
    [userId],
  );

  return result.rows;
}

export async function getAnalysisById(analysisId: string, userId: string) {
  const result = await pool.query(
    `
      SELECT *
      FROM analyses
      WHERE id = $1
      AND user_id = $2
      `,
    [analysisId, userId],
  );

  return result.rows[0];
}

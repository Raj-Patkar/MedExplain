// Types describing the shape of `analysis_json` returned by the backend
// (POST /api/analysis/create and GET /api/analysis/[id]).

export type ParameterStatus = "normal" | "low" | "high" | "critical";

export interface ExtractedValue {
  name: string;
  value: string | number;
  unit?: string | null;
  normal_range?: string | null;
  status: ParameterStatus;
}

export type XrayPrediction = "NORMAL" | "PNEUMONIA";

export type Severity = "None" | "Mild" | "Moderate" | "Severe";

export interface ReportAnalysis {
  extracted_values: ExtractedValue[];
  raw_text?: string | null;
  parsing_method?: "pdf" | "ocr" | null;
}

export interface XrayAnalysis {
  prediction: XrayPrediction;
  confidence: number; // 0-100
  region: string | null;
  severity: Severity;
  heatmap_image: string | null; // URL or relative path
}

export interface CombinedAnalysis {
  overall_severity: Severity;
  summary: string;
  combined_findings: string[];
  recommendations: string[];
}

export interface AnalysisResult {
  report_analysis: ReportAnalysis;
  xray_analysis: XrayAnalysis;
  combined_analysis: CombinedAnalysis;
}

// Row shape from the `analyses` table
export interface AnalysisRecord {
  id: string;
  user_id: string;
  created_at: string;
  analysis_json: AnalysisResult;
}

// Lightweight row used for history/list views
export interface AnalysisListItem {
  id: string;
  created_at: string;
  prediction: XrayPrediction;
  severity: Severity;
  confidence: number;
}

// POST /api/analysis/create response
export interface CreateAnalysisResponse {
  analysisId: string;
  result: AnalysisResult;
}
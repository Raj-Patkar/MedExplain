"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { analysisService } from "@/services/analysisService";
import { AnalysisResponse } from "@/types/analysis";
import { ROUTES } from "@/lib/constants";

type AnalysisStage =
  | "idle"
  | "uploading"
  | "processing_report"
  | "processing_xray"
  | "generating_insights"
  | "complete"
  | "error";

interface UseAnalysisState {
  stage: AnalysisStage;
  uploadProgress: number;
  result: AnalysisResponse | null;
  error: string | null;
}

export function useAnalysis() {
  const router = useRouter();
  const [state, setState] = useState<UseAnalysisState>({
    stage: "idle",
    uploadProgress: 0,
    result: null,
    error: null,
  });

  const STAGE_MESSAGES: Record<AnalysisStage, string> = {
    idle: "Ready",
    uploading: "Uploading files...",
    processing_report: "Extracting medical report data...",
    processing_xray: "Analyzing chest X-ray with DenseNet121...",
    generating_insights: "Generating AI insights...",
    complete: "Analysis complete",
    error: "Analysis failed",
  };

  const runAnalysis = useCallback(
    async (reportFile: File, xrayFile: File) => {
      setState({ stage: "uploading", uploadProgress: 0, result: null, error: null });

      try {
        setState((s) => ({ ...s, stage: "uploading" }));

        const result = await analysisService.runCompleteAnalysis(
          reportFile,
          xrayFile,
          (progress) => setState((s) => ({ ...s, uploadProgress: progress }))
        );

        setState((s) => ({ ...s, stage: "processing_report" }));
        await new Promise((r) => setTimeout(r, 600));

        setState((s) => ({ ...s, stage: "processing_xray" }));
        await new Promise((r) => setTimeout(r, 600));

        setState((s) => ({ ...s, stage: "generating_insights" }));
        await new Promise((r) => setTimeout(r, 400));

        setState({ stage: "complete", uploadProgress: 100, result, error: null });

        if (result.id) {
          router.push(ROUTES.ANALYSIS(result.id));
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Analysis failed. Please try again.";
        setState({ stage: "error", uploadProgress: 0, result: null, error: message });
      }
    },
    [router]
  );

  const reset = useCallback(() => {
    setState({ stage: "idle", uploadProgress: 0, result: null, error: null });
  }, []);

  return {
    ...state,
    stageMessage: STAGE_MESSAGES[state.stage],
    isProcessing: !["idle", "complete", "error"].includes(state.stage),
    runAnalysis,
    reset,
  };
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { UploadSection } from "@/components/analysis/UploadSection";
import { AnalysisButton } from "@/components/analysis/AnalysisButton";
import { LoadingOverlay, AnalysisStage } from "@/components/analysis/LoadingOverlay";
import { analysisApi, ApiError } from "@/lib/analysis-api";
import { ROUTES, ACCEPTED_REPORT_TYPES, ACCEPTED_XRAY_TYPES, MAX_FILE_SIZE_MB } from "@/lib/constants";

export default function AnalyzePage() {
  const router = useRouter();

  const [reportFile, setReportFile] = useState<File | null>(null);
  const [xrayFile, setXrayFile] = useState<File | null>(null);
  const [reportError, setReportError] = useState<string | null>(null);
  const [xrayError, setXrayError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stage, setStage] = useState<AnalysisStage>("uploading");
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = (file: File, maxSizeMb: number): string | null => {
    if (file.size > maxSizeMb * 1024 * 1024) {
      return `File is too large. Maximum size is ${maxSizeMb}MB.`;
    }
    return null;
  };

  const handleReportSelect = (file: File | null) => {
    setReportFile(file);
    setFormError(null);
    if (file) {
      setReportError(validateFile(file, MAX_FILE_SIZE_MB));
    } else {
      setReportError(null);
    }
  };

  const handleXraySelect = (file: File | null) => {
    setXrayFile(file);
    setFormError(null);
    if (file) {
      setXrayError(validateFile(file, MAX_FILE_SIZE_MB));
    } else {
      setXrayError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!reportFile && !xrayFile) {
      setFormError(
        "Please upload at least one file."
      );
      return;
    }
    if (reportError || xrayError) {
      setFormError("Please resolve the file errors before continuing.");
      return;
    }

    setFormError(null);
    setIsAnalyzing(true);
    setStage("uploading");
    setUploadProgress(0);

    try {
      const response = await analysisApi.create(reportFile, xrayFile, (progress) => {
        setUploadProgress(progress);
        if (progress >= 100) {
          setStage("report");
        }
      });

      // Brief staged progression so the user sees what's happening
      setStage("report");
      await new Promise((r) => setTimeout(r, 500));
      setStage("xray");
      await new Promise((r) => setTimeout(r, 500));
      setStage("insights");
      await new Promise((r) => setTimeout(r, 400));
      setStage("done");

      router.push(ROUTES.ANALYSIS(response.analysisId));
    } catch (err) {
      setIsAnalyzing(false);
      const message =
        err instanceof ApiError ? err.message : "Analysis failed. Please try again.";
      setFormError(message);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">New Analysis</h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Upload your medical report and chest X-ray. Our AI pipeline will extract lab values,
          classify the X-ray, and generate a combined explanation with recommendations.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6">
        <div className="grid sm:grid-cols-2 gap-5">
          <UploadSection
            label="Medical Report (PDF)"
            description="Lab results, blood work, or other medical report documents."
            accept={ACCEPTED_REPORT_TYPES.join(",")}
            file={reportFile}
            onFileSelect={handleReportSelect}
            icon="report"
            error={reportError}
            disabled={isAnalyzing}
          />
          <UploadSection
            label="Chest X-Ray"
            description="A clear, frontal chest X-ray image (JPG or PNG)."
            accept={ACCEPTED_XRAY_TYPES.join(",")}
            file={xrayFile}
            onFileSelect={handleXraySelect}
            icon="xray"
            error={xrayError}
            disabled={isAnalyzing}
          />
        </div>

        {formError && (
          <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-700">{formError}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-slate-400">
            Upload a report, an X-ray, or both. Your analysis will be saved to your account history.
          </p>
          <AnalysisButton onClick={handleAnalyze} disabled={isAnalyzing} loading={isAnalyzing} />
        </div>
      </div>

      {isAnalyzing && <LoadingOverlay stage={stage} uploadProgress={uploadProgress} />}
    </div>
  );
}
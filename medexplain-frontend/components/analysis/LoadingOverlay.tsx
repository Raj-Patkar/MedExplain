"use client";

import { FileText, ScanLine, Brain, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type AnalysisStage =
  | "uploading"
  | "report"
  | "xray"
  | "insights"
  | "done";

interface LoadingOverlayProps {
  stage: AnalysisStage;
  uploadProgress?: number;
}

const STEPS: { key: AnalysisStage; label: string; icon: typeof FileText }[] = [
  { key: "uploading", label: "Uploading files", icon: Loader2 },
  { key: "report", label: "Extracting medical report data", icon: FileText },
  { key: "xray", label: "Analyzing chest X-ray (DenseNet121)", icon: ScanLine },
  { key: "insights", label: "Generating AI explanation (Phi-3)", icon: Brain },
];

const STAGE_ORDER: AnalysisStage[] = ["uploading", "report", "xray", "insights", "done"];

export function LoadingOverlay({ stage, uploadProgress }: LoadingOverlayProps) {
  const currentIndex = STAGE_ORDER.indexOf(stage);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Running AI Analysis</h3>
          <p className="text-sm text-slate-500 mt-1">
            This usually takes under a minute. Please don&apos;t close this tab.
          </p>
        </div>

        <div className="space-y-3">
          {STEPS.map((step, index) => {
            const stepIndex = STAGE_ORDER.indexOf(step.key);
            const isComplete = currentIndex > stepIndex;
            const isActive = currentIndex === stepIndex;
            const StepIcon = step.icon;

            return (
              <div key={step.key} className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                    isComplete
                      ? "bg-green-100"
                      : isActive
                        ? "bg-blue-100"
                        : "bg-slate-100"
                  )}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <StepIcon
                      className={cn(
                        "w-3.5 h-3.5",
                        isActive ? "text-blue-600 animate-spin" : "text-slate-400",
                        isActive && step.key !== "uploading" && "animate-none"
                      )}
                    />
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm",
                    isComplete
                      ? "text-slate-400 line-through"
                      : isActive
                        ? "text-slate-900 font-medium"
                        : "text-slate-400"
                  )}
                >
                  {step.label}
                </span>
                {isActive && step.key === "uploading" && typeof uploadProgress === "number" && (
                  <span className="ml-auto text-xs text-slate-400 flex-shrink-0">
                    {uploadProgress}%
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-6 bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(((currentIndex + 1) / (STEPS.length + 1)) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
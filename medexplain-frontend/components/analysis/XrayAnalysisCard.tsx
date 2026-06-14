import { ScanLine, MapPin, Gauge } from "lucide-react";
import { XrayAnalysis } from "@/types/analysis";
import { PREDICTION_CONFIG, SEVERITY_CONFIG } from "@/lib/analysis-config";
import { cn } from "@/lib/utils";

interface XrayAnalysisCardProps {
  data: XrayAnalysis;
}

export function XrayAnalysisCard({ data }: XrayAnalysisCardProps) {
  const predictionConfig = PREDICTION_CONFIG[data.prediction];
  const severityConfig = SEVERITY_CONFIG[data.severity];
  const confidence = Math.max(0, Math.min(100, data.confidence));

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <ScanLine className="w-4 h-4 text-blue-600" />
        </div>
        <h2 className="text-sm font-semibold text-slate-900">Chest X-Ray Analysis</h2>
      </div>

      <div className="p-5 space-y-5">
        {/* Prediction + confidence */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400 mb-1">Prediction</p>
            <span
              className={cn(
                "inline-flex items-center text-base font-bold px-2.5 py-1 rounded-lg border",
                predictionConfig.badgeClass
              )}
            >
              {data.prediction}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-1">Confidence</p>
            <p className={cn("text-2xl font-bold", predictionConfig.textClass)}>
              {confidence.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Confidence bar */}
        <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className={cn(
              "h-1.5 rounded-full transition-all",
              data.prediction === "PNEUMONIA" ? "bg-red-500" : "bg-green-500"
            )}
            style={{ width: `${confidence}%` }}
          />
        </div>

        {/* Region + Severity */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-3.5 py-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              Region
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {data.region ?? "Not localized"}
            </p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-3.5 py-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Gauge className="w-3.5 h-3.5" />
              Severity
            </div>
            <span
              className={cn(
                "inline-flex text-sm font-semibold px-2 py-0.5 rounded-full border",
                severityConfig.badgeClass
              )}
            >
              {severityConfig.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
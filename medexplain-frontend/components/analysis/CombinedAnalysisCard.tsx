import { Brain, AlertTriangle } from "lucide-react";
import { CombinedAnalysis } from "@/types/analysis";
import { SEVERITY_CONFIG } from "@/lib/analysis-config";
import { cn } from "@/lib/utils";

interface CombinedAnalysisCardProps {
  data: CombinedAnalysis;
}

export function CombinedAnalysisCard({ data }: CombinedAnalysisCardProps) {
  const severityConfig = SEVERITY_CONFIG[data.overall_severity];
  const findings = data.combined_findings ?? [];

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="flex items-center justify-between gap-2.5 px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Brain className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-sm font-semibold text-slate-900">AI Explanation</h2>
        </div>
        <span
          className={cn(
            "text-xs font-medium px-2.5 py-1 rounded-full border whitespace-nowrap",
            severityConfig.badgeClass
          )}
        >
          Overall: {severityConfig.label}
        </span>
      </div>

      <div className="p-5 space-y-5">
        {/* Summary */}
        <div>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {data.summary}
          </p>
        </div>

        {/* Abnormal findings */}
        {findings.length > 0 && (
          <div>
            <h3 className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Findings
            </h3>
            <ul className="space-y-2">
              {findings.map((finding, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-100 rounded-lg px-3.5 py-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                  {finding}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
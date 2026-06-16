import Link from "next/link";
import { ArrowRight, FileSearch } from "lucide-react";
import { AnalysisListItem } from "@/types/analysis";
import { PREDICTION_CONFIG, SEVERITY_CONFIG } from "@/lib/analysis-config";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface RecentAnalysesProps {
  analyses: AnalysisListItem[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function RecentAnalyses({ analyses }: RecentAnalysesProps) {
  if (analyses.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">Recent Analyses</h2>
        </div>
        <div className="flex flex-col items-center justify-center text-center py-14 px-6">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <FileSearch className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-sm font-medium text-slate-700">No analyses yet</p>
          <p className="text-xs text-slate-400 mt-1 mb-5 max-w-xs">
            Upload a medical report and chest X-ray to get your first AI-powered analysis.
          </p>
          <Link
            href={ROUTES.ANALYZE}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            New Analysis
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-900">Recent Analyses</h2>
        <Link
          href={ROUTES.HISTORY}
          className="text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          View all
        </Link>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left font-medium text-xs text-slate-400 uppercase tracking-wider px-5 py-3">
                Date
              </th>
              <th className="text-left font-medium text-xs text-slate-400 uppercase tracking-wider px-5 py-3">
                Prediction
              </th>
              <th className="text-left font-medium text-xs text-slate-400 uppercase tracking-wider px-5 py-3">
                Severity
              </th>
              <th className="text-left font-medium text-xs text-slate-400 uppercase tracking-wider px-5 py-3">
                Confidence
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {analyses.map((analysis) => {
              const predictionConfig = PREDICTION_CONFIG[analysis.prediction];
              const severityConfig = SEVERITY_CONFIG[analysis.severity];
              return (
                <tr
                  key={analysis.id}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors"
                >
                  <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">
                    {formatDate(analysis.created_at)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "inline-flex text-xs font-medium px-2 py-0.5 rounded-full border",
                        predictionConfig.badgeClass
                      )}
                    >
                      {predictionConfig.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "inline-flex text-xs font-medium px-2 py-0.5 rounded-full border",
                        severityConfig.badgeClass
                      )}
                    >
                      {severityConfig.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 font-medium">
                    {Number(analysis.confidence).toFixed(1)}%
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={ROUTES.ANALYSIS(analysis.id)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden divide-y divide-slate-50">
        {analyses.map((analysis) => {
          const predictionConfig = PREDICTION_CONFIG[analysis.prediction];
          const severityConfig = SEVERITY_CONFIG[analysis.severity];
          return (
            <Link
              key={analysis.id}
              href={ROUTES.ANALYSIS(analysis.id)}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/60 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {formatDate(analysis.created_at)}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full border",
                      predictionConfig.badgeClass
                    )}
                  >
                    {predictionConfig.label}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full border",
                      severityConfig.badgeClass
                    )}
                  >
                    {severityConfig.label}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
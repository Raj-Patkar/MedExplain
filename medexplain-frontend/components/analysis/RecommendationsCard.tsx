import { ClipboardCheck, CheckCircle2 } from "lucide-react";

interface RecommendationsCardProps {
  recommendations: string[];
}

export function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <ClipboardCheck className="w-4 h-4 text-blue-600" />
        </div>
        <h2 className="text-sm font-semibold text-slate-900">Recommendations</h2>
      </div>

      <div className="p-5">
        {recommendations.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">
            No specific recommendations were generated for this analysis.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 bg-blue-50/60 border border-blue-100 rounded-lg px-3.5 py-3"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700 leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 pb-5">
        <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-100 pt-3">
          These recommendations are AI-generated and intended for informational purposes only.
          Always consult a licensed healthcare professional before making medical decisions.
        </p>
      </div>
    </div>
  );
}
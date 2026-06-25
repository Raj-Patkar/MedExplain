import { Activity, AlertCircle, Gauge, Clock } from "lucide-react";
import { AnalysisListItem } from "@/types/analysis";
import { cn } from "@/lib/utils";

interface DashboardStatsProps {
  analyses: AnalysisListItem[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function DashboardStats({ analyses }: DashboardStatsProps) {
  const total = analyses.length;
  const pneumoniaCount = analyses.filter((a) => a.prediction === "PNEUMONIA").length;
  const avgConfidence =
    total > 0
      ? analyses.reduce((sum, a) => sum + (a.confidence ?? 0), 0) / total
      : 0;
  const lastAnalysis = total > 0 ? analyses[0] : null;

  const stats = [
    {
      label: "Total Analyses",
      value: total.toString(),
      icon: Activity,
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pneumonia Detections",
      value: pneumoniaCount.toString(),
      icon: AlertCircle,
      iconClass: "bg-red-50 text-red-600",
    },
    {
      label: "Last Analysis",
      value: lastAnalysis ? formatDate(lastAnalysis.created_at) : "—",
      icon: Clock,
      iconClass: "bg-slate-100 text-slate-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, iconClass }) => (
        <div key={label} className="bg-white rounded-xl border border-slate-200 p-5">
          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-3", iconClass)}>
            <Icon className="w-4.5 h-4.5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
          <p className="text-xs text-slate-500 mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle, RefreshCw } from "lucide-react";
import { ReportAnalysisCard } from "@/components/analysis/ReportAnalysisCard";
import { XrayAnalysisCard } from "@/components/analysis/XrayAnalysisCard";
import { HeatmapViewer } from "@/components/analysis/HeatmapViewer";
import { CombinedAnalysisCard } from "@/components/analysis/CombinedAnalysisCard";
import { RecommendationsCard } from "@/components/analysis/RecommendationsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { analysisApi, ApiError } from "@/lib/analysis-api";
import { AnalysisRecord } from "@/types/analysis";
import { ROUTES } from "@/lib/constants";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AnalysisDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;

  const [analysis, setAnalysis] = useState<AnalysisRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await analysisApi.getById(id);
      setAnalysis(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        router.push(ROUTES.LOGIN);
        return;
      }
      const message =
        err instanceof ApiError ? err.message : "Failed to load this analysis.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-5xl mx-auto">
        <Skeleton className="h-4 w-32 mb-6" />
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-48 mb-8" />
        <div className="grid lg:grid-cols-2 gap-5 mb-5">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
        <Skeleton className="h-96 rounded-xl mb-5" />
        <Skeleton className="h-64 rounded-xl mb-5" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-5xl mx-auto">
        <Link
          href={ROUTES.DASHBOARD}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        <div className="bg-white rounded-xl border border-slate-200 p-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <h2 className="text-base font-semibold text-slate-900 mb-1">
            Couldn&apos;t load this analysis
          </h2>
          <p className="text-sm text-slate-500 mb-5 max-w-sm">{error}</p>
          <button
            onClick={fetchAnalysis}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  const { report_analysis, xray_analysis, combined_analysis } = analysis.analysis_json;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-5xl mx-auto">
      <Link
        href={ROUTES.DASHBOARD}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analysis Report</h1>
        <p className="text-sm text-slate-500 mt-1.5">{formatDate(analysis.created_at)}</p>
      </div>

      <div className="space-y-5">

        {(report_analysis || xray_analysis) && (
          <div className="grid lg:grid-cols-2 gap-5">

            {report_analysis && (
              <ReportAnalysisCard
                data={report_analysis}
              />
            )}

            {xray_analysis && (
              <XrayAnalysisCard
                data={xray_analysis}
              />
            )}

          </div>
        )}

        {xray_analysis && (
          <HeatmapViewer
            src={xray_analysis.heatmap_image}
            region={xray_analysis.region}
          />
        )}

        {combined_analysis && (
          <>
            <CombinedAnalysisCard
              data={combined_analysis}
            />

            <RecommendationsCard
              recommendations={
                combined_analysis.recommendations ?? []
              }
            />
          </>
        )}

      </div>
    </div>
  );
}
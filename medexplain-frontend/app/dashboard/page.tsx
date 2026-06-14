"use client";

import Link from "next/link";
import { Plus, History, AlertCircle, RefreshCw } from "lucide-react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentAnalyses } from "@/components/dashboard/RecentAnalysis";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalysisHistory } from "@/hooks/useAnalysisHistory";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ROUTES } from "@/lib/constants";

export default function DashboardPage() {
  const { data: analyses, isLoading, error, refetch } = useAnalysisHistory();
  const { user } = useCurrentUser();

  const displayName = user?.name || (user?.email ? user.email.split("@")[0] : null);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
      {/* Welcome section */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back{displayName ? `, ${displayName}` : ""}
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 max-w-xl">
            Upload a medical report and chest X-ray to get an AI-powered analysis with severity
            scoring, Grad-CAM heatmaps, and clear recommendations.
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href={ROUTES.HISTORY}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium h-10 px-4"
          >
            <History className="w-4 h-4" />
            View History
          </Link>
          <Link
            href={ROUTES.ANALYZE}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium h-10 px-4"
          >
            <Plus className="w-4 h-4" />
            New Analysis
          </Link>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
          <button
            onClick={refetch}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:text-red-800 flex-shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* Stats */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
              <Skeleton className="w-9 h-9 rounded-lg mb-3" />
              <Skeleton className="h-7 w-16 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-8">
          <DashboardStats analyses={analyses} />
        </div>
      )}

      {/* Recent analyses */}
      {isLoading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <Skeleton className="h-5 w-32 mb-5" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      ) : (
        <RecentAnalyses analyses={analyses} />
      )}
    </div>
  );
}
"use client";

import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function AnalysisButton({ onClick, disabled, loading }: AnalysisButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg font-medium text-sm transition-colors px-6 h-11",
        "bg-blue-600 text-white hover:bg-blue-700",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      )}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          Run AI Analysis
        </>
      )}
    </button>
  );
}
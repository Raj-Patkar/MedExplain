"use client";

import { useCallback, useEffect, useState } from "react";
import { analysisApi, ApiError } from "@/lib/analysis-api";
import { AnalysisListItem } from "@/types/analysis";

interface UseAnalysisHistoryState {
  data: AnalysisListItem[];
  isLoading: boolean;
  error: string | null;
}

export function useAnalysisHistory() {
  const [state, setState] = useState<UseAnalysisHistoryState>({
    data: [],
    isLoading: true,
    error: null,
  });

  const fetchHistory = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const data = await analysisApi.getHistory();
      // Most recent first
      const sorted = [...data].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setState({ data: sorted, isLoading: false, error: null });
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Failed to load analysis history.";
      setState({ data: [], isLoading: false, error: message });
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { ...state, refetch: fetchHistory };
}
import api from "@/lib/api";
import { AnalysisResponse, AnalysisSummary } from "@/types/analysis";

export const analysisService = {
  async runCompleteAnalysis(
    reportFile: File,
    xrayFile: File,
    onUploadProgress?: (progress: number) => void
  ): Promise<AnalysisResponse> {
    const formData = new FormData();
    formData.append("report_file", reportFile);
    formData.append("xray_file", xrayFile);

    const { data } = await api.post<AnalysisResponse>("/analysis/complete", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onUploadProgress(progress);
        }
      },
    });
    return data;
  },

  async getAnalysis(id: string): Promise<AnalysisResponse> {
    const { data } = await api.get<AnalysisResponse>(`/analysis/${id}`);
    return data;
  },

  async getRecentAnalyses(limit = 10): Promise<AnalysisSummary[]> {
    const { data } = await api.get<AnalysisSummary[]>(`/analysis?limit=${limit}`);
    return data;
  },

  async deleteAnalysis(id: string): Promise<void> {
    await api.delete(`/analysis/${id}`);
  },
};
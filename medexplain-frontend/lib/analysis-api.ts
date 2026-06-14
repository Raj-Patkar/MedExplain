import {
  AnalysisListItem,
  AnalysisRecord,
  CreateAnalysisResponse,
} from "@/types/analysis";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      // ignore body parse errors
    }
    throw new ApiError(message, res.status);
  }
  return res.json() as Promise<T>;
}

export const analysisApi = {
  async getHistory(): Promise<AnalysisListItem[]> {
    const res = await fetch("/api/analysis/history", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });
    return handle<AnalysisListItem[]>(res);
  },

  async getById(id: string): Promise<AnalysisRecord> {
    const res = await fetch(`/api/analysis/${id}`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });
    return handle<AnalysisRecord>(res);
  },

  async create(
    reportFile: File,
    xrayFile: File,
    onUploadProgress?: (percent: number) => void
  ): Promise<CreateAnalysisResponse> {
    const formData = new FormData();
    formData.append("report_file", reportFile);
    formData.append("xray_file", xrayFile);

    // Use XHR for upload progress; fetch doesn't expose it.
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/analysis/create");
      xhr.withCredentials = true;

      xhr.upload.onprogress = (event) => {
        if (onUploadProgress && event.lengthComputable) {
          onUploadProgress(Math.round((event.loaded / event.total) * 100));
        }
      };

      xhr.onload = () => {
        let body: unknown = null;
        try {
          body = JSON.parse(xhr.responseText);
        } catch {
          // ignore
        }
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(body as CreateAnalysisResponse);
        } else {
          const message =
            (body as { error?: string } | null)?.error ??
            "Analysis failed. Please try again.";
          reject(new ApiError(message, xhr.status));
        }
      };

      xhr.onerror = () => reject(new ApiError("Network error. Please try again.", 0));

      xhr.send(formData);
    });
  },
};

export { ApiError };
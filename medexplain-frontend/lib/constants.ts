export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  ANALYZE: "/dashboard/analyze",
  ANALYSIS: (id: string) => `/dashboard/analysis/${id}`,
} as const;

export const SEVERITY_CONFIG = {
  None: {
    label: "Normal",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-700",
    bar: "bg-green-500",
  },
  Mild: {
    label: "Mild",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700",
    bar: "bg-yellow-500",
  },
  Moderate: {
    label: "Moderate",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    bar: "bg-orange-500",
  },
  Severe: {
    label: "Severe",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    bar: "bg-red-500",
  },
} as const;

export const PARAM_STATUS_CONFIG = {
  normal: { color: "text-green-700", bg: "bg-green-50", border: "border-green-200", dot: "bg-green-500" },
  low: { color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500" },
  high: { color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", dot: "bg-orange-500" },
  critical: { color: "text-red-700", bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500" },
} as const;

export const MAX_FILE_SIZE_MB = 20;
export const ACCEPTED_REPORT_TYPES = [".pdf"];
export const ACCEPTED_XRAY_TYPES = [".jpg", ".jpeg", ".png", ".dcm"];
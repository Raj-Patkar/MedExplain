import { ParameterStatus, Severity, XrayPrediction } from "@/types/analysis";

export const SEVERITY_CONFIG: Record<
  Severity,
  { label: string; badgeClass: string; barClass: string; textClass: string }
> = {
  None: {
    label: "None",
    badgeClass: "bg-green-50 text-green-700 border-green-200",
    barClass: "bg-green-500",
    textClass: "text-green-600",
  },
  Mild: {
    label: "Mild",
    badgeClass: "bg-yellow-50 text-yellow-700 border-yellow-200",
    barClass: "bg-yellow-500",
    textClass: "text-yellow-600",
  },
  Moderate: {
    label: "Moderate",
    badgeClass: "bg-orange-50 text-orange-700 border-orange-200",
    barClass: "bg-orange-500",
    textClass: "text-orange-600",
  },
  Severe: {
    label: "Severe",
    badgeClass: "bg-red-50 text-red-700 border-red-200",
    barClass: "bg-red-500",
    textClass: "text-red-600",
  },
};

export const PARAM_STATUS_CONFIG: Record<
  ParameterStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  normal: {
    label: "Normal",
    badgeClass: "bg-green-50 text-green-700 border-green-200",
    dotClass: "bg-green-500",
  },
  low: {
    label: "Low",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    dotClass: "bg-blue-500",
  },
  high: {
    label: "High",
    badgeClass: "bg-orange-50 text-orange-700 border-orange-200",
    dotClass: "bg-orange-500",
  },
  critical: {
    label: "Critical",
    badgeClass: "bg-red-50 text-red-700 border-red-200",
    dotClass: "bg-red-500",
  },
};

export const PREDICTION_CONFIG: Record<
  XrayPrediction,
  { label: string; badgeClass: string; textClass: string }
> = {
  NORMAL: {
    label: "Normal",
    badgeClass: "bg-green-50 text-green-700 border-green-200",
    textClass: "text-green-600",
  },
  PNEUMONIA: {
    label: "Pneumonia",
    badgeClass: "bg-red-50 text-red-700 border-red-200",
    textClass: "text-red-600",
  },
};
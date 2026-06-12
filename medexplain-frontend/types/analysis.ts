export interface ExtractedValue {
  name: string;
  value: string | number;
  unit?: string;
  normalRange?: string;
  status: "normal" | "low" | "high" | "critical";
}

export interface ReportAnalysis {
  extracted_values: Record<string, ExtractedValue>;
  raw_text?: string;
  parsing_method?: "pdf" | "ocr";
}

export interface XrayAnalysis {
  prediction: "NORMAL" | "PNEUMONIA";
  confidence: number;
  region: string;
  severity: "Mild" | "Moderate" | "Severe" | "None";
  heatmap_image: string;
}

export interface CombinedAnalysis {
  overall_severity: "None" | "Mild" | "Moderate" | "Severe";
  summary: string;
  combined_findings: string[];
  recommendations: string[];
}

export interface AnalysisResponse {
  id: string;
  created_at: string;
  report_analysis: ReportAnalysis;
  xray_analysis: XrayAnalysis;
  combined_analysis: CombinedAnalysis;
}

export interface AnalysisSummary {
  id: string;
  created_at: string;
  prediction: "NORMAL" | "PNEUMONIA";
  severity: string;
  confidence: number;
}
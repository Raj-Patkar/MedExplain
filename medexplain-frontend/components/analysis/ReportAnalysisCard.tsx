import { FileText, FileWarning } from "lucide-react";
import { ExtractedValue, ReportAnalysis } from "@/types/analysis";
import { PARAM_STATUS_CONFIG } from "@/lib/analysis-config";
import { cn } from "@/lib/utils";

interface ReportAnalysisCardProps {
    data: ReportAnalysis;
}

function ParameterRow({ value }: { value: ExtractedValue }) {
    const status =
        value.status?.toLowerCase();

    const config =
        PARAM_STATUS_CONFIG[
        status as keyof typeof PARAM_STATUS_CONFIG
        ] ??
        PARAM_STATUS_CONFIG.normal;

    return (
        <div className="flex items-center justify-between gap-4 py-3 border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-2.5 min-w-0">
                <span className={cn("w-2 h-2 rounded-full flex-shrink-0", config.dotClass)} />
                <span className="text-sm font-medium text-slate-700 truncate">{value.name}</span>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                    <span className="text-sm font-semibold text-slate-900">
                        {value.value}
                        {value.unit ? ` ${value.unit}` : ""}
                    </span>
                    {value.normal_range && (
                        <p className="text-xs text-slate-400 mt-0.5">Normal: {value.normal_range}</p>
                    )}
                </div>
                <span
                    className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full border whitespace-nowrap",
                        config.badgeClass
                    )}
                >
                    {config.label}
                </span>
            </div>
        </div>
    );
}

export function ReportAnalysisCard({ data }: ReportAnalysisCardProps) {
    const values = Object.entries(
        data.extracted_values ?? {}
    ).map(([name, value]: any) => ({
        name,
        ...value,
    }));

    return (
        <div className="bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-slate-900">Medical Report Analysis</h2>
                    {data.parsing_method && (
                        <p className="text-xs text-slate-400 mt-0.5">
                            Extracted via {data.parsing_method === "ocr" ? "OCR" : "PDF text extraction"}
                        </p>
                    )}
                </div>
            </div>

            <div className="px-5 py-2">
                {values.length === 0 ? (
                    <div className="flex flex-col items-center text-center py-10">
                        <FileWarning className="w-8 h-8 text-slate-300 mb-3" />
                        <p className="text-sm font-medium text-slate-600">No parameters extracted</p>
                        <p className="text-xs text-slate-400 mt-1 max-w-xs">
                            We couldn&apos;t extract structured values from this report. The original document
                            may be unclear or in an unsupported format.
                        </p>
                    </div>
                ) : (
                    values.map((value) => <ParameterRow key={value.name} value={value} />)
                )}
            </div>
        </div>
    );
}
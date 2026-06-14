"use client";

import { useCallback, useRef, useState } from "react";
import { FileText, ImageIcon, Upload, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadSectionProps {
  label: string;
  description: string;
  accept: string;
  file: File | null;
  onFileSelect: (file: File | null) => void;
  icon?: "report" | "xray";
  error?: string | null;
  disabled?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

export function UploadSection({
  label,
  description,
  accept,
  file,
  onFileSelect,
  icon = "report",
  error,
  disabled,
}: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const Icon = icon === "report" ? FileText : ImageIcon;

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (disabled) return;

      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) onFileSelect(droppedFile);
    },
    [onFileSelect, disabled]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    onFileSelect(selected ?? null);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-900">{label}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>

      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) inputRef.current?.click();
        }}
        className={cn(
          "relative rounded-xl border-2 border-dashed transition-colors cursor-pointer",
          "flex flex-col items-center justify-center text-center px-6 py-10",
          disabled && "opacity-60 cursor-not-allowed",
          isDragging
            ? "border-blue-400 bg-blue-50"
            : error
              ? "border-red-300 bg-red-50/30"
              : file
                ? "border-green-300 bg-green-50/40"
                : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={handleInputChange}
          disabled={disabled}
        />

        {file ? (
          <>
            <div className="w-11 h-11 rounded-lg bg-green-100 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm font-medium text-slate-900 truncate max-w-full px-4">
              {file.name}
            </p>
            <p className="text-xs text-slate-400 mt-1">{formatBytes(file.size)}</p>
            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-red-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Remove file
            </button>
          </>
        ) : (
          <>
            <div
              className={cn(
                "w-11 h-11 rounded-lg flex items-center justify-center mb-3",
                isDragging ? "bg-blue-100" : "bg-white border border-slate-200"
              )}
            >
              <Icon className={cn("w-5 h-5", isDragging ? "text-blue-600" : "text-slate-400")} />
            </div>
            <p className="text-sm font-medium text-slate-700">
              <span className="text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
              <Upload className="w-3 h-3" />
              {accept.toUpperCase().replaceAll(".", "")} up to 20MB
            </p>
          </>
        )}
      </div>

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
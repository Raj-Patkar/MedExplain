"use client";

import { useState } from "react";
import Image from "next/image";
import { Flame, ZoomIn, X, ImageOff } from "lucide-react";

interface HeatmapViewerProps {
  src: string | null;
  region?: string | null;
}

export function HeatmapViewer({ src, region }: HeatmapViewerProps) {
  const [zoomed, setZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="flex items-center justify-between gap-2.5 px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Flame className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Grad-CAM Heatmap</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Highlighted regions influenced the model&apos;s prediction
            </p>
          </div>
        </div>
        {src && !imageError && (
          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            Zoom
          </button>
        )}
      </div>

      <div className="p-5">
        {!src || imageError ? (
          <div className="flex flex-col items-center justify-center text-center py-16 bg-slate-50 rounded-lg border border-slate-100">
            <ImageOff className="w-8 h-8 text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-600">Heatmap unavailable</p>
            <p className="text-xs text-slate-400 mt-1">
              The Grad-CAM visualization could not be generated for this image.
            </p>
          </div>
        ) : (
          <div className="relative w-full rounded-lg overflow-hidden bg-slate-950 border border-slate-100">
            <div className="relative w-full aspect-square sm:aspect-video">
              <Image
                src={src}
                alt={region ? `Grad-CAM heatmap — ${region}` : "Grad-CAM heatmap"}
                fill
                className="object-contain cursor-zoom-in"
                onClick={() => setZoomed(true)}
                onError={() => setImageError(true)}
                unoptimized
              />
            </div>
            {region && (
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                {region}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Zoom modal */}
      {zoomed && src && !imageError && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Close zoomed image"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative w-full h-full max-w-4xl">
            <Image
              src={src}
              alt={region ? `Grad-CAM heatmap — ${region}` : "Grad-CAM heatmap"}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}
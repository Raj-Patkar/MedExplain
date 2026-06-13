import { Activity, ShieldCheck, Scan, Brain, CheckCircle2 } from "lucide-react";

const highlights = [
  { icon: Scan, text: "DenseNet121 chest X-ray classification" },
  { icon: Brain, text: "Phi-3 powered patient-friendly explanations" },
  { icon: ShieldCheck, text: "HIPAA-aligned, end-to-end encrypted" },
];

export function AuthBrandPanel() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-full h-full bg-slate-900 px-12 py-12 overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -left-24 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-semibold text-white text-base tracking-tight">
          MedExplain <span className="text-blue-400">AI</span>
        </span>
      </div>

      {/* Main content */}
      <div className="container-med relative z-10 max-w-md">
        <h2 className="text-3xl font-bold text-white leading-tight tracking-tight mb-4">
          Clinical-grade analysis, explained in plain language.
        </h2>
        <p className="text-slate-400 text-base leading-relaxed mb-10">
          Upload a chest X-ray and medical report — get a unified, AI-generated explanation with
          severity scoring and clear recommendations in seconds.
        </p>

        {/* Medical illustration / preview area */}
        <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-10 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            <div className="flex-1 mx-3 h-2 bg-white/10 rounded-full" />
          </div>

          {/* Mock X-ray scan visualization */}
          <div className="relative aspect-[16/10] rounded-xl bg-slate-950/60 border border-white/5 overflow-hidden mb-4 flex items-center justify-center">
            {/* Lung silhouette */}
            <svg
              viewBox="0 0 200 140"
              className="w-2/3 h-2/3 opacity-70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 20 C100 20 85 15 75 25 C60 40 50 60 48 85 C46 105 55 125 70 130 C82 134 92 125 98 110 L100 60 L102 110 C108 125 118 134 130 130 C145 125 154 105 152 85 C150 60 140 40 125 25 C115 15 100 20 100 20 Z"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />
              <line x1="100" y1="20" x2="100" y2="125" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.4" />
            </svg>

            {/* Scan line */}
            <div className="absolute left-0 right-0 h-px bg-blue-400/60 scan-line" />

            {/* Region highlight box */}
            <div className="absolute top-[28%] left-[36%] w-14 h-12 border-2 border-orange-400/70 rounded-sm">
              <span className="absolute -top-5 left-0 text-[10px] font-medium text-orange-400 whitespace-nowrap">
                Region flagged
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500 mb-0.5">Analysis confidence</div>
              <div className="text-lg font-bold text-white">99.4%</div>
            </div>
            <div className="flex-1 max-w-[120px] mx-4">
              <div className="bg-white/10 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "99%" }} />
              </div>
            </div>
            <span className="text-xs font-medium bg-orange-400/10 text-orange-400 px-2 py-1 rounded-full">
              Moderate
            </span>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="space-y-4">
          {highlights.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-sm text-slate-300">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom stat card */}
      <div className="relative z-10 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-white">Analysis complete</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          &ldquo;Results delivered in under 30 seconds, with confidence scoring and Grad-CAM
          heatmaps for full transparency.&rdquo;
        </p>
      </div>
    </div>
  );
}
import { FileText, Scan, Brain, BarChart3, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Medical Report Parsing",
    description:
      "Intelligent PDF extraction with OCR fallback. Automatically identifies parameters, values, and flags deviations from normal ranges.",
    color: "blue",
  },
  {
    icon: Scan,
    title: "Chest X-Ray Analysis",
    description:
      "DenseNet121 classifier trained on 112k+ images. Detects pneumonia with confidence scoring, affected region mapping, and Grad-CAM heatmaps.",
    color: "indigo",
  },
  {
    icon: Brain,
    title: "Combined AI Insights",
    description:
      "Phi-3 synthesizes all findings into a cohesive clinical narrative — patient-friendly language without sacrificing clinical depth.",
    color: "violet",
  },
  {
    icon: BarChart3,
    title: "Severity Estimation",
    description:
      "Multi-signal severity scoring across four tiers (None → Mild → Moderate → Severe) correlated across X-ray and lab data.",
    color: "blue",
  },
  {
    icon: Shield,
    title: "Clinical-Grade Security",
    description:
      "End-to-end encryption, zero data retention options, and HIPAA-aligned data handling practices built in from day one.",
    color: "green",
  },
  {
    icon: Clock,
    title: "Results in Seconds",
    description:
      "Parallel processing pipeline delivers complete multi-modal analysis in under 30 seconds, not hours.",
    color: "blue",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  indigo: "bg-indigo-50 text-indigo-600",
  violet: "bg-violet-50 text-violet-600",
  green: "bg-green-50 text-green-600",
};

export function Features() {
  return (
    <section id="features" className=" section-spacing py-32 lg:py-40 bg-slate-50 border-t border-slate-200">
      <div className="container-med">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Platform capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Everything you need to understand your results
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Purpose-built for medical professionals and patients who need clarity without
            compromising on clinical accuracy.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${colorMap[color]}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
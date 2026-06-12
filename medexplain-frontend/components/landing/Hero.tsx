import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, FileSearch } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export function Hero() {
  return (
    <section className="section-spacing pt-24 pb-24 lg:pt-32 lg:pb-32 bg-white">
      <div className="container-med">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center ">
          {/* Left copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-blue-100">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Powered by DenseNet121 + Phi-3
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
              Medical reports, <br />
              <span className="text-blue-600">decoded instantly.</span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
              Upload your chest X-ray and medical report. MedExplain AI analyzes both using
              clinical-grade models and returns a clear, patient-friendly explanation in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link
                href={ROUTES.REGISTER}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Start free analysis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={ROUTES.LOGIN}
                className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-medium px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors text-sm"
              >
                View sample report
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-5">
              {[
                { icon: ShieldCheck, label: "HIPAA compliant" },
                { icon: Zap, label: "Results in under 30s" },
                { icon: FileSearch, label: "PDF + DICOM support" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-slate-500 text-sm">
                  <Icon className="w-4 h-4 text-slate-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — mock dashboard preview */}
          <div className="relative max-w-lg mx-auto lg:max-w-none mb-8 lg:mb-0">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/60">
              {/* Mock header */}
              <div className="bg-white border-b border-slate-200 px-5 py-3 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <div className="flex-1 mx-4 bg-slate-100 rounded h-5" />
              </div>

              {/* Mock analysis result */}
              <div className="p-5 space-y-4">
                {/* X-ray result */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      X-Ray Analysis
                    </span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                      Moderate
                    </span>
                  </div>
                  <div className="flex items-end gap-3">
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-slate-900">PNEUMONIA</div>
                      <div className="text-sm text-slate-500 mt-0.5">Left Middle Lung</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-500">99.9%</div>
                      <div className="text-xs text-slate-400">confidence</div>
                    </div>
                  </div>
                  <div className="mt-3 bg-slate-100 rounded-full h-1.5">
                    <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: "99%" }} />
                  </div>
                </div>

                {/* Report values */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Key Parameters
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "WBC Count", value: "11.4 K/μL", status: "high" },
                      { name: "CRP", value: "42 mg/L", status: "high" },
                      { name: "Hemoglobin", value: "13.2 g/dL", status: "normal" },
                    ].map(({ name, value, status }) => (
                      <div key={name} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{name}</span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            status === "high"
                              ? "bg-orange-50 text-orange-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations stub */}
                <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
                  <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
                    AI Recommendation
                  </div>
                  <div className="space-y-1.5">
                    {[
                      "Antibiotic therapy recommended",
                      "Follow-up X-ray in 4–6 weeks",
                    ].map((r) => (
                      <div key={r} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span className="text-sm text-blue-800">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 left-4 sm:left-6 z-20 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2.5">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-800">Analysis complete</div>
                <div className="text-xs text-slate-400">12.4 seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
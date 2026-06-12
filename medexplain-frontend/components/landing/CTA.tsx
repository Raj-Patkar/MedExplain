import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export function CTA() {
  return (
    <section className="section-spacing py-28 lg:py-32 bg-slate-900 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center container-med">
        <div className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
          Get started today
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-5">
          Your health data, finally explained.
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          Upload your first report in under a minute. No clinical training required.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={ROUTES.REGISTER}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-medium px-8 py-3.5 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Create free account
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={ROUTES.LOGIN}
            className="inline-flex items-center justify-center gap-2 border border-slate-700 text-slate-300 font-medium px-8 py-3.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
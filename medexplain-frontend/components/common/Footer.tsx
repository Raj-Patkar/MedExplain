import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <Activity className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-medium text-slate-700">MedExplain AI</span>
        </div>
        <p className="text-xs text-slate-400 text-center">
          For informational purposes only. Not a substitute for professional medical advice.
        </p>
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} MedExplain AI</p>
      </div>
    </footer>
  );
}
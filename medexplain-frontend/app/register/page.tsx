import type { Metadata } from "next";
import Link from "next/link";
import { Activity } from "lucide-react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthBrandPanel } from "@/components/auth/AuthBrandPanel";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your MedExplain AI account.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex">
      {/* Left — form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Mobile logo */}
        <div className="lg:hidden px-6 pt-6">
          <Link href={ROUTES.HOME} className="inline-flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-slate-900 text-[15px] tracking-tight">
              MedExplain <span className="text-blue-600">AI</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12 sm:px-8">
          <RegisterForm />
        </div>
      </div>

      {/* Right — branding panel */}
      <div className="hidden lg:block lg:w-1/2">
        <AuthBrandPanel />
      </div>
    </main>
  );
}
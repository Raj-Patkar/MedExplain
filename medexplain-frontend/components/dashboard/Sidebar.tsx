"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ScanLine,
  ClipboardList,
  User,
  LogOut,
  Menu,
  X,
  Activity,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: ROUTES.DASHBOARD },
  { icon: ScanLine, label: "New Analysis", href: ROUTES.ANALYZE },
  { icon: ClipboardList, label: "History", href: ROUTES.HISTORY },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavLinks = () => (
    <nav className="flex-1 p-3 pt-4 space-y-0.5">
      {navItems.map(({ icon: Icon, label, href }) => {
        const active =
          pathname === href || (href !== ROUTES.DASHBOARD && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              active
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <Icon
              className={cn("w-4 h-4 flex-shrink-0", active ? "text-blue-600" : "text-slate-400")}
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-white border-b border-slate-200">
        <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-slate-900 text-sm">
            MedExplain <span className="text-blue-600">AI</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 bg-white flex flex-col">
            <div className="flex items-center justify-between h-14 px-4 border-b border-slate-200">
              <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-slate-900 text-sm">
                  MedExplain <span className="text-blue-600">AI</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <NavLinks />
            <div className="p-3 border-t border-slate-200">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  fetch("/api/auth/logout", { method: "POST", credentials: "include" }).finally(
                    () => (window.location.href = ROUTES.LOGIN)
                  );
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <LogOut className="w-4 h-4 text-slate-400" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-slate-200 h-screen sticky top-0 flex-shrink-0">
        <div className="flex items-center gap-2 h-16 px-4 border-b border-slate-200">
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-slate-900 text-sm">
            MedExplain <span className="text-blue-600">AI</span>
          </span>
        </div>

        <NavLinks />

        <div className="p-3 border-t border-slate-200">
          <button
            onClick={() =>
              fetch("/api/auth/logout", { method: "POST", credentials: "include" }).finally(
                () => (window.location.href = ROUTES.LOGIN)
              )
            }
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
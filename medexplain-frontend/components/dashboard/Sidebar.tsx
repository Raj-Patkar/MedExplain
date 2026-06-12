"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ScanLine, ClipboardList, Settings, HelpCircle } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: ROUTES.DASHBOARD },
  { icon: ScanLine, label: "New Analysis", href: ROUTES.ANALYZE },
  { icon: ClipboardList, label: "History", href: "/dashboard/history" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-slate-200 h-full">
      <nav className="flex-1 p-3 pt-4 space-y-0.5">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = pathname === href || (href !== ROUTES.DASHBOARD && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
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

      <div className="p-3 border-t border-slate-200">
        <Link
          href="/dashboard/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          Help & support
        </Link>
      </div>
    </aside>
  );
}
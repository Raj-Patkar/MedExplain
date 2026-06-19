import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="dashboard-main min-h-screen">
        {children}
      </main>
    </div>
  );
}
"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <Topbar
        sidebarCollapsed={sidebarCollapsed}
        onMobileMenuOpen={() => setMobileOpen(true)}
      />
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-250",
          sidebarCollapsed ? "lg:pl-16" : "lg:pl-60"
        )}
      >
        {children}
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import EarlyAccessBanner from "./EarlyAccessBanner";
import MaintenanceModal from "./MaintenanceModal";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <MaintenanceModal />
      {/* Fixed banner + topbar stack */}
      <div className="fixed top-0 left-0 right-0 z-30">
        {bannerVisible && (
          <EarlyAccessBanner onDismiss={() => setBannerVisible(false)} />
        )}
        <div
          className={cn(
            "transition-all duration-250",
            sidebarCollapsed ? "lg:pl-16" : "lg:pl-60"
          )}
        >
          <Topbar
            onMobileMenuOpen={() => setMobileOpen(true)}
          />
        </div>
      </div>
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <main
        className={cn(
          "min-h-screen transition-all duration-250",
          bannerVisible ? "pt-26" : "pt-16",
          sidebarCollapsed ? "lg:pl-16" : "lg:pl-60"
        )}
      >
        {children}
      </main>
    </div>
  );
}

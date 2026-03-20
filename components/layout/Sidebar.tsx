"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  LayoutGrid,
  LayoutDashboard,
  FileText,
  Image,
  Camera,
  Layers,
  BarChart2,
  HelpCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Home,
  LayoutGrid,
  LayoutDashboard,
  FileText,
  Image,
  Camera,
  Layers,
  BarChart2,
  HelpCircle,
  Mail,
};

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "/", icon: "Home" },
  { id: "dashboard", label: "My Apps", href: "/dashboard", icon: "LayoutDashboard" },
  {
    id: "apps",
    label: "Apps",
    href: "/apps",
    icon: "LayoutGrid",
    children: [
      { id: "appraisly", label: "Appraisly", href: "/apps#appraisly", icon: "FileText" },
      { id: "imagelablr", label: "ImageLablr", href: "/apps#imagelablr", icon: "Image" },
      { id: "restorecam", label: "RestoreCam", href: "/apps#restorecam", icon: "Camera" },
    ],
  },
  { id: "pricing", label: "Pricing", href: "/pricing", icon: "Layers" },
  { id: "compare", label: "Compare Plans", href: "/compare", icon: "BarChart2" },
  { id: "faqs", label: "FAQs", href: "/#faqs", icon: "HelpCircle" },
  { id: "contact", label: "Contact / Demo", href: "/contact", icon: "Mail" },
];

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (val: boolean) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ collapsed, onCollapse, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["apps"]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("#")[0]) && href.split("#")[0] !== "/";
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        "flex items-center justify-center px-4 py-5 border-b border-slate-200",
      )}>
        {!collapsed && (
          <img src="/LossStack Logo Side.png" alt="LossStack" className="h-11 w-auto object-contain" />
        )}
        {collapsed && (
          <img src="/Loss Stack Icon.png" alt="LossStack" className="w-9 h-9 object-contain" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            const active = isActive(item.href);
            const isExpanded = expandedItems.includes(item.id);
            const hasChildren = item.children && item.children.length > 0;

            return (
              <li key={item.id}>
                <div>
                  {hasChildren ? (
                    <button
                      onClick={() => !collapsed && toggleExpanded(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                        active
                          ? "bg-[#0f1e3c] text-white"
                          : "text-slate-600 hover:bg-slate-200 hover:text-[#0f1e3c]",
                        collapsed && "justify-center"
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </>
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                        active
                          ? "bg-[#0f1e3c] text-white"
                          : "text-slate-600 hover:bg-slate-200 hover:text-[#0f1e3c]",
                        collapsed && "justify-center"
                      )}
                      onClick={onMobileClose}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  )}

                  {/* Children */}
                  {hasChildren && !collapsed && (
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden ml-3 mt-0.5 space-y-0.5"
                        >
                          {item.children!.map((child) => {
                            const ChildIcon = iconMap[child.icon];
                            return (
                              <li key={child.id}>
                                <Link
                                  href={child.href}
                                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-200 hover:text-[#0f1e3c] transition-all duration-150 border-l border-slate-300 ml-1"
                                  onClick={onMobileClose}
                                >
                                  <ChildIcon className="w-3.5 h-3.5 shrink-0" />
                                  <span>{child.label}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-slate-200">
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 w-full bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-400 hover:to-teal-400 text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-150"
            onClick={onMobileClose}
          >
            <span>Request a Demo</span>
          </Link>
          <p className="text-slate-400 text-xs text-center mt-3">
            © 2025 LossStack
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-[#f5f0e8] z-30 border-r border-slate-200 overflow-hidden"
      >
        <SidebarContent />

      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed left-0 top-0 h-screen w-60 bg-[#f5f0e8] z-50 lg:hidden border-r border-slate-200"
            >
              <button
                onClick={onMobileClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

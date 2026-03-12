import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500 flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-[#0f1e3c] transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className="text-[#0f1e3c] font-medium">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

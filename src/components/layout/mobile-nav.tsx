"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Plus,
  BookOpen,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_NAV_ITEMS = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Research", href: "/research", icon: Search },
  { title: "Upload", href: "/research?upload=true", icon: Plus, accent: true },
  { title: "Briefs", href: "/briefs", icon: BookOpen },
  { title: "More", href: "/settings", icon: Menu },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 md:hidden",
        "border-t border-glass-border bg-navy-deep/95 backdrop-blur-xl",
        "pb-[env(safe-area-inset-bottom,8px)]"
      )}
    >
      <div className="flex items-center justify-around px-2 pt-1">
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              !item.href.includes("?") &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200",
                "min-w-[56px]",
                isActive
                  ? "text-gold"
                  : "text-text-muted hover:text-text-secondary"
              )}
            >
              {"accent" in item && item.accent ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-navy-deep shadow-lg shadow-gold/20">
                  <Icon size={18} strokeWidth={2.5} />
                </div>
              ) : (
                <Icon
                  size={20}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-gold" : ""
                  )}
                />
              )}
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isActive ? "text-gold" : ""
                )}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUIStore } from "@/stores";

/* ── Pretty label map for breadcrumb segments ── */
const labelMap: Record<string, string> = {
  dashboard: "Dashboard",
  research: "Research",
  documents: "Documents",
  briefs: "Saved Briefs",
  bookmarks: "Bookmarks",
  history: "History",
  settings: "Settings",
};

export function AppHeader() {
  const pathname = usePathname();
  const { setSearchOpen } = useUIStore();

  /* Build breadcrumb segments from the URL path */
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((seg) => ({
      href: `/${seg}`,
      label: labelMap[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1),
    }));

  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center gap-3 px-4",
        "border-b border-glass-border bg-glass backdrop-blur-xl"
      )}
    >
      {/* Left — Sidebar trigger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-text-secondary hover:text-text-primary" />
        <Separator orientation="vertical" className="h-5 bg-glass-border" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/dashboard"
                className="text-text-muted hover:text-text-primary transition-colors"
                render={<Link href="/dashboard" />}
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            {segments.map((seg, idx) => (
              <span key={seg.href} className="contents">
                <BreadcrumbSeparator className="text-text-muted/50" />
                <BreadcrumbItem>
                  {idx === segments.length - 1 ? (
                    <BreadcrumbPage className="text-text-primary font-medium">
                      {seg.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={seg.href}
                      className="text-text-muted hover:text-text-primary transition-colors"
                      render={<Link href={seg.href} />}
                    >
                      {seg.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right — Search, Notifications, Avatar */}
      <div className="ml-auto flex items-center gap-2">
        {/* Search trigger */}
        <Button
          variant="ghost"
          onClick={() => setSearchOpen(true)}
          className={cn(
            "hidden sm:flex items-center gap-2 h-8 px-3",
            "rounded-lg border border-glass-border bg-glass",
            "text-text-muted hover:text-text-primary hover:bg-glass-hover",
            "transition-all duration-200"
          )}
        >
          <Search size={14} />
          <span className="text-sm">Search...</span>
          <kbd
            className={cn(
              "ml-4 pointer-events-none inline-flex h-5 items-center gap-0.5",
              "rounded border border-glass-border bg-navy px-1.5",
              "text-[10px] font-medium text-text-muted select-none"
            )}
          >
            Ctrl+K
          </kbd>
        </Button>

        {/* Mobile search icon */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setSearchOpen(true)}
          className="sm:hidden text-text-secondary hover:text-text-primary"
        >
          <Search size={16} />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="relative text-text-secondary hover:text-text-primary"
              />
            }
          >
            <Bell size={16} />
            {/* Notification dot */}
            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-gold" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 glass-strong border-glass-border">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-glass-border" />
            <DropdownMenuItem className="cursor-pointer focus:bg-glass-hover">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Analysis Complete</span>
                <span className="text-xs text-text-muted">Maneka Gandhi v. UOI</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer focus:bg-glass-hover">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">New Feature: AI Chat</span>
                <span className="text-xs text-text-muted">Chat directly with precedents</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="hidden sm:block h-5 bg-glass-border" />

        {/* User avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Avatar size="sm" className="cursor-pointer hover:ring-2 hover:ring-gold/50 transition-all" />
            }
          >
            <AvatarFallback className="bg-gold/20 text-gold text-xs font-semibold">
              DU
            </AvatarFallback>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-strong border-glass-border">
            <DropdownMenuLabel className="flex flex-col">
              <span>Demo User</span>
              <span className="text-xs font-normal text-text-muted">demo@caseflow.com</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-glass-border" />
            <DropdownMenuItem className="cursor-pointer focus:bg-glass-hover" render={<Link href="/settings" />}>
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer focus:bg-glass-hover" render={<Link href="/settings" />}>
              Billing Plan
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-glass-border" />
            <DropdownMenuItem className="cursor-pointer text-red-400 focus:bg-red-400/10 focus:text-red-400">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

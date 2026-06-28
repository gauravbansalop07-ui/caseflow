"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  FileText,
  BookOpen,
  Bookmark,
  Clock,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

/* ── Icon mapping ── */
const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  LayoutDashboard,
  Search,
  FileText,
  BookOpen,
  Bookmark,
  Clock,
};

/* ── Sidebar Component ── */
export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      {/* ── Header ── */}
      <SidebarHeader className="px-3 py-4">
        <Link href="/dashboard" className="flex items-center">
          <Logo size="sm" showText={open} />
        </Link>
      </SidebarHeader>

      <Separator className="mx-3 w-auto bg-glass-border" />

      {/* ── Workspace Navigation ── */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-text-muted font-semibold">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const Icon = iconMap[item.icon];
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive}
                      className={cn(
                        "h-9 gap-3 rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-gold/10 text-gold hover:bg-gold/15 hover:text-gold"
                          : "text-text-secondary hover:text-text-primary"
                      )}
                      render={<Link href={item.href} />}
                    >
                      {Icon && (
                        <Icon
                          size={18}
                          className={cn(
                            "shrink-0 transition-colors",
                            isActive ? "text-gold" : "text-text-muted"
                          )}
                        />
                      )}
                      <span className="truncate">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ── Tools section ── */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-text-muted font-semibold">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Settings"
                  isActive={pathname === "/settings"}
                  className={cn(
                    "h-9 gap-3 rounded-xl transition-all duration-200",
                    pathname === "/settings"
                      ? "bg-gold/10 text-gold hover:bg-gold/15 hover:text-gold"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                  render={<Link href="/settings" />}
                >
                  <Settings
                    size={18}
                    className={cn(
                      "shrink-0 transition-colors",
                      pathname === "/settings" ? "text-gold" : "text-text-muted"
                    )}
                  />
                  <span className="truncate">Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator className="mx-3 w-auto bg-glass-border" />

      {/* ── Footer — User profile ── */}
      <SidebarFooter className="p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl p-2 transition-colors",
            "bg-glass border border-glass-border"
          )}
        >
          <Avatar size="sm">
            <AvatarFallback className="bg-gold/20 text-gold text-xs font-semibold">
              DU
            </AvatarFallback>
          </Avatar>
          {open && (
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-text-primary">
                Demo User
              </span>
              <Badge
                variant="outline"
                className="mt-0.5 w-fit border-glass-border text-[10px] text-text-muted"
              >
                Free Plan
              </Badge>
            </div>
          )}
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

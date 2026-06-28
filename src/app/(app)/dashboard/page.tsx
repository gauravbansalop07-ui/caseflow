"use client";

import Link from "next/link";
import {
  FileText,
  BookOpen,
  Search,
  Bookmark,
  Upload,
  ArrowRight,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  GlassCard,
} from "@/components/shared/animated-container";
import { useUIStore } from "@/stores";

/* ── Mock Data ── */
const STATS = [
  {
    label: "Cases Analyzed",
    value: 12,
    icon: FileText,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    label: "Briefs Generated",
    value: 8,
    icon: BookOpen,
    color: "text-emerald",
    bgColor: "bg-emerald/10",
  },
  {
    label: "Searches Made",
    value: 47,
    icon: Search,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    label: "Bookmarks",
    value: 15,
    icon: Bookmark,
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
] as const;

const QUICK_ACTIONS = [
  {
    title: "Upload New Judgment",
    description: "Upload a PDF to analyze and extract legal insights",
    href: "/research",
    icon: Upload,
    accent: true,
  },
  {
    title: "Search Cases",
    description: "Search through Indian court judgments and precedents",
    href: "/research",
    icon: Search,
    accent: false,
  },
  {
    title: "Generate Brief",
    description: "Create AI-powered legal briefs from case analysis",
    href: "/briefs",
    icon: FileText,
    accent: false,
  },
] as const;

const RECENT_ACTIVITY = [
  {
    caseName: "Kesavananda Bharati v. State of Kerala",
    court: "Supreme Court of India",
    date: "June 18, 2026",
    status: "completed" as const,
  },
  {
    caseName: "Maneka Gandhi v. Union of India",
    court: "Supreme Court of India",
    date: "June 17, 2026",
    status: "completed" as const,
  },
  {
    caseName: "Vishaka v. State of Rajasthan",
    court: "Supreme Court of India",
    date: "June 16, 2026",
    status: "completed" as const,
  },
  {
    caseName: "M.C. Mehta v. Union of India",
    court: "Supreme Court of India",
    date: "June 15, 2026",
    status: "processing" as const,
  },
  {
    caseName: "Navtej Singh Johar v. Union of India",
    court: "Supreme Court of India",
    date: "June 14, 2026",
    status: "completed" as const,
  },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export default function DashboardPage() {
  const { setSearchOpen } = useUIStore();

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* ── Welcome Section ── */}
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold font-heading text-text-primary sm:text-3xl">
            {getGreeting()} <span className="inline-block animate-[wave_2s_ease-in-out_infinite]">👋</span>
          </h1>
          <p className="mt-1 text-text-secondary text-sm sm:text-base">
            {formatDate()} — Here&apos;s your research overview
          </p>
        </div>
      </FadeIn>

      {/* ── Quick Stats ── */}
      <StaggerContainer className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <StaggerItem key={stat.label}>
              <GlassCard hover={false} className="p-4 sm:p-5">
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl",
                      stat.bgColor
                    )}
                  >
                    <Icon size={18} className={stat.color} />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold font-heading text-text-primary sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-text-muted sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* ── Quick Actions ── */}
      <FadeIn delay={0.2}>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold font-heading text-text-primary">
            Quick Actions
          </h2>
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              const isSearch = action.title === "Search Cases";
              
              const CardContent = (
                <GlassCard
                  className={cn(
                    "group/action flex items-start gap-4 p-4 sm:p-5 cursor-pointer",
                    action.accent && "border-gold/20 hover:border-gold/40"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                      action.accent
                        ? "bg-gold/15 text-gold"
                        : "bg-glass text-text-secondary group-hover/action:text-text-primary"
                    )}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-text-primary truncate">
                        {action.title}
                      </h3>
                      <ArrowRight
                        size={14}
                        className="shrink-0 text-text-muted opacity-0 -translate-x-1 transition-all duration-200 group-hover/action:opacity-100 group-hover/action:translate-x-0"
                      />
                    </div>
                    <p className="mt-1 text-xs text-text-muted line-clamp-2">
                      {action.description}
                    </p>
                  </div>
                </GlassCard>
              );

              if (isSearch) {
                return (
                  <div key={action.title} onClick={() => setSearchOpen(true)}>
                    {CardContent}
                  </div>
                );
              }

              return (
                <Link key={action.title} href={action.href}>
                  {CardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* ── Recent Activity ── */}
      <FadeIn delay={0.35}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold font-heading text-text-primary">
              Recent Activity
            </h2>
            <Link
              href="/history"
              className="flex items-center gap-1 text-xs text-text-muted hover:text-gold transition-colors"
            >
              View all
              <ArrowRight size={12} />
            </Link>
          </div>

          <GlassCard hover={false} className="p-0 overflow-hidden">
            <div className="divide-y divide-glass-border">
              {RECENT_ACTIVITY.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 sm:px-5 sm:py-4",
                    "transition-colors hover:bg-glass-hover cursor-pointer"
                  )}
                >
                  {/* Icon */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-400/10">
                    <FileText size={16} className="text-blue-400" />
                  </div>

                  {/* Case info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {item.caseName}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-text-muted">
                      <span className="truncate">{item.court}</span>
                      <span className="hidden sm:inline">·</span>
                      <span className="hidden sm:inline shrink-0">{item.date}</span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <Badge
                    variant="secondary"
                    className={cn(
                      "shrink-0 text-[10px] px-2",
                      item.status === "completed"
                        ? "bg-emerald/10 text-emerald border-emerald/20"
                        : "bg-gold/10 text-gold border-gold/20"
                    )}
                  >
                    {item.status === "completed" ? (
                      <CheckCircle2 size={10} className="mr-1" />
                    ) : (
                      <Loader2 size={10} className="mr-1 animate-spin" />
                    )}
                    {item.status === "completed" ? "Analyzed" : "Processing"}
                  </Badge>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </FadeIn>
    </div>
  );
}

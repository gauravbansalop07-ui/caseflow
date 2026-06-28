"use client";

import {
  Clock,
  Brain,
  Search,
  FileText,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-container";

interface ActivityItem {
  id: string;
  type: "analyzed" | "searched" | "brief" | "bookmarked";
  description: string;
  timestamp: string;
  relativeTime: string;
}

const ICON_MAP = {
  analyzed: { icon: Brain, color: "text-blue-400 bg-blue-400/10" },
  searched: { icon: Search, color: "text-emerald bg-emerald/10" },
  brief: { icon: FileText, color: "text-gold bg-gold/10" },
  bookmarked: { icon: Bookmark, color: "text-purple-400 bg-purple-400/10" },
} as const;

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    type: "analyzed",
    description: "Analyzed Kesavananda Bharati v. State of Kerala",
    timestamp: "2026-06-20T16:30:00",
    relativeTime: "2 hours ago",
  },
  {
    id: "2",
    type: "brief",
    description: "Generated brief for K.S. Puttaswamy v. Union of India",
    timestamp: "2026-06-20T14:15:00",
    relativeTime: "4 hours ago",
  },
  {
    id: "3",
    type: "searched",
    description: 'Searched "Article 21 right to life scope"',
    timestamp: "2026-06-20T12:00:00",
    relativeTime: "6 hours ago",
  },
  {
    id: "4",
    type: "bookmarked",
    description: "Bookmarked Maneka Gandhi v. Union of India",
    timestamp: "2026-06-20T10:45:00",
    relativeTime: "8 hours ago",
  },
  {
    id: "5",
    type: "analyzed",
    description: "Analyzed Vishaka v. State of Rajasthan",
    timestamp: "2026-06-19T18:30:00",
    relativeTime: "Yesterday",
  },
  {
    id: "6",
    type: "searched",
    description: 'Searched "writ petition article 32 vs 226"',
    timestamp: "2026-06-19T15:00:00",
    relativeTime: "Yesterday",
  },
  {
    id: "7",
    type: "brief",
    description: "Generated brief for Navtej Singh Johar v. Union of India",
    timestamp: "2026-06-18T11:20:00",
    relativeTime: "2 days ago",
  },
  {
    id: "8",
    type: "bookmarked",
    description: "Bookmarked Indira Gandhi v. Raj Narain",
    timestamp: "2026-06-18T09:00:00",
    relativeTime: "2 days ago",
  },
  {
    id: "9",
    type: "analyzed",
    description: "Analyzed MC Mehta v. Union of India",
    timestamp: "2026-06-17T16:45:00",
    relativeTime: "3 days ago",
  },
  {
    id: "10",
    type: "searched",
    description: 'Searched "environmental law PIL landmark cases"',
    timestamp: "2026-06-17T14:30:00",
    relativeTime: "3 days ago",
  },
];

export default function HistoryPage() {
  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6">
      <FadeIn>
        {/* Header */}
        <div className="flex items-center gap-3">
          <Clock size={24} className="text-gold" />
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            Activity History
          </h1>
        </div>
      </FadeIn>

      {/* Timeline */}
      <FadeIn delay={0.1}>
        <div className="glass rounded-2xl overflow-hidden">
          <StaggerContainer>
            {MOCK_ACTIVITIES.map((activity, index) => {
              const config = ICON_MAP[activity.type];
              const Icon = config.icon;
              const isLast = index === MOCK_ACTIVITIES.length - 1;

              return (
                <StaggerItem key={activity.id}>
                  <div
                    className={cn(
                      "flex items-start gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors",
                      !isLast && "border-b border-glass-border/50"
                    )}
                  >
                    {/* Timeline dot with icon */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full",
                          config.color
                        )}
                      >
                        <Icon size={16} />
                      </div>
                      {/* Connector line */}
                      {!isLast && (
                        <div className="absolute top-9 left-1/2 -translate-x-1/2 w-px h-[calc(100%+16px)] bg-gradient-to-b from-glass-border to-transparent" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-sm text-text-primary">
                        {activity.description}
                      </p>
                    </div>

                    {/* Timestamp */}
                    <span className="text-xs text-text-muted flex-shrink-0 pt-1.5">
                      {activity.relativeTime}
                    </span>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </FadeIn>
    </div>
  );
}

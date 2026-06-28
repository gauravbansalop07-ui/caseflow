"use client";

import {
  Bookmark,
  Eye,
  Trash2,
  Calendar,
  Scale,
  StickyNote,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FadeIn,
  GlassCard,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-container";

interface MockBookmark {
  id: string;
  caseName: string;
  court: string;
  dateBookmarked: string;
  note: string;
}

const MOCK_BOOKMARKS: MockBookmark[] = [
  {
    id: "1",
    caseName: "Kesavananda Bharati v. State of Kerala",
    court: "Supreme Court of India",
    dateBookmarked: "2026-06-18",
    note: "Key case for basic structure doctrine. Review the 7-6 split ratio.",
  },
  {
    id: "2",
    caseName: "Maneka Gandhi v. Union of India",
    court: "Supreme Court of India",
    dateBookmarked: "2026-06-16",
    note: "Important for Article 21 interpretation — due process of law.",
  },
  {
    id: "3",
    caseName: "Vishaka v. State of Rajasthan",
    court: "Supreme Court of India",
    dateBookmarked: "2026-06-14",
    note: "Guidelines for sexual harassment at workplace, later codified.",
  },
  {
    id: "4",
    caseName: "K.S. Puttaswamy v. Union of India",
    court: "Supreme Court of India",
    dateBookmarked: "2026-06-12",
    note: "Right to privacy as fundamental right. 9-judge bench unanimous.",
  },
  {
    id: "5",
    caseName: "Navtej Singh Johar v. Union of India",
    court: "Supreme Court of India",
    dateBookmarked: "2026-06-10",
    note: "Decriminalization of Section 377 — important for equality jurisprudence.",
  },
];

export default function BookmarksPage() {
  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6">
      <FadeIn>
        {/* Header */}
        <div className="flex items-center gap-3">
          <Bookmark size={24} className="text-gold" />
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            Bookmarks
          </h1>
        </div>
      </FadeIn>

      {/* Bookmarks list */}
      {MOCK_BOOKMARKS.length > 0 ? (
        <StaggerContainer className="space-y-3">
          {MOCK_BOOKMARKS.map((bm) => (
            <StaggerItem key={bm.id}>
              <GlassCard className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Content */}
                <div className="flex-1 space-y-2 min-w-0">
                  <h3 className="font-heading font-semibold text-text-primary">
                    {bm.caseName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                    <div className="flex items-center gap-1.5">
                      <Scale size={12} className="text-gold" />
                      <span>{bm.court}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      <span>
                        Bookmarked{" "}
                        {new Date(bm.dateBookmarked).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  {bm.note && (
                    <div className="flex items-start gap-2 mt-2 p-2.5 rounded-lg bg-white/[0.02] border border-glass-border/50">
                      <StickyNote size={12} className="text-gold mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-text-muted leading-relaxed">
                        {bm.note}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs border-glass-border hover:border-gold/30 hover:text-gold"
                    onClick={() => toast.info("Opening case analysis...")}
                  >
                    <Eye size={14} />
                    View Analysis
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-xs text-text-secondary hover:text-destructive"
                    onClick={() => toast.success("Bookmark removed")}
                  >
                    <Trash2 size={14} />
                    Remove
                  </Button>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Bookmark size={28} className="text-text-muted" />
            </div>
            <p className="text-lg font-medium">No bookmarks yet</p>
            <p className="text-sm text-text-muted mt-1 text-center max-w-sm">
              Bookmark cases during analysis to save them here for quick access.
            </p>
          </div>
        </FadeIn>
      )}
    </div>
  );
}

"use client";

import {
  BookOpen,
  Plus,
  Eye,
  FileDown,
  Trash2,
  Calendar,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FadeIn,
  GlassCard,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-container";

interface MockBrief {
  id: string;
  title: string;
  caseName: string;
  createdAt: string;
  wordCount: number;
}

const MOCK_BRIEFS: MockBrief[] = [
  {
    id: "1",
    title: "Basic Structure Doctrine Analysis",
    caseName: "Kesavananda Bharati v. State of Kerala",
    createdAt: "2026-06-18",
    wordCount: 3240,
  },
  {
    id: "2",
    title: "Right to Privacy — Comprehensive Brief",
    caseName: "K.S. Puttaswamy v. Union of India",
    createdAt: "2026-06-16",
    wordCount: 4180,
  },
  {
    id: "3",
    title: "Sexual Harassment at Workplace Guidelines",
    caseName: "Vishaka v. State of Rajasthan",
    createdAt: "2026-06-14",
    wordCount: 2850,
  },
  {
    id: "4",
    title: "Section 377 Constitutional Validity",
    caseName: "Navtej Singh Johar v. Union of India",
    createdAt: "2026-06-12",
    wordCount: 5420,
  },
];

export default function BriefsPage() {
  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6">
      <FadeIn>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen size={24} className="text-gold" />
            <h1 className="text-2xl font-heading font-bold text-text-primary">
              Saved Briefs
            </h1>
          </div>
          <Button
            className="gap-2 bg-gold text-navy-deep hover:bg-gold-light font-semibold"
            onClick={() => toast.info("Brief generator would open here")}
          >
            <Plus size={16} />
            Generate New Brief
          </Button>
        </div>
      </FadeIn>

      {/* Briefs grid */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_BRIEFS.map((brief) => (
          <StaggerItem key={brief.id}>
            <GlassCard className="space-y-4">
              {/* Brief header */}
              <div className="space-y-1.5">
                <h3 className="font-heading font-semibold text-text-primary text-base">
                  {brief.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <FileText size={12} />
                  <span className="truncate">{brief.caseName}</span>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>
                    {new Date(brief.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <Badge variant="secondary" className="text-[10px] bg-white/5 text-text-muted border-0">
                  {brief.wordCount.toLocaleString()} words
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-glass-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-xs text-text-secondary hover:text-gold"
                  onClick={() => toast.info("Opening brief preview...")}
                >
                  <Eye size={14} />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-xs text-text-secondary hover:text-gold"
                  onClick={() =>
                    toast.success("Brief exported as PDF")
                  }
                >
                  <FileDown size={14} />
                  Export
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-xs text-text-secondary hover:text-destructive ml-auto"
                  onClick={() =>
                    toast.success("Brief deleted")
                  }
                >
                  <Trash2 size={14} />
                  Delete
                </Button>
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}

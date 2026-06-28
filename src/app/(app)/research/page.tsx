"use client";

import { UploadZone } from "@/components/upload/upload-zone";
import { FadeIn, GlassCard } from "@/components/shared/animated-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

const RECENT_ANALYSES = [
  {
    id: "1",
    caseName: "Kesavananda Bharati v. State of Kerala",
    court: "Supreme Court of India",
    date: "2025-12-15",
    status: "completed" as const,
  },
  {
    id: "2",
    caseName: "Maneka Gandhi v. Union of India",
    court: "Supreme Court of India",
    date: "2025-12-10",
    status: "completed" as const,
  },
  {
    id: "3",
    caseName: "Vishaka v. State of Rajasthan",
    court: "Supreme Court of India",
    date: "2025-12-08",
    status: "completed" as const,
  },
];

export default function ResearchPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <FadeIn>
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary">
            Legal Research
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Upload a court judgment to begin AI-powered analysis
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <UploadZone />
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">
            Recent Analyses
          </h2>
          <div className="grid gap-3">
            {RECENT_ANALYSES.map((analysis) => (
              <GlassCard key={analysis.id} className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-navy/80 flex items-center justify-center shrink-0">
                      <FileText size={18} className="text-gold" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-text-primary truncate">
                        {analysis.caseName}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {analysis.court} • {analysis.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge
                      variant="secondary"
                      className="bg-emerald/10 text-emerald border-emerald/20"
                    >
                      Completed
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gold hover:text-gold-light hover:bg-gold/5"
                      render={<Link href={`/analysis/${analysis.id}`} />}
                      nativeButton={false}
                    >
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

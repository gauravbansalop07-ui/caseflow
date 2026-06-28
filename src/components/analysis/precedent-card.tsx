"use client";

import { motion } from "framer-motion";
import { ExternalLink, Copy, Scale } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface PrecedentCardProps {
  caseName: string;
  court: string;
  year: number;
  citation: string;
  similarityScore: number;
  keyHolding: string;
}

export function PrecedentCard({
  caseName,
  court,
  year,
  citation,
  similarityScore,
  keyHolding,
}: PrecedentCardProps) {
  function handleCopyCitation() {
    navigator.clipboard.writeText(citation);
    toast.success("Citation copied to clipboard");
  }

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "glass rounded-2xl p-5 transition-all duration-300",
        "hover:bg-glass-hover hover:border-glass-border-hover"
      )}
    >
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-heading text-sm font-bold text-text-primary leading-snug">
            {caseName}
          </h4>
          <Badge variant="secondary" className="shrink-0 text-[10px] bg-navy-light/60 text-text-secondary border border-glass-border">
            {court}
          </Badge>
        </div>
        <p className="mt-1 text-xs text-text-secondary">
          {year} &middot; {citation}
        </p>
      </div>

      {/* Similarity Score */}
      <div className="mb-3">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-medium text-text-secondary">
            Similarity
          </span>
          <span className="text-xs font-bold text-gold tabular-nums">
            {similarityScore}%
          </span>
        </div>
        <Progress value={similarityScore} className="h-1.5">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
              initial={{ width: 0 }}
              animate={{ width: `${similarityScore}%` }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            />
          </div>
        </Progress>
      </div>

      {/* Key Holding */}
      <p className="mb-4 text-xs italic leading-relaxed text-text-secondary/80">
        &ldquo;{keyHolding}&rdquo;
      </p>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-1.5 border-glass-border bg-transparent text-xs text-text-secondary hover:text-text-primary hover:border-gold/40"
        >
          <ExternalLink className="size-3" />
          Open Case
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-xs text-text-secondary hover:text-gold"
          onClick={handleCopyCitation}
        >
          <Copy className="size-3" />
          Copy Citation
        </Button>
      </div>
    </motion.div>
  );
}

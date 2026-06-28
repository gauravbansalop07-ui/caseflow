"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PdfViewerProps {
  documentUrl?: string;
}

const TOTAL_PAGES = 24;

export function PdfViewer({ documentUrl }: PdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-glass-border bg-navy/60 px-4 py-2.5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-gold" />
          <h3 className="text-sm font-semibold text-text-primary truncate">
            Kesavananda Bharati v. State of Kerala
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setZoom((z) => Math.max(50, z - 10))}
            className="text-text-secondary hover:text-text-primary"
          >
            <ZoomOut className="size-3.5" />
          </Button>
          <span className="min-w-[3rem] text-center text-xs tabular-nums text-text-secondary">
            {zoom}%
          </span>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setZoom((z) => Math.min(200, z + 10))}
            className="text-text-secondary hover:text-text-primary"
          >
            <ZoomIn className="size-3.5" />
          </Button>
          <div className="mx-1.5 h-4 w-px bg-glass-border" />
          <Button
            variant="ghost"
            size="icon-xs"
            className="text-text-secondary hover:text-text-primary"
          >
            <Download className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Document Area */}
      <div className="flex-1 overflow-auto bg-[#0a1532] p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        >
          <div className="rounded-lg bg-[#0d1a3a] p-8 shadow-2xl shadow-black/30 border border-glass-border">
            {/* Document Header */}
            <div className="mb-6 text-center border-b border-glass-border pb-6">
              <p className="text-xs uppercase tracking-widest text-text-muted mb-2">
                In the Supreme Court of India
              </p>
              <p className="text-xs text-text-muted mb-4">
                Civil Appellate Jurisdiction
              </p>
              <h2 className="font-heading text-lg font-bold text-text-primary mb-1">
                Kesavananda Bharati Sripadagalvaru
              </h2>
              <p className="text-sm text-text-secondary mb-1">v.</p>
              <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                State of Kerala &amp; Anr.
              </h2>
              <p className="text-xs text-text-muted">
                AIR 1973 SC 1461 &middot; (1973) 4 SCC 225
              </p>
              <p className="text-xs text-text-muted mt-1">
                Date of Judgment: 24th April, 1973
              </p>
            </div>

            {/* Mock Paragraph Content */}
            <div className="space-y-4 text-sm leading-relaxed text-text-secondary/90">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold/70 mb-2">
                Bench: S.M. Sikri, C.J., J.M. Shelat, K.S. Hegde, A.N. Grover,
                A.N. Ray, P. Jaganmohan Reddy, D.G. Palekar, H.R. Khanna,
                K.K. Mathew, M.H. Beg, S.N. Dwivedi, A.K. Mukherjea, Y.V.
                Chandrachud JJ.
              </p>

              <p>
                The petitioner, His Holiness Kesavananda Bharati Sripadagalvaru,
                being the head of a religious mutt in Kerala, challenged the
                Kerala Land Reforms Act, 1963, as amended by the 29th Amendment
                to the Constitution, which placed the Act in the Ninth Schedule.
              </p>

              <p>
                The primary question before the 13-judge bench was whether
                Parliament&apos;s amending power under Article 368 was unlimited
                or whether it was subject to inherent limitations arising from
                the basic structure of the Constitution.
              </p>

              <p>
                The majority held by a 7:6 ratio that while Parliament has wide
                powers to amend the Constitution, it cannot alter the
                &quot;basic structure&quot; or framework of the Constitution.
                This landmark doctrine established that certain core features of
                the Constitution — including supremacy of the Constitution,
                republican and democratic form of government, secular character,
                separation of powers, and federal character — cannot be
                destroyed by constitutional amendments.
              </p>

              <p className="text-text-muted italic">
                [Content continues on subsequent pages...]
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center justify-center gap-3 border-t border-glass-border bg-navy/60 px-4 py-2.5 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="text-text-secondary hover:text-text-primary disabled:opacity-30"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <span className="min-w-[7rem] text-center text-xs text-text-secondary tabular-nums">
          Page{" "}
          <span className="font-semibold text-text-primary">{currentPage}</span>{" "}
          of {TOTAL_PAGES}
        </span>

        <Button
          variant="ghost"
          size="icon-sm"
          disabled={currentPage >= TOTAL_PAGES}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="text-text-secondary hover:text-text-primary disabled:opacity-30"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

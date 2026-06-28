"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Copy,
  FileText,
  List,
  AlertCircle,
  Scale,
  Brain,
  Gavel,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

const ICON_MAP: Record<string, React.ElementType> = {
  FileText,
  List,
  AlertCircle,
  Scale,
  Brain,
  Gavel,
  Lightbulb,
};

interface InsightCardProps {
  title: string;
  icon: string;
  color: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function InsightCard({
  title,
  icon,
  color,
  children,
  defaultOpen = false,
}: InsightCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const IconComponent = ICON_MAP[icon] ?? FileText;

  function handleCopy() {
    const text = contentRef.current?.innerText ?? "";
    navigator.clipboard.writeText(text);
    toast.success(`${title} copied to clipboard`);
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <motion.div
        className={cn(
          "glass rounded-2xl overflow-hidden transition-colors duration-300",
          open && "border-glass-border-hover"
        )}
        layout
      >
        {/* Header */}
        {/* Header */}
        <div className="flex items-center gap-3 p-4 group">
          <CollapsibleTrigger className="flex-1 flex items-center gap-3 outline-none text-left cursor-pointer select-none">
            {/* Icon circle */}
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${color}20` }}
            >
              <IconComponent className="size-4" style={{ color }} />
            </div>

            {/* Title */}
            <span className="flex-1 text-sm font-bold text-text-primary">
              {title}
            </span>
          </CollapsibleTrigger>

          {/* Copy button */}
          <Button
            variant="ghost"
            size="icon-xs"
            className="text-text-muted hover:text-gold opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCopy}
            nativeButton={true}
          >
            <Copy className="size-3" />
          </Button>

          {/* Chevron */}
          <CollapsibleTrigger className="outline-none cursor-pointer p-1">
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="size-4 text-text-muted" />
            </motion.div>
          </CollapsibleTrigger>
        </div>

        {/* Content */}
        <AnimatePresence initial={false}>
          {open && (
            <CollapsibleContent>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div
                  ref={contentRef}
                  className="px-4 pb-4 pt-0 text-sm leading-relaxed text-text-secondary"
                >
                  {/* Accent bar */}
                  <div
                    className="mb-3 h-px w-full"
                    style={{
                      background: `linear-gradient(to right, ${color}40, transparent)`,
                    }}
                  />
                  {children}
                </div>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </motion.div>
    </Collapsible>
  );
}

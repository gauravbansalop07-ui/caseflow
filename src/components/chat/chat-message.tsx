"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatSource } from "@/types";

interface ChatMessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
    sources?: ChatSource[];
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}
    >
      {/* Assistant avatar */}
      {!isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy border border-glass-border">
            <Sparkles size={14} className="text-gold" />
          </div>
        </div>
      )}

      <div className={cn("max-w-[80%] space-y-2")}>
        {/* Message bubble */}
        <div
          className={cn(
            "px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "rounded-2xl rounded-br-md bg-gold/10 border border-gold/20 text-text-primary"
              : "rounded-2xl rounded-bl-md glass text-text-primary"
          )}
        >
          {message.content}
        </div>

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pl-1">
            {message.sources.map((source, i) => (
              <button
                key={i}
                className="inline-flex items-center gap-1 rounded-full bg-navy/60 border border-glass-border px-2.5 py-0.5 text-xs text-text-secondary hover:text-gold hover:border-gold/30 transition-colors"
              >
                <span className="text-gold/60">§</span>
                {source.title}
                {source.pageNumber && (
                  <span className="text-text-muted">p.{source.pageNumber}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

"use client";

import { useState, useRef, useCallback } from "react";
import { SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    // Auto-expand
    const el = e.target;
    el.style.height = "auto";
    const lineHeight = 24;
    const maxHeight = lineHeight * 4;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  };

  return (
    <div className="glass rounded-2xl p-2 flex items-end gap-2">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
        placeholder={disabled ? "AI is thinking..." : "Ask about this case..."}
        className={cn(
          "flex-1 resize-none bg-transparent text-sm text-text-primary placeholder:text-text-muted",
          "px-3 py-2 outline-none",
          "min-h-[36px] max-h-[96px]",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      />
      <Button
        size="icon"
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className={cn(
          "flex-shrink-0 h-9 w-9 rounded-xl transition-all duration-200",
          value.trim() && !disabled
            ? "bg-gold text-navy-deep hover:bg-gold-light glow-gold"
            : "bg-white/5 text-text-muted"
        )}
      >
        <SendHorizontal size={16} />
      </Button>
    </div>
  );
}

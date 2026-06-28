"use client";

import { Scale } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const sizeMap = {
    sm: { icon: 20, text: "text-base" },
    md: { icon: 28, text: "text-xl" },
    lg: { icon: 40, text: "text-3xl" },
  };

  const { icon, text } = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative">
        <div className="absolute inset-0 rounded-xl bg-gold/20 blur-lg" />
        <div className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-dark p-2 shadow-lg">
          <Scale size={icon} className="text-navy-deep" strokeWidth={2.5} />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-heading font-bold tracking-tight text-text-primary", text)}>
            Nyay<span className="text-gold">Neti</span>
          </span>
          {size === "lg" && (
            <span className="text-xs text-text-secondary tracking-wide">
              AI Legal Research
            </span>
          )}
        </div>
      )}
    </div>
  );
}

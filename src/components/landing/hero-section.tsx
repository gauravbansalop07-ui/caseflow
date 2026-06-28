"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/animated-container";

const floatingSymbols = [
  { emoji: "⚖️", className: "top-[12%] left-[8%] text-4xl md:text-5xl animate-float opacity-20" },
  { emoji: "📜", className: "top-[18%] right-[10%] text-3xl md:text-4xl animate-float-delayed opacity-15" },
  { emoji: "§", className: "bottom-[25%] left-[12%] text-5xl md:text-6xl animate-float-slow opacity-10 font-serif" },
  { emoji: "⚡", className: "top-[55%] right-[6%] text-3xl md:text-4xl animate-float opacity-15" },
  { emoji: "🔍", className: "bottom-[15%] right-[18%] text-3xl md:text-4xl animate-float-delayed opacity-15" },
  { emoji: "📖", className: "top-[40%] left-[4%] text-2xl md:text-3xl animate-float-slow opacity-10" },
];

export function HeroSection() {
  return (
    <section className="mesh-gradient relative min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Scales of Justice Watermark SVG */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
        <svg
          viewBox="0 0 200 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[50vh] md:h-[70vh] w-auto opacity-[0.03]"
        >
          {/* Central pillar */}
          <rect x="96" y="40" width="8" height="140" rx="4" fill="white" />
          {/* Base */}
          <rect x="60" y="175" width="80" height="8" rx="4" fill="white" />
          <rect x="75" y="168" width="50" height="10" rx="3" fill="white" />
          {/* Top beam */}
          <rect x="20" y="36" width="160" height="8" rx="4" fill="white" />
          {/* Top circle */}
          <circle cx="100" cy="30" r="14" stroke="white" strokeWidth="6" fill="none" />
          {/* Left chain */}
          <line x1="40" y1="44" x2="40" y2="90" stroke="white" strokeWidth="4" />
          {/* Right chain */}
          <line x1="160" y1="44" x2="160" y2="90" stroke="white" strokeWidth="4" />
          {/* Left pan */}
          <path d="M10 95 Q25 90 40 95 Q55 90 70 95 L65 100 Q40 115 15 100 Z" fill="white" />
          {/* Right pan */}
          <path d="M130 95 Q145 90 160 95 Q175 90 190 95 L185 100 Q160 115 135 100 Z" fill="white" />
        </svg>
      </div>

      {/* Floating Legal Symbols */}
      {floatingSymbols.map((symbol, index) => (
        <span
          key={index}
          className={cn(
            "pointer-events-none absolute select-none z-0 hidden md:block",
            symbol.className
          )}
          aria-hidden="true"
        >
          {symbol.emoji}
        </span>
      ))}

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center pt-24 pb-16">
        {/* Badge */}
        <FadeIn delay={0} direction="down">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-2 text-sm text-text-secondary backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            AI-Powered Legal Research Platform
          </div>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.15} direction="up">
          <h1 className="font-heading font-bold tracking-tight text-text-primary text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.08] mb-6">
            Research Indian Case Law{" "}
            <span className="gradient-text-gold text-glow-gold">
              in Seconds
            </span>
          </h1>
        </FadeIn>

        {/* Subheading */}
        <FadeIn delay={0.3} direction="up">
          <p className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-text-secondary mb-10">
            Upload any judgment and instantly extract facts, legal issues,
            precedents, and AI-generated legal insights.
          </p>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn delay={0.45} direction="up">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/research">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="gradient-gold h-12 px-8 text-base font-semibold text-navy-deep rounded-xl shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-shadow duration-300 gap-2.5"
                >
                  Upload Judgment
                  <ArrowRight className="size-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/research?demo=true">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="glass h-12 px-8 text-base font-medium text-text-primary rounded-xl border-glass-border hover:bg-glass-hover hover:border-glass-border-hover transition-all duration-300 gap-2.5"
                >
                  <Play className="size-4 fill-current" />
                  Try Demo Case
                </Button>
              </motion.div>
            </Link>
          </div>
        </FadeIn>

        {/* Trust Indicators */}
        <FadeIn delay={0.6} direction="up">
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <svg className="size-4 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card required
            </div>
            <div className="hidden sm:block h-4 w-px bg-glass-border" />
            <div className="flex items-center gap-2">
              <svg className="size-4 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              10 free analyses
            </div>
            <div className="hidden sm:block h-4 w-px bg-glass-border" />
            <div className="flex items-center gap-2">
              <svg className="size-4 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Instant results
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-deep to-transparent z-10 pointer-events-none" />
    </section>
  );
}

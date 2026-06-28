"use client";

import { Upload, Cpu, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeInView } from "@/components/shared/animated-container";

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: Upload,
    title: "Upload Judgment",
    description: "Drag and drop any court judgment PDF",
  },
  {
    number: 2,
    icon: Cpu,
    title: "AI Analysis",
    description: "Our AI extracts facts, issues, and precedents",
  },
  {
    number: 3,
    icon: Sparkles,
    title: "Get Insights",
    description: "Receive comprehensive legal analysis instantly",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <FadeInView className="text-center mb-16 md:mb-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Simple Process
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            How It Works
          </h2>
        </FadeInView>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Connecting Lines (desktop only) */}
          <div className="pointer-events-none absolute top-[4.5rem] left-0 right-0 hidden md:block z-0">
            <div className="mx-auto flex items-center justify-between px-[calc(16.666%+1rem)]">
              <div className="h-px flex-1 bg-gradient-to-r from-gold/40 via-gold/20 to-gold/40" />
            </div>
          </div>

          {steps.map((step, index) => (
            <FadeInView
              key={step.number}
              delay={index * 0.15}
              direction="up"
              className="relative z-10"
            >
              <div className="flex flex-col items-center text-center">
                {/* Number + Icon Stack */}
                <div className="relative mb-6">
                  {/* Glow behind */}
                  <div className="absolute inset-0 rounded-full bg-gold/10 blur-xl scale-150" />
                  
                  {/* Circle */}
                  <div className="relative flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border-2 border-gold/30 bg-navy">
                    <step.icon className="size-8 text-gold" strokeWidth={1.6} />
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full gradient-gold text-xs font-bold text-navy-deep shadow-lg shadow-gold/30">
                    {step.number}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed max-w-[16rem] mx-auto">
                  {step.description}
                </p>
              </div>

              {/* Mobile Connector (vertical line between steps) */}
              {index < steps.length - 1 && (
                <div className="mx-auto mt-6 h-8 w-px bg-gradient-to-b from-gold/30 to-transparent md:hidden" />
              )}
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

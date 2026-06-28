"use client";

import {
  Brain,
  Search,
  FileText,
  Link as LinkIcon,
  MessageSquare,
  Download,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeInView, GlassCard } from "@/components/shared/animated-container";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
}

const features: Feature[] = [
  {
    icon: Brain,
    title: "AI Case Analysis",
    description:
      "Automatically extract facts, legal issues, arguments, and holdings from any Indian court judgment using advanced AI.",
    iconColor: "text-gold",
    iconBg: "bg-gold/10",
  },
  {
    icon: Search,
    title: "Precedent Discovery",
    description:
      "Instantly find relevant precedents and landmark judgments cited within uploaded cases with context analysis.",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-400/10",
  },
  {
    icon: FileText,
    title: "Legal Brief Generation",
    description:
      "Generate comprehensive legal briefs, summaries, and case notes formatted for professional use in minutes.",
    iconColor: "text-emerald",
    iconBg: "bg-emerald/10",
  },
  {
    icon: LinkIcon,
    title: "Smart Citations",
    description:
      "Automatically identify, validate, and cross-reference legal citations across judgments and statutes.",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-400/10",
  },
  {
    icon: MessageSquare,
    title: "Interactive AI Chat",
    description:
      "Ask follow-up questions about any case, compare judgments, and get instant clarifications in natural language.",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-400/10",
  },
  {
    icon: Download,
    title: "Export Anywhere",
    description:
      "Export your analyses as PDF, DOCX, or structured data. Share with colleagues or integrate into your workflow.",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-400/10",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <FadeInView className="text-center mb-16 md:mb-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            Features
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-5">
            Powerful{" "}
            <span className="gradient-text-gold">Legal Intelligence</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary leading-relaxed">
            Everything you need to research, analyze, and understand Indian case
            law — powered by cutting-edge AI.
          </p>
        </FadeInView>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <FadeInView
              key={feature.title}
              delay={index * 0.1}
              direction="up"
            >
              <GlassCard
                hover
                className="h-full p-7 group"
              >
                {/* Icon */}
                <div
                  className={cn(
                    "mb-5 inline-flex items-center justify-center rounded-xl p-3 transition-transform duration-300 group-hover:scale-110",
                    feature.iconBg
                  )}
                >
                  <feature.icon
                    className={cn("size-6", feature.iconColor)}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-2.5">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </GlassCard>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

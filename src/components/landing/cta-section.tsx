"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FadeInView,
  GlassCard,
  GlowBackground,
} from "@/components/shared/animated-container";

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <FadeInView>
          <div className="relative overflow-hidden rounded-3xl">
            {/* Ambient Glow */}
            <GlowBackground />

            <GlassCard
              hover={false}
              className="relative z-10 rounded-3xl border-glass-border-hover p-10 md:p-16 text-center glow-blue"
            >
              {/* Decorative top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-5">
                Ready to Transform Your{" "}
                <span className="gradient-text-gold">Legal Research</span>?
              </h2>

              <p className="mx-auto max-w-xl text-lg text-text-secondary leading-relaxed mb-10">
                Join thousands of legal professionals using AI to work smarter.
                Start analyzing cases in seconds, not hours.
              </p>

              <Link href="/research">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    className="gradient-gold h-14 px-10 text-base font-semibold text-navy-deep rounded-xl shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/35 transition-shadow duration-300 gap-2.5"
                  >
                    Start Researching — Free
                    <ArrowRight className="size-5" />
                  </Button>
                </motion.div>
              </Link>

              <p className="mt-5 text-sm text-text-muted">
                No credit card required · Free tier available
              </p>
            </GlassCard>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

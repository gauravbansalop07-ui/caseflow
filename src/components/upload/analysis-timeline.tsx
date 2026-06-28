"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ANALYSIS_STEPS } from "@/lib/constants";

type StepStatus = "pending" | "active" | "completed";

interface AnalysisTimelineProps {
  onComplete?: () => void;
}

const STEP_DURATIONS = [1500, 2000, 2500, 1500]; // ms per step

export function AnalysisTimeline({ onComplete }: AnalysisTimelineProps) {
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    ANALYSIS_STEPS.map((_, i) => (i === 0 ? "active" : "pending"))
  );
  const [elapsedTimes, setElapsedTimes] = useState<number[]>(
    ANALYSIS_STEPS.map(() => 0)
  );
  const activeStep = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const completedRef = useRef(false);

  // Elapsed time counter
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedTimes((prev) => {
        const next = [...prev];
        const idx = activeStep.current;
        if (idx < ANALYSIS_STEPS.length) {
          next[idx] = (Date.now() - startTimeRef.current) / 1000;
        }
        return next;
      });
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Step progression
  useEffect(() => {
    let cancelled = false;

    async function run() {
      for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
        if (cancelled) return;
        activeStep.current = i;
        startTimeRef.current = Date.now();

        setStepStatuses((prev) => {
          const next = [...prev];
          next[i] = "active";
          return next;
        });

        await new Promise((r) => setTimeout(r, STEP_DURATIONS[i]));
        if (cancelled) return;

        // Freeze elapsed time for completed step
        setElapsedTimes((prev) => {
          const next = [...prev];
          next[i] = STEP_DURATIONS[i] / 1000;
          return next;
        });

        setStepStatuses((prev) => {
          const next = [...prev];
          next[i] = "completed";
          return next;
        });
      }

      if (!cancelled && !completedRef.current) {
        completedRef.current = true;
        if (timerRef.current) clearInterval(timerRef.current);
        onComplete?.();
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto py-2"
    >
      <div className="space-y-0">
        {ANALYSIS_STEPS.map((step, index) => {
          const status = stepStatuses[index];
          const elapsed = elapsedTimes[index];
          const isLast = index === ANALYSIS_STEPS.length - 1;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative flex items-start gap-4"
            >
              {/* Left: Status indicator + connector */}
              <div className="flex flex-col items-center">
                {/* Circle */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={status}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                      "relative z-10 flex size-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                      status === "pending" &&
                        "border-text-muted/30 bg-navy-deep",
                      status === "active" &&
                        "border-gold bg-gold/10 animate-pulse-glow",
                      status === "completed" &&
                        "border-emerald bg-emerald/10"
                    )}
                  >
                    {status === "active" && (
                      <Loader2 className="size-4 text-gold animate-spin" />
                    )}
                    {status === "completed" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 20,
                        }}
                      >
                        <Check className="size-4 text-emerald" />
                      </motion.div>
                    )}
                    {status === "pending" && (
                      <div className="size-2 rounded-full bg-text-muted/30" />
                    )}

                    {/* Glow ring */}
                    {status === "active" && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-gold/30"
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    {status === "completed" && (
                      <div className="absolute inset-0 rounded-full shadow-[0_0_12px_rgba(40,199,111,0.3)]" />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Connector line */}
                {!isLast && (
                  <div className="relative h-10 w-0.5">
                    <div className="absolute inset-0 bg-text-muted/15 rounded-full" />
                    <motion.div
                      className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-gold to-gold/30"
                      initial={{ height: 0 }}
                      animate={{
                        height:
                          status === "completed"
                            ? "100%"
                            : status === "active"
                            ? "50%"
                            : "0%",
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                )}
              </div>

              {/* Center: Label + Description */}
              <div className="flex-1 pb-6 pt-1">
                <p
                  className={cn(
                    "text-sm font-bold transition-colors duration-300",
                    status === "active" && "text-gold",
                    status === "completed" && "text-emerald",
                    status === "pending" && "text-text-muted"
                  )}
                >
                  {step.label}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  {step.description}
                </p>
              </div>

              {/* Right: Elapsed time */}
              <div className="pt-1.5 min-w-[3.5rem] text-right">
                {(status === "active" || status === "completed") && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      "text-xs tabular-nums font-mono",
                      status === "active" && "text-gold",
                      status === "completed" && "text-emerald/70"
                    )}
                  >
                    {elapsed.toFixed(1)}s
                  </motion.span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

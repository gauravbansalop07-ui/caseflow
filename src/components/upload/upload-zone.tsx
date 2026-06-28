"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AnalysisTimeline } from "@/components/upload/analysis-timeline";
import { MAX_FILE_SIZE } from "@/lib/constants";
import Link from "next/link";

type UploadState = "idle" | "uploading" | "processing" | "complete" | "error";

export function UploadZone() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);

  const simulateUpload = useCallback((file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    setUploadState("uploading");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState("processing");
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: unknown[]) => {
      if (rejectedFiles && (rejectedFiles as Array<unknown>).length > 0) {
        toast.error("Invalid file. Please upload a PDF file under 50MB.");
        return;
      }
      if (acceptedFiles.length > 0) {
        simulateUpload(acceptedFiles[0]);
      }
    },
    [simulateUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    disabled: uploadState !== "idle",
  });

  const handleAnalysisComplete = () => {
    setUploadState("complete");
  };

  const resetUpload = () => {
    setUploadState("idle");
    setProgress(0);
    setFileName("");
    setFileSize(0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {uploadState === "idle" && (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div
              {...getRootProps()}
              className={cn(
                "relative min-h-[320px] rounded-2xl border-2 border-dashed p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300",
                "bg-glass backdrop-blur-xl",
                isDragActive
                  ? "border-gold bg-glow-gold shadow-[0_0_60px_rgba(246,166,35,0.15)]"
                  : "border-glass-border hover:border-gold/50 hover:bg-glass-hover"
              )}
            >
              <input {...getInputProps()} />

              <motion.div
                animate={isDragActive ? { scale: 1.15, y: -4 } : { scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center transition-colors duration-300",
                  isDragActive ? "bg-gold/20" : "bg-white/5"
                )}
              >
                <Upload
                  size={36}
                  className={cn(
                    "transition-colors duration-300",
                    isDragActive ? "text-gold" : "text-text-secondary"
                  )}
                />
              </motion.div>

              <div className="text-center space-y-2">
                <p className="text-lg font-medium text-text-primary">
                  {isDragActive
                    ? "Drop your file here"
                    : "Drag & drop your judgment PDF here"}
                </p>
                <p className="text-sm text-text-secondary">
                  {isDragActive ? "Release to upload" : "or click to browse files"}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-text-muted mt-2">
                <FileText size={14} />
                <span>Supports PDF up to 50MB</span>
              </div>

              {isDragActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(246,166,35,0.08) 0%, transparent 70%)",
                  }}
                />
              )}
            </div>
          </motion.div>
        )}

        {uploadState === "uploading" && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl p-8 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <FileText size={24} className="text-gold" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{fileName}</p>
                  <p className="text-sm text-text-secondary">
                    {formatFileSize(fileSize)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={resetUpload}
                className="text-text-secondary hover:text-text-primary"
              >
                <X size={18} />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Uploading...</span>
                <span className="text-gold font-medium">
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>
              <Progress
                value={Math.min(progress, 100)}
                className="h-2 bg-white/5"
              />
            </div>
          </motion.div>
        )}

        {uploadState === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl p-8"
          >
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text-primary">
                Analyzing Document
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                AI is processing your judgment...
              </p>
            </div>
            <AnalysisTimeline onComplete={handleAnalysisComplete} />
          </motion.div>
        )}

        {uploadState === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass rounded-2xl p-8 text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="w-20 h-20 mx-auto rounded-full bg-emerald/10 flex items-center justify-center"
              style={{
                boxShadow: "0 0 40px rgba(40, 199, 111, 0.2)",
              }}
            >
              <CheckCircle2 size={40} className="text-emerald" />
            </motion.div>

            <div>
              <h3 className="text-xl font-semibold text-text-primary">
                Analysis Complete!
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                Your judgment has been successfully analyzed.
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                className="bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-semibold hover:opacity-90 px-6"
                render={<Link href="/analysis/demo-result" />}
                nativeButton={false}
              >
                View Results
              </Button>
              <Button
                variant="outline"
                onClick={resetUpload}
                className="border-glass-border text-text-secondary hover:text-text-primary hover:bg-white/5"
              >
                Upload Another
              </Button>
            </div>
          </motion.div>
        )}

        {uploadState === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8 text-center space-y-4"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertCircle size={32} className="text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                Analysis Failed
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                Something went wrong. Please try again.
              </p>
            </div>
            <Button
              onClick={resetUpload}
              className="bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-semibold"
            >
              Try Again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

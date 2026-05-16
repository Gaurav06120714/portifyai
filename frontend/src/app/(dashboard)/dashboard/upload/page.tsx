"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import UploadZone from "@/components/upload/UploadZone";
import { generatePortfolio, ApiError } from "@/lib/api";
import type { UploadResumeResponse } from "@/types";

const TEMPLATES = [
  {
    id: "aurora" as const,
    name: "Aurora",
    tagline: "Dark electric",
    bg: "#0F0F1A",
    accent: "#6c63ff",
    secondary: "#00d4ff",
  },
  {
    id: "minimal" as const,
    name: "Minimal",
    tagline: "Clean & professional",
    bg: "#FAFAFA",
    accent: "#1a1a1a",
    secondary: "#4f46e5",
  },
  {
    id: "cyber" as const,
    name: "Cyber",
    tagline: "Neon glassmorphism",
    bg: "#0A0A0F",
    accent: "#00FF88",
    secondary: "#FF00AA",
  },
];

type Stage = "upload" | "template" | "generating";

function UploadPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getToken } = useAuth();

  const [stage, setStage] = useState<Stage>("upload");
  const [resumeResult, setResumeResult] = useState<UploadResumeResponse | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<"aurora" | "minimal" | "cyber">(
    (searchParams.get("template") as "aurora" | "minimal" | "cyber") ?? "aurora",
  );
  const [generating, setGenerating] = useState(false);

  const handleUploadSuccess = (result: UploadResumeResponse) => {
    setResumeResult(result);
    setStage("template");
  };

  const handleGenerate = async () => {
    if (!resumeResult) return;
    setGenerating(true);
    try {
      const token = await getToken();
      if (!token) throw new Error("Not authenticated");
      const res = await generatePortfolio(resumeResult.resume_id, selectedTemplate, token);
      toast.success("Generation started!");
      router.push(`/dashboard/generating/${res.portfolio_id}`);
    } catch (err) {
      const msg = err instanceof ApiError ? err.detail : "Failed to start generation.";
      toast.error(msg);
      setGenerating(false);
    }
  };

  const STEP_LABELS = ["Upload", "Choose Template", "Generate"];
  const stepIdx = stage === "upload" ? 0 : stage === "template" ? 1 : 2;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#e8e8f0]">Upload Resume</h1>
        <p className="mt-1 text-[#7777aa]">
          Upload your resume and we&apos;ll generate a stunning portfolio in seconds.
        </p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2">
        {STEP_LABELS.map((label, i) => {
          const done = i < stepIdx;
          const active = i === stepIdx;
          return (
            <div key={label} className="flex items-center gap-2">
              <motion.div
                animate={{
                  background: done ? "#22c55e" : active ? "#6c63ff" : "rgba(108,99,255,0.1)",
                }}
                className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
              >
                {done ? "✓" : i + 1}
              </motion.div>
              <span className={`text-sm ${active || done ? "text-[#e8e8f0]" : "text-[#7777aa]"}`}>
                {label}
              </span>
              {i < 2 && <div className="h-px w-8 bg-[rgba(108,99,255,0.2)]" />}
            </div>
          );
        })}
      </div>

      {/* Step panels */}
      <AnimatePresence mode="wait">
        {stage === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            <UploadZone onSuccess={handleUploadSuccess} />
          </motion.div>
        )}

        {stage === "template" && (
          <motion.div
            key="template"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Uploaded file badge */}
            <div className="flex items-center gap-2 rounded-xl border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.06)] px-4 py-3">
              <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-400">Resume uploaded</p>
                <p className="text-xs text-[#7777aa]">{resumeResult?.filename}</p>
              </div>
            </div>

            {/* Template picker */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7777aa]">
                Choose a template
              </p>
              <div className="grid grid-cols-3 gap-3">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`group relative overflow-hidden rounded-xl border text-left transition-all duration-200 ${
                      selectedTemplate === t.id
                        ? "border-[#6c63ff] shadow-[0_0_0_1px_#6c63ff]"
                        : "border-[rgba(108,99,255,0.15)] hover:border-[rgba(108,99,255,0.4)]"
                    }`}
                  >
                    {/* Preview */}
                    <div className="relative h-20" style={{ background: t.bg }}>
                      <div className="absolute inset-0 flex flex-col gap-1.5 p-2.5">
                        <div className="h-2 w-3/4 rounded-full opacity-50" style={{ background: t.accent }} />
                        <div className="h-1.5 w-1/2 rounded-full opacity-30" style={{ background: t.secondary }} />
                        <div className="mt-1 flex gap-1">
                          {[1, 2, 3].map((n) => (
                            <div
                              key={n}
                              className="h-4 flex-1 rounded-md opacity-15"
                              style={{ background: t.accent }}
                            />
                          ))}
                        </div>
                      </div>
                      {selectedTemplate === t.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#6c63ff]"
                        >
                          <Check className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <div className="bg-[#13131e] px-3 py-2">
                      <p className="text-sm font-semibold text-[#e8e8f0]">{t.name}</p>
                      <p className="text-[10px] text-[#7777aa]">{t.tagline}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6c63ff] py-3.5 font-semibold text-white shadow-[0_0_24px_rgba(108,99,255,0.3)] transition-all hover:bg-[#5a53e0] hover:shadow-[0_0_32px_rgba(108,99,255,0.5)] disabled:opacity-60"
            >
              {generating ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Starting…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Portfolio with {TEMPLATES.find((x) => x.id === selectedTemplate)?.name}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <button
              onClick={() => setStage("upload")}
              className="w-full text-center text-sm text-[#7777aa] hover:text-[#e8e8f0] transition-colors"
            >
              ← Upload a different resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense>
      <UploadPageInner />
    </Suspense>
  );
}

"use client";

import { motion } from "framer-motion";

interface Props {
  step: number;
  total: number;
  emoji?: string;
  question: string;
  hint?: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  loading?: boolean;
}

export default function StepShell({
  step,
  total,
  emoji,
  question,
  hint,
  children,
  onNext,
  onBack,
  nextLabel = "Continue →",
  nextDisabled = false,
  loading = false,
}: Props) {
  const progress = (step / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flex flex-col gap-8"
    >
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#7777aa]">
          <span>Step {step} of {total}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-[rgba(108,99,255,0.1)]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#6c63ff] to-[#00d4ff]"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <div>
        {emoji && <div className="mb-3 text-3xl">{emoji}</div>}
        <h2 className="text-2xl font-bold leading-snug text-[#e8e8f0] sm:text-3xl">
          {question}
        </h2>
        {hint && <p className="mt-2 text-[#7777aa]">{hint}</p>}
      </div>

      {/* Input area */}
      <div>{children}</div>

      {/* Nav buttons */}
      <div className="flex items-center gap-3 pt-2">
        {onBack && (
          <button
            onClick={onBack}
            className="rounded-xl border border-[rgba(108,99,255,0.2)] px-5 py-2.5 text-sm text-[#7777aa] hover:border-[rgba(108,99,255,0.5)] hover:text-[#e8e8f0] transition-colors"
          >
            ← Back
          </button>
        )}
        <button
          onClick={onNext}
          disabled={nextDisabled || loading}
          className="flex items-center gap-2 rounded-xl bg-[#6c63ff] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(108,99,255,0.25)] transition-all hover:bg-[#5a53e0] hover:shadow-[0_0_28px_rgba(108,99,255,0.4)] disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Building your resume…
            </>
          ) : (
            nextLabel
          )}
        </button>
      </div>
    </motion.div>
  );
}

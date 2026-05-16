"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  Upload,
  Palette,
  ArrowRight,
  FolderOpen,
  Eye,
  Zap,
  PenLine,
  Sparkles,
} from "lucide-react";

const QUICK_ACTIONS = [
  {
    href: "/dashboard/build-resume",
    icon: PenLine,
    label: "AI Resume Builder",
    description: "Answer 12 questions — Claude writes your resume",
    accent: "#6c63ff",
    badge: "✨ New",
  },
  {
    href: "/dashboard/upload",
    icon: Upload,
    label: "Upload Resume",
    description: "Upload a PDF or DOCX to get started",
    accent: "#00d4ff",
    badge: null,
  },
  {
    href: "/dashboard/templates",
    icon: Palette,
    label: "Browse Templates",
    description: "Explore Aurora, Minimal, and Cyber themes",
    accent: "#ff6b9d",
    badge: null,
  },
];

export default function DashboardPage() {
  const { user } = useUser();
  const name = user?.firstName ?? user?.username ?? "there";

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-[#e8e8f0]">Hey, {name} 👋</h1>
        <p className="mt-1 text-[#7777aa]">
          Here&apos;s what&apos;s happening with your portfolios.
        </p>
      </motion.div>

      {/* Hero CTA — AI Resume Builder */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.3 }}
      >
        <Link
          href="/dashboard/build-resume"
          className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-[rgba(108,99,255,0.3)] bg-gradient-to-r from-[#13131e] to-[#0f0f1a] p-6 transition-all hover:border-[rgba(108,99,255,0.6)] hover:shadow-[0_0_40px_rgba(108,99,255,0.12)]"
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#6c63ff] opacity-5 blur-3xl" />

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(108,99,255,0.15)]">
              <Sparkles className="h-6 w-6 text-[#6c63ff]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-[#e8e8f0]">AI Resume Builder</p>
                <span className="rounded-full bg-[rgba(108,99,255,0.2)] px-2 py-0.5 text-xs font-semibold text-[#8b84ff]">
                  NEW
                </span>
              </div>
              <p className="text-sm text-[#7777aa]">
                No resume? No problem. Answer 12 quick questions and Claude builds it for you.
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 flex-shrink-0 text-[#7777aa] transition-transform group-hover:translate-x-1 group-hover:text-[#6c63ff]" />
        </Link>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <StatCard icon={<FolderOpen className="h-5 w-5" />} label="Portfolios" value="0" accent="#6c63ff" />
        <StatCard icon={<Eye className="h-5 w-5" />} label="Total Views" value="0" accent="#00d4ff" />
        <StatCard icon={<Zap className="h-5 w-5" />} label="Plan" value="Free" accent="#ff6b9d" />
      </motion.div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#7777aa]">
          Get Started
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {QUICK_ACTIONS.map(({ href, icon: Icon, label, description, accent, badge }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-3 rounded-xl border border-[rgba(108,99,255,0.15)] bg-[#13131e] p-5 transition-all hover:border-[rgba(108,99,255,0.4)] hover:bg-[#16161f]"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ background: `${accent}22` }}
                >
                  <Icon className="h-5 w-5" style={{ color: accent }} />
                </div>
                {badge && (
                  <span className="rounded-full bg-[rgba(108,99,255,0.15)] px-2 py-0.5 text-xs font-medium text-[#8b84ff]">
                    {badge}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#e8e8f0]">{label}</p>
                <p className="mt-0.5 text-sm text-[#7777aa]">{description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#7777aa] transition-transform group-hover:translate-x-1 group-hover:text-[#e8e8f0]" />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* How it works strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="rounded-xl border border-[rgba(108,99,255,0.1)] bg-[#13131e] p-5"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#7777aa]">
          How PortifyAI works
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { step: "1", label: "Add your info", desc: "Build or upload your resume" },
            { step: "2", label: "Pick a theme", desc: "Aurora, Minimal, or Cyber" },
            { step: "3", label: "Go live", desc: "Share your portfolio URL instantly" },
          ].map(({ step, label, desc }) => (
            <div key={step} className="flex items-start gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(108,99,255,0.15)] text-xs font-bold text-[#6c63ff]">
                {step}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#e8e8f0]">{label}</p>
                <p className="text-xs text-[#7777aa]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-[rgba(108,99,255,0.15)] bg-[#13131e] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#7777aa]">{label}</p>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: `${accent}22`, color: accent }}
        >
          {icon}
        </div>
      </div>
      <p className="mt-3 text-3xl font-bold text-[#e8e8f0]">{value}</p>
    </div>
  );
}

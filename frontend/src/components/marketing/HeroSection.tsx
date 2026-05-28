"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pt-20">

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(108,99,255,0.35)] bg-[var(--pf-border-dim)] px-4 py-1.5 text-sm font-medium text-[#a09bff]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Built with Claude AI · Free to start
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          Turn your resume into{" "}
          <br />
          <span className="relative inline-block">
            a portfolio that gets you hired
            <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary" />
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Upload your resume or answer 12 quick questions. Claude reads your experience, writes the copy, and builds your portfolio. The whole thing takes about 60 seconds.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/register"
            className="group flex items-center gap-2 rounded-2xl bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Generate your portfolio free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="#how-it-works"
            className="flex items-center gap-2 rounded-2xl border border-border bg-background px-7 py-3.5 text-base font-semibold text-foreground/90 transition-all hover:border-primary/50 hover:bg-muted"
          >
            <Play className="h-4 w-4 fill-current" />
            See how it works
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-sm text-muted-foreground/80"
        >
          Free to start · No credit card · 60-second portfolio
        </motion.p>

        {/* Demo window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="animate-float relative mx-auto mt-16 w-full max-w-4xl"
        >
          {/* Browser chrome */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/20 dark:shadow-black/70">
            {/* Title bar */}
            <div className="flex h-11 items-center gap-2 border-b border-border bg-muted/30 px-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
              </div>
              <div className="mx-auto flex h-6 w-64 items-center justify-center rounded-md bg-background px-3 text-[10px] text-muted-foreground">
                vyroportify.com/portfolio/alex-johnson
              </div>
            </div>

            {/* Fake portfolio preview */}
            <div className="relative h-72 w-full overflow-hidden bg-background sm:h-96">

              {/* Fake portfolio content */}
              <div className="relative flex h-full flex-col items-center justify-center gap-5 p-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-primary" />
                  <div className="h-7 w-48 rounded-lg bg-primary/20" />
                  <div className="h-4 w-32 rounded-md bg-primary/10" />
                </div>
                <div className="flex gap-2">
                  {["React", "TypeScript", "Node.js", "AWS"].map((t) => (
                    <div
                      key={t}
                      className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-medium text-primary"
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <div className="grid w-full max-w-lg grid-cols-3 gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 rounded-xl border border-border bg-muted/30 p-3"
                    >
                      <div className="mb-1.5 h-2 w-3/4 rounded-full bg-primary/20" />
                      <div className="h-1.5 w-1/2 rounded-full bg-primary/10" />
                    </div>
                  ))}
                </div>
              </div>

              {/* "Live" badge */}
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-[10px] font-semibold text-green-600 dark:text-green-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                Live portfolio
              </div>

              {/* Generation timer */}
              <div className="absolute bottom-4 left-4 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] text-primary">
                ⚡ Generated in 42s
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

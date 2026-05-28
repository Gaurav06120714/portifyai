"use client";

import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center px-6 pt-20 pb-24">
      <div className="mx-auto max-w-5xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(108,99,255,0.35)] bg-[var(--pf-border-dim)] px-4 py-1.5 text-sm font-medium text-[#a09bff]">
          <Sparkles className="h-3.5 w-3.5" />
          Built with Claude AI · Free to start
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Turn your resume into{" "}
          <br />
          <span className="relative inline-block">
            a portfolio that gets you hired
            <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary" />
          </span>
        </h1>

        {/* Sub */}
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Upload your resume or answer 12 quick questions. Claude reads your experience, writes the copy, and builds your portfolio. The whole thing takes about 60 seconds.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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
        </div>

        <p className="mt-4 text-sm text-muted-foreground/80">
          Free to start · No credit card · 60-second portfolio
        </p>
      </div>
    </section>
  );
}

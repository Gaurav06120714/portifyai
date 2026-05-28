"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import FadeUp from "./FadeUp";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      {/* Border top */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-border" />

      <div className="relative mx-auto max-w-4xl text-center">
        <FadeUp>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            No credit card required
          </div>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h2 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Your portfolio,<br />ready in 60 seconds
          </h2>
        </FadeUp>

        <FadeUp delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Upload your resume or answer 12 quick questions. Claude writes the copy, picks the layout, and hands you a live URL — usually before you&apos;ve finished reading this page.
          </p>
        </FadeUp>

        <FadeUp delay={0.22}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="group flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Build my portfolio free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground/60">
            Free forever · No credit card · Live in 60 seconds
          </p>
        </FadeUp>

        {/* Social proof */}
        <FadeUp delay={0.3} className="mt-16">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
            {[
              { stat: "12,400+", label: "portfolios generated" },
              { stat: "4.9 / 5", label: "average rating" },
              { stat: "< 60s", label: "average generation time" },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-extrabold text-foreground">{stat}</div>
                <div className="text-sm text-muted-foreground/60">{label}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

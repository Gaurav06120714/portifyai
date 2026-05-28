"use client";

import { Zap, Globe, Palette, Brain, Shield, Download, RefreshCw, Search, Share2 } from "lucide-react";
import FadeUp from "./FadeUp";

const FEATURES = [
  {
    icon: Brain,
    title: "AI writes your copy",
    desc: "Claude reads what you've done and writes your headline, bio, and bullet points. You can edit anything after.",
    color: "var(--pf-accent)",
  },
  {
    icon: Zap,
    title: "Ready in 60 seconds",
    desc: "Upload your resume and you'll have a live URL in under a minute. No queue, no wait.",
    color: "#00d4ff",
  },
  {
    icon: Globe,
    title: "Custom domain",
    desc: "Use your free vyroportify.com/[slug] link, or point your own domain. SSL is set up automatically.",
    color: "#ff6b9d",
  },
  {
    icon: Palette,
    title: "3 templates",
    desc: "Aurora, Minimal, and Cyber. Switch between them any time without re-entering anything.",
    color: "#00FF88",
  },
  {
    icon: Search,
    title: "Shows up on Google",
    desc: "Portfolios are server-rendered with proper meta tags and structured data. Good Core Web Vitals out of the box.",
    color: "#ffd166",
  },
  {
    icon: RefreshCw,
    title: "Easy to update",
    desc: "Got a new job or project? Update your resume and regenerate. Your link stays the same.",
    color: "var(--pf-accent)",
  },
  {
    icon: Download,
    title: "PDF export",
    desc: "Download a print-ready version with one click. Useful when a recruiter asks for a PDF.",
    color: "#00d4ff",
  },
  {
    icon: Shield,
    title: "Privacy controls",
    desc: "Your portfolio is private by default. Publish when you're ready, or password-protect it if you prefer.",
    color: "#ff6b9d",
  },
  {
    icon: Share2,
    title: "View analytics",
    desc: "See how many people viewed your portfolio, where they came from, and what they clicked.",
    color: "#00FF88",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-28">
      <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary opacity-5 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <FadeUp className="mb-16 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            Features
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            What you get
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Everything is included. Nothing is an afterthought.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.07}>
              <div className="group flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:bg-muted/40">
                <div
                  className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}
                >
                  <f.icon className="h-5 w-5" style={{ color: f.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

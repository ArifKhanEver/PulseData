"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  PieChart,
  Zap,
  CheckCircle2,
  Quote,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  Database,
  Cpu,
  LineChart,
  Check,
  Star,
  Sparkles,
} from "lucide-react";

import { NetworkBackground } from "@/components/ui/NetworkBackground";

// ------------------------------------------------------------------
// FAQ Accordion item (client-side interactivity)
// ------------------------------------------------------------------
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-slate-700/60 rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: open
          ? "rgba(6,182,212,0.05)"
          : "rgba(15,23,42,0.6)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-cyan-900/20 transition-colors"
        aria-expanded={open}
      >
        <span className="text-slate-100 font-semibold text-base md:text-lg">
          {question}
        </span>
        <span className="flex-shrink-0 text-cyan-400">
          {open ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "300px" : "0px" }}
      >
        <p className="px-6 pb-5 text-slate-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Main Page
// ------------------------------------------------------------------
export default function HomePage() {
  const faqs = [
    {
      question: "How quickly can I get started with PulseData?",
      answer:
        "You can be up and running in under 10 minutes. Simply sign up, connect your data sources using our guided wizard, and PulseData will auto-generate your first dashboard. No SQL or data-engineering skills required.",
    },
    {
      question: "What data sources does PulseData support?",
      answer:
        "PulseData connects to 200+ data sources including PostgreSQL, MySQL, MongoDB, Snowflake, BigQuery, Google Analytics, Salesforce, HubSpot, REST APIs, and CSV/Excel uploads. New connectors are added monthly.",
    },
    {
      question: "Is my data secure? Where is it stored?",
      answer:
        "Security is our top priority. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC 2 Type II certified and GDPR compliant. Your raw data never leaves your cloud environment — PulseData only stores metadata and aggregated results.",
    },
    {
      question: "Can I invite my whole team?",
      answer:
        "Absolutely. Every plan supports unlimited viewers. The Pro plan allows up to 10 editor seats and the Enterprise plan provides unlimited seats with granular role-based access control (RBAC) and SSO/SAML integration.",
    },
    {
      question: "What happens after my 14-day trial ends?",
      answer:
        "Your dashboards and data connections are preserved. You'll be prompted to choose a plan. If you choose not to subscribe, your account moves to a read-only free tier — your work is never deleted.",
    },
    {
      question: "Do you offer custom enterprise contracts?",
      answer:
        "Yes. Our Enterprise plan is fully customisable with dedicated infrastructure, SLA guarantees, custom data retention policies, priority support with a named CSM, and volume pricing. Contact our sales team to get a tailored quote.",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$0",
      period: "/ month",
      tagline: "Perfect for individuals & small projects",
      highlight: false,
      features: [
        "Up to 3 data sources",
        "5 dashboards",
        "1 user seat",
        "Basic AI summaries",
        "7-day data retention",
        "Community support",
      ],
      cta: "Get Started Free",
      ctaVariant: "outline" as const,
    },
    {
      name: "Pro",
      price: "$49",
      period: "/ month",
      tagline: "For growing teams that demand speed",
      highlight: true,
      badge: "Most Popular",
      features: [
        "Unlimited data sources",
        "Unlimited dashboards",
        "10 editor seats",
        "Advanced AI & predictive models",
        "90-day data retention",
        "Priority email support",
        "Custom alerting & Slack integration",
        "CSV / Excel exports",
      ],
      cta: "Start Pro Trial",
      ctaVariant: "default" as const,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      tagline: "Designed for large-scale organisations",
      highlight: false,
      features: [
        "Unlimited everything",
        "Unlimited seats + RBAC",
        "SSO / SAML integration",
        "Dedicated cloud infrastructure",
        "5-year data retention",
        "Named Customer Success Manager",
        "99.99% Uptime SLA",
        "Custom AI model fine-tuning",
      ],
      cta: "Contact Sales",
      ctaVariant: "outline" as const,
    },
  ];

  const steps = [
    {
      number: "01",
      icon: <Database className="w-8 h-8 text-cyan-400" />,
      title: "Connect Your Data",
      description:
        "Plug in any data source — databases, APIs, or flat files — with our zero-code connector library in minutes.",
    },
    {
      number: "02",
      icon: <Cpu className="w-8 h-8 text-cyan-400" />,
      title: "AI Processes & Enriches",
      description:
        "Our AI engine cleans, joins, and enriches your data automatically, surfacing hidden patterns and anomalies.",
    },
    {
      number: "03",
      icon: <LineChart className="w-8 h-8 text-cyan-400" />,
      title: "Visualize & Act",
      description:
        "Explore interactive dashboards, set smart alerts, and share one-click reports with your entire team.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── 1. Hero Section ─────────────────────────────────────── */}
      <section
        id="hero"
        className="relative flex items-center justify-center min-h-[75vh] px-6 py-24 overflow-hidden bg-[#0a0f1c] z-0"
      >
        <NetworkBackground />

        <div className="z-10 max-w-5xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-100 leading-[1.1]">
            Unlock the power of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Your Data
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            PulseData is the AI-powered Business Intelligence platform that
            transforms complex datasets into actionable insights in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all group border-0"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white/10 hover:text-white transition-colors"
            >
              <PlayCircle className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* ── 2. Features / Core Capabilities ─────────────────────── */}
      <section id="features" className="py-24 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Intelligent features for modern teams
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to analyze, visualize, and share your business
              metrics seamlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-10 h-10 text-accent" />,
                title: "Advanced Analytics",
                description:
                  "Deep dive into your metrics with AI-driven correlation analysis and predictive modeling.",
              },
              {
                icon: <Zap className="w-10 h-10 text-accent" />,
                title: "Real-time Processing",
                description:
                  "Stream millions of data points with near-zero latency. Make decisions as events unfold.",
              },
              {
                icon: <PieChart className="w-10 h-10 text-accent" />,
                title: "Interactive Dashboards",
                description:
                  "Create stunning, interactive reports with a drag-and-drop interface. No coding required.",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="bg-slate-950/50 backdrop-blur border-slate-800 hover:border-accent/40 transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 p-3 bg-slate-800 rounded-lg inline-flex w-fit shadow-sm">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Statistics / Live Impact Counter ──────────────────── */}
      <section
        id="stats"
        className="py-24 px-6 bg-cyan-500 text-cyan-400-foreground relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
            {[
              { value: "99.9%", label: "Uptime SLA" },
              { value: "50M+", label: "Queries Processed/Day" },
              { value: "4.9/5", label: "Customer Satisfaction" },
              { value: "10x", label: "Faster Reporting" },
            ].map((stat, i) => (
              <div
                key={i}
                className="py-6 md:py-0 space-y-2 hover:scale-110 transition-transform duration-300"
              >
                <div className="text-5xl font-extrabold tracking-tight drop-shadow-md">
                  {stat.value}
                </div>
                <div className="text-cyan-400-foreground/90 font-medium uppercase tracking-wider text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. How It Works (3-Step Process) ─────────────────────── */}
      <section
        id="how-it-works"
        className="py-24 px-6 bg-[#080d18] relative overflow-hidden"
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10 space-y-16">
          <div className="text-center space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-2">
              How It Works
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              From raw data to insight —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                in three steps
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              No data engineering degree required. PulseData's guided workflow
              gets every team member to insight speed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line on desktop */}
            <div className="hidden md:block absolute top-[52px] left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-cyan-500/20 via-cyan-500/60 to-cyan-500/20" />

            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-5">
                <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-slate-800 border border-slate-700 shadow-lg hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300">
                  <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-cyan-500 text-slate-950 text-xs font-extrabold flex items-center justify-center">
                    {i + 1}
                  </span>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-100">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Testimonials / Social Proof ───────────────────────── */}
      <section id="testimonials" className="py-24 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-2">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Trusted by industry leaders
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              See how data-driven organisations use PulseData to accelerate
              decisions and outperform competitors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "PulseData completely transformed how our marketing team operates. We reduced reporting time by 80% and uncovered insights we didn't know existed.",
                author: "Sarah Jenkins",
                role: "VP of Marketing, TechFlow",
                stars: 5,
              },
              {
                quote:
                  "The AI integrations are practically magic. It connects dots across our fragmented datasets that traditional BI tools missed completely.",
                author: "Marcus Chen",
                role: "Chief Data Officer, Nexus Corp",
                stars: 5,
              },
              {
                quote:
                  "Implementation was flawless. Within two weeks, our entire executive team was using PulseData dashboards for their daily standups.",
                author: "Elena Rodriguez",
                role: "Operations Director, Synthia",
                stars: 5,
              },
            ].map((testimonial, i) => (
              <Card
                key={i}
                className="border border-slate-800 bg-slate-800/10 hover:bg-slate-800/25 hover:border-cyan-500/25 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.08)]"
              >
                <CardContent className="pt-8 space-y-5">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.stars }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-cyan-500/30" />
                  <p className="text-base italic text-slate-100/80 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-cyan-500/20">
                      {testimonial.author[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-100 tracking-wide">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-slate-400/90">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Pricing / Plans ───────────────────────────────────── */}
      <section
        id="pricing"
        className="py-28 px-6 bg-slate-900 relative overflow-hidden"
      >
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 space-y-16">
          <div className="text-center space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-2">
              Pricing
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              No hidden fees. No surprises. Scale your plan as your team grows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col rounded-2xl border p-8 gap-6 transition-all duration-300 ${
                  plan.highlight
                    ? "border-cyan-500 bg-gradient-to-b from-slate-800 to-slate-900 shadow-[0_0_40px_rgba(6,182,212,0.2)] scale-[1.03]"
                    : "border-slate-700 bg-slate-950/60 hover:border-slate-600"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-1">
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1">
                    <span
                      className={`text-5xl font-extrabold tracking-tight ${
                        plan.highlight ? "text-cyan-400" : "text-slate-100"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-slate-400 mb-2">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm mt-2">{plan.tagline}</p>
                </div>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          plan.highlight ? "text-cyan-400" : "text-slate-400"
                        }`}
                      />
                      <span className="text-slate-300">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.ctaVariant}
                  className={`w-full mt-auto ${
                    plan.highlight
                      ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] border-0"
                      : "border-slate-600 text-slate-300 hover:bg-slate-800"
                  } transition-all`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ───────────────────────────────────────────────── */}
      <section
        id="faq"
        className="py-24 px-6 bg-[#080d18] relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(6,182,212,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-3xl mx-auto relative z-10 space-y-12">
          <div className="text-center space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-2">
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
            <p className="text-slate-400 text-lg">
              Can't find the answer? Reach us at{" "}
              <a
                href="mailto:support@pulsedata.ai"
                className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 transition-colors"
              >
                support@pulsedata.ai
              </a>
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Newsletter / Final CTA ────────────────────────────── */}
      <section className="py-32 px-6 bg-gradient-to-br from-secondary/40 to-background border-t border-primary/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Ready to become data-driven?
          </h2>
          <p className="text-xl text-slate-400">
            Join over 10,000 companies that trust PulseData for their business
            intelligence.
          </p>

          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3 pt-6">
            <Input
              type="email"
              placeholder="Enter your work email"
              className="h-12 bg-slate-950 border-slate-800 focus-visible:ring-cyan-500 shadow-sm"
            />
            <Button size="lg" className="h-12 px-8 shadow-md hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all font-semibold">
              Get Started
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400 pt-4">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span>14-day free trial</span>
            <span className="mx-2">•</span>
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span>No credit card required</span>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3, PieChart, Zap, CheckCircle2, Quote, PlayCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative flex items-center justify-center min-h-[75vh] px-6 py-24 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />
        </div>
        
        <div className="z-10 max-w-5xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Unlock the power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Your Data</span>
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            PulseData is the AI-powered Business Intelligence platform that transforms complex datasets into actionable insights in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all group">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-2 hover:bg-secondary/50 transition-colors">
              <PlayCircle className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Features/Highlights Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Intelligent features for modern teams</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to analyze, visualize, and share your business metrics seamlessly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-10 h-10 text-accent" />,
                title: "Advanced Analytics",
                description: "Deep dive into your metrics with AI-driven correlation analysis and predictive modeling.",
              },
              {
                icon: <Zap className="w-10 h-10 text-accent" />,
                title: "Real-time Processing",
                description: "Stream millions of data points with near-zero latency. Make decisions as events unfold.",
              },
              {
                icon: <PieChart className="w-10 h-10 text-accent" />,
                title: "Interactive Dashboards",
                description: "Create stunning, interactive reports with a drag-and-drop interface. No coding required.",
              }
            ].map((feature, i) => (
              <Card key={i} className="bg-background/50 backdrop-blur border-primary/10 hover:border-accent/40 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 p-3 bg-secondary rounded-lg inline-flex w-fit shadow-sm">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Statistics/Impact Section */}
      <section className="py-24 px-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
            {[
              { value: "99.9%", label: "Uptime SLA" },
              { value: "50M+", label: "Queries Processed/Day" },
              { value: "4.9/5", label: "Customer Satisfaction" },
              { value: "10x", label: "Faster Reporting" },
            ].map((stat, i) => (
              <div key={i} className="py-6 md:py-0 space-y-2 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-extrabold tracking-tight">{stat.value}</div>
                <div className="text-primary-foreground/80 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Testimonials/Social Proof */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto space-y-16">
          <h2 className="text-3xl md:text-5xl font-bold text-center tracking-tight">Trusted by industry leaders</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "PulseData completely transformed how our marketing team operates. We reduced reporting time by 80% and uncovered insights we didn't know existed.",
                author: "Sarah Jenkins",
                role: "VP of Marketing, TechFlow",
              },
              {
                quote: "The AI integrations are practically magic. It connects dots across our fragmented datasets that traditional BI tools missed completely.",
                author: "Marcus Chen",
                role: "Chief Data Officer, Nexus Corp",
              },
              {
                quote: "Implementation was flawless. Within two weeks, our entire executive team was using PulseData dashboards for their daily standups.",
                author: "Elena Rodriguez",
                role: "Operations Director, Synthia",
              }
            ].map((testimonial, i) => (
              <Card key={i} className="border-none shadow-lg bg-secondary/10 hover:bg-secondary/20 transition-colors duration-300">
                <CardContent className="pt-8 space-y-6">
                  <Quote className="w-10 h-10 text-accent/40" />
                  <p className="text-lg italic text-foreground/80 leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Newsletter/Final CTA */}
      <section className="py-32 px-6 bg-gradient-to-br from-secondary/40 to-background border-t border-primary/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to become data-driven?</h2>
          <p className="text-xl text-muted-foreground">Join over 10,000 companies that trust PulseData for their business intelligence.</p>
          
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3 pt-6">
            <Input 
              type="email" 
              placeholder="Enter your work email" 
              className="h-12 bg-background border-primary/20 focus-visible:ring-primary shadow-sm"
            />
            <Button size="lg" className="h-12 px-8 shadow-md hover:shadow-lg transition-all">
              Get Started
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
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

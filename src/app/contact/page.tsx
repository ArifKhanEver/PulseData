"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! Our team will reach out shortly.");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 p-6 lg:p-12 relative overflow-hidden flex items-center">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 relative z-10">
        <div className="space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-100">
              Get in Touch
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-md">
              Have questions about PulseData? Want to schedule a demo? Our team is ready to help you unlock the power of your data.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-medium">hello@pulsedata.com</span>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-medium">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-medium">123 Data Avenue, Tech City, CA</span>
            </div>
          </div>
        </div>

        <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-100">Send us a message</CardTitle>
            <CardDescription className="text-slate-400">Fill out the form below and we will get back to you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                <Input id="name" required placeholder="John Doe" className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 focus:ring-cyan-500/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                <Input id="email" type="email" required placeholder="john@company.com" className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 focus:ring-cyan-500/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-slate-300">Message</Label>
                <textarea 
                  id="message" 
                  required 
                  rows={4}
                  placeholder="How can we help you?" 
                  className="flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 bg-slate-950 border-slate-700 text-white placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500"
                ></textarea>
              </div>
              <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

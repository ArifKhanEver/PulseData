import { Card, CardContent } from "@/components/ui/card";
import { Activity, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 p-6 lg:p-12 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-100">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">PulseData</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We are on a mission to democratize data intelligence. PulseData provides powerful, AI-driven insights to help businesses make faster, smarter decisions without the complexity of traditional analytics platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-8">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto text-cyan-400">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200">Real-Time Insights</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Analyze data on the fly. Our edge-computed metrics ensure you are always looking at the freshest information.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto text-indigo-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200">Enterprise Security</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Bank-grade encryption and strict access controls keep your proprietary business data completely safe.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto text-purple-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200">Lightning Fast</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Built on Next.js Turbopack and globally distributed edge servers for a seamless, zero-lag experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

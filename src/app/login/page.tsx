"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint, Loader2, Zap, Mail, Lock } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const performLogin = async (loginEmail: string, loginPassword: string, isDemo = false) => {
    if (isDemo) {
      setIsDemoLoading(true);
    } else {
      setIsLoading(true);
    }

    try {
      const { data, error } = await authClient.signIn.email({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success("Welcome back to PulseData! 🚀");
      router.push("/explore");
      router.refresh();
    } catch (err: any) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setIsDemoLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await performLogin(email, password);
  };

  const handleDemoLogin = async () => {
    setEmail("demo@pulsedata.com");
    setPassword("demo1234");
    await performLogin("demo@pulsedata.com", "demo1234", true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[15%] w-[60%] h-[60%] rounded-full bg-cyan-500/[0.07] blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] -right-[15%] w-[50%] h-[50%] rounded-full bg-indigo-500/[0.05] blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/40 p-8 space-y-8 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/25 mb-5">
              <Fingerprint className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
            <p className="text-slate-400 text-sm">
              Enter your credentials to access PulseData
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-slate-300 text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 h-11 rounded-xl transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password" className="text-slate-300 text-sm font-medium">Password</Label>
                <Link
                  href="#"
                  className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 h-11 rounded-xl transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || isDemoLoading}
              className="w-full h-11 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-3 text-slate-500 tracking-wider">
                Or
              </span>
            </div>
          </div>

          {/* Demo Login Button */}
          <Button
            type="button"
            variant="outline"
            disabled={isLoading || isDemoLoading}
            onClick={handleDemoLogin}
            className="w-full h-11 border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-400 hover:bg-cyan-500/[0.15] hover:border-cyan-500/50 hover:text-cyan-300 rounded-xl transition-all duration-300 font-semibold"
          >
            {isDemoLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Quick Demo Login
              </>
            )}
          </Button>

          {/* Footer */}
          <div className="text-center space-y-4">
            <p className="text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Sign up for free
              </Link>
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              By continuing, you agree to our{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-slate-400 transition-colors">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-slate-400 transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

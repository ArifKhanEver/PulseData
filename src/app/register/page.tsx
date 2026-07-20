"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint, Loader2, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name: `${firstName} ${lastName}`.trim(),
      });

      if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
        return;
      }

      toast.success("Account created! Welcome to PulseData! 🎉");
      router.push("/explore");
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] -right-[15%] w-[55%] h-[55%] rounded-full bg-indigo-500/[0.06] blur-[120px]" />
        <div className="absolute bottom-[15%] -left-[15%] w-[50%] h-[50%] rounded-full bg-cyan-500/[0.07] blur-[120px] animate-pulse" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/40 p-8 space-y-8 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/25 mb-5">
              <Fingerprint className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Create an account</h1>
            <p className="text-slate-400 text-sm">
              Join PulseData to unlock the power of your data
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="register-firstName" className="text-slate-300 text-sm font-medium">First name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="register-firstName"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 h-11 rounded-xl transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-lastName" className="text-slate-300 text-sm font-medium">Last name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="register-lastName"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 h-11 rounded-xl transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-email" className="text-slate-300 text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="register-email"
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
              <Label htmlFor="register-password" className="text-slate-300 text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 h-11 rounded-xl transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-900 px-4 text-slate-500 font-medium tracking-wide">Or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-slate-950 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 h-12 shadow-md transition-all duration-300 gap-3 font-medium"
            onClick={async () => {
              try {
                await authClient.signIn.social({ provider: "google", callbackURL: "/explore" });
                toast.success("Logging in with Google...");
              } catch (error) {
                toast.error("Failed to login with Google");
              }
            }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path
                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                fill="#EA4335"
              />
              <path
                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                fill="#4285F4"
              />
              <path
                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                fill="#FBBC05"
              />
              <path
                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26537 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                fill="#34A853"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Footer */}
          <div className="text-center space-y-4">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Log in
              </Link>
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              By creating an account, you agree to our{" "}
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

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Compass, Fingerprint } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <Card className="w-full max-w-md shadow-2xl shadow-primary/5 border-slate-800 bg-slate-950/60 backdrop-blur-xl">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="w-12 h-12 bg-cyan-500 text-cyan-400-foreground rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Fingerprint className="w-6 h-6" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription className="text-slate-400 font-medium">
            Enter your credentials to access PulseData
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                className="transition-all focus-visible:ring-primary/50 bg-slate-950/50" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="#" 
                  className="text-sm font-medium text-cyan-400 hover:text-cyan-400/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                className="transition-all focus-visible:ring-primary/50 bg-slate-950/50" 
              />
            </div>
            <Button className="w-full shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
              Sign In
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-950/80 px-2 text-slate-400 backdrop-blur-sm">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full hover:bg-slate-800 transition-colors">
              <Compass className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="secondary" className="w-full hover:bg-slate-800/80 transition-colors shadow-sm">
              Demo Login
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center text-sm text-slate-400 pb-8">
          <p>
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-cyan-400 transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-cyan-400 transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

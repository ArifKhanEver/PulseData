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

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <Card className="w-full max-w-md shadow-2xl shadow-primary/5 border-primary/10 bg-background/60 backdrop-blur-xl">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Fingerprint className="w-6 h-6" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription className="text-muted-foreground font-medium">
            Join PulseData to unlock the power of your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="John" className="bg-background/50 focus-visible:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Doe" className="bg-background/50 focus-visible:ring-primary/50" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                className="bg-background/50 focus-visible:ring-primary/50" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                className="bg-background/50 focus-visible:ring-primary/50" 
              />
            </div>
            <Button className="w-full shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
              Create account
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background/80 px-2 text-muted-foreground backdrop-blur-sm">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full hover:bg-secondary/50 transition-colors">
              <Compass className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" className="w-full hover:bg-secondary/50 transition-colors">
              <Fingerprint className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center text-sm text-muted-foreground pb-8">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-primary transition-colors font-medium text-foreground">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

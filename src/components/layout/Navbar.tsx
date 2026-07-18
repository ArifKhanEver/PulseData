"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const [session, setSession] = useState<{user: {name: string, email: string}} | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data) setSession(data as any);
      } catch (err) {
        console.error(err);
      }
    };
    checkAuth();
  }, []);

  return (
    <nav className="border-b bg-background/80 backdrop-blur-md h-16 flex items-center px-6 sticky top-0 z-50 shadow-sm">
      <Link href="/" className="text-xl font-bold text-primary mr-8">PulseData</Link>
      
      <div className="hidden md:flex gap-4 mr-auto">
        <Link href="/explore" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Explore</Link>
        {session && (
          <>
            <Link href="/items/manage" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Manage Items</Link>
            <Link href="/items/add" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Add Item</Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-4 ml-auto">
        {session ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline">{session.user.name || session.user.email}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => authClient.signOut()}>
              <LogOut className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/register">
              <Button className="shadow-sm hover:shadow-md transition-shadow">Sign up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

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
    <nav className="border-b bg-slate-950/80 backdrop-blur-md border-slate-800 h-16 flex items-center px-6 sticky top-0 z-50 shadow-sm text-slate-100">
      <Link href="/" className="text-xl font-bold text-white mr-8">PulseData</Link>
      
      <div className="hidden md:flex gap-4 mr-auto">
        <Link href="/explore" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Explore</Link>
        {session && (
          <>
            <Link href="/items/manage" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Manage Items</Link>
            <Link href="/items/add" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Add Item</Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-4 ml-auto">
        {session ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-100">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline text-slate-200">{session.user.name || session.user.email}</span>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-slate-800" onClick={() => authClient.signOut()}>
              <LogOut className="w-4 h-4 text-red-400" />
            </Button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">Log in</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-sm transition-shadow">Sign up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, User } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<{user: {name: string, email: string}} | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await authClient.getSession();
      setSession(data ? (data as any) : null);
    } catch (err) {
      setSession(null);
    }
  }, []);

  // Re-check auth state on every route change (handles login/register redirects)
  useEffect(() => {
    checkAuth();
  }, [pathname, checkAuth]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut();
      setSession(null);
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (err) {
      toast.error("Failed to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

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
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline text-slate-200">{session.user.name || session.user.email}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-red-500/10 hover:text-red-400 transition-colors"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="w-4 h-4 text-red-400" />
            </Button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">Log in</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-sm transition-shadow font-semibold">Sign up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

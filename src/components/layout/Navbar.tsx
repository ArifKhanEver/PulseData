"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, User, Menu, X, Activity } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<{user: {name: string, email: string}} | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await authClient.getSession();
      setSession(data ? (data as { user: { name: string; email: string } }) : null);
    } catch (err) {
      setSession(null);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [pathname, checkAuth]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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

  const isActive = (path: string) => pathname === path;

  const navLinkClasses = (path: string) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? "text-cyan-400"
        : "text-slate-400 hover:text-cyan-400"
    }`;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow duration-300">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">Pulse</span>
                <span className="text-cyan-400">Data</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className={navLinkClasses("/")}>Home</Link>
              <Link href="/explore" className={navLinkClasses("/explore")}>Explore</Link>
              <Link href="/about" className={navLinkClasses("/about")}>About</Link>
              <Link href="/contact" className={navLinkClasses("/contact")}>Contact</Link>
              {session && (
                <>
                  <Link href="/items/manage" className={navLinkClasses("/items/manage")}>Manage Items</Link>
                  <Link href="/items/add" className={navLinkClasses("/items/add")}>Add Item</Link>
                </>
              )}
            </div>

            {/* Desktop Auth Actions */}
            <div className="hidden md:flex items-center gap-3">
              {session ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-medium text-slate-300 max-w-[140px] truncate">
                      {session.user.name || session.user.email}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 rounded-lg gap-1.5"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-xs font-medium">Logout</span>
                  </Button>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-200 font-medium"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-semibold shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 rounded-lg">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800/60 bg-slate-950/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-4 space-y-1">
              <Link href="/" className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive("/") ? "text-cyan-400 bg-cyan-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}>
                Home
              </Link>
              <Link href="/explore" className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive("/explore") ? "text-cyan-400 bg-cyan-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}>
                Explore
              </Link>
              <Link href="/about" className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive("/about") ? "text-cyan-400 bg-cyan-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}>
                About
              </Link>
              <Link href="/contact" className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive("/contact") ? "text-cyan-400 bg-cyan-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}>
                Contact
              </Link>
              {session && (
                <>
                  <Link href="/items/manage" className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive("/items/manage") ? "text-cyan-400 bg-cyan-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}>
                    Manage Items
                  </Link>
                  <Link href="/items/add" className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive("/items/add") ? "text-cyan-400 bg-cyan-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}>
                    Add Item
                  </Link>
                </>
              )}

              <div className="pt-3 mt-3 border-t border-slate-800/60">
                {session ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5 px-3 py-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{session.user.name || "User"}</p>
                        <p className="text-xs text-slate-500">{session.user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" className="block">
                      <Button variant="ghost" className="w-full justify-center text-slate-300 hover:text-white hover:bg-slate-800/60">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/register" className="block">
                      <Button className="w-full justify-center bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-semibold">
                        Sign up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = (session?.user as { role?: string })?.role === "admin";
  const isPaid = (session?.user as { role?: string })?.role === "paid";
  const isSignedIn = !!session?.user;

  return (
    <nav className="bg-navy border-b border-navy-light sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold rounded-sm flex items-center justify-center">
              <span className="text-navy font-bold text-sm">TP</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg tracking-tight">TreasuryPulse</span>
              <span className="text-gold font-bold text-lg tracking-tight"> India</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/news" className="text-gray-300 hover:text-gold transition-colors text-sm font-medium">
              Daily News
            </Link>
            <Link href="/insider" className="text-gray-300 hover:text-gold transition-colors text-sm font-medium">
              Insider
            </Link>
            <Link href="/jobs" className="text-gray-300 hover:text-gold transition-colors text-sm font-medium">
              Jobs
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-gold transition-colors text-sm font-medium">
              About
            </Link>
          </div>

          {/* CTA + Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <>
                {isAdmin && (
                  <Link href="/admin" className="text-gold text-sm font-medium hover:underline">
                    Admin Panel
                  </Link>
                )}
                {!isAdmin && isPaid && (
                  <span className="text-green-400 text-xs font-medium border border-green-500/30 px-2 py-1 rounded-full">
                    Premium
                  </span>
                )}
                <span className="text-gray-400 text-sm hidden lg:block truncate max-w-[120px]">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Mobile button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-navy-light py-4 space-y-3">
            <Link href="/news" className="block text-gray-300 hover:text-gold py-1 text-sm" onClick={() => setMobileOpen(false)}>Daily News</Link>
            <Link href="/insider" className="block text-gray-300 hover:text-gold py-1 text-sm" onClick={() => setMobileOpen(false)}>Insider</Link>
            <Link href="/jobs" className="block text-gray-300 hover:text-gold py-1 text-sm" onClick={() => setMobileOpen(false)}>Jobs</Link>
            <Link href="/about" className="block text-gray-300 hover:text-gold py-1 text-sm" onClick={() => setMobileOpen(false)}>About</Link>
            <div className="border-t border-navy-light pt-3 space-y-2">
              {isSignedIn ? (
                <>
                  {isAdmin && (
                    <Link href="/admin" className="block text-gold text-sm font-medium py-1" onClick={() => setMobileOpen(false)}>Admin Panel</Link>
                  )}
                  <button
                    onClick={() => { signOut({ callbackUrl: "/" }); setMobileOpen(false); }}
                    className="block text-gray-400 text-sm py-1 w-full text-left"
                  >
                    Sign Out ({session?.user?.name || session?.user?.email})
                  </button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className="block text-gray-300 text-sm py-1" onClick={() => setMobileOpen(false)}>Sign In</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

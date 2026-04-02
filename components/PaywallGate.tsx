"use client";

import Link from "next/link";

interface PaywallGateProps {
  reason?: "daily_limit" | "premium_only";
}

export default function PaywallGate({ reason = "premium_only" }: PaywallGateProps) {
  return (
    <div className="relative">
      {/* Blurred content preview */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white z-10 pointer-events-none" />

      {/* Paywall card */}
      <div className="relative z-20 mt-8 mx-auto max-w-lg">
        <div className="bg-white border-2 border-gold/30 rounded-2xl p-8 text-center shadow-lg">
          {/* Icon */}
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          {/* Heading */}
          <h3 className="text-navy font-bold text-xl mb-2">
            {reason === "daily_limit"
              ? "You've read your 3 free articles today"
              : "This is Insider-only content"}
          </h3>

          {/* Subtext */}
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            {reason === "daily_limit"
              ? "Free plan includes 3 full articles per day. Upgrade to read unlimited daily news, plus Pranav's exclusive insider insights."
              : "Pranav's original treasury analysis, frameworks, and insider intelligence are available exclusively for paid subscribers."}
          </p>

          {/* What you get */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Paid plan includes:
            </p>
            <ul className="space-y-2">
              {[
                "Unlimited daily news articles",
                "Pranav's Insider analysis & insights",
                "RBI/SEBI circular summaries",
                "Treasury job board (coming soon)",
                "Weekly curated roundup",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <Link
            href="/subscribe"
            className="block w-full bg-navy text-white py-3 px-6 rounded-xl font-semibold hover:bg-navy/90 transition-colors mb-3"
          >
            Get Insider Access — ₹50/month
          </Link>
          <p className="text-xs text-gray-400">
            Cancel anytime. Secure payment via Razorpay.
          </p>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export const metadata = {
  title: "Treasury Jobs India | TreasuryPulse India",
  description: "Treasury-only job board for finance professionals in India. Coming soon.",
};

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Phase 3</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Treasury Jobs Board</h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            A curated job board exclusively for treasury roles in India — no noise, just treasury.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        {/* Coming Soon Card */}
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 mb-10">
          <div className="w-20 h-20 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-navy/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 rounded-full px-4 py-1.5 mb-4">
            <div className="w-2 h-2 bg-amber-400 rounded-full" />
            <span className="text-amber-700 text-sm font-medium">Coming Soon — Q2 2025</span>
          </div>

          <h2 className="text-navy font-bold text-2xl mb-3">We&apos;re Building This</h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto mb-8">
            The TreasuryPulse Jobs Board will feature hand-curated treasury, forex, ALM, and financial markets
            roles from India&apos;s top banks, NBFCs, and corporates. No spam, no unrelated finance roles —
            just treasury.
          </p>

          {/* What to expect */}
          <div className="bg-gray-50 rounded-xl p-6 text-left mb-8">
            <h3 className="text-navy font-semibold text-sm mb-4">What to expect:</h3>
            <ul className="space-y-3">
              {[
                "Treasury Analyst / Manager / Head roles",
                "Forex / Derivatives desk positions",
                "ALM & Liquidity Management roles",
                "G-Sec & Debt Capital Markets",
                "Treasury Technology & Fintech roles",
                "Filtering by city, experience, company type",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Notify me */}
          <p className="text-gray-500 text-sm mb-4">Get notified when the jobs board launches:</p>
          <div className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            />
            <button className="bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy/80 transition-colors whitespace-nowrap">
              Notify Me
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-2">We&apos;ll only email you when the jobs board is live.</p>
        </div>

        {/* In the meantime */}
        <div>
          <p className="text-gray-500 text-sm mb-6">In the meantime, explore:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/news"
              className="bg-navy text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-navy/80 transition-colors"
            >
              Read Daily Treasury News
            </Link>
            <Link
              href="/insider"
              className="bg-gold text-navy px-6 py-3 rounded-xl text-sm font-semibold hover:bg-amber-400 transition-colors"
            >
              Explore Insider Intelligence
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

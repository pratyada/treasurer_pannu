import RazorpayButton from "@/components/RazorpayButton";
import Link from "next/link";

export const metadata = {
  title: "Subscribe | TreasuryPulse India",
  description: "Subscribe to TreasuryPulse India for ₹50/month. Get unlimited daily news + Pranav's insider analysis.",
};

const freeFeatures = [
  "3 daily news articles per day",
  "Article titles and excerpts",
  "Access to Jobs board (coming soon)",
  "Weekly newsletter (coming soon)",
];

const paidFeatures = [
  "Unlimited daily news articles",
  "Pranav's Insider analysis & insights",
  "RBI/SEBI circular deep-dives",
  "Market frameworks & mental models",
  "Treasury job board (coming soon)",
  "Weekly curated roundup",
  "Early access to new features",
  "Support a creator building for India's treasury community",
];

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, Honest Pricing
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            TreasuryPulse India is built for junior treasury professionals. At ₹50/month,
            it&apos;s less than a cup of coffee — but worth a career.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div id="free" className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-navy font-bold text-xl mb-1">Free Plan</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-navy">₹0</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Start here. No credit card needed.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/news"
              className="block w-full text-center bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm"
            >
              Start Reading Free →
            </Link>
          </div>

          {/* Paid Plan */}
          <div className="bg-navy rounded-2xl border-2 border-gold/30 p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-gold text-navy text-xs font-bold px-2.5 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-white font-bold text-xl mb-1">Insider Plan</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gold">₹50</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Full access to everything. Cancel anytime.
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {paidFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-200">
                  <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <RazorpayButton />

            <p className="text-gray-500 text-xs text-center mt-3">
              Secure payment via Razorpay · UPI, Cards, Net Banking
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-14">
          <h2 className="text-navy font-bold text-xl mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              {
                q: "What payment methods are accepted?",
                a: "We accept UPI, credit/debit cards, net banking, and wallets — all via Razorpay.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. Email us at hello@treasurypulse.in and we'll cancel your subscription immediately.",
              },
              {
                q: "What is the Insider section?",
                a: "Pranav's original analysis and frameworks — things you won't find in public news. Think of it as a private newsletter from a treasury veteran.",
              },
              {
                q: "Is this relevant for treasury professionals outside India?",
                a: "The content is specifically curated for India's treasury markets — RBI, SEBI, G-secs, and INR. It's most relevant for professionals working with Indian markets.",
              },
            ].map((faq) => (
              <details key={faq.q} className="bg-white border border-gray-200 rounded-xl p-5 group">
                <summary className="text-navy font-semibold text-sm cursor-pointer flex items-center justify-between">
                  {faq.q}
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-gray-400 text-xs">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Razorpay Secured
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            256-bit SSL Encryption
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Cancel Anytime
          </div>
        </div>
      </div>
    </div>
  );
}

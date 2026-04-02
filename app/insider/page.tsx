import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getInsiderArticles() {
  try {
    return await prisma.article.findMany({
      where: { isPublished: true, category: "insider" },
      orderBy: { publishedAt: "desc" },
      take: 20,
    });
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Insider Intelligence | TreasuryPulse India",
  description: "Pranav's original treasury insights, analysis, and frameworks. Exclusive to paid subscribers.",
};

export default async function InsiderPage() {
  const articles = await getInsiderArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-3 py-1 mb-4">
              <span className="text-gold text-xs font-semibold uppercase tracking-wide">★ Insider Section</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">Pranav&apos;s Insider Intelligence</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Original treasury analysis, market frameworks, and insider knowledge curated by Pranav.
              Not available anywhere else. Exclusively for paid subscribers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Paywall notice */}
        <div className="bg-gold/10 border border-gold/30 rounded-xl px-5 py-4 mb-8 flex items-start gap-3">
          <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <p className="text-amber-800 text-sm font-medium">Premium Content — Paid Subscribers Only</p>
            <p className="text-amber-700 text-xs mt-0.5">
              All Insider articles require a paid subscription.{" "}
              <Link href="/subscribe" className="font-semibold underline">Subscribe for ₹50/month</Link> to access all content.
            </p>
          </div>
        </div>

        {/* Article list */}
        {articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article, index) => {
              const tags = (() => { try { return JSON.parse(article.tags); } catch { return []; } })();
              return (
                <div key={article.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gold/50 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold bg-gold/10 text-amber-700 px-2 py-0.5 rounded-full">Insider #{index + 1}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(article.publishedAt || article.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </span>
                      </div>
                      <Link href={`/insider/${article.slug}`}>
                        <h2 className="text-navy font-semibold text-lg leading-snug mb-2 hover:text-gold transition-colors">
                          {article.title}
                        </h2>
                      </Link>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
                      <div className="flex flex-wrap gap-1">
                        {tags.slice(0, 4).map((tag: string) => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Link
                        href={`/insider/${article.slug}`}
                        className="bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-navy/80 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Read
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-gray-700 font-semibold mb-2">Insider content coming soon</h3>
            <p className="text-gray-400 text-sm">Pranav&apos;s first insider analysis will be published shortly.</p>
          </div>
        )}

        {/* Subscribe CTA */}
        <div className="mt-12 bg-navy rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-white font-bold text-2xl mb-3">Get Full Insider Access</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
            Unlock all of Pranav&apos;s original treasury analysis, market frameworks, RBI/SEBI deep-dives, and career
            guidance — for just ₹50/month. Cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/subscribe"
              className="bg-gold text-navy px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-amber-400 transition-colors"
            >
              Subscribe Now — ₹50/month
            </Link>
            <p className="text-gray-500 text-xs">Secure payment via Razorpay · Cancel anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
}

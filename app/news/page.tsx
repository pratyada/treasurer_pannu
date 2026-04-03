import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Treasury News",
  description:
    "Daily RBI/SEBI updates, G-sec yields, forex rates, call money rates and money market intelligence — curated every morning by Pranav Chudgar, CFA (McKinsey). Free to read.",
  openGraph: {
    title: "Daily Treasury News | TreasuryPulse India",
    description:
      "📰 Today's treasury market update — RBI, SEBI, G-sec, forex & money markets. Curated by Pranav Chudgar, CFA · McKinsey. Free access daily.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

async function getArticles() {
  try {
    return await prisma.article.findMany({
      where: { isPublished: true, category: "daily_news" },
      orderBy: { publishedAt: "desc" },
      take: 30,
    });
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const articles = await getArticles();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayArticles = articles.filter((a) => {
    const pub = new Date(a.publishedAt || a.createdAt);
    return pub >= today;
  });

  const olderArticles = articles.filter((a) => {
    const pub = new Date(a.publishedAt || a.createdAt);
    return pub < today;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy border-b border-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">Daily News</p>
              <h1 className="text-3xl font-bold text-white mb-2">Treasury Market Intelligence</h1>
              <p className="text-gray-400 text-sm">
                Curated daily by Pranav · Free users get 3 full articles/day · Paid subscribers get all
              </p>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-gray-400 text-xs">Today</p>
              <p className="text-white font-semibold text-sm">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Free plan notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-8 flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-amber-800 text-sm font-medium">Free Plan: 3 full articles per day</p>
            <p className="text-amber-700 text-xs mt-0.5">
              You can read the first 3 articles each day for free.{" "}
              <Link href="/subscribe" className="font-semibold underline">Subscribe for ₹50/month</Link> to unlock unlimited access + Insider insights.
            </p>
          </div>
        </div>

        {/* Today's articles */}
        {todayArticles.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-navy font-bold text-xl">Today&apos;s Articles</h2>
              <span className="bg-gold text-navy text-xs font-bold px-2 py-0.5 rounded-full">
                {todayArticles.length} new
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todayArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          </div>
        )}

        {/* Older articles */}
        {olderArticles.length > 0 && (
          <div>
            <h2 className="text-navy font-bold text-xl mb-6">Earlier This Week</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {olderArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          </div>
        )}

        {articles.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6M7 8h2" />
              </svg>
            </div>
            <h3 className="text-gray-700 font-semibold mb-2">No articles yet</h3>
            <p className="text-gray-400 text-sm">
              Articles will appear here once published. Run{" "}
              <code className="bg-gray-100 px-1 rounded">npx prisma db seed</code> to add sample data.
            </p>
          </div>
        )}

        {/* Subscribe CTA */}
        <div className="mt-12 bg-navy rounded-2xl p-8 text-center">
          <h3 className="text-white font-bold text-xl mb-2">Read Unlimited + Get Insider Access</h3>
          <p className="text-gray-400 text-sm mb-5">
            Subscribe for ₹50/month and never hit the daily limit again. Plus get Pranav&apos;s original insider analysis.
          </p>
          <Link
            href="/subscribe"
            className="bg-gold text-navy px-8 py-3 rounded-xl font-bold text-sm hover:bg-amber-400 transition-colors inline-block"
          >
            Subscribe Now — ₹50/month
          </Link>
        </div>
      </div>
    </div>
  );
}

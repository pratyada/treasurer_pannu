import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/ArticleCard";

async function getLatestArticles() {
  try {
    return await prisma.article.findMany({
      where: { isPublished: true, category: "daily_news" },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

async function getInsiderPreviews() {
  try {
    return await prisma.article.findMany({
      where: { isPublished: true, category: "insider" },
      orderBy: { publishedAt: "desc" },
      take: 2,
    });
  } catch {
    return [];
  }
}

const stats = [
  { label: "Daily Articles", value: "5+" },
  { label: "Subscribers", value: "500+" },
  { label: "Topics Covered", value: "12+" },
  { label: "Years Experience", value: "15+" },
];

const topics = [
  "RBI Monetary Policy",
  "G-Sec Markets",
  "Forex & Currency",
  "Liquidity Management",
  "MIBOR / Call Money",
  "CRR & SLR",
  "Commercial Paper",
  "Treasury Bills",
  "SEBI Circulars",
  "Trade Finance",
  "Derivatives & Hedging",
  "Treasury Technology",
];

export default async function HomePage() {
  const [latestNews, insiderPreviews] = await Promise.all([
    getLatestArticles(),
    getInsiderPreviews(),
  ]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 bg-gold rounded-full" />
              <span className="text-gold text-sm font-medium">Updated daily — Today&apos;s edition is live</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              India&apos;s Treasury Intelligence —{" "}
              <span className="text-gold">For the Next Generation</span>
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              Daily market insights, RBI/SEBI updates, and insider treasury knowledge.
              Curated by Pranav, India&apos;s Treasury Leader — so you never miss what moves markets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/news"
                className="bg-gold text-navy px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-amber-400 transition-colors text-center"
              >
                Read Today&apos;s News — Free
              </Link>
              <Link
                href="/subscribe"
                className="bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors text-center"
              >
                Get Insider Access — ₹50/month
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-gold font-bold text-xl">{stat.value}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Topics Banner */}
      <div className="bg-gold/10 border-y border-gold/20 py-3 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap">
          {[...topics, ...topics].map((topic, i) => (
            <span key={i} className="text-navy text-sm font-medium flex items-center gap-2 inline-block">
              <span className="text-gold">◆</span>
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Latest Daily News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-navy font-bold text-2xl sm:text-3xl">Today&apos;s Treasury News</h2>
            <p className="text-gray-500 text-sm mt-1">Free access · Updated daily by 8 AM IST</p>
          </div>
          <Link
            href="/news"
            className="hidden sm:flex items-center gap-1 text-gold font-medium text-sm hover:text-amber-600 transition-colors"
          >
            View all articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {latestNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-12 text-center">
            <p className="text-gray-400 text-sm">Articles loading... Run prisma seed to populate sample data.</p>
          </div>
        )}

        <div className="mt-8 sm:hidden text-center">
          <Link href="/news" className="text-gold font-medium text-sm">View all articles →</Link>
        </div>
      </section>

      {/* Insider Teaser */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-3 py-1 mb-3">
              <span className="text-gold text-xs font-semibold uppercase tracking-wide">★ Insider</span>
            </div>
            <h2 className="text-white font-bold text-2xl sm:text-3xl">Pranav&apos;s Insider Intelligence</h2>
            <p className="text-gray-400 text-sm mt-1">Original analysis, frameworks, and insider knowledge — for paid subscribers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {insiderPreviews.length > 0 ? insiderPreviews.map((article) => (
              <div key={article.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-gold/30 transition-colors">
                <span className="text-xs font-semibold bg-gold/20 text-gold px-2 py-0.5 rounded-full mb-3 inline-block">Insider</span>
                <h3 className="text-white font-semibold text-lg mb-2 leading-snug">{article.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                <Link href="/subscribe" className="inline-flex items-center gap-1 text-gold text-sm font-medium hover:text-amber-400 transition-colors">
                  Subscribe to read →
                </Link>
              </div>
            )) : [
              "How RBI Really Manages Liquidity: An Insider&apos;s Playbook",
              "G-Sec 101: What Every Junior Treasury Professional Must Know"
            ].map((title) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <span className="text-xs font-semibold bg-gold/20 text-gold px-2 py-0.5 rounded-full mb-3 inline-block">Insider</span>
                <h3 className="text-white font-semibold text-lg mb-4">{title}</h3>
                <Link href="/subscribe" className="inline-flex items-center gap-1 text-gold text-sm font-medium">Subscribe to read →</Link>
              </div>
            ))}
          </div>

          <div className="bg-gold/10 border border-gold/20 rounded-2xl p-8 text-center">
            <h3 className="text-white font-bold text-xl mb-2">Unlock Insider Access</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
              Get Pranav&apos;s original treasury frameworks, market analysis, and insights that you won&apos;t find anywhere else — for less than a cup of coffee.
            </p>
            <Link
              href="/subscribe"
              className="bg-gold text-navy px-8 py-3 rounded-xl font-bold text-sm hover:bg-amber-400 transition-colors inline-block"
            >
              Subscribe Now — ₹50/month
            </Link>
          </div>
        </div>
      </section>

      {/* About Pranav */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 bg-navy rounded-full flex items-center justify-center text-gold font-bold text-4xl">
              P
            </div>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <p className="text-gold text-sm font-semibold uppercase tracking-wide mb-2">Curated by</p>
            <h2 className="text-navy font-bold text-2xl mb-3">Pranav — Finance & Treasury Leader</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              With 15+ years in treasury across India&apos;s top financial institutions, Pranav distills complex market
              movements into actionable intelligence for the next generation of treasury professionals. Every article
              is personally reviewed and curated to be relevant, accurate, and educational.
            </p>
            <Link href="/about" className="inline-flex items-center gap-1 text-gold font-medium text-sm hover:text-amber-600">
              Learn more about Pranav →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

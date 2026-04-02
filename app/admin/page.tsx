import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getStats() {
  try {
    const [totalArticles, publishedToday, totalSubscribers, paidSubscribers, pendingDrafts] =
      await Promise.all([
        prisma.article.count(),
        prisma.article.count({
          where: {
            isPublished: true,
            publishedAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
          },
        }),
        prisma.subscriber.count(),
        prisma.subscriber.count({ where: { plan: "paid" } }),
        prisma.scrapedDraft.count({ where: { status: "pending" } }),
      ]);

    const revenue = paidSubscribers * 50;
    return { totalArticles, publishedToday, totalSubscribers, paidSubscribers, pendingDrafts, revenue };
  } catch {
    return { totalArticles: 0, publishedToday: 0, totalSubscribers: 0, paidSubscribers: 0, pendingDrafts: 0, revenue: 0 };
  }
}

async function getRecentArticles() {
  try {
    return await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, category: true, isPublished: true, createdAt: true, slug: true },
    });
  } catch {
    return [];
  }
}

async function getRecentSubscribers() {
  try {
    return await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch {
    return [];
  }
}

export default async function AdminDashboard() {
  const [stats, recentArticles, recentSubscribers] = await Promise.all([
    getStats(),
    getRecentArticles(),
    getRecentSubscribers(),
  ]);

  const statCards = [
    { label: "Total Subscribers", value: stats.totalSubscribers, sub: `${stats.paidSubscribers} paid`, color: "bg-blue-50 border-blue-100", text: "text-blue-700" },
    { label: "Monthly Revenue", value: `₹${stats.revenue}`, sub: "this month (est.)", color: "bg-green-50 border-green-100", text: "text-green-700" },
    { label: "Published Today", value: stats.publishedToday, sub: `of ${stats.totalArticles} total`, color: "bg-amber-50 border-amber-100", text: "text-amber-700" },
    { label: "Pending Drafts", value: stats.pendingDrafts, sub: "awaiting review", color: "bg-purple-50 border-purple-100", text: "text-purple-700" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy/80 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Article
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className={`rounded-xl border p-5 ${card.color}`}>
            <p className="text-gray-500 text-xs font-medium mb-1">{card.label}</p>
            <p className={`text-3xl font-bold ${card.text}`}>{card.value}</p>
            <p className="text-gray-400 text-xs mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-navy">Recent Articles</h2>
            <Link href="/admin/articles" className="text-gold text-xs hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentArticles.length > 0 ? recentArticles.map((article) => (
              <div key={article.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-medium truncate">{article.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${article.category === "insider" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>
                      {article.category}
                    </span>
                    <span className={`text-xs ${article.isPublished ? "text-green-600" : "text-gray-400"}`}>
                      {article.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {new Date(article.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
              </div>
            )) : (
              <p className="text-gray-400 text-sm text-center py-4">No articles yet</p>
            )}
          </div>
        </div>

        {/* Recent Subscribers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-navy">Recent Subscribers</h2>
            <Link href="/admin/subscribers" className="text-gold text-xs hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentSubscribers.length > 0 ? recentSubscribers.map((sub) => (
              <div key={sub.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-8 h-8 bg-navy/10 rounded-full flex items-center justify-center text-navy font-semibold text-xs">
                  {(sub.name || sub.email)[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-medium truncate">{sub.name || sub.email}</p>
                  <p className="text-xs text-gray-400 truncate">{sub.email}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${sub.plan === "paid" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {sub.plan}
                </span>
              </div>
            )) : (
              <p className="text-gray-400 text-sm text-center py-4">No subscribers yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-navy mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: "/admin/articles/new", label: "Write Article", icon: "✏️" },
            { href: "/admin/drafts", label: "Review Drafts", icon: "📋" },
            { href: "/admin/linkedin", label: "Generate LinkedIn Post", icon: "💼" },
            { href: "/admin/jobs", label: "Add Job Posting", icon: "💼" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium text-gray-700">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

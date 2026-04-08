import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PaywallGate from "@/components/PaywallGate";
import ShareButton from "@/components/ShareButton";
import Link from "next/link";

interface PageProps {
  params: { slug: string };
}

async function getArticle(slug: string) {
  try {
    return await prisma.article.findUnique({
      where: { slug, isPublished: true, category: "daily_news" },
      include: { author: { select: { name: true, email: true } } },
    });
  } catch {
    return null;
  }
}

async function getTodayFreeCount(currentSlug: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const todayArticles = await prisma.article.findMany({
      where: {
        isPublished: true,
        category: "daily_news",
        publishedAt: { gte: today },
      },
      orderBy: { publishedAt: "asc" },
      select: { slug: true },
      take: 3,
    });
    const freeSlugIndex = todayArticles.findIndex((a) => a.slug === currentSlug);
    return { isFreeArticle: freeSlugIndex !== -1, position: freeSlugIndex + 1 };
  } catch {
    return { isFreeArticle: true, position: 1 };
  }
}

function formatMarkdown(content: string): string {
  return content
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|o|l|b])/gm, '<p>')
    .replace(/(?<![>])\n/gm, '</p>\n');
}

export async function generateMetadata({ params }: PageProps) {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} | TreasuryPulse India`,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const { isFreeArticle } = await getTodayFreeCount(params.slug);
  const showPaywall = !isFreeArticle;

  const tags = (() => { try { return JSON.parse(article.tags); } catch { return []; } })();

  return (
    <div className="min-h-screen bg-white">
      {/* Back nav */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/news" className="inline-flex items-center gap-1 text-gray-500 hover:text-navy text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Daily News
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            Daily News
          </span>
          {article.source !== "manual" && (
            <span className="text-gray-400 text-xs uppercase tracking-wide">
              Source: {article.source}
            </span>
          )}
          <span className="text-gray-400 text-xs">
            {new Date(article.publishedAt || article.createdAt).toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-navy font-bold text-3xl sm:text-4xl leading-tight mb-4">{article.title}</h1>

        {/* Excerpt */}
        <p className="text-gray-600 text-lg leading-relaxed mb-6 border-l-4 border-gold pl-4 bg-amber-50 py-3 pr-4 rounded-r-lg">
          {article.excerpt}
        </p>

        {/* Tags + Share */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string) => (
                <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <ShareButton
            url={`${process.env.NEXT_PUBLIC_APP_URL || "https://treasurypulse.in"}/news/${article.slug}`}
            title={article.title}
          />
        </div>

        {/* Content or Paywall */}
        {showPaywall ? (
          <div className="relative">
            <div className="article-body max-h-40 overflow-hidden">
              <div dangerouslySetInnerHTML={{ __html: formatMarkdown(article.body.slice(0, 500)) }} />
            </div>
            <PaywallGate reason="daily_limit" />
          </div>
        ) : (
          <div className="article-body" dangerouslySetInnerHTML={{ __html: formatMarkdown(article.body) }} />
        )}

        {/* Author */}
        {!showPaywall && (
          <div className="mt-12 border-t border-gray-100 pt-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-gold font-bold">
                P
              </div>
              <div>
                <p className="font-semibold text-navy">Pranav</p>
                <p className="text-gray-500 text-sm">Finance & Treasury Leader · Curator, TreasuryPulse India</p>
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

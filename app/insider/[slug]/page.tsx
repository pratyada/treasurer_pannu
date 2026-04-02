import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PaywallGate from "@/components/PaywallGate";
import Link from "next/link";

interface PageProps {
  params: { slug: string };
}

async function getArticle(slug: string) {
  try {
    return await prisma.article.findUnique({
      where: { slug, isPublished: true, category: "insider" },
    });
  } catch {
    return null;
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
    title: `${article.title} | Insider — TreasuryPulse India`,
    description: article.excerpt,
  };
}

// In production, check session/cookie for paid status
// For now we always show the paywall for insider content
const IS_PAID_USER = false;

export default async function InsiderArticlePage({ params }: PageProps) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const tags = (() => { try { return JSON.parse(article.tags); } catch { return []; } })();

  return (
    <div className="min-h-screen bg-white">
      {/* Back nav */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/insider" className="inline-flex items-center gap-1 text-gray-500 hover:text-navy text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Insider
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Premium badge */}
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-3 py-1 mb-4">
          <svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-gold text-xs font-semibold">Insider Intelligence</span>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
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

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag: string) => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Content — show preview + paywall for all (server-side; in prod check session) */}
        {IS_PAID_USER ? (
          <div className="article-body" dangerouslySetInnerHTML={{ __html: formatMarkdown(article.body) }} />
        ) : (
          <div className="relative">
            <div className="article-body max-h-48 overflow-hidden">
              <div dangerouslySetInnerHTML={{ __html: formatMarkdown(article.body.slice(0, 600)) }} />
            </div>
            <PaywallGate reason="premium_only" />
          </div>
        )}
      </article>
    </div>
  );
}

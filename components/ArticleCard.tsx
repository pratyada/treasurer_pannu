import Link from "next/link";

interface ArticleCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  source: string;
  tags: string;
  isPremium: boolean;
  publishedAt: Date | null;
  createdAt: Date;
}

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function parseTags(tagsStr: string): string[] {
  try {
    return JSON.parse(tagsStr);
  } catch {
    return [];
  }
}

export default function ArticleCard({
  title,
  slug,
  excerpt,
  category,
  source,
  tags,
  isPremium,
  publishedAt,
  createdAt,
}: ArticleCardProps) {
  const href = category === "insider" ? `/insider/${slug}` : `/news/${slug}`;
  const tagList = parseTags(tags);

  return (
    <article className="bg-white rounded-xl border border-gray-200 hover:border-gold/50 hover:shadow-md transition-all duration-200 group">
      <div className="p-6">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                category === "insider"
                  ? "bg-gold/10 text-amber-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {category === "insider" ? "Insider" : "Daily News"}
            </span>
            {source !== "manual" && (
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                {source}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isPremium && (
              <span className="text-xs font-medium text-gold flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Premium
              </span>
            )}
            <span className="text-xs text-gray-400">
              {formatDate(publishedAt || createdAt)}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link href={href}>
          <h2 className="text-gray-900 font-semibold text-lg leading-snug mb-2 group-hover:text-navy transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
          {excerpt}
        </p>

        {/* Tags + Read more */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {tagList.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
          <Link
            href={href}
            className="text-sm font-medium text-gold hover:text-amber-600 transition-colors flex items-center gap-1"
          >
            Read more
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

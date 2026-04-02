"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ArticleEditorProps {
  initialData?: {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    body?: string;
    category?: string;
    source?: string;
    tags?: string;
    isPremium?: boolean;
    isPublished?: boolean;
    authorNotes?: string;
    bookChapter?: string;
  };
  mode: "create" | "edit";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ArticleEditor({ initialData = {}, mode }: ArticleEditorProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    title: initialData.title || "",
    slug: initialData.slug || "",
    excerpt: initialData.excerpt || "",
    body: initialData.body || "",
    category: initialData.category || "daily_news",
    source: initialData.source || "manual",
    tags: initialData.tags ? JSON.parse(initialData.tags).join(", ") : "",
    isPremium: initialData.isPremium ?? false,
    isPublished: initialData.isPublished ?? false,
    authorNotes: initialData.authorNotes || "",
    bookChapter: initialData.bookChapter || "",
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: mode === "create" ? slugify(title) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent, publish = false) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      tags: JSON.stringify(
        form.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      ),
      isPublished: publish || form.isPublished,
    };

    try {
      const url =
        mode === "create"
          ? "/api/admin/articles"
          : `/api/admin/articles/${initialData.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save article");
      }

      setSuccess(publish ? "Article published!" : "Article saved as draft!");
      if (mode === "create") {
        setTimeout(() => router.push("/admin/articles"), 1000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Article Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={handleTitleChange}
              required
              placeholder="RBI Keeps Repo Rate Unchanged at 6.5%..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              placeholder="rbi-keeps-repo-rate-unchanged"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt / Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
              required
              rows={3}
              placeholder="A brief summary shown on listing pages and to free users..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Body (Markdown) <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.body}
              onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
              required
              rows={20}
              placeholder="Write your article in Markdown format...

## Key Points
- Point 1
- Point 2

## Analysis
..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-y"
            />
            <p className="text-xs text-gray-400 mt-1">Supports Markdown: **bold**, *italic*, ## headings, - lists</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Private Author Notes (not published)
            </label>
            <textarea
              value={form.authorNotes}
              onChange={(e) => setForm((p) => ({ ...p, authorNotes: e.target.value }))}
              rows={3}
              placeholder="Notes for your book, future reference..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none"
            />
          </div>
        </div>

        {/* Sidebar Options */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4 space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm">Article Settings</h3>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                <option value="daily_news">Daily News</option>
                <option value="insider">Insider</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Source</label>
              <select
                value={form.source}
                onChange={(e) => setForm((p) => ({ ...p, source: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                <option value="manual">Manual</option>
                <option value="rbi">RBI</option>
                <option value="sebi">SEBI</option>
                <option value="rss">RSS Feed</option>
                <option value="twitter">Twitter/X</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
                placeholder="RBI, repo rate, liquidity"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Book Chapter (optional)
              </label>
              <input
                type="text"
                value={form.bookChapter}
                onChange={(e) => setForm((p) => ({ ...p, bookChapter: e.target.value }))}
                placeholder="Chapter 3: Monetary Policy"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isPremium}
                  onChange={(e) => setForm((p) => ({ ...p, isPremium: e.target.checked }))}
                  className="rounded border-gray-300 text-gold focus:ring-gold"
                />
                <span className="text-sm text-gray-700">Premium (paid subscribers only)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => setForm((p) => ({ ...p, isPublished: e.target.checked }))}
                  className="rounded border-gray-300 text-gold focus:ring-gold"
                />
                <span className="text-sm text-gray-700">Published</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
              disabled={saving}
              className="w-full bg-navy text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-navy/90 disabled:opacity-60 transition-colors"
            >
              {saving ? "Saving..." : "Publish Now"}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-gray-200 disabled:opacity-60 transition-colors"
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

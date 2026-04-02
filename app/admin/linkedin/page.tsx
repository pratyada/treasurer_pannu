"use client";

import { useState, useEffect } from "react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string | null;
  createdAt: string;
}

export default function LinkedInPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/admin/articles?published=true")
      .then((r) => r.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleGenerate = async () => {
    if (!selectedId) return;
    setGenerating(true);
    setGeneratedPost("");

    try {
      const res = await fetch("/api/admin/linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId: selectedId }),
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedPost(data.post);
      } else {
        alert(data.error || "Failed to generate post");
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedArticle = articles.find((a) => a.id === selectedId);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">LinkedIn Post Generator</h1>
        <p className="text-gray-500 text-sm mt-1">
          Select a published article to generate a LinkedIn post draft
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Article selector */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-navy mb-4">1. Select Article</h2>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-6 h-6 border-2 border-navy border-t-transparent rounded-full mx-auto" />
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {articles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => setSelectedId(article.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedId === article.id
                        ? "border-gold bg-gold/5"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${selectedId === article.id ? "bg-gold" : "bg-gray-300"}`} />
                      <div>
                        <p className="text-sm font-medium text-gray-800 line-clamp-2">{article.title}</p>
                        <span className={`text-xs mt-1 px-1.5 py-0.5 rounded inline-block ${
                          article.category === "insider" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"
                        }`}>
                          {article.category === "insider" ? "Insider" : "Daily News"}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {selectedArticle && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 font-medium mb-1">Selected:</p>
                <p className="text-sm text-gray-700 font-medium">{selectedArticle.title}</p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{selectedArticle.excerpt}</p>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!selectedId || generating}
              className="mt-4 w-full bg-navy text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-navy/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  Generate LinkedIn Post
                </>
              )}
            </button>
          </div>

          {/* Template preview */}
          <div className="mt-4 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-navy text-sm mb-3">Post Template</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 font-mono space-y-2">
              <p>[Hook line about the treasury topic]</p>
              <p className="mt-2">[3 bullet point key insights]</p>
              <p>• Insight 1</p>
              <p>• Insight 2</p>
              <p>• Insight 3</p>
              <p className="mt-2">[CTA: Full analysis on TreasuryPulse India — link in bio]</p>
              <p className="mt-2 text-blue-600">#TreasuryIndia #RBI #FinanceIndia #TreasuryManagement #MoneyMarkets</p>
            </div>
          </div>
        </div>

        {/* Right: Generated post */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-navy">2. Generated Post</h2>
              {generatedPost && (
                <button
                  onClick={handleCopy}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                    copied
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {copied ? "Copied!" : "Copy to clipboard"}
                </button>
              )}
            </div>

            {generatedPost ? (
              <div>
                <textarea
                  value={generatedPost}
                  onChange={(e) => setGeneratedPost(e.target.value)}
                  rows={18}
                  className="w-full border border-gray-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-gold/50 resize-y"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Edit the post above before copying. Character count: {generatedPost.length}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex-1 bg-navy text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors"
                  >
                    {copied ? "Copied!" : "Copy Post"}
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    Regenerate
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">
                  {selectedId ? "Click Generate to create your LinkedIn post" : "Select an article first"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

interface ScrapedDraft {
  id: string;
  title: string;
  summary: string;
  sourceUrl: string | null;
  sourceName: string;
  rawContent: string;
  status: string;
  createdAt: string;
}

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<ScrapedDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/drafts")
      .then((r) => r.json())
      .then((data) => {
        setDrafts(data.drafts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setProcessing(id);
    try {
      const res = await fetch(`/api/admin/drafts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action === "approve" ? "approved" : "rejected" }),
      });
      if (res.ok) {
        setDrafts((prev) =>
          prev.map((d) =>
            d.id === id ? { ...d, status: action === "approve" ? "approved" : "rejected" } : d
          )
        );
      }
    } finally {
      setProcessing(null);
    }
  };

  const sourceColors: Record<string, string> = {
    rbi: "bg-blue-50 text-blue-700",
    sebi: "bg-purple-50 text-purple-700",
    et: "bg-orange-50 text-orange-700",
    mint: "bg-green-50 text-green-700",
    twitter: "bg-sky-50 text-sky-700",
  };

  const pendingDrafts = drafts.filter((d) => d.status === "pending");
  const processedDrafts = drafts.filter((d) => d.status !== "pending");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Scraped Drafts</h1>
        <p className="text-gray-500 text-sm mt-1">
          AI-summarized articles from RBI, SEBI, and news feeds awaiting your review
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-700">{pendingDrafts.length}</p>
          <p className="text-xs text-amber-600 mt-0.5">Pending Review</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{drafts.filter((d) => d.status === "approved").length}</p>
          <p className="text-xs text-green-600 mt-0.5">Approved</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{drafts.filter((d) => d.status === "rejected").length}</p>
          <p className="text-xs text-red-600 mt-0.5">Rejected</p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-navy border-t-transparent rounded-full mx-auto" />
        </div>
      ) : drafts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">No scraped drafts yet</p>
          <p className="text-gray-400 text-xs">Run the Python scrapers to populate this queue.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingDrafts.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Pending Review ({pendingDrafts.length})</h2>
              {pendingDrafts.map((draft) => (
                <div key={draft.id} className="bg-white border border-gray-200 rounded-xl p-5 mb-3 hover:border-gold/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${sourceColors[draft.sourceName] || "bg-gray-100 text-gray-600"}`}>
                          {draft.sourceName.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(draft.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </span>
                      </div>
                      <h3 className="text-gray-900 font-semibold text-sm mb-2">{draft.title}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{draft.summary}</p>
                      {draft.sourceUrl && (
                        <a
                          href={draft.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold text-xs mt-2 inline-block hover:underline"
                        >
                          View source →
                        </a>
                      )}

                      {expanded === draft.id && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 max-h-40 overflow-y-auto">
                          <p className="font-medium mb-1">Raw Content:</p>
                          <p className="whitespace-pre-wrap">{draft.rawContent}</p>
                        </div>
                      )}

                      <button
                        onClick={() => setExpanded(expanded === draft.id ? null : draft.id)}
                        className="text-gray-400 hover:text-gray-600 text-xs mt-2 transition-colors"
                      >
                        {expanded === draft.id ? "Hide raw content" : "Show raw content"}
                      </button>
                    </div>

                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleAction(draft.id, "approve")}
                        disabled={processing === draft.id}
                        className="bg-green-50 text-green-700 hover:bg-green-100 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(draft.id, "reject")}
                        disabled={processing === draft.id}
                        className="bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {processedDrafts.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Processed ({processedDrafts.length})</h2>
              {processedDrafts.map((draft) => (
                <div key={draft.id} className={`border rounded-xl p-4 mb-2 opacity-70 ${draft.status === "approved" ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{draft.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{draft.sourceName.toUpperCase()}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${draft.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {draft.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

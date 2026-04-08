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

interface JobPosting {
  id: string;
  company: string;
  title: string;
  location: string;
  salaryRange: string | null;
  description: string;
  isActive: boolean;
}

type Tab = "articles" | "jobs";

function generateJobPost(job: JobPosting, appUrl: string): string {
  const salary = job.salaryRange ? `\n💰 ${job.salaryRange}` : "";
  const desc = job.description.slice(0, 250).trim() + (job.description.length > 250 ? "..." : "");
  return `🚀 Treasury Opportunity: ${job.title} at ${job.company}

📍 ${job.location}${salary}

${desc}

Apply now 👇
${appUrl}/jobs/${job.id}

#TreasuryJobs #TreasuryIndia #FinanceJobs #TreasuryManagement #Banking`;
}

export default function LinkedInPage() {
  const [tab, setTab] = useState<Tab>("articles");

  // Articles state
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState("");
  const [copied, setCopied] = useState(false);

  // Jobs state
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [jobPost, setJobPost] = useState("");
  const [jobCopied, setJobCopied] = useState(false);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://treasurypulse.in";

  useEffect(() => {
    fetch("/api/admin/articles?published=true")
      .then((r) => r.json())
      .then((data) => { setArticles(data.articles || []); setArticlesLoading(false); })
      .catch(() => setArticlesLoading(false));

    fetch("/api/admin/jobs")
      .then((r) => r.json())
      .then((data) => { setJobs((data.jobs || []).filter((j: JobPosting) => j.isActive)); setJobsLoading(false); })
      .catch(() => setJobsLoading(false));
  }, []);

  const handleGenerateArticle = async () => {
    if (!selectedArticleId) return;
    setGenerating(true);
    setGeneratedPost("");
    try {
      const res = await fetch("/api/admin/linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId: selectedArticleId }),
      });
      const data = await res.json();
      if (res.ok) setGeneratedPost(data.post);
      else alert(data.error || "Failed to generate post");
    } finally {
      setGenerating(false);
    }
  };

  const handleSelectJob = (job: JobPosting) => {
    setSelectedJobId(job.id);
    setJobPost(generateJobPost(job, appUrl));
    setJobCopied(false);
  };

  const copy = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const selectedArticle = articles.find((a) => a.id === selectedArticleId);
  const selectedJob = jobs.find((j) => j.id === selectedJobId);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">LinkedIn Post Generator</h1>
        <p className="text-gray-500 text-sm mt-1">Generate LinkedIn posts for articles and job openings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
        {(["articles", "jobs"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              tab === t ? "bg-white text-navy shadow-sm" : "text-gray-500 hover:text-navy"
            }`}
          >
            {t === "articles" ? "Articles" : "Job Openings"}
          </button>
        ))}
      </div>

      {/* ─── ARTICLES TAB ─── */}
      {tab === "articles" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-navy mb-4">1. Select Article</h2>
              {articlesLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-navy border-t-transparent rounded-full mx-auto" />
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {articles.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => { setSelectedArticleId(article.id); setGeneratedPost(""); }}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedArticleId === article.id ? "border-gold bg-gold/5" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${selectedArticleId === article.id ? "bg-gold" : "bg-gray-300"}`} />
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
                onClick={handleGenerateArticle}
                disabled={!selectedArticleId || generating}
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
                ) : "Generate LinkedIn Post"}
              </button>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-navy">2. Generated Post</h2>
                {generatedPost && (
                  <button
                    onClick={() => copy(generatedPost, setCopied)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                      copied ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {copied ? "Copied!" : "Copy"}
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
                  <p className="text-xs text-gray-400 mt-2">{generatedPost.length} characters</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => copy(generatedPost, setCopied)}
                      className="flex-1 bg-navy text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors"
                    >
                      {copied ? "Copied!" : "Copy Post"}
                    </button>
                    <button
                      onClick={handleGenerateArticle}
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
                    {selectedArticleId ? "Click Generate to create your post" : "Select an article first"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── JOBS TAB ─── */}
      {tab === "jobs" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-navy mb-4">1. Select Job Opening</h2>
              {jobsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-navy border-t-transparent rounded-full mx-auto" />
                </div>
              ) : jobs.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">No active job postings.</p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {jobs.map((job) => (
                    <button
                      key={job.id}
                      onClick={() => handleSelectJob(job)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedJobId === job.id ? "border-gold bg-gold/5" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${selectedJobId === job.id ? "bg-gold" : "bg-gray-300"}`} />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{job.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{job.company} · {job.location}</p>
                          {job.salaryRange && <p className="text-xs text-gray-400">{job.salaryRange}</p>}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {selectedJob && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 font-medium mb-1">Selected:</p>
                  <p className="text-sm text-gray-700 font-medium">{selectedJob.title} at {selectedJob.company}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-navy">2. LinkedIn Post</h2>
                {jobPost && (
                  <button
                    onClick={() => copy(jobPost, setJobCopied)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                      jobCopied ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {jobCopied ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>
              {jobPost ? (
                <div>
                  <textarea
                    value={jobPost}
                    onChange={(e) => setJobPost(e.target.value)}
                    rows={18}
                    className="w-full border border-gray-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-gold/50 resize-y"
                  />
                  <p className="text-xs text-gray-400 mt-2">{jobPost.length} characters — edit before posting</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => copy(jobPost, setJobCopied)}
                      className="flex-1 bg-[#0077B5] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#005885] transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      {jobCopied ? "Copied!" : "Copy & Post to LinkedIn"}
                    </button>
                    <a
                      href="https://www.linkedin.com/feed/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                    >
                      Open LinkedIn →
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">Select a job opening to generate the post</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

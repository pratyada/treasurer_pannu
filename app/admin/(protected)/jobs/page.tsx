"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface JobPosting {
  id: string;
  company: string;
  title: string;
  location: string;
  salaryRange: string | null;
  applyUrl: string | null;
  description: string;
  isFeatured: boolean;
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
  _count: { applications: number };
}

const emptyForm = {
  company: "",
  title: "",
  location: "",
  salaryRange: "",
  applyUrl: "",
  description: "",
  isFeatured: false,
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/jobs")
      .then((r) => r.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, expiresAt: new Date(form.expiresAt).toISOString() }),
      });
      const data = await res.json();
      if (res.ok) {
        setJobs((prev) => [{ ...data.job, _count: { applications: 0 } }, ...prev]);
        setForm(emptyForm);
        setShowForm(false);
      } else {
        setError(data.error || "Failed to create job");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    const res = await fetch(`/api/admin/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !current }),
    });
    if (res.ok) {
      setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, isActive: !current } : j)));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job posting and all its applications? This cannot be undone.")) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
    if (res.ok) {
      setJobs((prev) => prev.filter((j) => j.id !== id));
    }
    setDeletingId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Job Postings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage treasury job listings and applications</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/jobs"
            target="_blank"
            className="text-sm text-gray-500 hover:text-navy transition-colors flex items-center gap-1"
          >
            View public board
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy/80 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Job
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-navy mb-4">New Job Posting</h2>
          {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded mb-4">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Company Name *</label>
              <input required value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Job Title *</label>
              <input required value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Location *</label>
              <input required value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                placeholder="Mumbai, Hybrid"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Salary Range</label>
              <input value={form.salaryRange} onChange={(e) => setForm((p) => ({ ...p, salaryRange: e.target.value }))}
                placeholder="₹12–18 LPA"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">External Apply URL <span className="font-normal text-gray-400">(optional)</span></label>
              <input value={form.applyUrl} onChange={(e) => setForm((p) => ({ ...p, applyUrl: e.target.value }))}
                placeholder="https://... (leave blank to use site form)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Expires On *</label>
              <input type="date" required value={form.expiresAt} onChange={(e) => setForm((p) => ({ ...p, expiresAt: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Job Description *</label>
              <textarea required value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                rows={4} placeholder="Role responsibilities, requirements, what you're looking for..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm((p) => ({ ...p, isFeatured: e.target.checked }))}
                  className="rounded border-gray-300" />
                <span className="text-sm text-gray-700">Feature this job (shown first on the board)</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button type="submit" disabled={saving}
              className="bg-navy text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-navy/80 disabled:opacity-50 transition-colors">
              {saving ? "Saving..." : "Add Job Posting"}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="px-5 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Jobs list */}
      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-navy border-t-transparent rounded-full mx-auto" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">No job postings yet. Add the first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job.id} className={`bg-white border rounded-xl p-5 transition-colors ${job.isActive ? "border-gray-200" : "border-gray-100 opacity-60"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {job.isFeatured && (
                      <span className="bg-gold/10 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">Featured</span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${job.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {job.isActive ? "Active" : "Inactive"}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      {job._count?.applications ?? 0} application{(job._count?.applications ?? 0) !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <h3 className="font-semibold text-navy">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company} · {job.location}</p>
                  {job.salaryRange && <p className="text-xs text-gray-400 mt-0.5">{job.salaryRange}</p>}
                  <p className="text-xs text-gray-400 mt-1">
                    Expires: {new Date(job.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/jobs/${job.id}/applications`}
                    className="text-xs bg-navy text-white hover:bg-navy/80 px-3 py-1.5 rounded-lg transition-colors text-center"
                  >
                    Applications ({job._count?.applications ?? 0})
                  </Link>
                  <button
                    onClick={() => handleToggleActive(job.id, job.isActive)}
                    className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {job.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <Link
                    href={`/jobs/${job.id}`}
                    target="_blank"
                    className="text-xs text-gold hover:underline text-center"
                  >
                    View →
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id)}
                    disabled={deletingId === job.id}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                  >
                    {deletingId === job.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

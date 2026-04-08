"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedinUrl: string | null;
  currentRole: string | null;
  currentCompany: string | null;
  totalExperience: string;
  noticePeriod: string | null;
  coverLetter: string;
  cvUrl: string;
  cvFileName: string;
  status: string;
  adminNotes: string | null;
  createdAt: string;
  job: { title: string; company: string };
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  reviewed: "bg-amber-50 text-amber-700 border-amber-200",
  shortlisted: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
};

const STATUS_OPTIONS = ["new", "reviewed", "shortlisted", "rejected"];

export default function ApplicationsPage() {
  const { id } = useParams<{ id: string }>();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [filterStatus, setFilterStatus] = useState("all");
  const jobTitle = applications[0]?.job.title || "";
  const jobCompany = applications[0]?.job.company || "";

  useEffect(() => {
    fetch(`/api/admin/jobs/${id}/applications`)
      .then((r) => r.json())
      .then((data) => {
        setApplications(data.applications || []);
        const notes: Record<string, string> = {};
        (data.applications || []).forEach((a: Application) => {
          notes[a.id] = a.adminNotes || "";
        });
        setNotesMap(notes);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleStatusUpdate = async (applicationId: string, status: string) => {
    setUpdatingId(applicationId);
    const res = await fetch(`/api/admin/jobs/${id}/applications`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId, status, adminNotes: notesMap[applicationId] || "" }),
    });
    if (res.ok) {
      setApplications((prev) =>
        prev.map((a) => (a.id === applicationId ? { ...a, status, adminNotes: notesMap[applicationId] || null } : a))
      );
    }
    setUpdatingId(null);
  };

  const filtered = filterStatus === "all" ? applications : applications.filter((a) => a.status === filterStatus);

  const counts = STATUS_OPTIONS.reduce(
    (acc, s) => ({ ...acc, [s]: applications.filter((a) => a.status === s).length }),
    {} as Record<string, number>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <Link href="/admin/jobs" className="text-gray-400 hover:text-navy transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy">Applications</h1>
          {jobTitle && (
            <p className="text-gray-500 text-sm mt-0.5">
              {jobTitle} · {jobCompany}
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      {!loading && applications.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 mb-6">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                filterStatus === s ? STATUS_COLORS[s] + " border" : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <p className="text-2xl font-bold text-navy">{counts[s]}</p>
              <p className="text-xs text-gray-500 capitalize mt-0.5">{s}</p>
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-navy border-t-transparent rounded-full mx-auto" />
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <p className="text-gray-400 text-sm">No applications yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-8">No applications with status &quot;{filterStatus}&quot;.</p>
          )}
          {filtered.map((app) => (
            <div key={app.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {/* Summary row */}
              <button
                className="w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(expanded === app.id ? null : app.id)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-navy font-bold text-sm">
                        {app.firstName[0]}{app.lastName[0]}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-navy truncate">
                        {app.firstName} {app.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {app.currentRole ? `${app.currentRole}${app.currentCompany ? ` · ${app.currentCompany}` : ""}` : app.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-gray-400 hidden sm:block">
                      {app.totalExperience}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border capitalize ${STATUS_COLORS[app.status]}`}>
                      {app.status}
                    </span>
                    <span className="text-xs text-gray-400 hidden md:block">
                      {new Date(app.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${expanded === app.id ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Expanded detail */}
              {expanded === app.id && (
                <div className="border-t border-gray-100 px-5 py-5 bg-gray-50/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                    {/* Contact */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Contact</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-500">Email:</span> <a href={`mailto:${app.email}`} className="text-navy hover:underline">{app.email}</a></p>
                        <p><span className="text-gray-500">Phone:</span> <a href={`tel:${app.phone}`} className="text-navy">{app.phone}</a></p>
                        {app.linkedinUrl && (
                          <p>
                            <span className="text-gray-500">LinkedIn:</span>{" "}
                            <a href={app.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate inline-block max-w-xs">
                              View Profile
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Professional */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Professional</h4>
                      <div className="space-y-2 text-sm">
                        {app.currentRole && <p><span className="text-gray-500">Role:</span> {app.currentRole}</p>}
                        {app.currentCompany && <p><span className="text-gray-500">Company:</span> {app.currentCompany}</p>}
                        <p><span className="text-gray-500">Experience:</span> {app.totalExperience}</p>
                        {app.noticePeriod && <p><span className="text-gray-500">Notice:</span> {app.noticePeriod}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className="mb-5">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Cover Letter</h4>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                      {app.coverLetter}
                    </div>
                  </div>

                  {/* CV + Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">CV / Resume</h4>
                      <a
                        href={app.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy/80 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {app.cvFileName}
                      </a>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Update Status</h4>
                      <div className="flex flex-wrap gap-2">
                        {STATUS_OPTIONS.map((s) => (
                          <button
                            key={s}
                            disabled={app.status === s || updatingId === app.id}
                            onClick={() => handleStatusUpdate(app.id, s)}
                            className={`text-xs px-3 py-1.5 rounded-lg border capitalize transition-colors disabled:opacity-40 ${
                              app.status === s
                                ? STATUS_COLORS[s] + " font-semibold"
                                : "bg-white border-gray-200 text-gray-600 hover:border-navy hover:text-navy"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Admin Notes */}
                  <div className="mt-4">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Admin Notes</h4>
                    <div className="flex gap-2">
                      <textarea
                        rows={2}
                        value={notesMap[app.id] || ""}
                        onChange={(e) => setNotesMap((p) => ({ ...p, [app.id]: e.target.value }))}
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none"
                        placeholder="Internal notes (not visible to applicant)..."
                      />
                      <button
                        onClick={() => handleStatusUpdate(app.id, app.status)}
                        disabled={updatingId === app.id}
                        className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-sm transition-colors self-start disabled:opacity-50"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

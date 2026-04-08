"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface JobPosting {
  id: string;
  company: string;
  title: string;
  location: string;
  salaryRange: string | null;
  description: string;
  isFeatured: boolean;
  expiresAt: string;
  createdAt: string;
}

const EXPERIENCE_OPTIONS = [
  "0–1 year",
  "1–3 years",
  "3–5 years",
  "5–8 years",
  "8–12 years",
  "12+ years",
];

const NOTICE_OPTIONS = [
  "Immediate / Serving notice",
  "15 days",
  "1 month",
  "2 months",
  "3 months",
  "More than 3 months",
];

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    currentRole: "",
    currentCompany: "",
    totalExperience: "",
    noticePeriod: "",
    coverLetter: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/jobs`)
      .then((r) => r.json())
      .then((data) => {
        const found = (data.jobs || []).find((j: JobPosting) => j.id === id);
        if (found) setJob(found);
        else setNotFound(true);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCvError("");
    if (!file) return setCvFile(null);
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      setCvError("Please upload a PDF or Word document (.pdf, .doc, .docx)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setCvError("File must be under 5 MB");
      return;
    }
    setCvFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) { setCvError("Please upload your CV"); return; }
    setSubmitting(true);
    setSubmitError("");

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("cv", cvFile);

    try {
      const res = await fetch(`/api/jobs/${id}/apply`, { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitError(data.error || "Submission failed. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-navy border-t-transparent rounded-full" />
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-navy font-bold text-2xl mb-2">Job Not Found</h1>
        <p className="text-gray-500 text-sm mb-6">This position may have been filled or expired.</p>
        <Link href="/jobs" className="bg-navy text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-navy/80 transition-colors">
          View All Jobs
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="bg-white border border-green-200 rounded-2xl p-12">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-navy font-bold text-2xl mb-3">Application Submitted!</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-2">
              Thank you for applying for <strong>{job.title}</strong> at <strong>{job.company}</strong>.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              We&apos;ll review your application and be in touch if there&apos;s a fit.
            </p>
            <Link href="/jobs" className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-navy/80 transition-colors">
              Browse More Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back nav */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/jobs" className="inline-flex items-center gap-1 text-gray-500 hover:text-navy text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Jobs
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Job Details */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {job.isFeatured && (
                  <span className="bg-gold/10 text-amber-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
                    Featured
                  </span>
                )}
                <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Treasury
                </span>
              </div>

              <h1 className="text-navy font-bold text-xl mb-1">{job.title}</h1>
              <p className="text-gray-600 font-medium mb-4">{job.company}</p>

              <div className="space-y-2.5 text-sm">
                <div className="flex items-start gap-2 text-gray-600">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </div>
                {job.salaryRange && (
                  <div className="flex items-start gap-2 text-gray-600">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {job.salaryRange}
                  </div>
                )}
                <div className="flex items-start gap-2 text-gray-600">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Closes {new Date(job.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Posted {new Date(job.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100">
                <h3 className="text-navy font-semibold text-sm mb-2">About the Role</h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>

              <button
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="mt-5 w-full bg-gold text-navy px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-400 transition-colors"
              >
                Apply for this Role
              </button>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  (typeof window !== "undefined" ? window.location.href : `https://treasurypulse.in/jobs/${id}`)
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-[#0077B5] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#005885] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share this Job
              </a>
            </div>
          </div>

          {/* Right: Application Form */}
          <div className="lg:col-span-2" ref={formRef}>
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <h2 className="text-navy font-bold text-xl mb-1">Submit Your Application</h2>
              <p className="text-gray-500 text-sm mb-6">
                Fill in your details below. Fields marked <span className="text-red-500">*</span> are required.
              </p>

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5 text-red-700 text-sm">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={form.firstName}
                        onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="Rahul"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={form.lastName}
                        onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="Sharma"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="rahul@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        value={form.linkedinUrl}
                        onChange={(e) => setForm((p) => ({ ...p, linkedinUrl: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="https://linkedin.com/in/rahulsharma"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Info */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Professional Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Job Title</label>
                      <input
                        type="text"
                        value={form.currentRole}
                        onChange={(e) => setForm((p) => ({ ...p, currentRole: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="Treasury Manager"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Company</label>
                      <input
                        type="text"
                        value={form.currentCompany}
                        onChange={(e) => setForm((p) => ({ ...p, currentCompany: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="HDFC Bank"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total Experience <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={form.totalExperience}
                        onChange={(e) => setForm((p) => ({ ...p, totalExperience: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white"
                      >
                        <option value="">Select experience</option>
                        {EXPERIENCE_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period</label>
                      <select
                        value={form.noticePeriod}
                        onChange={(e) => setForm((p) => ({ ...p, noticePeriod: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white"
                      >
                        <option value="">Select notice period</option>
                        {NOTICE_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Application Materials</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter <span className="text-red-500">*</span>
                    </label>
                    <p className="text-gray-400 text-xs mb-2">
                      Tell us why you&apos;re a great fit for this role and what makes your treasury experience relevant.
                    </p>
                    <textarea
                      required
                      value={form.coverLetter}
                      onChange={(e) => setForm((p) => ({ ...p, coverLetter: e.target.value }))}
                      rows={6}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none"
                      placeholder="Dear Hiring Manager,&#10;&#10;I am excited to apply for the position of..."
                    />
                  </div>
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CV / Resume <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-400 text-xs mb-3">PDF or Word document, max 5 MB.</p>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                      cvFile
                        ? "border-green-300 bg-green-50"
                        : cvError
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gold hover:bg-amber-50/30"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {cvFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-left">
                          <p className="text-sm font-medium text-green-700">{cvFile.name}</p>
                          <p className="text-xs text-green-500">{(cvFile.size / 1024).toFixed(0)} KB — click to change</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-500">Click to upload your CV</p>
                        <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX up to 5 MB</p>
                      </div>
                    )}
                  </div>
                  {cvError && <p className="text-red-500 text-xs mt-1">{cvError}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-navy text-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-navy/80 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-gray-400 text-xs text-center">
                  Your information is handled confidentially and used solely for this application.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

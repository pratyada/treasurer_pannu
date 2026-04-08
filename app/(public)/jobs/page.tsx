import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Treasury Jobs India | TreasuryPulse India",
  description: "Hand-curated treasury, forex, ALM, and financial markets jobs in India. Apply directly.",
};

export const revalidate = 60;

async function getJobs() {
  const now = new Date();
  try {
    return await prisma.jobPosting.findMany({
      where: { isActive: true, expiresAt: { gte: now } },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        company: true,
        title: true,
        location: true,
        salaryRange: true,
        description: true,
        isFeatured: true,
        expiresAt: true,
        createdAt: true,
        _count: { select: { applications: true } },
      },
    });
  } catch {
    return [];
  }
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Treasury Careers</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Treasury Jobs Board</h1>
          <p className="text-gray-400 text-sm max-w-xl">
            Hand-curated treasury, forex, ALM, and financial markets roles from India&apos;s top banks, NBFCs,
            and corporates. No noise — just treasury.
          </p>
          {jobs.length > 0 && (
            <p className="text-amber-300 text-sm mt-4 font-medium">{jobs.length} open {jobs.length === 1 ? "position" : "positions"}</p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {jobs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
            <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-navy/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-navy font-bold text-xl mb-2">No openings right now</h2>
            <p className="text-gray-500 text-sm">New treasury roles are posted regularly. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block bg-white border border-gray-200 rounded-xl p-6 hover:border-gold hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {job.isFeatured && (
                        <span className="bg-gold/10 text-amber-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
                          Featured
                        </span>
                      )}
                      <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Treasury
                      </span>
                    </div>

                    <h2 className="text-navy font-bold text-lg group-hover:text-gold transition-colors truncate">
                      {job.title}
                    </h2>
                    <p className="text-gray-600 text-sm mt-0.5">{job.company}</p>

                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      {job.salaryRange && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {job.salaryRange}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Closes {new Date(job.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm mt-3 line-clamp-2">{job.description}</p>
                  </div>

                  <div className="flex-shrink-0 hidden sm:flex items-center gap-2 text-navy group-hover:text-gold transition-colors">
                    <span className="text-sm font-semibold">Apply</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom section */}
        <div className="mt-12 border-t border-gray-200 pt-10 text-center">
          <p className="text-gray-500 text-sm mb-6">
            Are you a hiring manager? Post a treasury role and reach India&apos;s best treasury talent.
          </p>
          <a
            href="mailto:hello@treasurypulse.in?subject=Post a Treasury Job"
            className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-navy/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Post a Job
          </a>
        </div>
      </div>
    </div>
  );
}

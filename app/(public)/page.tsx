import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/ArticleCard";

async function getLatestArticles() {
  try {
    return await prisma.article.findMany({
      where: { isPublished: true, category: "daily_news" },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

async function getInsiderPreviews() {
  try {
    return await prisma.article.findMany({
      where: { isPublished: true, category: "insider" },
      orderBy: { publishedAt: "desc" },
      take: 2,
    });
  } catch {
    return [];
  }
}

const career = [
  {
    role: "Director — Global Treasury",
    company: "McKinsey & Company",
    period: "2024 — Present",
    location: "Delhi, India",
    highlights: [
      "Leading global treasury strategy and transformation for one of the world's top consulting firms",
      "Advising Fortune 500 clients across India, Southeast Asia, Africa, and Europe",
    ],
  },
  {
    role: "Lead — Group Treasury",
    company: "Motherson Group",
    period: "2022 — 2024",
    location: "India",
    highlights: [
      "Raised ~€1.7 billion in financing via credit facilities and bonds",
      "Managed group-wide FX and interest rate risk across global operations",
      "Cultivated relationships with 20+ global banks and 6 credit rating agencies",
      "Implemented strategies for liquidity optimisation and yield enhancement",
    ],
  },
  {
    role: "Director — Financial Services Risk Management & Treasury Trainer",
    company: "EY (Ernst & Young)",
    period: "2015 — 2022",
    location: "India",
    highlights: [
      "Advised corporates on treasury transformation, cost optimisation, and performance improvement",
      "Led FX hedging, cash & liquidity management, and digital payments projects",
      "Developed and delivered treasury training programs — trained 1,500+ finance professionals",
      "Led end-to-end treasury training sales and curriculum development",
    ],
  },
  {
    role: "Group Treasury",
    company: "Bharti Airtel",
    period: "2011 — 2015",
    location: "India & Africa",
    highlights: [
      "Managed multi-currency FX exposure of ~$4 billion across 20 countries",
      "Set up regional treasury desks across Africa",
      "Handled Airtel's complex multi-currency hedging programs",
    ],
  },
  {
    role: "FX & Derivatives Sales",
    company: "ICICI Bank",
    period: "2008 — 2010",
    location: "India",
    highlights: [
      "Advised corporate clients on FX risk management strategies",
      "Managed treasury for marquee clients including Airtel and Adani Group",
    ],
  },
  {
    role: "Group Treasury",
    company: "Adani Group",
    period: "2005 — 2008",
    location: "India",
    highlights: [
      "Early career treasury role at one of India's largest conglomerates",
      "Gained foundational expertise in commodity trading and corporate finance",
    ],
  },
];

const expertise = [
  { icon: "💱", label: "FX Hedging & Derivatives" },
  { icon: "💧", label: "Cash & Liquidity Management" },
  { icon: "📊", label: "Fixed Income & Bonds" },
  { icon: "🏦", label: "Banking Relationships" },
  { icon: "⚠️", label: "Enterprise Risk Management" },
  { icon: "🌍", label: "Multi-country Treasury" },
  { icon: "🔄", label: "Treasury Transformation" },
  { icon: "💸", label: "Capital Markets" },
  { icon: "📈", label: "Interest Rate Risk" },
  { icon: "🤝", label: "Trade Finance" },
  { icon: "⚙️", label: "Treasury Technology" },
  { icon: "🎓", label: "Finance Education" },
];

const stats = [
  { value: "20+", label: "Years in Treasury" },
  { value: "€1.7B", label: "Financing Raised" },
  { value: "$4B", label: "FX Exposure Managed" },
  { value: "1,500+", label: "Professionals Trained" },
  { value: "20", label: "Countries" },
  { value: "CFA", label: "Charterholder" },
];

const education = [
  { degree: "CFA", institution: "CFA Institute", year: "Global Designation" },
  { degree: "MS Finance", institution: "ICFAI", year: "2003 – 2005" },
  { degree: "LLB", institution: "Gujarat University", year: "2003 – 2005" },
  { degree: "B.Com (Accountancy)", institution: "Gujarat University", year: "2000 – 2003" },
];

export default async function HomePage() {
  const [latestNews, insiderPreviews] = await Promise.all([
    getLatestArticles(),
    getInsiderPreviews(),
  ]);

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-40 h-40 bg-gold/20 border-4 border-gold/40 rounded-full flex items-center justify-center">
                <span className="text-gold font-bold text-6xl">P</span>
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-4">
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span className="text-gold text-sm font-medium">Daily Treasury Intelligence — Updated by 8 AM IST</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Pranav Chudgar,{" "}
                <span className="text-gold">CFA</span>
              </h1>

              <p className="text-xl text-gold font-medium mb-2">
                Director — Global Treasury, McKinsey & Company
              </p>
              <p className="text-gray-400 text-base mb-6">
                Delhi, India &nbsp;·&nbsp; 20+ years in Treasury &nbsp;·&nbsp; India · Southeast Asia · Africa · Europe
              </p>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
                One of India&apos;s most experienced treasury leaders — sharing daily market intelligence,
                RBI/SEBI insights, and insider frameworks to help the next generation of treasury professionals
                think, act, and grow faster.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/news"
                  className="bg-gold text-navy px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-amber-400 transition-colors text-center"
                >
                  Read Today&apos;s News — Free
                </Link>
                <Link
                  href="/subscribe"
                  className="bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors text-center"
                >
                  Get Insider Access — ₹50/month
                </Link>
                <a
                  href="https://www.linkedin.com/in/pranavchudgar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0077B5]/20 text-[#0EA5E9] border border-[#0077B5]/30 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-[#0077B5]/30 transition-colors text-center"
                >
                  Follow on LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-3 sm:grid-cols-6 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-gold font-bold text-2xl">{s.value}</div>
                <div className="text-gray-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT THIS INITIATIVE ── */}
      <section className="bg-gold/5 border-y border-gold/20 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-gold text-xs font-bold uppercase tracking-widest">The Initiative</span>
            <h2 className="text-navy font-bold text-3xl mt-3 mb-5">
              India&apos;s First Treasury Intelligence Platform — For Junior Professionals
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              After 20 years at the front lines of Indian and global treasury — from ICICI Bank to Airtel, Adani,
              Motherson, EY, and McKinsey — Pranav is building the platform he wished had existed when he was
              starting out.
            </p>
            <p className="text-gray-600 leading-relaxed">
              TreasuryPulse India distills complex RBI circulars, market movements, and treasury frameworks
              into sharp, daily intelligence — so junior finance professionals can learn faster, think sharper,
              and grow their careers with the same edge that took Pranav two decades to build.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Daily News",
                desc: "RBI, SEBI, forex, G-sec, call money — every morning by 8 AM. No noise, just what matters for treasury.",
                href: "/news",
                cta: "Read today →",
                free: true,
              },
              {
                title: "Insider Section",
                desc: "Pranav's original frameworks, market analysis, career playbooks — the intelligence that doesn't exist in textbooks.",
                href: "/insider",
                cta: "Subscribe to read →",
                free: false,
              },
              {
                title: "Treasury Jobs",
                desc: "India's only job board exclusively for treasury roles — curated for professionals who know their niche.",
                href: "/jobs",
                cta: "Coming soon →",
                free: true,
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-200 p-7 hover:border-gold/40 hover:shadow-md transition-all">
                {item.free ? null : (
                  <span className="text-xs font-semibold bg-gold/10 text-amber-700 px-2 py-0.5 rounded-full mb-3 inline-block">★ Premium</span>
                )}
                <h3 className="text-navy font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                <Link href={item.href} className="text-gold font-semibold text-sm hover:text-amber-600 transition-colors">
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAREER TIMELINE ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-gold text-xs font-bold uppercase tracking-widest">20+ Years of Experience</span>
          <h2 className="text-navy font-bold text-3xl mt-3">Career Journey</h2>
          <p className="text-gray-500 text-sm mt-2">From ICICI Bank to McKinsey — across India, Africa, Europe, and Southeast Asia</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gold/20 hidden sm:block" />

          <div className="space-y-8">
            {career.map((item, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-white shadow top-6 z-10" />

                {/* Card */}
                <div className="md:w-[calc(50%-2rem)] bg-white border border-gray-200 rounded-2xl p-6 hover:border-gold/40 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-gold text-xs font-semibold uppercase tracking-wide">{item.period}</p>
                      <h3 className="text-navy font-bold text-lg leading-snug mt-0.5">{item.role}</h3>
                      <p className="text-gray-600 font-medium text-sm">{item.company} · {item.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {item.highlights.map((h, j) => (
                      <li key={j} className="text-gray-500 text-sm flex gap-2">
                        <span className="text-gold mt-0.5 flex-shrink-0">◆</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ── */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold text-xs font-bold uppercase tracking-widest">Core Expertise</span>
            <h2 className="text-white font-bold text-3xl mt-3">What Pranav Knows Inside Out</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {expertise.map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex items-center gap-3 hover:border-gold/30 transition-colors">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-gray-300 text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-navy font-bold text-2xl sm:text-3xl">Today&apos;s Treasury News</h2>
            <p className="text-gray-500 text-sm mt-1">Curated by Pranav · Free access · Updated by 8 AM IST</p>
          </div>
          <Link href="/news" className="hidden sm:flex items-center gap-1 text-gold font-medium text-sm hover:text-amber-600 transition-colors">
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {latestNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-12 text-center">
            <p className="text-gray-400 text-sm">Today&apos;s articles are being curated. Check back at 8 AM IST.</p>
          </div>
        )}
        <div className="mt-6 sm:hidden text-center">
          <Link href="/news" className="text-gold font-medium text-sm">View all articles →</Link>
        </div>
      </section>

      {/* ── INSIDER TEASER ── */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-3 py-1 mb-3">
              <span className="text-gold text-xs font-semibold uppercase tracking-wide">★ Insider</span>
            </div>
            <h2 className="text-white font-bold text-2xl sm:text-3xl">Pranav&apos;s Insider Intelligence</h2>
            <p className="text-gray-400 text-sm mt-1">Original analysis and frameworks from 20 years at the front lines of Indian treasury</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {insiderPreviews.length > 0 ? insiderPreviews.map((article) => (
              <div key={article.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-gold/30 transition-colors">
                <span className="text-xs font-semibold bg-gold/20 text-gold px-2 py-0.5 rounded-full mb-3 inline-block">Insider</span>
                <h3 className="text-white font-semibold text-lg mb-2 leading-snug">{article.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                <Link href="/subscribe" className="inline-flex items-center gap-1 text-gold text-sm font-medium hover:text-amber-400 transition-colors">
                  Subscribe to read →
                </Link>
              </div>
            )) : [
              "How RBI Really Manages Liquidity: An Insider's Playbook",
              "The Treasury Career Roadmap: From Ops to Front Office in 3 Years",
            ].map((title) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <span className="text-xs font-semibold bg-gold/20 text-gold px-2 py-0.5 rounded-full mb-3 inline-block">Insider</span>
                <h3 className="text-white font-semibold text-lg mb-4">{title}</h3>
                <Link href="/subscribe" className="inline-flex items-center gap-1 text-gold text-sm font-medium">Subscribe to read →</Link>
              </div>
            ))}
          </div>

          <div className="bg-gold/10 border border-gold/20 rounded-2xl p-8 text-center">
            <h3 className="text-white font-bold text-xl mb-2">Unlock 20 Years of Treasury Intelligence</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
              From €1.7B financing deals to managing $4B in FX exposure across 20 countries —
              Pranav shares what actually works in Indian treasury. For less than a cup of coffee a week.
            </p>
            <Link href="/subscribe" className="bg-gold text-navy px-8 py-3 rounded-xl font-bold text-sm hover:bg-amber-400 transition-colors inline-block">
              Subscribe Now — ₹50/month
            </Link>
          </div>
        </div>
      </section>

      {/* ── EDUCATION & CREDENTIALS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold text-xs font-bold uppercase tracking-widest">Credentials</span>
            <h2 className="text-navy font-bold text-3xl mt-3 mb-6">Education & Qualifications</h2>
            <div className="space-y-4">
              {education.map((item) => (
                <div key={item.degree} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-gold text-xs font-bold">🎓</span>
                  </div>
                  <div>
                    <p className="text-navy font-semibold text-sm">{item.degree}</p>
                    <p className="text-gray-500 text-xs">{item.institution} · {item.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy rounded-2xl p-8">
            <span className="text-gold text-xs font-bold uppercase tracking-widest">The Mission</span>
            <h3 className="text-white font-bold text-2xl mt-3 mb-4">Why TreasuryPulse India?</h3>
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                &ldquo;In 20 years across ICICI, Adani, Airtel, Motherson, EY, and now McKinsey — I&apos;ve seen
                how much knowledge gap exists for junior treasury professionals in India. The information is
                scattered, the insights are locked inside institutions, and there is no daily go-to resource
                for someone building their treasury career.&rdquo;
              </p>
              <p>
                &ldquo;TreasuryPulse India is my attempt to change that — one article at a time. This platform
                is also my research database for a book I am writing on Indian treasury management. Every
                insight published here is real, tested, and drawn from the front lines of the market.&rdquo;
              </p>
              <p className="text-gold font-medium">— Pranav Chudgar, CFA</p>
            </div>
            <div className="mt-6 flex gap-3">
              <Link href="/about" className="text-sm text-white font-medium border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                Read Full Story
              </Link>
              <a
                href="https://www.linkedin.com/in/pranavchudgar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-navy font-bold bg-gold px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

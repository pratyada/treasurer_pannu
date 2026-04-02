import Link from "next/link";

export const metadata = {
  title: "About Pranav | TreasuryPulse India",
  description: "Learn about Pranav, the Finance & Treasury leader behind TreasuryPulse India.",
};

const expertise = [
  "RBI Monetary Policy & Open Market Operations",
  "Government Securities (G-Sec) Markets",
  "Forex & Currency Risk Management",
  "Liquidity Management & ALM",
  "Money Markets (Call Money, CBLO, Repo)",
  "Commercial Paper & Certificate of Deposits",
  "Interest Rate Derivatives",
  "Trade Finance & LC Operations",
  "Treasury Technology & Automation",
  "SEBI Regulations & Compliance",
];

const milestones = [
  { year: "2009", label: "Started treasury career at a leading PSU Bank" },
  { year: "2013", label: "Moved to private sector — led G-Sec desk" },
  { year: "2017", label: "Joined a top-tier corporate treasury team" },
  { year: "2020", label: "Head of Treasury — Fortune 500 India subsidiary" },
  { year: "2024", label: "Founded TreasuryPulse India to give back to the community" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-navy">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-36 h-36 bg-gold/20 border-4 border-gold/30 rounded-full flex items-center justify-center text-gold font-bold text-5xl">
                P
              </div>
            </div>
            <div>
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">About</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Pranav</h1>
              <p className="text-gold/80 font-medium mb-3">Finance & Treasury Leader · Founder, TreasuryPulse India</p>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                15+ years navigating India&apos;s complex treasury landscape — from PSU banks to corporate treasuries.
                Now sharing everything he knows to help the next generation of treasury professionals skip the learning curve.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Story */}
            <div>
              <h2 className="text-navy font-bold text-2xl mb-4">The Story Behind TreasuryPulse India</h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  When I started my treasury career in 2009, there was almost no resource specifically designed for junior treasury professionals in India.
                  Financial news existed, but nothing that explained the <em>why</em> behind RBI decisions, or how G-Sec movements actually affect corporate treasury operations.
                </p>
                <p>
                  I spent years learning through experience, mentors, and expensive mistakes. I read everything — from RBI Annual Reports to SEBI circulars — and slowly built a mental model of how India&apos;s money markets work.
                </p>
                <p>
                  In 2024, I decided to package 15 years of knowledge into something accessible. TreasuryPulse India is my answer to the question I&apos;d have asked in 2009:
                  <strong className="text-navy"> &quot;Where can I learn treasury the way a practitioner thinks about it?&quot;</strong>
                </p>
                <p>
                  Every article I write or curate is filtered through one question: <em>&quot;Would this have helped me when I was starting out?&quot;</em> If yes, it goes in. If it&apos;s just noise, it doesn&apos;t.
                </p>
              </div>
            </div>

            {/* What you'll get */}
            <div>
              <h2 className="text-navy font-bold text-2xl mb-4">What TreasuryPulse India Gives You</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "📰", title: "Daily Curated News", desc: "Not just headlines — context for why each development matters to treasury." },
                  { icon: "🔍", title: "RBI/SEBI Decoded", desc: "Policy circulars translated into plain language with treasury implications." },
                  { icon: "🧠", title: "Mental Models", desc: "Frameworks I use to think about markets, liquidity, and interest rates." },
                  { icon: "💼", title: "Career Intelligence", desc: "How to grow fast in a treasury career — what I wish someone had told me." },
                ].map((item) => (
                  <div key={item.title} className="bg-gray-50 rounded-xl p-5">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h3 className="text-navy font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-navy font-bold text-2xl mb-6">Career Timeline</h2>
              <div className="space-y-4">
                {milestones.map((m) => (
                  <div key={m.year} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-navy rounded-xl flex items-center justify-center text-gold font-bold text-xs">
                      {m.year}
                    </div>
                    <div className="flex-1 flex items-center">
                      <p className="text-gray-700 text-sm">{m.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Expertise */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-navy font-bold text-sm mb-4 uppercase tracking-wide">Areas of Expertise</h3>
              <ul className="space-y-2">
                {expertise.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="text-gold mt-0.5">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="bg-navy rounded-2xl p-6">
              <h3 className="text-white font-bold text-sm mb-3">Connect with Pranav</h3>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                Questions, article suggestions, or just want to connect with a fellow treasury professional?
              </p>
              <a
                href="mailto:pranav@treasurypulse.in"
                className="block text-center bg-gold text-navy text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-amber-400 transition-colors"
              >
                Email Pranav
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-white/10 text-white text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-white/20 transition-colors mt-2"
              >
                LinkedIn Profile
              </a>
            </div>

            {/* Subscribe CTA */}
            <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6 text-center">
              <p className="text-navy font-bold text-sm mb-2">Get Pranav&apos;s Daily Insights</p>
              <p className="text-gray-600 text-xs mb-4">
                Subscribe to read everything Pranav writes — for ₹50/month.
              </p>
              <Link
                href="/subscribe"
                className="block bg-navy text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-navy/80 transition-colors"
              >
                Subscribe — ₹50/month
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

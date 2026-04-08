import Link from "next/link";

export const metadata = {
  title: "About Pranav Chudgar, CFA | TreasuryPulse India",
  description:
    "Pranav Chudgar, CFA — Director of Global Treasury at McKinsey & Company. 20+ years in treasury across India, Africa, Southeast Asia and Europe. Founder of TreasuryPulse India.",
};

const timeline = [
  { year: "2024–Now", role: "Director — Global Treasury", company: "McKinsey & Company", detail: "Leading global treasury strategy and transformation across markets." },
  { year: "2022–2024", role: "Lead — Group Treasury", company: "Motherson Group", detail: "Raised ~€1.7B in financing. Managed FX & interest rate risk globally." },
  { year: "2015–2022", role: "Director, FSRM & Treasury Trainer", company: "EY (Ernst & Young)", detail: "Advised corporates on treasury transformation. Trained 1,500+ professionals." },
  { year: "2011–2015", role: "Group Treasury", company: "Bharti Airtel", detail: "Managed ~$4B FX exposure across 20 countries. Set up Africa treasury desks." },
  { year: "2008–2010", role: "FX & Derivatives Sales", company: "ICICI Bank", detail: "FX risk management advisory for large Indian corporates." },
  { year: "2005–2008", role: "Group Treasury", company: "Adani Group", detail: "Foundational treasury and commodity trading experience." },
];

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-28 h-28 bg-gold/20 border-4 border-gold/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-gold font-bold text-5xl">P</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            Pranav Chudgar, <span className="text-gold">CFA</span>
          </h1>
          <p className="text-gold font-medium text-lg mb-2">Director — Global Treasury, McKinsey & Company</p>
          <p className="text-gray-400 mb-8">Delhi, India &nbsp;·&nbsp; 20+ Years in Treasury &nbsp;·&nbsp; India · Africa · Southeast Asia · Europe</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://www.linkedin.com/in/pranavchudgar/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0077B5] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#006097] transition-colors"
            >
              Follow on LinkedIn
            </a>
            <Link href="/subscribe" className="bg-gold text-navy px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-400 transition-colors">
              Subscribe to TreasuryPulse
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gold/5 border-y border-gold/20 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { value: "20+", label: "Years in Treasury" },
              { value: "€1.7B", label: "Financing Raised" },
              { value: "$4B", label: "FX Exposure Managed" },
              { value: "1,500+", label: "Professionals Trained" },
              { value: "20", label: "Countries" },
              { value: "CFA", label: "Charterholder" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-navy font-bold text-2xl">{s.value}</div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-navy font-bold text-3xl mb-6">About Pranav</h2>
        <div className="prose prose-lg text-gray-600 space-y-5">
          <p>
            Pranav Chudgar is one of India&apos;s most experienced treasury professionals, currently serving as
            <strong> Director — Global Treasury at McKinsey &amp; Company</strong> in Delhi. With over 20 years of
            multifunctional treasury experience spanning corporate, consulting, and banking roles, Pranav has
            worked in financial markets across India, Southeast Asia, Africa, and Europe.
          </p>
          <p>
            At <strong>Motherson Group</strong>, Pranav led one of the most complex treasury mandates in Indian
            corporate history — raising approximately <strong>€1.7 billion</strong> in financing through credit
            facilities and bonds, managing group-wide FX and interest rate risks, and cultivating relationships
            with over 20 global banks and 6 credit rating agencies.
          </p>
          <p>
            At <strong>Bharti Airtel</strong>, he managed multi-currency foreign exchange exposure of approximately
            <strong> $4 billion</strong> across 20 countries and was instrumental in setting up regional treasury
            desks across Africa — one of the most ambitious treasury expansions by an Indian company.
          </p>
          <p>
            During his seven years at <strong>EY</strong>, Pranav advised India&apos;s top corporates on treasury
            transformation, FX hedging, liquidity management, and digital payments. He also led EY&apos;s treasury
            training vertical — developing curriculum and training over <strong>1,500 finance professionals</strong>
            across India.
          </p>
          <p>
            Pranav began his career at <strong>ICICI Bank</strong> and <strong>Adani Group</strong>, gaining deep
            foundational experience in FX derivatives sales, commodity treasury, and corporate risk management.
          </p>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-navy font-bold text-3xl mb-10 text-center">Career Timeline</h2>
          <div className="relative border-l-2 border-gold/30 pl-8 space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-10 top-1 w-4 h-4 bg-gold rounded-full border-4 border-white shadow" />
                <p className="text-gold text-xs font-bold uppercase tracking-wide mb-1">{item.year}</p>
                <h3 className="text-navy font-semibold text-lg leading-snug">{item.role}</h3>
                <p className="text-gray-600 font-medium text-sm">{item.company}</p>
                <p className="text-gray-500 text-sm mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-navy font-bold text-3xl mb-8">Education & Credentials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { degree: "CFA Charterholder", inst: "CFA Institute", year: "Global Designation" },
            { degree: "MS Finance", inst: "ICFAI", year: "2003 – 2005" },
            { degree: "LLB", inst: "Gujarat University", year: "2003 – 2005" },
            { degree: "B.Com (Accountancy)", inst: "Gujarat University", year: "2000 – 2003" },
          ].map((e) => (
            <div key={e.degree} className="flex gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center flex-shrink-0 text-gold text-lg">🎓</div>
              <div>
                <p className="text-navy font-semibold text-sm">{e.degree}</p>
                <p className="text-gray-500 text-xs">{e.inst} · {e.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Initiative */}
      <section className="bg-navy py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold text-xs font-bold uppercase tracking-widest">The Initiative</span>
          <h2 className="text-white font-bold text-3xl mt-3 mb-6">Why TreasuryPulse India?</h2>
          <blockquote className="text-gray-300 text-lg leading-relaxed italic mb-6 max-w-3xl mx-auto">
            &ldquo;In 20 years across ICICI, Adani, Airtel, Motherson, EY, and McKinsey — I have seen how much
            knowledge gap exists for junior treasury professionals in India. The information is scattered, the
            insights are locked inside institutions, and there is no daily go-to resource for someone building
            their treasury career. TreasuryPulse India is my attempt to change that — one article at a time.
            This platform is also my research database for a book I am writing on Indian treasury management.&rdquo;
          </blockquote>
          <p className="text-gold font-semibold mb-8">— Pranav Chudgar, CFA · Director, Global Treasury · McKinsey & Company</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/news" className="bg-gold text-navy px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-400 transition-colors">
              Read Daily News — Free
            </Link>
            <Link href="/subscribe" className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors">
              Get Insider Access — ₹50/month
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

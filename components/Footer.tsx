import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-navy-light mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gold rounded-sm flex items-center justify-center">
                <span className="text-navy font-bold text-sm">TP</span>
              </div>
              <span className="text-white font-bold text-lg">
                TreasuryPulse<span className="text-gold"> India</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              India&apos;s premier treasury intelligence platform for the next generation of finance professionals. Curated daily by Pranav, a Finance & Treasury leader.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="mailto:hello@treasurypulse.in"
                className="text-gray-400 hover:text-gold transition-colors text-sm"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Content</h3>
            <ul className="space-y-2">
              <li><Link href="/news" className="text-gray-400 hover:text-gold text-sm transition-colors">Daily News</Link></li>
              <li><Link href="/insider" className="text-gray-400 hover:text-gold text-sm transition-colors">Insider Insights</Link></li>
              <li><Link href="/jobs" className="text-gray-400 hover:text-gold text-sm transition-colors">Treasury Jobs</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-gold text-sm transition-colors">About Pranav</Link></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Get Access</h3>
            <ul className="space-y-2">
              <li><Link href="/subscribe" className="text-gray-400 hover:text-gold text-sm transition-colors">Subscribe — ₹50/mo</Link></li>
              <li><Link href="/subscribe#free" className="text-gray-400 hover:text-gold text-sm transition-colors">Free Plan</Link></li>
            </ul>
            <div className="mt-6">
              <p className="text-gray-500 text-xs">Topics covered:</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {["RBI Policy", "G-Sec", "Forex", "MIBOR", "Liquidity", "CRR/SLR"].map((tag) => (
                  <span key={tag} className="text-xs bg-navy-light text-gray-400 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-light mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} TreasuryPulse India. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            For educational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

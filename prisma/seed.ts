import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dailyNewsArticles = [
  {
    title: "RBI Keeps Repo Rate Unchanged at 6.5% — Focus Shifts to Liquidity Management",
    slug: "rbi-keeps-repo-rate-unchanged-6-5-percent",
    excerpt: "The Reserve Bank of India's Monetary Policy Committee (MPC) voted unanimously to keep the repo rate at 6.5% for the fifth consecutive meeting. The focus now shifts to active liquidity management as the system moves into a deficit mode ahead of advance tax outflows.",
    body: `## RBI MPC Decision — Rate Hold

The Reserve Bank of India's Monetary Policy Committee (MPC) voted unanimously to keep the repo rate at **6.5%** for the fifth consecutive meeting. The stance remains "withdrawal of accommodation" as the committee monitors inflation trajectory.

### Key Takeaways for Treasury Professionals

1. **Repo Rate**: 6.5% (unchanged)
2. **Standing Deposit Facility (SDF)**: 6.25%
3. **Marginal Standing Facility (MSF)**: 6.75%
4. **CRR**: 4.5% (unchanged)

### Liquidity Outlook

System liquidity has moved into deficit mode ahead of advance tax outflows. The RBI conducted ₹50,000 crore of Variable Rate Repo (VRR) operations to manage short-term tightness.

**Call money rates** are trading close to the MSF rate at 6.70-6.75%, indicating tight liquidity conditions.

### What This Means

For corporate treasury teams, this means:
- Short-term borrowing costs remain elevated
- CMS and sweeping structures need to be reviewed
- T-bill yields likely to edge up 10-15 bps in the near term

*Source: RBI Monetary Policy Statement*`,
    category: "daily_news",
    tags: JSON.stringify(["rbi", "monetary-policy", "repo-rate", "liquidity"]),
    isPremium: false,
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    title: "10-Year G-Sec Yield Falls to 7.02% — FPI Inflows Drive Rally",
    slug: "10-year-gsec-yield-falls-7-02-percent-fpi-inflows",
    excerpt: "The benchmark 10-year government security yield dropped 8 basis points to 7.02% as Foreign Portfolio Investors (FPIs) pumped in ₹4,200 crore into Indian debt markets following India's inclusion in JP Morgan's GBI-EM Global Index.",
    body: `## G-Sec Market Update

The benchmark **10-year G-Sec (6.79% 2034)** yield fell 8 basis points to **7.02%** in today's session, driven by strong FPI demand post India's index inclusion milestone.

### Market Snapshot

| Security | Previous Yield | Current Yield | Change |
|---|---|---|---|
| 91-day T-bill | 6.82% | 6.80% | -2 bps |
| 182-day T-bill | 6.91% | 6.89% | -2 bps |
| 364-day T-bill | 6.98% | 6.95% | -3 bps |
| 10-yr G-Sec | 7.10% | 7.02% | -8 bps |

### FPI Flow Analysis

FPIs have been net buyers of Indian government securities since the JP Morgan GBI-EM index inclusion announcement. The Fully Accessible Route (FAR) bonds continue to attract foreign interest.

**YTD FPI inflows into Indian debt**: ₹1.12 lakh crore

### Trading Intelligence

The rally is concentrated in the 10-15 year bucket. Short-end paper (91-182 day T-bills) remains under pressure due to tight liquidity conditions.

*Source: CCIL, RBI*`,
    category: "daily_news",
    tags: JSON.stringify(["g-sec", "fpi", "yield", "debt-market"]),
    isPremium: false,
    isPublished: true,
    publishedAt: new Date(Date.now() - 3600000),
  },
  {
    title: "SEBI Tightens Corporate Bond Reporting — New OBPP Framework Effective April 2026",
    slug: "sebi-tightens-corporate-bond-reporting-obpp-framework",
    excerpt: "SEBI has mandated all listed entities to report corporate bond trades through the Online Bond Platform Providers (OBPP) framework by April 1, 2026, aiming to improve price transparency and liquidity in the corporate debt market.",
    body: `## SEBI Circular: Corporate Bond Reporting

**Circular Reference**: SEBI/HO/DDHS/DDHS-DRBC/P/CIR/2025/0084

SEBI has issued a circular mandating all listed entities to route corporate bond trades through **Online Bond Platform Providers (OBPPs)** effective April 1, 2026.

### What Changes?

1. **All corporate bond issuances** above ₹10 crore must be listed on OBPPs
2. **Trade reporting** within 15 minutes of execution (previously 30 minutes)
3. **Yield disclosure** mandatory on all OBPPs
4. **Retail investor access**: Minimum lot size reduced to ₹10,000

### Impact on Treasury Operations

For corporate treasury teams managing bond portfolios:

- **Compliance burden increases**: Real-time trade reporting requires system integration with OBPP platforms
- **Better price discovery**: OBPP platforms will aggregate bids/offers, giving treasury teams better benchmark pricing
- **Liquidity benefit**: Retail participation expected to improve secondary market liquidity

### Key Dates

| Milestone | Date |
|---|---|
| Circular issued | March 2025 |
| System readiness deadline | January 1, 2026 |
| Full compliance required | April 1, 2026 |

*Source: SEBI Circular*`,
    category: "daily_news",
    tags: JSON.stringify(["sebi", "corporate-bonds", "debt-market", "compliance"]),
    isPremium: false,
    isPublished: true,
    publishedAt: new Date(Date.now() - 7200000),
  },
  {
    title: "USD/INR Edges to 83.45 — RBI Intervention Caps Rupee Weakness",
    slug: "usd-inr-edges-83-45-rbi-intervention",
    excerpt: "The Indian Rupee weakened to 83.45 against the US Dollar before RBI intervention through state-run banks capped further depreciation. Elevated crude oil prices and dollar strength ahead of US CPI data weigh on the currency.",
    body: `## Forex Market Update — USD/INR

The Indian Rupee (INR) weakened to **₹83.45/USD** in early trading before RBI intervention through state-run bank dollar sales capped further depreciation. The pair settled around ₹83.40.

### Drivers Today

**Bearish factors for INR:**
- Brent crude at $88/barrel (+1.2%) — India imports 85% of oil needs
- DXY (Dollar Index) at 104.8 — broad dollar strength ahead of US CPI
- FPI equity outflows of ₹2,100 crore today

**Bullish factors (INR support):**
- RBI intervention via state-run banks (estimated $400-500 million sold)
- Strong software services export inflows ($7 billion monthly average)
- India's forex reserves at $640 billion — adequate buffer

### Technical Levels

| Level | Rate |
|---|---|
| Immediate resistance | 83.60 |
| Support | 83.20 |
| RBI's comfort zone | 82.50 – 84.00 |

### What Treasury Teams Should Watch

- **Forward premiums**: 3-month USD/INR forward at 1.2% annualized premium — cheap hedging opportunity
- **Option volatility**: 1-month ATM implied vol at 4.8% — moderate
- Exporters should consider layered hedging at current levels

*Source: Bloomberg, CCIL*`,
    category: "daily_news",
    tags: JSON.stringify(["forex", "usd-inr", "rbi", "currency"]),
    isPremium: false,
    isPublished: true,
    publishedAt: new Date(Date.now() - 10800000),
  },
  {
    title: "Call Money Rate Spikes to 6.78% — Advance Tax Outflows Drain Liquidity",
    slug: "call-money-rate-spikes-6-78-advance-tax-outflows",
    excerpt: "The overnight call money rate spiked to 6.78%, near the Marginal Standing Facility (MSF) ceiling, as advance tax outflows of approximately ₹1.8 lakh crore drained banking system liquidity. The RBI conducted ₹75,000 crore in VRR auctions to provide relief.",
    body: `## Money Market Update — Call Money & Liquidity

Overnight **call money rates** spiked to **6.78%**, approaching the MSF ceiling, as the quarterly advance tax payment deadline triggered massive liquidity drainage from the banking system.

### Liquidity Position

| Metric | Value |
|---|---|
| System liquidity (LAF) | -₹1.65 lakh crore (deficit) |
| Call money rate | 6.78% |
| CBLO/TREP | 6.65% |
| CD rates (3M) | 7.20-7.35% |

### RBI Response

The RBI conducted:
- **₹75,000 crore VRR (14-day)** at 6.54% — fully absorbed
- **₹25,000 crore VRR (3-day)** at 6.51% — oversubscribed 2x

### Why This Matters

Every quarter, advance tax outflows of ₹1.5-2 lakh crore temporarily tighten system liquidity. This is predictable and treasury teams should plan accordingly:

1. **Maintain excess SLR** before quarter-end — use it as liquidity buffer
2. **Pre-fund cash requirements** — don't rely on overnight call borrowings at quarter-end
3. **CD issuance**: If you're a bank, issue CDs 2 weeks before quarter-end to lock in funding

*Source: RBI, CCIL*`,
    category: "daily_news",
    tags: JSON.stringify(["call-money", "liquidity", "mibor", "money-market"]),
    isPremium: false,
    isPublished: true,
    publishedAt: new Date(Date.now() - 14400000),
  },
];

const insiderArticles = [
  {
    title: "How RBI Really Manages Liquidity: An Insider's Playbook",
    slug: "how-rbi-really-manages-liquidity-insiders-playbook",
    excerpt: "Most textbooks explain the LAF corridor. But what actually happens inside RBI's Monetary Policy Department when they decide how much liquidity to inject or drain? Here's the playbook — drawn from years of watching RBI operations up close.",
    body: `## The Real Playbook

Most junior professionals understand the theory: RBI uses the LAF corridor (SDF at floor, MSF at ceiling) to keep call money rates near the repo rate. But the actual execution is far more nuanced.

### The Three Instruments — And When RBI Uses Each

**1. Variable Rate Repo (VRR)**
This is RBI's primary tool for injecting liquidity. Key insight: **the tenor signals intent**.
- 3-day VRR → RBI wants to inject short-term, temporary liquidity. The system will tighten again.
- 14-day VRR → More persistent injection. RBI is comfortable keeping rates lower.
- 28-day VRR → Structural liquidity injection. Expect easing to continue.

**2. Variable Rate Reverse Repo (VRRR)**
Used to drain excess liquidity. When VRRR cut-offs are consistently at the SDF rate (6.25%), it means banks aren't willing to park at lower rates — a signal of genuine tightness ahead.

**3. Open Market Operations (OMOs)**
OMOs are RBI's nuclear option. When they buy G-Secs via OMO, they're injecting *durable* liquidity — not just overnight. This has a direct effect on the 10-year G-Sec yield.

**Insider rule of thumb**: If RBI announces OMO purchases when the 10-year yield is above 7.20%, it's a yield management operation. If they do it when yields are at 7.00-7.10%, they're building durable liquidity.

### Reading the RBI's Mind — The Real Indicators

Don't just read the MPC statement. Watch these:

1. **The VRRR cut-off rate**: If it dips below repo rate consistently, the system is flush. If it stays close to MSF, expect tight liquidity for weeks.
2. **The SDF absorption amount**: High SDF absorption (₹2-3 lakh crore) = the system has excess cash parked. Good for bond markets.
3. **Forex intervention vs. liquidity**: When RBI buys dollars (USD/INR control), it injects INR. When it sells dollars, it drains INR. A ₹10,000 crore RBI dollar sale = equivalent liquidity drain.

### The Quarter-End Pattern — Every Treasury Professional Must Know This

This is predictable and profitable knowledge:
- **Week before advance tax dates (March 15, June 15, Sept 15, Dec 15)**: Call rates spike, T-bill yields edge up 10-15 bps. Short-end bonds sell off.
- **Post-advance-tax**: Liquidity floods back as government spends. Call rates crash. Short-end bonds rally.

**The trade**: Buy 91-day T-bills when yields spike 10+ bps above repo rate at quarter-end. Hold for 2 weeks. You'll make 10-15 bps in a fortnight — that's ~25-30% annualized alpha on a risk-free instrument.

---

*This is the kind of intelligence that separates front-office treasury professionals from back-office operations. Subscribe to unlock more insider frameworks like this.*`,
    category: "insider",
    tags: JSON.stringify(["rbi", "liquidity", "laf", "treasury-operations"]),
    isPremium: true,
    isPublished: true,
    publishedAt: new Date(Date.now() - 86400000),
  },
  {
    title: "G-Sec 101: What Every Junior Treasury Professional Must Know (But No Textbook Tells You)",
    slug: "gsec-101-junior-treasury-professional-guide",
    excerpt: "Government securities are the backbone of Indian treasury operations. Here's everything you need to know to talk confidently about G-Secs — from how the primary market actually works to what moves secondary market yields — explained by someone who's seen it from the inside.",
    body: `## G-Sec Fundamentals — The Insider Version

### How the Primary Market Actually Works

Every Tuesday and Friday, RBI auctions new G-Secs and T-bills. But the process is far more interesting than the textbook description.

**Who participates?**
- Primary Dealers (PDs) — they're the real market makers. Banks like SBI, HDFC, Kotak, and standalone PDs like STCI Finance.
- Non-competitive bidders — insurance companies, provident funds, small investors. They get allotment at the weighted average yield.

**The cut-off yield**: This is what drives the headlines. When the cut-off comes in lower than expected (meaning RBI accepted higher prices), it's bullish for the bond market. When it comes in higher than market expectation, it's bearish.

**Insider insight**: The "when-issued" (WI) market — where bonds are traded before they're officially issued — is the best indicator of where the cut-off will land. Watch WI yields on Bloomberg or CCIL's FTRAC platform.

### What Moves Secondary Market Yields

Understanding yield drivers is the single most important skill in fixed income treasury:

1. **RBI policy stance** (most important): Hawkish MPC statement → yields up. Dovish commentary → yields down.
2. **US Treasury yields**: India's 10-year tracks the US 10-year with a typical spread of 200-250 bps. When US yields spike, Indian yields follow within 1-2 sessions.
3. **Crude oil prices**: India imports oil. Higher crude = higher inflation = higher yields.
4. **FPI flows**: Post JP Morgan index inclusion, FPI flows are a significant daily driver.
5. **Supply**: RBI's weekly auction calendar. Large supply weeks = yield pressure.
6. **Demand**: Year-end SLR requirements drive bank demand for G-Secs.

### The SLR Angle — A Hidden Source of Demand

Banks must hold 18% of their NDTL (Net Demand and Time Liabilities) in SLR-eligible securities (G-Secs, SDL, T-bills). This creates *structural demand* for government paper regardless of yield levels.

When a bank's credit growth is strong, NDTL goes up → SLR requirement goes up → bank must buy more G-Secs → natural support for bond prices.

This is why India's G-Sec yields are partially "captive" and don't always react as violently to global sell-offs as other EMs.

---

*More frameworks like this available every week in the Insider Section. At ₹50/month, it's the best-ROI learning investment you can make in your treasury career.*`,
    category: "insider",
    tags: JSON.stringify(["g-sec", "primary-market", "yield", "treasury-basics"]),
    isPremium: true,
    isPublished: true,
    publishedAt: new Date(Date.now() - 172800000),
  },
  {
    title: "The Treasury Career Roadmap: From Ops to Front Office in 3 Years",
    slug: "treasury-career-roadmap-ops-to-front-office",
    excerpt: "Most junior treasury professionals start in operations — settlements, reconciliation, reporting. Here's the exact 3-year plan to move to the front office: what skills to build, which certifications matter, and how to position yourself for the transition.",
    body: `## The Career Transition Blueprint

Getting from treasury operations to front-office trading or ALM is the ambition of every smart junior treasury professional. Here's the exact playbook — based on watching hundreds of careers in Indian treasury markets.

### Year 1: Master the Back Office First

Don't rush this. The back office is where you learn what actually *happens* in a trade. Front office people who don't understand settlement, CCIL clearing, and nostro reconciliation make expensive mistakes.

**What to master in Year 1:**
- **SWIFT messages**: MT300 (FX Confirmation), MT202 (Bank Transfer), MT950 (Statement). Know them cold.
- **CCIL settlement**: How G-Sec DVP settlement works, FOREX-CLEAR, Tri-party repo.
- **Accounting entries**: P&L booking for mark-to-market positions, HFT vs AFS vs HTM categorization.
- **Bloomberg/Reuters**: Get comfortable with basic functionality — yield curves, FX pages, news.

### Year 2: Bridge to the Middle Office

Move into market risk or ALM support. This is where you start *thinking* about positions rather than just processing them.

**Skills to build:**
- **VaR calculation**: Understand how your bank's market risk team calculates 1-day VaR on the bond portfolio.
- **Duration and modified duration**: Not just the formula — know how a 1 bps move in yield affects your bank's P&L.
- **ALM reports**: Learn to read an Interest Rate Risk in Banking Book (IRRBB) report.
- **CTP certification**: Start studying for AFP's Certified Treasury Professional (CTP). Worth every rupee.

### Year 3: Position for the Front Office

By now, you should have a reputation as the person who "gets it". Front office moves happen through trust and sponsorship.

**The positioning moves:**
1. Volunteer for the trading desk coverage when traders are on leave.
2. Build a track record of calling market moves correctly in internal emails.
3. Present your market views in team meetings — even if wrong, showing the analysis builds credibility.
4. Network within FIMMDA events and AFP India chapters.

**Certifications that actually matter in India:**
- CTP (AFP) — Gold standard
- NISM Series VIII (Equity Derivatives) — Useful for hybrid roles
- FRM (GARP) — For risk roles

---

*Every week, I share specific intelligence about treasury careers, market dynamics, and the skills that actually matter. This is the platform I wish existed when I was starting out.*`,
    category: "insider",
    tags: JSON.stringify(["career", "treasury-operations", "front-office", "ctp"]),
    isPremium: true,
    isPublished: true,
    publishedAt: new Date(Date.now() - 259200000),
  },
];

async function main() {
  console.log("🌱 Seeding TreasuryPulse database...");

  // Clear existing data
  await prisma.scrapedDraft.deleteMany();
  await prisma.article.deleteMany();
  await prisma.subscriber.deleteMany();

  // Seed articles
  for (const article of [...dailyNewsArticles, ...insiderArticles]) {
    await prisma.article.create({ data: article });
  }
  console.log(`✅ Created ${dailyNewsArticles.length} daily news + ${insiderArticles.length} insider articles`);

  // Seed sample scraped drafts
  await prisma.scrapedDraft.createMany({
    data: [
      {
        title: "RBI Issues New Guidelines on Interest Rate Derivatives for Banks",
        summary: "RBI has revised guidelines on interest rate derivative instruments for scheduled commercial banks, expanding eligible participants and introducing new reporting requirements via the CROMS platform.",
        sourceUrl: "https://rbi.org.in/notifications/2025",
        sourceName: "rbi",
        rawContent: "Full circular text would appear here after scraping...",
        status: "pending",
      },
      {
        title: "India's Forex Reserves Rise $2.1 Billion to $642 Billion",
        summary: "India's foreign exchange reserves rose by $2.1 billion to reach $642 billion in the week ending March 28, driven by valuation gains and RBI dollar purchases.",
        sourceUrl: "https://economictimes.indiatimes.com",
        sourceName: "et",
        rawContent: "ET article content would appear here after RSS parsing...",
        status: "pending",
      },
      {
        title: "SEBI Extends Deadline for Mutual Fund Stress Testing Report",
        summary: "SEBI has extended the deadline for mutual funds to publish monthly stress testing reports to April 30, 2025, giving fund houses more time to upgrade systems.",
        sourceUrl: "https://sebi.gov.in/circulars",
        sourceName: "sebi",
        rawContent: "SEBI circular text would appear here...",
        status: "pending",
      },
    ],
  });
  console.log("✅ Created 3 sample scraped drafts (pending review)");

  // Seed sample subscribers
  await prisma.subscriber.createMany({
    data: [
      { email: "rahul.sharma@gmail.com", name: "Rahul Sharma", plan: "paid", status: "active", startedAt: new Date(), expiresAt: new Date(Date.now() + 30 * 86400000) },
      { email: "priya.mehta@outlook.com", name: "Priya Mehta", plan: "paid", status: "active", startedAt: new Date(), expiresAt: new Date(Date.now() + 25 * 86400000) },
      { email: "arun.kumar@yahoo.com", name: "Arun Kumar", plan: "free", status: "active" },
      { email: "neha.singh@gmail.com", name: "Neha Singh", plan: "paid", status: "active", startedAt: new Date(), expiresAt: new Date(Date.now() + 15 * 86400000) },
      { email: "vikram.joshi@gmail.com", name: "Vikram Joshi", plan: "free", status: "active" },
    ],
  });
  console.log("✅ Created 5 sample subscribers (3 paid, 2 free)");

  console.log("\n🎉 Seed complete! Run: npx prisma studio to view data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

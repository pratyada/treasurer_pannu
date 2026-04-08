import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://treasurer-pannu.vercel.app"),
  title: {
    default: "TreasuryPulse India — By Pranav Chudgar, CFA",
    template: "%s | TreasuryPulse India",
  },
  description:
    "Daily treasury intelligence by Pranav Chudgar, CFA — Director of Global Treasury at McKinsey & Company. RBI updates, G-sec, forex, money markets & insider insights for India's next generation of treasury professionals. Subscribe for ₹50/month.",
  keywords: [
    "treasury India", "Pranav Chudgar", "RBI updates", "SEBI circulars",
    "G-sec India", "forex India", "money market India", "MIBOR", "CRR SLR",
    "treasury jobs India", "McKinsey treasury", "CFA India", "treasury training India",
  ],
  authors: [{ name: "Pranav Chudgar, CFA", url: "https://www.linkedin.com/in/pranavchudgar/" }],
  creator: "Pranav Chudgar, CFA",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://treasurer-pannu.vercel.app",
    siteName: "TreasuryPulse India",
    title: "TreasuryPulse India — By Pranav Chudgar, CFA | McKinsey",
    description:
      "🏦 India's #1 treasury intelligence platform. Daily RBI/SEBI updates, forex, G-sec & insider insights — curated by Pranav Chudgar, CFA (Director, Global Treasury · McKinsey & Company). Join 500+ junior treasury professionals. Only ₹50/month.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TreasuryPulse India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TreasuryPulse India — By Pranav Chudgar, CFA",
    description: "Daily RBI/SEBI updates, forex, G-sec & insider treasury intelligence by Pranav Chudgar, CFA · McKinsey. ₹50/month.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-gray-50">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

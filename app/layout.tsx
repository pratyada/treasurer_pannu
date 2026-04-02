import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "TreasuryPulse India — Treasury Intelligence for the Next Generation",
  description:
    "Daily treasury news, RBI/SEBI updates, and insider insights for junior finance professionals in India. Curated by Pranav, a Finance & Treasury leader.",
  keywords: "treasury India, RBI, SEBI, G-sec, forex, money market, MIBOR, CRR, SLR, treasury jobs India",
  openGraph: {
    title: "TreasuryPulse India",
    description: "India's premier treasury intelligence platform for junior finance professionals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-gray-50">
        <SessionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { articleId } = await req.json();

    const article = await prisma.article.findUnique({ where: { id: articleId } });
    if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });

    const tags = JSON.parse(article.tags || "[]") as string[];
    const hashtagMap: Record<string, string> = {
      "rbi": "#RBI",
      "sebi": "#SEBI",
      "forex": "#ForexIndia",
      "g-sec": "#GSec",
      "liquidity": "#LiquidityManagement",
      "mibor": "#MIBOR",
      "treasury": "#TreasuryIndia",
    };

    const hashtags = [
      "#TreasuryIndia",
      "#RBI",
      "#FinanceIndia",
      "#TreasuryManagement",
      "#MoneyMarkets",
      ...tags.map((t: string) => hashtagMap[t.toLowerCase()]).filter(Boolean),
    ];
    const uniqueHashtags = Array.from(new Set(hashtags)).slice(0, 6).join(" ");

    // Extract 3 key bullet points from excerpt
    const sentences = article.excerpt.split(".").filter((s) => s.trim().length > 10).slice(0, 3);
    const bullets = sentences.map((s) => `→ ${s.trim()}`).join("\n");

    const linkedinPost = `${article.title}

${bullets}

Full breakdown on TreasuryPulse India — link in bio 👇

${uniqueHashtags}`;

    return NextResponse.json({ post: linkedinPost, characterCount: linkedinPost.length });
  } catch (error) {
    console.error("LinkedIn post generation error:", error);
    return NextResponse.json({ error: "Failed to generate LinkedIn post" }, { status: 500 });
  }
}

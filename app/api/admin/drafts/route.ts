import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "pending";

  const drafts = await prisma.scrapedDraft.findMany({
    where: { status },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ drafts });
}

export async function POST(req: NextRequest) {
  // This endpoint is called by the Python scrapers (authenticated via API key)
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.SCRAPER_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, summary, sourceUrl, sourceName, rawContent } = body;

    const draft = await prisma.scrapedDraft.create({
      data: { title, summary, sourceUrl, sourceName, rawContent },
    });

    return NextResponse.json({ draft }, { status: 201 });
  } catch (error) {
    console.error("Create draft error:", error);
    return NextResponse.json({ error: "Failed to create draft" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, status } = await req.json();
    const draft = await prisma.scrapedDraft.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ draft });
  } catch (error) {
    console.error("Update draft error:", error);
    return NextResponse.json({ error: "Failed to update draft" }, { status: 500 });
  }
}

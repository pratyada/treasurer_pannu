import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const where = category ? { category } : {};

  const articles = await prisma.article.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ articles });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { title, body: content, excerpt, category, tags, isPremium, isPublished, bookChapter, authorNotes } = body;

    if (!title || !content || !category) {
      return NextResponse.json({ error: "title, body, and category are required" }, { status: 400 });
    }

    let slug = slugify(title);
    // Check for duplicate slug
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        body: content,
        excerpt: excerpt || content.substring(0, 200),
        category,
        tags: Array.isArray(tags) ? JSON.stringify(tags) : "[]",
        isPremium: isPremium ?? (category === "insider"),
        isPublished: isPublished ?? false,
        publishedAt: isPublished ? new Date() : null,
        bookChapter: bookChapter || null,
        authorNotes: authorNotes || null,
        source: "manual",
      },
    });

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    console.error("Create article error:", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}

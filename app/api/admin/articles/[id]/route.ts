import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { title, body: content, excerpt, category, tags, isPremium, isPublished, bookChapter, authorNotes } = body;

    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = title;
    if (content !== undefined) data.body = content;
    if (excerpt !== undefined) data.excerpt = excerpt;
    if (category !== undefined) data.category = category;
    if (tags !== undefined) data.tags = Array.isArray(tags) ? JSON.stringify(tags) : tags;
    if (isPremium !== undefined) data.isPremium = isPremium;
    if (bookChapter !== undefined) data.bookChapter = bookChapter;
    if (authorNotes !== undefined) data.authorNotes = authorNotes;
    if (isPublished !== undefined) {
      data.isPublished = isPublished;
      if (isPublished) data.publishedAt = new Date();
    }

    const article = await prisma.article.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Update article error:", error);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.article.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete article error:", error);
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const jobs = await prisma.jobPosting.findMany({
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    include: { _count: { select: { applications: true } } },
  });

  return NextResponse.json({ jobs });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { company, title, location, salaryRange, applyUrl, description, isFeatured, expiresAt } = body;

    if (!company || !title || !location || !description || !expiresAt) {
      return NextResponse.json({ error: "company, title, location, description, and expiresAt are required" }, { status: 400 });
    }

    const job = await prisma.jobPosting.create({
      data: {
        company,
        title,
        location,
        salaryRange: salaryRange || null,
        applyUrl: applyUrl || null,
        description,
        isFeatured: isFeatured ?? false,
        isActive: true,
        expiresAt: new Date(expiresAt),
      },
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error("Create job error:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

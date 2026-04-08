import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const now = new Date();

  const jobs = await prisma.jobPosting.findMany({
    where: {
      isActive: true,
      expiresAt: { gte: now },
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      company: true,
      title: true,
      location: true,
      salaryRange: true,
      description: true,
      isFeatured: true,
      expiresAt: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ jobs });
}

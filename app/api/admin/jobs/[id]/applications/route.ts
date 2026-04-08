import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const applications = await prisma.jobApplication.findMany({
    where: { jobId: params.id },
    orderBy: { createdAt: "desc" },
    include: {
      job: { select: { title: true, company: true } },
    },
  });

  return NextResponse.json({ applications });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { applicationId, status, adminNotes } = await req.json();
    const updated = await prisma.jobApplication.update({
      where: { id: applicationId, jobId: params.id },
      data: { status, adminNotes },
    });
    return NextResponse.json({ application: updated });
  } catch (error) {
    console.error("Update application error:", error);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}

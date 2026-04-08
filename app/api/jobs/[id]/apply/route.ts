import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const job = await prisma.jobPosting.findUnique({
      where: { id: params.id, isActive: true },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found or no longer active" }, { status: 404 });
    }

    const formData = await req.formData();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string | null;
    const currentRole = formData.get("currentRole") as string | null;
    const currentCompany = formData.get("currentCompany") as string | null;
    const totalExperience = formData.get("totalExperience") as string;
    const noticePeriod = formData.get("noticePeriod") as string | null;
    const coverLetter = formData.get("coverLetter") as string;
    const cvFile = formData.get("cv") as File | null;

    if (!firstName || !lastName || !email || !phone || !totalExperience || !coverLetter || !cvFile) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(cvFile.type)) {
      return NextResponse.json({ error: "CV must be a PDF or Word document" }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (cvFile.size > maxSize) {
      return NextResponse.json({ error: "CV file must be under 5 MB" }, { status: 400 });
    }

    // Check duplicate application
    const existing = await prisma.jobApplication.findFirst({
      where: { jobId: params.id, email },
    });
    if (existing) {
      return NextResponse.json({ error: "You have already applied for this position" }, { status: 409 });
    }

    // Upload CV to Vercel Blob
    const safeName = `${Date.now()}-${cvFile.name.replace(/[^a-z0-9._-]/gi, "_")}`;
    const blob = await put(`cvs/${params.id}/${safeName}`, cvFile, { access: "public" });

    const application = await prisma.jobApplication.create({
      data: {
        jobId: params.id,
        firstName,
        lastName,
        email,
        phone,
        linkedinUrl: linkedinUrl || null,
        currentRole: currentRole || null,
        currentCompany: currentCompany || null,
        totalExperience,
        noticePeriod: noticePeriod || null,
        coverLetter,
        cvUrl: blob.url,
        cvFileName: cvFile.name,
      },
    });

    return NextResponse.json({ success: true, applicationId: application.id }, { status: 201 });
  } catch (error) {
    console.error("Application submit error:", error);
    return NextResponse.json({ error: "Failed to submit application. Please try again." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { studentId, jobId } = await req.json();

    if (!studentId || !jobId) {
      return NextResponse.json(
        { error: "Missing studentId or jobId" },
        { status: 400 }
      );
    }

    // Find the student's internal ID using their studentId
    const student = await prisma.student.findUnique({
      where: { studentId },
      select: { id: true },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Prevent duplicate applications
    const existingApp = await prisma.application.findFirst({
      where: { studentId: student.id, jobId },
    });

    if (existingApp) {
      return NextResponse.json({ message: "Already applied" }, { status: 200 });
    }

    const application = await prisma.application.create({
      data: {
        studentId: student.id,
        jobId,
        status: "Applied",
      },
    });

    return NextResponse.json({ success: true, application });
  } catch (err) {
    console.error("Error applying for job:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

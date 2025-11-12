import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const studentId = searchParams.get("studentId");

  try {
    // ✅ 1️⃣ Fetch student profile by studentId (string field, not id)
    if (type === "profile" && studentId) {
      const student = await prisma.student.findUnique({
        where: { studentId }, // ✅ matches your schema
        select: {
          studentId: true,
          name: true,
          department: true,
          cgpa: true,
          email: true,
          phone: true,
          address: true,
        },
      });

      if (!student) {
        return NextResponse.json({ error: "Student not found" }, { status: 404 });
      }

      return NextResponse.json(student);
    }

    // ✅ 2️⃣ Fetch all jobs with company details
    if (type === "jobs") {
      const jobs = await prisma.job.findMany({
        include: { company: true },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(jobs);
    }

    // ✅ 3️⃣ Fetch applications for the logged-in student
    if (type === "applications" && studentId) {
      // Find the student's unique internal ID from their studentId
      const student = await prisma.student.findUnique({
        where: { studentId },
        select: { id: true },
      });

      if (!student) {
        return NextResponse.json({ error: "Student not found" }, { status: 404 });
      }

      const applications = await prisma.application.findMany({
        where: { studentId: student.id }, // Application.studentId = Student.id
        include: {
          job: {
            include: {
              company: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(applications);
    }

    // ❌ Invalid query type
    return NextResponse.json({ error: "Invalid query type" }, { status: 400 });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

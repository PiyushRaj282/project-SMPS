import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, regNumber, email, cgpa, department, password } = data;

    if (!name || !regNumber || !email || !cgpa || !department || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if student already exists
    const existing = await prisma.student.findUnique({
      where: { studentId: regNumber },
    });
    if (existing) {
      return NextResponse.json({ error: "Student already exists" }, { status: 400 });
    }

    const student = await prisma.student.create({
      data: {
        name,
        studentId: regNumber,
        email,
        cgpa: parseFloat(cgpa),
        department,
        password, // ⚠ hash in production
      },
    });

    return NextResponse.json({ success: true, student }, { status: 201 });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        const { id, password, role } = credentials as {
          id: string;
          password: string;
          role: "student" | "admin";
        };

        console.log("Login attempt:", { id, role });

        if (!id || !password || !role) return null;

        if (role === "admin") {
          const admin = await prisma.admin.findUnique({
            where: { username: id },
          });
          console.log("Admin from DB:", admin);

          if (!admin) return null;
          const isValid = await compare(password, admin.password);
          if (!isValid) return null;

          return { id: admin.id, name: admin.name, email: admin.email, role: "admin" };
        }

        if (role === "student") {
          const student = await prisma.student.findUnique({
            where: { studentId: id }, 
          });
          console.log("Student from DB:", student);

          if (!student) return null;
          const isValid = await compare(password, student.password);
          if (!isValid) return null;

          return { id: student.id, name: student.name, email: student.email, role: "student" };
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/",   
    error: "/",    
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  debug: true,
};

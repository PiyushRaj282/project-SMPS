import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as const, // Required for callbacks to work correctly
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.id || !credentials?.password) {
          return null;
        }
        
        // Try to find a student first
        const student = await prisma.student.findUnique({
          where: { studentId: credentials.id as string },
        });

        if (student) {
          const isPasswordValid = await compare(credentials.password, student.password);
          if (isPasswordValid) {
            const user = await prisma.user.upsert({
              where: { studentId: student.id },
              update: {},
              create: {
                name: student.name,
                email: student.email,
                role: "student",
                studentId: student.id,
              },
            });
            return { ...user, role: user.role };
          }
        }

        const admin = await prisma.admin.findUnique({
          where: { username: credentials.id as string },
        });

        if (admin) {
          const isPasswordValid = await compare(credentials.password, admin.password);
          if (isPasswordValid) {
            const user = await prisma.user.upsert({
              where: { adminId: admin.id },
              update: {},
              create: {
                name: admin.name,
                email: admin.email,
                role: "admin",
                adminId: admin.id,
              },
            });
            return { ...user, role: user.role };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
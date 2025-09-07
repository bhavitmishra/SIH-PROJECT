import GoogleProvider from "next-auth/providers/google";
import { AuthOptions, Account, User } from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const Auth: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) return null;

        const mentor = await prisma.mentor.findUnique({
          where: { email: credentials.email },
        });

        if (!mentor) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          mentor.password!
        );
        if (!isValid) return null;

        // Return a user object, not a NextResponse
        return {
          id: mentor.id,
          email: mentor.email,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const admin = await prisma.admin.findUnique({
          where: { email: user.email! },
          select: { id: true },
        });

        token.adminId = admin?.id; // store adminId in JWT
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        // @ts-ignore
        session.user.adminId = token.adminId as string; // add adminId here
      }
      return session;
    },

    async signIn({ user, account }: { user: User; account: Account | null }) {
      console.log("hi signin");

      if (!user || !account) {
        return false;
      }

      await prisma.admin.upsert({
        select: { id: true },
        where: {
          // @ts-ignore
          email: user.email,
        },
        create: {
          // @ts-ignore
          email: user.email,
          name: user.name,
        },
        update: {
          name: user.name,
        },
      });

      return true;
    },
  },
};

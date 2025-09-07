import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail", // or use "smtp"
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password (not your actual Gmail password)
  },
});

function generatePassword(length: number = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export async function POST(req: Request) {
  try {
    const { email, adminId } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const newPassword = generatePassword(12);

    const hash = await bcrypt.hash(newPassword, 10);

    const mentor = await prisma.mentor.create({
      data: {
        adminId: adminId,
        email: email,
        password: hash,
      },
    });

    if (mentor) {
      await transporter.sendMail({
        from: `"Mentor Dashboard" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your New Password",
        text: `Here is your new password: ${newPassword}`,
        html: `<p><b>Your new password:</b> ${newPassword}</p>`,
      });

      return NextResponse.json({
        message: "Password sent successfully",
        password: newPassword,
      });
    } else {
      return NextResponse.json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.error("Mail error:", error);
    return NextResponse.json({ error: "Failed to send mail" }, { status: 500 });
  }
}

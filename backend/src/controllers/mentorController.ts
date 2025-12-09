import { Request, Response } from "express";
import { prisma } from "../db";

export default async function instituteSetupController(req: Request, res: Response) {
  try {
    const { adminId, email } = req.body as { adminId?: string; email?: string };

    // basic validation
    if (!adminId || !email) {
      return res.status(400).json({
        error: "adminId and email are required",
      });
    }

    // ensure admin exists
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      return res.status(404).json({
        error: "Admin not found",
      });
    }

    // check if mentor already exists with this email (global unique)
    const existing = await prisma.mentor.findFirst({
      where: { email },
    });

    if (existing) {
      return res.status(409).json({ msg: "Already registered as mentor" });
    }

    // create mentor: adminId + instituteId are required in schema
    const mentor = await prisma.mentor.create({
      data: {
        email,
        adminId: admin.id,
        instituteId: admin.instituteId,
      },
    });

    return res.status(201).json({
      msg: "Mentor created successfully",
      mentor,
    });
  } catch (err) {
    console.error("Error creating mentor:", err);
    return res.status(500).json({
      error: "Internal server error while creating mentor",
    });
  }
}

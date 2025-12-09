import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const { name, code, credit, classId } = req.body;

    // very basic validation
    if (!name || !classId) {
      return res.status(400).json({ error: "name and classId are required" });
    }

    const subject = await prisma.subject.create({
      data: {
        name,
        code,
        credit,
        class: {
          connect: { id: classId }
        }
      }
    });

    return res.status(201).json(subject);
  } catch (err) {
    console.error("Error creating subject:", err);
    return res.status(500).json({ error: "Failed to create subject" });
  }
});

export default router;

// server.ts
import express, { Request, Response } from "express";
import multer from "multer";
import cors from "cors";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

// Extend Request type to include multer's file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

app.post(
  "/upload/attendance",
  upload.single("file"),
  async (req: MulterRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // 🔹 Get subject from formData (frontend sends this)
      const { subject } = req.body as { subject?: string };

      if (!subject) {
        return res.status(400).json({ error: "Subject is required" });
      }

      const filePath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase(); // use original filename for extension
      let records: any[] = [];

      if (ext === ".csv") {
        // Parse CSV manually
        const csvData = fs.readFileSync(filePath, "utf8");
        records = csvData
          .split("\n")
          .slice(1) // skip header
          .filter((line) => line.trim() !== "")
          .map((line) => {
            const [name, enroll_no, roll_no, marks, attendance] = line.split(",");
            return {
              name: name?.replace(/"/g, "").trim(),
              enroll_no: enroll_no?.replace(/"/g, "").trim(),
              roll_no: roll_no?.replace(/"/g, "").trim(),
              marks: marks?.replace(/"/g, "").trim(),
              attendance: attendance?.replace(/"/g, "").trim(),
            };
          });
      } else if (ext === ".xlsx") {
        // Parse XLSX
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        records = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      } else {
        return res.status(400).json({ error: "Unsupported file format" });
      }

      // 🔹 Attach subject to every student record
      const recordsWithSubject = records.map((student) => ({
        ...student,
        subject, // same subject for all rows in this upload
      }));

      // Save to DB
      for (const student of recordsWithSubject) {
        console.log("DEBUG:", student);

        const studentName = student["name"];
        const studentEnroll = student["enroll_no"];
        const studentRollNo = student["roll_no"];
        const studentMarks = student["marks"];
        const studentAttendance = student["attendance"];
        const studentSubject = student["subject"];

        await prisma.student.upsert({
          where: { Enroll_no: studentEnroll },
          update: {
            name: studentName,
            attendance: studentAttendance,
            roll_no: studentRollNo,
            // 🔹 make sure `subject` exists in your Prisma schema
            subject: studentSubject,
          },
          // @ts-ignore
          create: {
            Enroll_no: studentEnroll || "",
            name: studentName || "",
            attendance: studentAttendance || 0,
            marks: studentMarks,
            roll_no: studentRollNo,
            subject: studentSubject,
          },
        });
      }

      // ✅ cleanup uploaded file to avoid filling /uploads
      fs.unlinkSync(filePath);

      // ✅ Forward to webhook after DB save, with subject included
      try {
        const webhookRes = await fetch("http://localhost:3333/dropzero_webhook/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recordsWithSubject),
        });

        if (webhookRes.ok) {
          console.log("✅ Webhook call successful!");
        } else {
          console.error("⚠️ Webhook call failed:", webhookRes.status);
        }
      } catch (err) {
        console.error("🔥 Failed to hit webhook:", err);
      }

      res.json({ message: "✅ Records saved & webhook called" });
    } catch (error) {
      console.error("🔥 An error occurred:", error);
      res.status(500).json({ error: "Failed to process file" });
    }
  }
);

app.listen(3902, () => {
  console.log("🚀 Server running on port 3902");
});

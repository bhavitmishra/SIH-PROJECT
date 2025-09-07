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

      const filePath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase(); // ✅ use original filename for extension
      let records: any[] = [];

      if (ext === ".csv") {
        // Parse CSV manually
        const csvData = fs.readFileSync(filePath, "utf8");
        records = csvData
          .split("\n")
          .slice(1) // skip header
          .filter((line) => line.trim() !== "")
          .map((line) => {
            const [id, name, attendance] = line.split(",");
            return {
              id: id?.replace(/"/g, "").trim(),
              name: name?.replace(/"/g, "").trim(),
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

      // Save to DB
      for (const student of records) {
        console.log("DEBUG:", student);

        const studentId = parseInt(student["id"], 10);
        const studentAttendance = parseInt(student["attendance"], 10);

        if (isNaN(studentId) || isNaN(studentAttendance)) {
          console.warn("⚠️ Skipping invalid row:", student);
          continue;
        }

        await prisma.studentAttendance.upsert({
          where: { id: studentId },
          update: {
            name: student["name"],
            attendance: studentAttendance,
          },
          create: {
            id: studentId,
            name: student["name"],
            attendance: studentAttendance,
          },
        });
      }

      // ✅ cleanup uploaded file to avoid filling /uploads
      fs.unlinkSync(filePath);

      res.json({ message: "✅ All records successfully saved to DB!" });
    } catch (error) {
      console.error("🔥 An error occurred:", error);
      res.status(500).json({ error: "Failed to process file" });
    }
  }
);

app.listen(3902, () => {
  console.log("🚀 Server running on port 3902");
});

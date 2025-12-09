import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import csvParser from "csv-parser";
import { prisma } from "../db"; 


export default async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.join(process.cwd(), file.path);
    const students: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        students.push({
          name: row.name,
          email: row.email,
          rollNumber: row.rollNumber,
          classId: parseInt(row.classId, 10),
        });
      })
      .on("end", async () => {
        try {
          await prisma.student.createMany({
            data: students,
            skipDuplicates: true,
          });
          fs.unlinkSync(filePath); 
          return res.status(200).json({ message: "Students added successfully" });
        } catch (dbError) {
          console.error("Database error:", dbError);
          return res.status(500).json({ error: "Failed to add students to the database" });
        }
      });
  } catch (error: any) {
    console.error("Error processing file:", error);
    return res.status(500).json({ error: "An error occurred while processing the file" });
  }
};
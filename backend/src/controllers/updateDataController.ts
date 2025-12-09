import type { Request, Response } from "express"
import path from "path";
import validateFile from "../services/validator/validator";
import {prisma} from "../db"

export default async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.join(process.cwd(), file.path);

    const { validData, errors } = await validateFile(filePath, file.originalname);
    //                                 

    if (validData.length > 0) {
      await prisma.student.createMany({
        data: validData,
        skipDuplicates: true,
      });
      return res.status(200).json({ message: "Data updated successfully" });
    }

    return res.json({
      message: "Upload completed",
      totalRows: validData.length + errors.length,
      saved: validData.length,
      rejected: errors.length,
      errors,
    });
  } catch (error: any) {
    return res.json({ error: error.message });
  }
};

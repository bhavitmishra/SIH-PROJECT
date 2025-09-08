import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import AdmZip from "adm-zip";
import path from "path";

const app = express();
app.use(cors());

// ⚠️ don't use express.json() for file uploads, it conflicts with multipart/form-data
// app.use(express.json());

// setup multer to dump files into /uploads
const upload = multer({ dest: "uploads/" });

app.post(
  "/ietwebhook/attendance",
  upload.single("file"), // "file" must match FormData.append key in frontend
  (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📩 Zip uploaded:", req.file.originalname);

    // inspect the contents
    const zip = new AdmZip(req.file.path);
    const entries = zip.getEntries();

    console.log("📂 Files inside the zip:");
    entries.forEach((entry) => {
      console.log(`- ${entry.entryName} (${entry.header.size} bytes)`);
    });

    // optional: extract to disk
    const extractPath = path.join(__dirname, "unzipped");
    zip.extractAllTo(extractPath, true);

    res.json({ message: "✅ Zip received and processed" });
  }
);

app.listen(3333, () => {
  console.log("🚀 Webhook server running on port 3333");
});

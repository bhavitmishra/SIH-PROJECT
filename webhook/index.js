"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// ⚠️ don't use express.json() for file uploads, it conflicts with multipart/form-data
// app.use(express.json());
// setup multer to dump files into /uploads
const upload = (0, multer_1.default)({ dest: "uploads/" });
app.post("/ietwebhook/attendance", upload.single("file"), // "file" must match FormData.append key in frontend
(req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    console.log("📩 Zip uploaded:", req.file.originalname);
    // inspect the contents
    const zip = new adm_zip_1.default(req.file.path);
    const entries = zip.getEntries();
    console.log("📂 Files inside the zip:");
    entries.forEach((entry) => {
        console.log(`- ${entry.entryName} (${entry.header.size} bytes)`);
    });
    // optional: extract to disk
    const extractPath = path_1.default.join(__dirname, "unzipped");
    zip.extractAllTo(extractPath, true);
    res.json({ message: "✅ Zip received and processed" });
});
app.listen(3333, () => {
    console.log("🚀 Webhook server running on port 3333");
});

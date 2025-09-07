"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const XLSX = __importStar(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("./generated/prisma");
const prisma = new prisma_1.PrismaClient();
const app = (0, express_1.default)();
const upload = (0, multer_1.default)({ dest: "uploads/" });
app.use((0, cors_1.default)());
app.post("/upload/attendance", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const filePath = req.file.path;
        const ext = path_1.default.extname(req.file.originalname).toLowerCase(); // ✅ use original filename for extension
        let records = [];
        if (ext === ".csv") {
            // Parse CSV manually
            const csvData = fs_1.default.readFileSync(filePath, "utf8");
            records = csvData
                .split("\n")
                .slice(1) // skip header
                .filter((line) => line.trim() !== "")
                .map((line) => {
                const [id, name, attendance] = line.split(",");
                return {
                    id: id === null || id === void 0 ? void 0 : id.replace(/"/g, "").trim(),
                    name: name === null || name === void 0 ? void 0 : name.replace(/"/g, "").trim(),
                    attendance: attendance === null || attendance === void 0 ? void 0 : attendance.replace(/"/g, "").trim(),
                };
            });
        }
        else if (ext === ".xlsx") {
            // Parse XLSX
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            records = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        }
        else {
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
            yield prisma.studentAttendance.upsert({
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
        fs_1.default.unlinkSync(filePath);
        res.json({ message: "✅ All records successfully saved to DB!" });
    }
    catch (error) {
        console.error("🔥 An error occurred:", error);
        res.status(500).json({ error: "Failed to process file" });
    }
}));
app.listen(3902, () => {
    console.log("🚀 Server running on port 3902");
});

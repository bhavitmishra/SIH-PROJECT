import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import uploadrouter from "./routes/uploadData";

dotenv.config();
const app = express();

app.use("/api" , uploadrouter)

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes will come here later
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 2025;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

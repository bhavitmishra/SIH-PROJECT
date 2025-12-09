import { Router } from "express";
import multer from "multer";
import studentController from "../controllers/studentController";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post("/basicData", upload.single("file"), studentController);

export default router;
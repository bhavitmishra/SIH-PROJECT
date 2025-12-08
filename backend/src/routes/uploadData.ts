import { Router } from "express";
import multer from "multer";
import updateDataController from "../controllers/updateDataController";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.post(
    "/upload-students",
    upload.single("file"),
    updateDataController
)

export default router;
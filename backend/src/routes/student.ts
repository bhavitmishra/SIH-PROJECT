import { Router } from "express";
import studentController from "../controllers/studentController.js";

const router = Router();

router.post("/basicData" , studentController)

export default router
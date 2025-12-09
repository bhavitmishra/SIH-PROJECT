import { Router } from "express";
import instituteSetupController from "../controllers/instituteSetupController";
const router = Router();

router.post("/setup", instituteSetupController);

export default router;
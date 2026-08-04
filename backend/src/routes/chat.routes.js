import { Router } from "express";
import { sendMessage } from "../controllers/chat.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", protect, sendMessage);

export default router;

import { Router } from "express";
import { sendMessage, getHistory } from "../controllers/chat.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", protect, sendMessage);
router.get("/history", protect, getHistory);

export default router;

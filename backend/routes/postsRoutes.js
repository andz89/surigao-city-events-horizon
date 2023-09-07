import express from "express";
import { addPost } from "../controllers/postsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addPost", protect, addPost);

export default router;

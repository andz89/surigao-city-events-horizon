import {
  addBookmark,
  bookmarksByOwner,
  removeBookmark,
} from "../controllers/bookmarkController.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();
router.post("/addBookmark", protect, addBookmark);
router.route("/bookmarksByOwner").get(bookmarksByOwner);
router.put("/removeBookmark", protect, removeBookmark);
export default router;

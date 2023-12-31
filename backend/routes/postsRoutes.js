import express from "express";
import {
  addPost,
  getOrganizerPosts,
  addComment,
  removePost,
  removeComment,
  editPost,
  getPublicPosts,
  getPostsByOwner,
} from "../controllers/postsController.js";
import multer from "multer";
import path from "path";
import { getString } from "../middleware/randomString.js";
import { protect } from "../middleware/authMiddleware.js";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, getString() + "-" + uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post(
  "/addPost",
  protect,
  upload.fields([
    {
      name: "image_one",
      maxCount: 1,
    },
    {
      name: "image_two",
      maxCount: 1,
    },
  ]),
  addPost
);
router.put("/addComment", protect, addComment);
router.put("/removePost", protect, removePost);
router.put("/removeComment", protect, removeComment);
router.put(
  "/editPost",
  protect,
  upload.fields([
    {
      name: "image_one",
      maxCount: 1,
    },
    {
      name: "image_two",
      maxCount: 1,
    },
  ]),
  editPost
);

router.route("/").get(protect, getOrganizerPosts);
router.route("/publicPosts").get(protect, getPublicPosts);
router.route("/postsByOwner").get(protect, getPostsByOwner);

export default router;

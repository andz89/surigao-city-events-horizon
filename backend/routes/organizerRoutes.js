import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  updateImageBg,
  // getUserProfile,
  getOrganizerProfile,
  updateUserProfile,
  updateUserPassword,
} from "../controllers/organizerController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import { getString } from "../middleware/randomString.js";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, getString() + "-" + uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

router
  .route("/profile")

  // .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/organizerProfile").get(protect, getOrganizerProfile);

router.route("/updatePassword").put(protect, updateUserPassword);

router.route("/imageBg").put(
  protect,
  upload.fields([
    {
      name: "imageBg",
      maxCount: 1,
    },
  ]),
  updateImageBg
);
export default router;

import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  updateImageBg,
  getOrganizerProfile,
  updateUserProfile,
  updateUserPassword,
  publicProfile,
} from "../controllers/organizerController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import { getString } from "../middleware/randomString.js";
import { v4 as uuidv4 } from "uuid";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "backend/backend/public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, getString() + "-" + uuidv4() + path.extname(file.originalname));
//   },
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      cb(null, "backend/");
    } catch (error) {
      console.error("Error finding the destination path:", error);
      cb(error, null);
    }
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

router.route("/profile").put(protect, updateUserProfile);
router.route("/organizerProfile").get(protect, getOrganizerProfile);
router.route("/publicProfile").get(protect, publicProfile);

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

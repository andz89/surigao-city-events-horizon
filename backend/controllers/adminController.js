import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import {
  generateRefreshToken,
  generateAccessToken,
} from "../utils/generateToken.js";
import { deleteImage } from "../helper/deleteImage.js";
// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    console.log(user.roles);
    const data = {
      name: user.name,
      email: user.email,
      number: user.number,
      roles: user.roles,
      userId: user._id,
    };
    // create JWTs
    const accessToken = generateAccessToken(res, user.name, user.roles);
    generateRefreshToken(res, user);

    res.json({ data, accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export { authUser, logoutUser };

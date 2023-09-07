import asyncHandler from "express-async-handler";

import Post from "../models/postsModel.js";

// @desc    Update user profile
// @route   PUT /api/users/addpost
// @access  Private
const addPost = asyncHandler(async (req, res) => {
  if (!req.body.content || !req.body.title) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const posts = await Post.create({
    title: req.body.title,
    content: req.body.content,
    user: req.user._id,
  });
  res.json({ posts });
});

export { addPost };

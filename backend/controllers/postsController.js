import asyncHandler from "express-async-handler";

import Post from "../models/postsModel.js";

// @desc    add Post
// @route   POST /api/users/addpost
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
// @desc    Get organizer posts
// @route   GET /api/posts
// @access  Private
const getOrganizerPosts = asyncHandler(async (req, res) => {
  const post = await Post.find({ user: req.user._id });

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Posts not found");
  }
});
export { addPost, getOrganizerPosts };

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
    name: req.body.name,
    agency: req.body.agency,
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
const addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.postId);
  const commentData = {
    commentId: req.body.commentId,
    postId: req.body.postId,
    name: req.body.name,
    comment: req.body.comment,
    date: req.body.date,
  };
  if (post) {
    post.comments.push(commentData);

    await post.save();

    res.json({
      comment: commentData,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const removePost = asyncHandler(async (req, res) => {
  const postId = req.body.postId;

  try {
    // Use async/await with findByIdAndRemove to ensure proper handling of asynchronous code.
    const removedPost = await Post.findByIdAndRemove(postId);

    // Check if the post was found and removed successfully.
    if (!removedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const removeComment = asyncHandler(async (req, res) => {
  const postId = req.body.postId;
  const commentId = req.body.commentId;

  try {
    // Use async/await with findByIdAndRemove to ensure proper handling of asynchronous code.
    const post = await Post.findById(postId);

    // Check if the post was found and removed successfully.
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const new_comment = post.comments.filter((comment) => {
      return comment._id.toString() !== commentId;
    });

    post.comments = new_comment;
    await post.save();
    res.json({ message: "Post removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export { addPost, getOrganizerPosts, addComment, removePost, removeComment };

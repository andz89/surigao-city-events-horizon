import asyncHandler from "express-async-handler";
import Bookmark from "../models/bookmarkModel.js";
const addBookmark = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const userId = req.user._id;
  const existingBookmark = await Bookmark.findOne({
    post_id: postId,
    user_id: userId,
  });

  if (existingBookmark) {
    res.json({ message: "Post is already saved " });
  } else {
    await Bookmark.create({
      post_id: req.body.postId,
      user_id: req.user._id,
    });
  }

  res.json({ message: "Post added to saved events " });
});
const bookmarksByOwner = asyncHandler(async (req, res) => {
  const user_id = req.query.id;

  const bookmarkId = await Bookmark.find({ user_id: user_id }); //find all post that has this owner id

  res.json(bookmarkId);
});
const removeBookmark = asyncHandler(async (req, res) => {
  const postId = req.body.postId;
  const userId = req.user._id;

  const existingBookmark = await Bookmark.findOne({
    post_id: postId,
    user_id: userId,
  });

  await Bookmark.findByIdAndRemove(existingBookmark._id.toString());

  res.json(existingBookmark);
});
export { addBookmark, bookmarksByOwner, removeBookmark };

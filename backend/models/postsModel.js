import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    postId: mongoose.Schema.Types.ObjectId,
    name: String,
    comment: String,
    date: Date,
  },
  {
    timestamps: true,
  }
);

const postsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    agency: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("Posts", postsSchema);

export default Posts;

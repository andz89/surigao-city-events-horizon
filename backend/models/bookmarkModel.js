import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    post_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bookmark = mongoose.model("Bookmark", userSchema);

export default Bookmark;

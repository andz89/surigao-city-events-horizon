import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentAdded } from "../../features/posts/postsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useAddCommentMutation } from "../../features/posts/postsApiSlice";
import { toast } from "react-toastify";
const AddComment = ({ post }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const name = userInfo.data.user.name;

  const date = new Date().toISOString();
  const commentId = nanoid();
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [addComments, { isLoading }] = useAddCommentMutation();
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const postId = post._id;
    if (comment) {
      try {
        const res = await addComments({
          postId,
          name,
          comment,
          commentId,
        }).unwrap();
        console.log(res.comment.commentId);
        const data = {
          postId,
          _id: res.comment.commentId,
          comment: res.comment.comment,
          name: res.comment.name,
          createdAt: new Date().toISOString(),
        };
        console.log(data);
        dispatch(commentAdded(data));

        toast.success("Publish Successfuly", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setComment("");
      } catch (error) {
        toast.error(error?.data?.message, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    }

    // dispatch(commentAdded({ postId, userEmail, comment, date }));
    setComment("");
  };
  return (
    <div>
      <form>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="1"
              className="outline-none w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2  px-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              onClick={handleCommentSubmit}
            >
              Post comment
            </button>
          </div>
        </div>
      </form>
      <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">
        Remember, contributions to this topic should follow our{" "}
        <a
          href="#"
          className="text-blue-600 dark:text-blue-500 hover:underline"
        >
          Community Guidelines
        </a>
        .
      </p>
    </div>
  );
};

export default AddComment;

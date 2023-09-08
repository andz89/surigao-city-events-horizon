import TimeAgo from "./TimeAgo";
import { useEffect, useState } from "react";
import { removeComment } from "../../features/posts/postsSlice";
import { useDispatch } from "react-redux";
import { useDeleteCommentMutation } from "../../features/posts/postsApiSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
const Comments = ({ comments, postId }) => {
  const [viewComments, setViewComments] = useState(false);
  const [deleteComment, { isLoading: deleteCommentLoading }] =
    useDeleteCommentMutation();
  const dispatch = useDispatch();
  const handleRemove = async (commentId) => {
    try {
      await deleteComment({ postId, commentId }).unwrap();

      toast.success("Delete Successfully", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      dispatch(removeComment({ postId, commentId }));
      console.log(comments.length);
      if (comments.length === 1) {
        setViewComments(false);
      }
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
  };
  const orderedPosts = comments
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const userComments = orderedPosts.map((comment) => {
    return (
      <article key={comment.commentId}>
        <div className="border-slate-300 border p-1 rounded mb-3">
          <div className="flex justify-end">
            <div
              className="bg-slate-200 p-1 text-[11px] rounded cursor-pointer"
              onClick={() => handleRemove(comment.commentId)}
            >
              Delete Comment
            </div>
          </div>
          <div className="flex items-center">
            <div className="font-medium dark:text-white">
              <div className="text-sm my-[-8px]">{comment.name}</div>
              <TimeAgo timestamp={comment.createdAt} />
            </div>
          </div>

          <p className="  text-gray-500 text-sm dark:text-gray-400">
            {comment.comment}
          </p>
        </div>
      </article>
    );
  });

  return (
    <div>
      {deleteCommentLoading && <LoadingSpinner />}
      <div className="flex justify-end">
        {comments.length > 0 ? (
          <small
            className="cursor-pointer"
            onClick={() => setViewComments((prev) => !prev)}
          >
            {!viewComments ? <span>View</span> : <span>Hide</span>}{" "}
            {!viewComments
              ? comments.length === 0
                ? comments.length - 1
                : comments.length
              : comments.length}{" "}
            Comments
          </small>
        ) : (
          <span className="text-sm">No Comment</span>
        )}
      </div>
      <div
        className={
          viewComments ? "h-[240px] overflow-y-auto" : "  overflow-y-auto"
        }
      >
        {viewComments && userComments}
        {!viewComments && comments.length > 0 && (
          <article key={comments[comments.length - 1]?.commentId}>
            <div className="border-slate-300 border p-1 rounded mb-3">
              <div className="flex justify-end">
                <div
                  className="bg-slate-200 p-1 text-[11px] rounded cursor-pointer"
                  onClick={() =>
                    handleRemove(comments[comments.length - 1]?.commentId)
                  }
                >
                  Delete Comment
                </div>
              </div>
              <div className="flex items-center">
                <div className="font-medium dark:text-white">
                  <div className="text-sm my-[-8px]">
                    {comments[comments.length - 1]?.name}
                  </div>
                  <TimeAgo
                    timestamp={comments[comments.length - 1]?.createdAt}
                  />
                </div>
              </div>

              <p className="  text-gray-500 text-sm dark:text-gray-400">
                {comments[comments.length - 1]?.comment}
              </p>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default Comments;

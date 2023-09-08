import TimeAgo from "./TimeAgo";
import { useState } from "react";
import { removeComment } from "../../features/posts/postsSlice";
import { useDispatch } from "react-redux";
import {
 useDeleteCommentMutation,
} from "../../features/posts/postsApiSlice";
import { toast } from "react-toastify";
const Comments = ({ comments,postId }) => {
  const [viewComments, setViewComments] = useState(false);
  const [deleteComment, {isLoading: deleteCommentLoading}] = useDeleteCommentMutation();
  const dispatch = useDispatch()
  const handleRemove = async (commentId)=>{
    try {
      await deleteComment({postId,commentId}).unwrap();
     
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

     dispatch(removeComment({postId,commentId}))
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
  const userComments = comments.map((comment) => {
    return (
      <article key={comment._id}>
        <div className="border-slate-300 border p-1 rounded mb-3">
        <div className="flex justify-end">
              <div className="bg-slate-200 p-1 text-[11px] rounded cursor-pointer" onClick={()=>handleRemove(comment._id )}>Delete Comment</div>
            </div>
          <div className="flex items-center">
           
            <div className="font-medium dark:text-white">
              <p className="text-sm">{comment.name}</p>
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
      <div className="flex justify-end">
        {comments.length > 0 ? (
          <small
            className="cursor-pointer"
            onClick={() => setViewComments((prev) => !prev)}
          >
            {!viewComments ? <span>View</span> : <span>Hide</span>}{" "}
            {comments.length} Comments{" "}
          </small>
        ) : (
          <span className="text-sm">No Comment</span>
        )}
      </div>
      {viewComments && userComments}
    </div>
  );
};

export default Comments;

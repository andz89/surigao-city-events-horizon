import { useState, useEffect } from "react";
import Header from "../Header";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { postEditted } from "../../features/posts/postsSlice";
import { useEditPostMutation } from "../../features/posts/postsApiSlice";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import TimeAgo from "../../component/posts/TimeAgo";
import Comments from "../../component/posts/Comments";
import AddComments from "../../component/posts/AddComments";
import { useDeletePostMutation } from "../../features/posts/postsApiSlice";
import { removePost } from "../../features/posts/postsSlice";
import ConfirmDiaglog from "../../component/ConfirmDialog";
const EditPostForm = ({ handleHideViewPost, viewPostId, userInfo }) => {
  const [deletePostId, setDeletePostId] = useState(false);
  const { posts } = useSelector((state) => state.posts);
  const viewPost = posts.filter((post) => post._id === viewPostId);
  const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation();
  const showConfirm = (id) => {
    setDeletePostId(id);
  };

  const dispatch = useDispatch();

  const handleDelete = async (postId) => {
    try {
      await deletePost({ postId }).unwrap();

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
      handleHideViewPost(viewPost[0]._id);
      dispatch(removePost({ postId }));
      setDeletePostId("");
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
  const toggleConfirmDelete = (b) => {
    if (b) {
      handleDelete(deletePostId);
    } else {
      setDeletePostId("");
    }
  };
  return (
    <>
      <section className="fixed top-0 left-0 right-0 z-50    p-4   bg-slate-900 bg-opacity-40 md:inset-0       flex items-center justify-center ">
        <div className="h-[100%] overflow-y-auto overflow-x-hidden ">
          <article key={viewPost[0]?._id}>
            <div className="sm:w-[600px] p-4 bg-white border border-gray-200   shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between gap-2">
                <div
                  className="bg-rose-500 p-1 rounded text-white font-semibold cursor-pointer text-sm flex items-center gap-1"
                  onClick={() => showConfirm(viewPost[0]?._id)}
                >
                  <FaTrash className="text-slate-100" />
                  Delete Post
                </div>
                <div
                  className="bg-slate-500 p-1 rounded text-white font-semibold cursor-pointer text-sm flex items-center gap-1"
                  onClick={() => handleHideViewPost(viewPost[0]?._id)}
                >
                  Close
                </div>
              </div>
              <div className="flex flex-col">
                <h5 className=" font-bold  text-gray-900 dark:text-white   sm:text-2xl ">
                  {viewPost[0]?.title}
                </h5>
                <small className="text-slate-500  ">
                  Agency Name: {viewPost[0]?.agency}
                </small>

                <small className="text-slate-500  ">
                  Event Organizer: {viewPost[0]?.name}
                </small>
                <div className="my-[0px]">
                  <small className="text-slate-500 "> Published: </small>{" "}
                  <TimeAgo timestamp={viewPost[0]?.dateCreated} />
                  {viewPost[0]?.dateCreated !== viewPost[0]?.dateUpdated && (
                    <span className="block mt-[-5px]">
                      <small className="text-slate-500 "> last update: </small>{" "}
                      <TimeAgo timestamp={viewPost[0]?.dateUpdated} />
                    </span>
                  )}
                </div>
                {}
              </div>
              <div className="p-4  ">
                <img
                  src={viewPost[0]?.image_one}
                  className="object-cover h-[300px] w-full"
                />
              </div>

              <p className="mb-3 px-3 font-normal text-gray-700 dark:text-gray-400 sm:text-base">
                {viewPost[0]?.content}
              </p>

              <div className="mt-5">
                {viewPost[0]?.comments && (
                  <Comments
                    comments={viewPost[0]?.comments}
                    postId={viewPost[0]?._id}
                    postOwnerId={viewPost[0]?.user}
                    userInfo={userInfo}
                  />
                )}

                <AddComments post={viewPost} />
              </div>
            </div>
          </article>
        </div>
      </section>
      {deletePostId && (
        <ConfirmDiaglog toggleConfirmDelete={toggleConfirmDelete} />
      )}
      {deleteLoading && <LoadingSpinner />}
    </>
  );
};

export default EditPostForm;

import { useSelector, useDispatch } from "react-redux";

import { FaTrash, FaRegEdit } from "react-icons/fa";
import TimeAgo from "../../component/posts/TimeAgo";
import { useEffect, useState } from "react";
import Comments from "../../component/posts/Comments";
import AddComments from "../../component/posts/AddComments";
import Header from "../../component/Header";
import AddPostForm from "../../component/posts/AddPostForm";
import { removePost } from "../../features/posts/postsSlice";
import {
  useGetPostMutation,
  useDeletePostMutation,
} from "../../features/posts/postsApiSlice";
import { postsFetched } from "../../features/posts/postsSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../../component/LoadingSpinner";
import EditPostForm from "../../component/posts/EditPostForm";
import MiniLoading from "../../component/MiniLoading";
import ConfirmDiaglog from "../../component/ConfirmDialog";
const Posts = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [getPosts, { isLoading: getPostsLoading }] = useGetPostMutation();
  const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation();

  const [editPostId, setEditPostId] = useState("");
  const [deletePostId, setDeletePostId] = useState(false);

  const showConfirm = (id) => {
    setDeletePostId(id);
  };
  const handleDelete = async (postId) => {
    console.log(postId);
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
  const handleHideEditForm = async () => {
    setEditPostId("");
  };
  const handleShowEditForm = (e) => {
    setEditPostId(e);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPosts().unwrap();

        dispatch(postsFetched(res));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const renderedPosts = orderedPosts?.map((post) => (
    <article key={post._id}>
      <div className="sm:w-[600px] p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col">
          <h5 className=" font-bold  text-gray-900 dark:text-white   sm:text-2xl ">
            {post.title}
          </h5>
          <small className="text-slate-500  ">Agency Name: {post.agency}</small>

          <small className="text-slate-500  ">
            Event Organizer: {post.name}
          </small>
          <div className="my-[0px]">
            <small className="text-slate-500 "> Published: </small>{" "}
            <TimeAgo timestamp={post.dateCreated} />
            {post.dateCreated !== post.dateUpdated && (
              <span>
                ;<small className="text-slate-500 "> last update: </small>{" "}
                <TimeAgo timestamp={post.dateUpdated} />
              </span>
            )}
          </div>
        </div>

        <br />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 sm:text-base">
          {post.content}
        </p>

        <div className="mt-5">
          <Comments comments={post?.comments} postId={post._id} />

          <AddComments post={post} />
        </div>
      </div>
    </article>
  ));

  return (
    <>
      <Header />
      <AddPostForm />
      {getPostsLoading ? (
        <MiniLoading />
      ) : (
        <section className="">
          <div className="flex justify-center flex-col items-center gap-4">
            {renderedPosts}
          </div>
        </section>
      )}
    </>
  );
};
export default Posts;

import { useSelector, useDispatch } from "react-redux";

import { FaTrash, FaRegEdit } from "react-icons/fa";
import TimeAgo from "../../component/posts/TimeAgo";
import { useEffect, useState } from "react";
import Comments from "../../component/posts/Comments";
import AddComments from "../../component/posts/AddComments";

import AddPostForm from "../../component/posts/AddPostForm";
import { removePost } from "../../features/posts/postsSlice";
import {
  useGetOrganizerPostMutation,
  useDeletePostMutation,
} from "../../features/posts/postsApiSlice";
import { postsFetched } from "../../features/posts/postsSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../../component/LoadingSpinner";
import EditPostForm from "../../component/posts/EditPostForm";
import MiniLoading from "../../component/MiniLoading";
import ConfirmDiaglog from "../../component/ConfirmDialog";
import Label from "../../component/HeaderAndsidebar/Label";
import UseSearchPosts from "../../hooks/useSearchPost";
const Posts = ({ displayLabel, userInfo }) => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [getOrganizerPost, { isLoading: getOrganizerPostLoading }] =
    useGetOrganizerPostMutation();
  const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation();
  const [results, setResults] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const [editPostId, setEditPostId] = useState("");
  const [deletePostId, setDeletePostId] = useState(false);
  const [renderImage, setRenderImage] = useState(false);
  const showConfirm = (id) => {
    setDeletePostId(id);
  };
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

      dispatch(removePost({ postId }));
      setRefetch(true);
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
        const res = await getOrganizerPost().unwrap();
        setResults(res);
        dispatch(postsFetched(res));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Do something with the updated results here
    setResults(posts);
    setRefetch(false);
  }, [refetch]);

  const ViewImg = ({ img }) => {
    return (
      <>
        <div className="fixed top-0  left-0 right-0 z-50   w-full   overflow-x-hidden bg-slate-900 bg-opacity-40  md:inset-0 h-[calc(100%-1rem)]  h-screen ">
          <div className="top-5 right-10 fixed flex justify-end  ">
            <span
              className="bg-slate-800 p-2 rounded text-white cursor-pointer font-semibold"
              onClick={() => setRenderImage(false)}
            >
              Close
            </span>
          </div>
          <div>
            <div className=" flex items-center m-auto bg-slate-200 h-screen max-h-full p-2 justify-center overflow-y-auto">
              <img
                className="sm:w-[600px]  my-auto  max-w-2xl "
                src={"/" + img}
                alt="image description"
              />
            </div>
          </div>
        </div>
      </>
    );
  };
  const RenderImages = ({ image }) => {
    const arrayImg = [image.image_one, image.image_two];

    const images = arrayImg.map((img) => (
      <img
        key={img}
        onClick={() => setRenderImage(img)}
        src={"/" + img}
        className="object-cover h-[200px] w-full"
      />
    ));
    return <>{images}</>;
  };

  document.body.style.overflow = renderImage ? "hidden" : "";

  const orderedPosts = results
    .slice()
    .sort((a, b) => b.dateCreated.localeCompare(a.dateCreated));

  const renderedPosts = orderedPosts?.map((post) => (
    <article key={post._id}>
      <div className="  p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end gap-2">
          <div
            className="bg-rose-500 p-1 rounded text-white font-semibold cursor-pointer text-sm flex items-center gap-1"
            onClick={() => showConfirm(post._id)}
          >
            <FaTrash className="text-slate-100" />
            Delete Post
          </div>
          <div
            className="bg-slate-500 p-1 rounded text-white font-semibold cursor-pointer text-sm flex items-center gap-1"
            onClick={() => handleShowEditForm(post._id)}
          >
            {" "}
            <FaRegEdit /> Edit Post{" "}
          </div>
        </div>
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
              <span className="block mt-[-5px]">
                <small className="text-slate-500 "> last update: </small>{" "}
                <TimeAgo timestamp={post.dateUpdated} />
              </span>
            )}
          </div>
          {}
        </div>
        <div className="p-4 flex  flex-wrap">
          <RenderImages image={post} />
        </div>

        <p className="mb-3 px-3 font-normal text-gray-700 dark:text-gray-400 sm:text-base">
          {post.content}
        </p>

        <div className="mt-5">
          <Comments
            comments={post?.comments}
            postId={post._id}
            postOwnerId={post.user}
            userInfo={userInfo}
            setRefetch={setRefetch}
          />

          <AddComments post={post} setRefetch={setRefetch} />
        </div>
      </div>
    </article>
  ));

  return (
    <>
      <UseSearchPosts posts={posts} setResults={setResults} />
      {renderImage && <ViewImg img={renderImage} />}
      {deletePostId && (
        <ConfirmDiaglog toggleConfirmDelete={toggleConfirmDelete} />
      )}
      {deleteLoading && <LoadingSpinner />}
      {editPostId && (
        <EditPostForm
          handleHideEditForm={handleHideEditForm}
          editPostId={editPostId}
          setRefetch={setRefetch}
        />
      )}
      {displayLabel && (
        <Label>
          <div>Post</div>
        </Label>
      )}

      {getOrganizerPostLoading ? (
        <MiniLoading />
      ) : (
        <section className="">
          <div className="flex justify-center flex-col   gap-4 w-full mx-auto max-w-2xl  ">
            <AddPostForm setRefetch={setRefetch} />

            {renderedPosts}
          </div>
        </section>
      )}
    </>
  );
};
export default Posts;

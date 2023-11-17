import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import TimeAgo from "../../component/posts/TimeAgo";
import { useEffect, useState } from "react";
import Comments from "../../component/posts/Comments";
import AddComments from "../../component/posts/AddComments";

import Header from "../../component/Header";
import { toast } from "react-toastify";

import { useGetPublicPostMutation } from "../../features/posts/postsApiSlice";
import { postsFetched } from "../../features/posts/postsSlice";

import MiniLoading from "../../component/MiniLoading";
import { useAddBookmarkMutation } from "../../features/bookmark/bookmarksApiSlice";

import { FaExternalLinkAlt, FaBookmark } from "react-icons/fa";
import UseSearchPosts from "../../hooks/useSearchPost";
import LoadingSpinner from "../../component/LoadingSpinner";

const Posts = () => {
  const [results, setResults] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [addBookmark, { isLoading: addBookmarkLoading }] =
    useAddBookmarkMutation();
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [getPosts, { isLoading: getPostsLoading }] = useGetPublicPostMutation();
  const [renderImage, setRenderImage] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const handleBookmarkPost = async (postId) => {
    try {
      const res = await addBookmark({ postId }).unwrap();

      toast.success(res.message, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      toast.error("Someting went wrong", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPosts().unwrap();
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
      <div className=" sm:w-[600px] p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col ">
          <div className="flex items-center w-full justify-between">
            <div
              onClick={() => handleBookmarkPost(post._id)}
              className="flex justify-center items-center gap-2 hover:bg-slate-200 py-1 px-2 rounded cursor-pointer"
            >
              <FaBookmark className="text-blue-800" />{" "}
              <span className="font-semibold">Save Post</span>
            </div>
            <Link to={`${"/profile/" + post.user}`} target="_blank">
              <div className="flex items-center justify-center gap-2 font-semibold text-[14px] bg-slate-300 py-1 px-2 rounded hover:bg-slate-200 cursor-pointer">
                <span>Visit Page</span>
                <FaExternalLinkAlt />
              </div>
            </Link>
          </div>
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
      {addBookmarkLoading && <LoadingSpinner />}
      {renderImage && <ViewImg img={renderImage} />}
      <div className="sticky top-0">
        <Header />
      </div>

      <section className=" my-5">
        <div className="flex justify-center flex-col items-center gap-4">
          <UseSearchPosts posts={posts} setResults={setResults} />
          {getPostsLoading ? <MiniLoading /> : renderedPosts}
        </div>
      </section>
    </>
  );
};
export default Posts;

import { useSelector, useDispatch } from "react-redux";

import TimeAgo from "../../component/posts/TimeAgo";
import { useEffect } from "react";
import Comments from "../../component/posts/Comments";
import AddComments from "../../component/posts/AddComments";
import Header from "../../component/Header";
import { Link } from "react-router-dom";
import {
  useGetPublicPostMutation,
  useGetPostsByOwnerMutation,
} from "../../features/posts/postsApiSlice";
import { postsFetched } from "../../features/posts/postsSlice";

import MiniLoading from "../../component/MiniLoading";
import { FaExternalLinkAlt } from "react-icons/fa";
const Posts = ({ userInfo, postOwnerId }) => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [getPosts, { isLoading: getPostsLoading }] = useGetPublicPostMutation();
  const [getPostsByOwner, { isLoading: getPostsOwnerLoading }] =
    useGetPostsByOwnerMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPosts().unwrap();

        dispatch(postsFetched(res));
      } catch (error) {
        console.error(error);
      }
    };
    const postsByOwner = async () => {
      try {
        const res = await getPostsByOwner({ postOwnerId }).unwrap();

        dispatch(postsFetched(res));
      } catch (error) {
        console.error(error);
      }
    };

    if (postOwnerId) {
      postsByOwner();
    } else {
      fetchData();
    }
  }, []);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const renderedPosts = orderedPosts?.map((post) => (
    <article key={post._id}>
      <div className="mx-auto max-w-2xl w-full mt-5 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col">
          <div className="flex items-center w-full justify-end">
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
          <small className="text-slate-500  ">Agency Name: {post.agency}</small>{" "}
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

        <div className="py-4 px-1  ">
          <img
            src={"/" + post.image_one}
            className="object-cover h-[300px] w-full"
          />
        </div>
        <div className="sm:w-[630px] w-full mx-auto max-w-2xl">
          <p className="mb-3 px-1    font-normal text-gray-700 dark:text-gray-400  sm:text-base ">
            {post.content}
          </p>
        </div>
        <div className="mt-5">
          <Comments
            comments={post?.comments}
            postId={post._id}
            postOwnerId={post.user}
            userInfo={userInfo}
          />

          <AddComments post={post} />
        </div>
      </div>
    </article>
  ));

  return (
    <>
      {!postOwnerId && <Header />}

      {getPostsLoading ? (
        <div className="mt-6">
          <MiniLoading />
        </div>
      ) : (
        <section className="w-full mx-auto max-w-2xl my-6">
          <div className="flex justify-center flex-col items-center gap-4 ">
            {renderedPosts}
          </div>
        </section>
      )}
    </>
  );
};
export default Posts;

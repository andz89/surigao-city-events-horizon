import { useSelector, useDispatch } from "react-redux";

import TimeAgo from "../../component/posts/TimeAgo";
import { useEffect } from "react";
import Comments from "../../component/posts/Comments";
import AddComments from "../../component/posts/AddComments";
import Header from "../../component/Header";
import AddPostForm from "../../component/posts/AddPostForm";

import { useGetPublicPostMutation } from "../../features/posts/postsApiSlice";
import { postsFetched } from "../../features/posts/postsSlice";

import MiniLoading from "../../component/MiniLoading";

const Posts = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [getPosts, { isLoading: getPostsLoading }] = useGetPublicPostMutation();

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

        <div className="p-4  ">
          <img src={post.image_one} className="object-cover h-[300px] w-full" />
        </div>

        <p className="mb-3 px-3 font-normal text-gray-700 dark:text-gray-400 sm:text-base">
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

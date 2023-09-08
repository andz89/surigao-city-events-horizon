import { useSelector, useDispatch } from "react-redux";

import { FaArrowRight } from "react-icons/fa";
import TimeAgo from "../../component/posts/TimeAgo";
import { useEffect } from "react";
import Comments from "../../component/posts/Comments";
import AddComments from "../../component/posts/AddComments";
import Header from "../../component/Header";
import AddPostForm from "../../component/posts/AddPostForm";
import { useGetPostMutation } from "../../features/posts/postsApiSlice";
import { postAdded, postsFetched } from "../../features/posts/postsSlice";

const Posts = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [getPosts, { isLoading }] = useGetPostMutation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPosts().unwrap();

        dispatch(postsFetched(res));
        console.log(res);
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
      <div className="w-[800px] p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col">
          <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
          <small className="text-slate-500  ">
            Agency Name: {post.agencyName}
          </small>

          <small className="text-slate-500  ">
            Event Organizer: {post.organizer}
          </small>
          <TimeAgo timestamp={post.date} />
        </div>

        <br />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {post.content}
        </p>

        <div className="flex justify-end items-center">
          <div className="flex items-center p-1 text-xs   mb-2   text-center text-white bg-slate-600 rounded  hover:bg-slate-700   cursor-pointer">
            Read more
          </div>
        </div>

        <div className="mt-5">
          {/* <Comments comments={post.comments} />

          <AddComments post={post} /> */}
        </div>
      </div>
    </article>
  ));

  return (
    <>
      <Header />
      <AddPostForm />
      <section className="">
        <div className="flex justify-center flex-col items-center gap-4">
          {renderedPosts}
        </div>
      </section>
    </>
  );
};
export default Posts;

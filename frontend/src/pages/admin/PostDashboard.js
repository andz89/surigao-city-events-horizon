import Header from "../../component/Header";

import { postsFetched } from "../../features/posts/postsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useGetOrganizerPostMutation } from "../../features/posts/postsApiSlice";

import ViewPost from "../../component/posts/ViewPost";
import { parseISO, formatDistanceToNow, format } from "date-fns";
import UseSearchPost from "../../hooks/useSearchPost";
const Dashboard = () => {
  const timeAgo = (timestamp) => {
    let data = "";
    let date = parseISO(timestamp);

    // Format the date to display the month and year
    data = format(date, "MMMM yyyy");

    return data;
  };
  const [getOrganizerPost, { isLoading: getOrganizerPostLoading }] =
    useGetOrganizerPostMutation();
  const { posts } = useSelector((state) => state.posts);

  const [results, setResults] = useState([]);

  const [viewPostId, setViewPostId] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const handleHideViewPost = async () => {
    setViewPostId("");
  };
  useEffect(() => {
    setResults(posts);
  }, [posts]);
  const handleShowViewPost = (e) => {
    setViewPostId(e);
  };

  const dispatch = useDispatch();

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

  const orderedPosts = results
    .slice()
    .sort((a, b) => b.dateCreated.localeCompare(a.dateCreated));

  const renderedPosts = orderedPosts?.map((post) => (
    <tr key={post._id}>
      <td className="px-2 py-2">{post.agency}</td>
      <td className="px-2 py-2">{post.title}</td>

      <td className=" py-2">{timeAgo(post.dateCreated)}</td>
      <td className=" py-2">{post.comments.length}</td>
      <td className=" py-2">{post.status === true ? "Live" : "hidden"}</td>
      <td className=" py-2 flex items-center gap-3">
        <div
          onClick={() => handleShowViewPost(post._id)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
        >
          View
        </div>
      </td>
    </tr>
  ));
  return (
    <>
      <Header />
      <div className="bg-dark w-[200px]   rounded p-2 m-5 flex  gap-2 justify-between items-center">
        <h4 className="font-normal text-2xl  text-white mx-auto  ">
          Post Dashboard
        </h4>
        <UseSearchPost posts={posts} setResults={setResults} />
      </div>

      {viewPostId && (
        <ViewPost
          handleHideViewPost={handleHideViewPost}
          viewPostId={viewPostId}
          userInfo={userInfo}
        />
      )}
      <div className="px-2 sm:w-[95%] w-full mx-auto relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs   text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                Agency
              </th>
              <th scope="col" className="px-2 py-3">
                Post Title
              </th>
              <th scope="col" className="py-3">
                Published date
              </th>
              <th scope="col" className="py-3">
                Comments
              </th>
              <th scope="col" className="py-3">
                Status
              </th>
              <th scope="col" className="  py-3 ">
                <span className="text-dark">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>{renderedPosts}</tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;

import SideBar from "../../component/HeaderAndsidebar/SideBar";
import NavBar from "../../component/HeaderAndsidebar/NavBar";
import Label from "../../component/HeaderAndsidebar/Label";
import { postsFetched } from "../../features/posts/postsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useGetPostMutation } from "../../features/posts/postsApiSlice";
import EditPostForm from "../../component/posts/EditPostForm";
import ViewPost from "../../component/posts/ViewPost";

const Dashboard = () => {
  const [editPostId, setEditPostId] = useState("");
  const [viewPostId, setViewPostId] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const handleHideEditForm = async () => {
    setEditPostId("");
  };
  const handleShowEditForm = (e) => {
    setEditPostId(e);
  };
  const handleHideViewPost = async () => {
    setViewPostId("");
  };
  const handleShowViewPost = (e) => {
    setViewPostId(e);
  };
  const [getPosts, { isLoading: getPostsLoading }] = useGetPostMutation();
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
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
    .sort((a, b) => b.dateCreated.localeCompare(a.dateCreated));

  const renderedPosts = orderedPosts?.map((post) => (
    <tr key={post._id}>
      <td className="px-2 py-2">{post.title}</td>
      <td className=" py-2">{post.dateCreated}</td>
      <td className=" py-2">{post.comments.length}</td>

      <td className=" py-2 flex items-center gap-3">
        <div
          onClick={() => handleShowEditForm(post._id)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
        >
          Edit
        </div>
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
      <Label>Dashboard</Label>
      {editPostId && (
        <EditPostForm
          handleHideEditForm={handleHideEditForm}
          editPostId={editPostId}
        />
      )}
      {viewPostId && (
        <ViewPost
          handleHideViewPost={handleHideViewPost}
          viewPostId={viewPostId}
          userInfo={userInfo}
        />
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs   text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                Post Title
              </th>
              <th scope="col" className="py-3">
                Published date
              </th>
              <th scope="col" className="py-3">
                Comments
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

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
 
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
const Posts = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [getPosts] = useGetPostMutation();
  const [deletePost, {isLoading: deleteLoading}] = useDeletePostMutation();
 
const [editPostId, setEditPostId] = useState("")
  const handleDelete = async(postId) =>{
 
    try {
       await deletePost({postId}).unwrap();
      
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

      dispatch(removePost({postId}));
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
 const handleHideEditForm = ()=>{
  setEditPostId("")
 }
 const handleShowEditForm = (e)=>{
  setEditPostId(e)
}
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
      <div className="w-[800px] p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end gap-2">
        <div className="bg-rose-500 p-1 rounded text-white font-semibold cursor-pointer text-sm" onClick={()=>handleDelete(post._id)}>Delete Post</div>
        <div className="bg-slate-500 p-1 rounded text-white font-semibold cursor-pointer text-sm" onClick={()=>handleShowEditForm(post._id)} > Edit Post  </div>


        </div>
        <div className="flex flex-col">
          <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
          <small className="text-slate-500  ">Agency Name: {post.agency}</small>

          <small className="text-slate-500  ">
            Event Organizer: {post.name}
          </small>
          <div className="my-[-7px]">
          <small className="text-slate-500"> Published: </small>  <TimeAgo timestamp={post.dateCreated} />
          </div>
        
         { post.dateCreated !== post.dateUpdated && <div>
          <small className="text-slate-500"> Last update: </small>   <TimeAgo timestamp={post.dateUpdated} />
          </div>}


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
          <Comments comments={post?.comments} postId={post._id} />

          <AddComments post={post} />
        </div>
      </div>
    </article>
  ));

  return (
    <>
    {deleteLoading && <LoadingSpinner />}
    { editPostId && <EditPostForm handleHideEditForm={handleHideEditForm} editPostId={editPostId} />}
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

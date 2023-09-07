
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { commentAdded } from './postsSlice'
import {   nanoid } from "@reduxjs/toolkit";
const AddComment = ({post} ) => {
   const date = new Date().toISOString()
    const userEmail = post.organizer //for testing only. this data should from users data when login.
    const [comment, setComment] = useState("")
    const dispatch = useDispatch();

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    const postId = post.id
    dispatch(commentAdded({postId, userEmail, comment,date}));
 setComment("")
  };
  return (
    <div>
<form>
   <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
           <label htmlFor="comment" className="sr-only">Your comment</label>
           <textarea id="comment" rows="1" className="outline-none w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Write a comment..." required></textarea>
       </div>
       <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
           <button type="submit" className="inline-flex items-center py-2  px-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" onClick={handleCommentSubmit}>
               Post comment
           </button>
         
       </div>
   </div>
</form>
<p className="ml-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>

    </div>
  )
}

export default AddComment

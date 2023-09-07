 
import TimeAgo from "./TimeAgo"
import { useState } from "react"
const Comments = ({comments}) => {
    const [viewComments, setViewComments]= useState(false)

    const userComments = comments.map((comment) => {
        return (
            <article  key={comment.userEmail} >
    <div className="border-slate-300 border p-1 rounded mb-3">
    <div className="flex items-center">
    
    <div className="font-medium dark:text-white">
        <p className="text-sm">{comment.userEmail}</p>
        <TimeAgo   timestamp={comment.date} />

    </div>
</div>

<p className="  text-gray-500 text-sm dark:text-gray-400">{comment.comment}</p>

    </div>
  
</article>
          
        )
    })
 
  return (
    <div>
    <div className="flex justify-end">
    {comments.length > 0 ? <small className="cursor-pointer" onClick={()=>setViewComments(prev=>!prev)}>{!viewComments ?  <span>View</span>: <span>Hide</span>}{" "}{comments.length} Comments </small>: <span className="text-sm">No Comment</span>}
    </div>
      {viewComments && userComments }
    </div>
  )
}

export default Comments

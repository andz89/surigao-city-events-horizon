//local mutation
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare({ title, content, name, agency, _id }) {
        return {
          payload: {
            _id,
            title,
            content,
            name,
            agency,
            createdAt: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
            comments: [],
          },
        };
      },
    },
    postsFetched: (state, action) => {
      // Update the state with the posts received from the server
      state.posts = action.payload;
    },
    commentAdded: (state, action) => {
      const { commentId, postId, name, comment, createdAt } = action.payload;
      const existingPost = state.posts.find((post) => post._id === postId);

      if (existingPost) {
        existingPost.comments.push({
          commentId,
          postId,
          name,
          comment,
          createdAt,
        });
      }
    },
    removePost: (state, action) => {
      const { postId } = action.payload;
      const posts = state.posts.filter((post) => post._id !== postId);

      if (posts) {
        state.posts = posts;
      }
    },
    removeComment: (state, action) => {
      const { postId, commentId } = action.payload;
      const existingPost = state.posts.find((post) => post._id === postId);

      if (existingPost) {
        const newComments = existingPost.comments.filter(
          (comment) => comment.commentId !== commentId
        );
        existingPost.comments = newComments;
      }
    },
  },
});

export const {
  postAdded,
  commentAdded,
  postsFetched,
  removePost,
  removeComment,
} = postsSlice.actions;

export default postsSlice.reducer;

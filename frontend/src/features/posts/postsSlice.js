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
      prepare(title, content) {
        return {
          payload: {
            _id: nanoid(),
            title,
            content,
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
      const { postId, userEmail, comment, date } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.comments.push({ userEmail, comment, date });
      }
    },
  },
});

export const { postAdded, commentAdded, postsFetched } = postsSlice.actions;

export default postsSlice.reducer;

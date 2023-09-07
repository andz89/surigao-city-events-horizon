//local mutation
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const initialState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    organizer: "John Doe Manoo",
    agencyName: "Surigao Education Center",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    comments: [
      {
        userEmail: "andz@gmail.com",
        comment: "Nice, excited to see this event",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
      },
      {
        userEmail: "gwill@gmail.com",
        comment: "Me too!",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
      },
      {
        userEmail: "virginia@gmail.com",
        comment: "Happy to see you both!",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
      },
    ],
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
    organizer: "Mark Steve Smith",
    agencyName: "Surigao Cultural",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
    comments: [
      {
        userEmail: "virginia@gmail.com",
        comment: "Love this? andz?!",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
      },
      {
        userEmail: "andz@gmail.com",
        comment: "Yes my dear!",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
      },
      {
        userEmail: "gwill@gmail.com",
        comment: "so sweet!",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
      },
    ],
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
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

    commentAdded: (state, action) => {
      const { postId, userEmail, comment, date } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.comments.push({ userEmail, comment, date });
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded, commentAdded } = postsSlice.actions;

export default postsSlice.reducer;

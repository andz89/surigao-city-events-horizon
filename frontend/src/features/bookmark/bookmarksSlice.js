// //local mutation
// import { createSlice, nanoid } from "@reduxjs/toolkit";
// import { sub } from "date-fns";
// const initialState = {
//   bookmarks: [],
// };

// const bookmarksSlice = createSlice({
//   name: "bookmarks",
//   initialState,
//   reducers: {
//     postAdded: {
//       reducer(state, action) {
//         state.bookmarks.push(action.payload);
//       },
//       prepare({
//         title,
//         content,
//         name,
//         agency,
//         _id,
//         dateUpdated,

//         dateCreated,
//         image_one,
//         image_two,
//       }) {
//         return {
//           payload: {
//             _id,
//             title,
//             content,
//             name,
//             agency,
//             dateCreated,
//             dateUpdated,
//             image_one,
//             image_two,
//             reactions: {
//               thumbsUp: 0,
//               wow: 0,
//               heart: 0,
//               rocket: 0,
//               coffee: 0,
//             },
//             comments: [],
//           },
//         };
//       },
//     },
//     postsFetched: (state, action) => {
//       // Update the state with the posts received from the server
//       state.posts = action.payload;
//     },
//     commentAdded: (state, action) => {
//       const { commentId, postId, name, comment, createdAt, userId } =
//         action.payload;
//       const existingPost = state.posts.find((post) => post._id === postId);

//       if (existingPost) {
//         existingPost.comments.push({
//           commentId,
//           postId,
//           name,
//           comment,
//           createdAt,
//           userId,
//         });
//       }
//     },
//     postEditted: (state, action) => {
//       const { postId, title, content, dateUpdated, image_one, image_two } =
//         action.payload;
//       const existingPost = state.posts.find((post) => post._id === postId);

//       if (existingPost) {
//         existingPost.title = title;
//         existingPost.content = content;
//         existingPost.dateUpdated = dateUpdated;
//         existingPost.image_one = image_one;
//         existingPost.image_two = image_two;
//       }
//     },
//     removePost: (state, action) => {
//       const { postId } = action.payload;
//       const posts = state.posts.filter((post) => post._id !== postId);

//       if (posts) {
//         state.posts = posts;
//       }
//     },
//     removeComment: (state, action) => {
//       const { postId, commentId } = action.payload;
//       const existingPost = state.posts.find((post) => post._id === postId);

//       if (existingPost) {
//         const newComments = existingPost.comments.filter(
//           (comment) => comment.commentId !== commentId
//         );
//         existingPost.comments = newComments;
//       }
//     },
//   },
// });

// export const {
//   postAdded,
//   commentAdded,
//   postsFetched,
//   removePost,
//   removeComment,
//   postEditted,
// } = postsSlice.actions;

// export default postsSlice.reducer;

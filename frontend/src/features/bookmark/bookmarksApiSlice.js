//backend mutation
import { apiSlice } from "../api/apiSlice";
const Bookmark = "/api/bookmark";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    AddBookmark: builder.mutation({
      query: (data) => ({
        url: `${Bookmark}/addBookmark`,
        method: "POST",
        body: data, // Ensure data is properly included in the request body
      }),
    }),

    removeBookmark: builder.mutation({
      query: (data) => ({
        url: `${Bookmark}/removeBookmark`,
        method: "PUT",
        body: data,
      }),
    }),

    getBookmarksByOwner: builder.mutation({
      //get all posts of organizers
      query: (data) => ({
        url: `${Bookmark}/bookmarksByOwner?id=${data.user_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddBookmarkMutation,
  useGetBookmarksByOwnerMutation,
  useRemoveBookmarkMutation,
} = usersApiSlice;

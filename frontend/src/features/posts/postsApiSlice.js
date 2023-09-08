//backend mutation
import { apiSlice } from "../api/apiSlice";
const POST_URL = "/api/posts";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPost: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/addPost`,
        method: "POST",
        body: { ...data }, // Ensure data is properly included in the request body
      }),
    }),
    getPost: builder.mutation({
      query: () => ({
        url: `${POST_URL}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddPostMutation, useGetPostMutation } = usersApiSlice;

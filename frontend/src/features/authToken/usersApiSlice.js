import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/token";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refresh: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/refresh`,
        method: "GET",
      }),
    }),
  }),
});
export const { useRefreshMutation } = usersApiSlice;

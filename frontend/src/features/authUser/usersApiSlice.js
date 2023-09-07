import { apiSlice } from "../api/apiSlice";
const USERS_URL = "/api/users";
const ORGANIZER_URL = "/api/organizers";
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updatePassword`,
        method: "PUT",
        body: data,
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: `/api/token/refresh`,
        method: "GET",
      }),
    }),

    //organizer ------------------
    organizerLogin: builder.mutation({
      query: (data) => ({
        url: `${ORGANIZER_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    organizerUpdateProfile: builder.mutation({
      query: (data) => ({
        url: `${ORGANIZER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    organizerRegister: builder.mutation({
      query: (data) => ({
        url: `${ORGANIZER_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    organizerUpdatePassword: builder.mutation({
      query: (data) => ({
        url: `${ORGANIZER_URL}/updatePassword`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useRefreshMutation,
  useOrganizerLoginMutation,
  useOrganizerUpdateProfileMutation,
  useOrganizerRegisterMutation,
  useOrganizerUpdatePasswordMutation,
} = usersApiSlice;

import { createSlice } from "@reduxjs/toolkit";

// Get user from localStorage

const initialState = {
  userInfo: null,
};
// const initialState = {
//   userInfo: localStorage.getItem("UserInfo")
//     ? JSON.parse(localStorage.getItem("UserInfo"))
//     : null,
// };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // localStorage.setItem("UserInfo", JSON.stringify(action.payload));
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// local mutation

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // localStorage.setItem("UserInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      // localStorage.removeItem("UserInfo");
    },
    addBg: (state, action) => {
      state.userInfo.data.user.imageBg = action.payload;
      // localStorage.setItem("UserInfo", JSON.stringify(action.payload));
    },
  },
});
export const { setCredentials, logout, addBg } = authSlice.actions;
export default authSlice.reducer;

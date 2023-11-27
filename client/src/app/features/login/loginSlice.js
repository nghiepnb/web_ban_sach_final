import { createSlice } from "@reduxjs/toolkit";

const loginStorage =
  localStorage.getItem("userInfo") !== null
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {};

const initialState = {
  userInfo: loginStorage,
  isLogged: loginStorage?._id ? true : false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogged = true;
      state.userInfo = action.payload;
    },
    logout: (state, action) => {
      state.isLogged = false;
      state.userInfo = {};
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;

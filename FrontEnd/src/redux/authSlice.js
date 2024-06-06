import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    Login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    logout: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.Login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.Login.isFetching = false;
      state.Login.currentUser = action.payload;
      state.Login.error = false;
    },
    loginFalsed: (state) => {
      state.Login.isFetching = false;
      state.Login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    registerFalsed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    logOutStart: (state) => {
      state.logout.isFetching = true;
    },
    logOutSuccess: (state) => {
      state.logout.isFetching = false;
      state.logout.currentUser = null;
      state.logout.error = false;
    },
    logOutFalsed: (state) => {
      state.logout.isFetching = false;
      state.logout.error = true;
    },
  },
});
export const {
  loginStart,
  loginFalsed,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFalsed,
  logOutStart,
  logOutSuccess,
  logOutFalsed,
} = authSlice.actions;

export default authSlice.reducer;

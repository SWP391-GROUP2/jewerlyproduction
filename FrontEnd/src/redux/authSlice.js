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
      currentUser: null,
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
      state.register.currentUser = action.payload;
    },
    registerFalsed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    logOutStart: (state) => {
      state.Login.isFetching = true;
    },
    logOutSuccess: (state) => {
      state.Login.isFetching = false;
      state.Login.currentUser = null;
      state.register.currentUser = null;
      state.Login.error = false;
      state.register.error = false;
    },
    logOutFalsed: (state) => {
      state.Login.isFetching = false;
      state.Login.error = true;
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

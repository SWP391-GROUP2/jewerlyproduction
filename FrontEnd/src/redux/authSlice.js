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
  },
});
export const {
  loginStart,
  loginFalsed,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFalsed,
} = authSlice.actions;

export default authSlice.reducer;

import {
  loginFalsed,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFalsed,
  logOutStart,
} from "./authSlice";
import axios from "axios";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5066/api/Auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFalsed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:5066/api/Auth/register/customer", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFalsed());
  }
};

export const logOut = async (dispatch, navigate) => {
  dispatch(logOutStart());
  try {
    // Handle log out logic here
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logOutFalsed());
  }
};

export const loginWithGoogle = async (credential, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:5066/api/Auth/google-login",
      {
        credential,
      }
    );
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFalsed());
  }
};

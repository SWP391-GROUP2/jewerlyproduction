import { useSelector } from "react-redux";
import {
  loginFalsed,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFalsed,
  logOutStart,
  logOutSuccess,
  logOutFalsed,
} from "./authSlice";

import axios from "axios";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:5266/api/Account/login",
      user
    );
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFalsed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      "http://localhost:5266/api/Account/register/customer",
      user
    );
    dispatch(registerSuccess(res.data));
    navigate("/register");
  } catch (err) {
    dispatch(registerFalsed());
  }
};

export const logOut = async (dispatch, navigate) => {
  dispatch(logOutStart());
  try {
    await axios.post("http://localhost:5266/api/Account/logout");
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
      "http://localhost:5266/api/GoogleAuth/google-login",
      { Token: credential },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    console.error("Google login Failed", err);
    dispatch(loginFalsed());
  }
};

export const verifyOtp = async (otp, email) => {
  try {
    const response = await axios.post(
      "http://localhost:5266/api/Email/VerifyOTP",
      { otp, email }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to verify OTP", error);
    throw error;
  }
};

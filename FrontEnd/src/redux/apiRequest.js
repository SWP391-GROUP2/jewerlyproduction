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
      "https://localhost:7194/api/Account/login",
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
    await axios.post(
      "https://localhost:7194/api/Account/register/customer",
      user
    );
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFalsed());
  }
};

export const logOut = async (dispatch, navigate) => {
  dispatch(logOutStart());
  try {
    await axios.post("https://localhost:7194/api/Account/logout");
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
      "https://localhost:7194/api/GoogleAuth/google-login",
      credential
    );
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFalsed());
  }
};

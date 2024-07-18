import { jwtDecode } from "jwt-decode";
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
import Notify from "../components/Alert/Alert";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:5266/api/Account/login",
      user
    );
    dispatch(loginSuccess(res.data));
    console.log();

    // Điều hướng dựa trên vai trò của người dùng
    const tokenrole = jwtDecode(res.data.token);
    const role = tokenrole.role.toLowerCase();
    Notify.success("Login Successfully");
    switch (role) {
      case "admin":
        navigate("/admin/home");
        break;
      case "salestaff":
        navigate("/salestaff/home");
        break;
      case "designstaff":
        navigate("/designstaff/home");
        break;
      case "manager":
        navigate("/manager/home");
        break;
      case "productionstaff":
        navigate("/productionstaff/home");
        break;
      case "customer":
      default:
        navigate("/home");
        break;
    }
  } catch (err) {
    dispatch(loginFalsed());
    Notify.fail("This account does not exist. Please check your username.");
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
    Notify.success("Registered Successfully");
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
    Notify.success("Logout Successfully");
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
    if (!res.data.isPasswordSet) {
      navigate("/setpasswordaftergoogle", { state: { token: res.data.token } });
    } else {
      dispatch(loginSuccess(res.data));
      const tokenrole = jwtDecode(res.data.token);
      const role = tokenrole.role.toLowerCase();
      Notify.success("Login Successfully");
      switch (role) {
        case "admin":
          navigate("/admin/home");
          break;
        case "salestaff":
          navigate("/salestaff/home");
          break;
        case "designstaff":
          navigate("/designstaff/home");
          break;
        case "manager":
          navigate("/manager/home");
          break;
        case "productionstaff":
          navigate("/productionstaff/home");
          break;
        case "customer":
        default:
          navigate("/home");
          break;
      }
    }
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
    Notify.fail("Incorrect OTP. Please try again.");
    throw error;
  }
};

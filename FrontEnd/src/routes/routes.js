import React from "react";
import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginForm from "../components/LoginForm/LoginForm";
import Register from "../components/Register/Register";
import FogetPassword from "../pages/FogetPassword/FogetPassword";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import GemstonePage from "../pages/GemstonePage/GemstonePage";
import GoldPage from "../pages/GoldPage/GoldPage";
import NotFound from "../pages/NotFound/NotFound";
import CustomizePage from "../pages/CustomizePage/CustomizePage";
import GemstoneDetailPage from "../pages/GemstoneDetailPage/GemstoneDetailPage";
import SendOTP from "../pages/SendOTP/SendOTP";
import ForgetPasswordVerify from "../pages/ForgetPasswordVerify/ForgetPasswordVerify";
import AdminPage from "../pages/AdminPage/AdminPage";
import SaleStaffPage from "../pages/SaleStaffPage/SaleStaffPage";
import DesignStaffPage from "../pages/DesignStaffPage/DesignStaffPage";
import ManagerPage from "../pages/ManagerPage/ManagerPage";
import ProductionStaffPage from "../pages/ProductionStaffPage/ProductionStaffPage";
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage";
import CallBack from "../pages/CallBackPage/CallBackPage";
import CheckOutLast from "../pages/CheckOutLast/CheckOutLast";
import SetPassword from "../pages/SetPassword/SetPassword";

const routes = [
  // Guest Routes
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: <HomePage /> },
  { path: "/forget", element: <FogetPassword /> },
  { path: "*", element: <NotFound /> },
  { path: "/", element: <Navigate to="/home" /> },
  { path: "/product", element: <ProductPage /> },
  { path: "/gemstone", element: <GemstonePage /> },
  { path: "/gold", element: <GoldPage /> },
  { path: "/gemstonedetail", element: <GemstoneDetailPage /> },
  { path: "/productdetails", element: <ProductDetailsPage /> },
  { path: "/product/:productId", element: <ProductDetailsPage /> },
  { path: "/gemstone/:gemstoneId", element: <GemstoneDetailPage /> },
  { path: "/otp", element: <SendOTP /> },
  { path: "/forgetpasswordverify", element: <ForgetPasswordVerify /> },
  { path: "/setpasswordaftergoogle", element: <SetPassword /> },

  // Customer Routes
  { path: "/customer/profile", element: <UserProfilePage /> },
  { path: "/customer/customize", element: <CustomizePage /> },
  { path: "/customer/customize/:productId", element: <CustomizePage /> },
  { path: "/customer/resetpassword", element: <ResetPassword /> },
  { path: "/customer/checkoutpage", element: <CheckOutPage /> },
  { path: "/customer/checkoutlast", element: <CheckOutLast /> },
  {
    path: "/customer/callback/api/Payment/Check",
    element: <CallBack />,
  },
  {
    path: "/customer/checkoutpage/:customizeRequestId",
    element: <CheckOutPage />,
  },
  {
    path: "/customer/checkoutlast/:orderId",
    element: <CheckOutLast />,
  },

  // Admin Routes
  { path: "/admin/home", element: <AdminPage /> },

  // Sales Staff Routes
  { path: "/salestaff/home", element: <SaleStaffPage /> },

  // Design Staff Routes
  { path: "/designstaff/home", element: <DesignStaffPage /> },

  // Manager Routes
  { path: "/manager/home", element: <ManagerPage /> },

  // Production Staff Routes
  {
    path: "/productionstaff/home",
    element: <ProductionStaffPage />,
  },
];

export default routes;

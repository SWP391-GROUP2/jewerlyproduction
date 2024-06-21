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

const routes = [
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: <HomePage /> },
  { path: "/foget", element: <FogetPassword /> },
  { path: "/profile", element: <UserProfilePage /> },
  { path: "/product", element: <ProductPage /> },
  { path: "/gemstone", element: <GemstonePage /> },
  { path: "/gold", element: <GoldPage /> },
  { path: "/resetpassword", element: <ResetPassword /> },
  { path: "/", element: <Navigate to="/home" /> },
  { path: "/productdetails", element: <ProductDetailsPage /> },
  { path: "*", element: <NotFound /> },
  { path: "/customize", element: <CustomizePage /> },
];

export default routes;

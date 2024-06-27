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
import AdminPage from "../pages/AdminPage/AdminPage";
import SaleStaffPage from "../pages/SaleStaffPage/SaleStaffPage";
import DesignStaffPage from "../pages/DesignStaffPage/DesignStaffPage";
import ManagerPage from "../pages/ManagerPage/ManagerPage";
import ProductionStaffPage from "../pages/ProductionStaffPage/ProductionStaffPage";


const routes = [
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: <HomePage /> },
  { path: "/forget", element: <FogetPassword /> },
  { path: "/profile", element: <UserProfilePage /> },
  { path: "/product", element: <ProductPage /> },
  { path: "/gemstone", element: <GemstonePage /> },
  { path: "/gold", element: <GoldPage /> },
  { path: "/resetpassword", element: <ResetPassword /> },
  { path: "/", element: <Navigate to="/home" /> },
  { path: "/gemstonedetail", element: <GemstoneDetailPage /> },
  { path: "*", element: <NotFound /> },
  { path: "/customize", element: <CustomizePage /> },
  { path: "/productdetails", element: <ProductDetailsPage /> },
  { path: "/product/:productId", element: <ProductDetailsPage /> },
  { path: "/gemstone/:gemstoneId", element: <GemstoneDetailPage /> }, 
  { path: "/otp", element: <SendOTP /> },
  { path: "/adminpage", element: <AdminPage /> },
  { path: "/salestaffpage", element: <SaleStaffPage /> },
  { path: "/designstaffpage", element: <DesignStaffPage /> },
  { path: "/managerpage", element: <ManagerPage /> },
  { path: "/productionstaffpage", element: <ProductionStaffPage /> },

];

export default routes;

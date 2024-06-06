import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import Register from "./components/Register/Register";
import HomePage from "./pages/HomePage/HomePage";
import FogetPassword from "./pages/FogetPassword/FogetPassword";
import UserProfile from "./pages/ProfilePage/UserProfile";
import ProductPage from "./pages/ProductPage/ProductPage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/foget" element={<FogetPassword />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;

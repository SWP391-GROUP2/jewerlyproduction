import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, role }) {
  const user = useSelector((state) => state.auth.Login.currentUser);
  const decodedToken = jwtDecode(user.token);
  console.log("Decoded token role:", decodedToken.role);

  if (!user || decodedToken.role !== role) {
    // Nếu người dùng không có vai trò phù hợp, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;

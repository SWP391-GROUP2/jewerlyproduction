import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"; // Sử dụng cú pháp import đúng

function ProtectedRoute({ children, role }) {
  const user = useSelector((state) => state.auth.Login.currentUser);

  // Kiểm tra nếu user hoặc user.token là null hoặc undefined
  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = jwtDecode(user.token);
  const tokenRole = decodedToken.role.toLowerCase();
  console.log("Decoded token role:", tokenRole);

  // Kiểm tra nếu vai trò của người dùng không khớp với vai trò yêu cầu
  if (tokenRole !== role.toLowerCase()) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;

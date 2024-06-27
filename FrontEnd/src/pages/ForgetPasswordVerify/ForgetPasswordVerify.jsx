import React, { useState } from "react";
import "./ForgetPasswordVerify";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";

function ForgetPasswordVerify() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const ForgetPassword = (e) => {};

  return (
    <>
      <Link to="/">
        <button className="home-button">
          <FaHome />
          <IoReturnDownBack />
        </button>
      </Link>
      <div className="change-password">
        <h1>Forget Password Verify</h1>
        <form onSubmit={ForgetPassword}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="toggle-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label>Show Password</label>
          </div>
          <button type="submit">Update Password</button>
        </form>
      </div>
    </>
  );
}

export default ForgetPasswordVerify;

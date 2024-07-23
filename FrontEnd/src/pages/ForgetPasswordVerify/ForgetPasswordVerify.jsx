import React, { useState, useEffect } from "react";
import "./ForgetPasswordVerify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";
import axios from "axios";

function ForgetPasswordVerify() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setEmail(searchParams.get("email") || "");
    setResetToken(decodeURIComponent(searchParams.get("token") || ""));
  }, [location.search]);

  const VerifyPassword = async (input) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://nbjewelrybe.azurewebsites.net/api/Account/Forget-password-change",
        input
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update password", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const verifyInput = {
      email: email,
      resetToken: resetToken,
      password: password,
      confirmPassword: confirmPassword,
    };

    console.log("Verify Input:", verifyInput); // In ra giá trị verifyInput để kiểm tra

    try {
      await VerifyPassword(verifyInput);
      navigate("/login");
    } catch (error) {
      setErrorMessage("Failed to update password");
    }
  };

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
        <form onSubmit={handleVerify}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Password"}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </>
  );
}

export default ForgetPasswordVerify;

import React, { useState } from "react";
import "./FogetPassword";
import { Link } from "react-router-dom";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";
import axios from "axios";

function FogetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendToken = async (email) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://nbjewelrybe.azurewebsites.net/api/Account/Forgot-password-email",
        email,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      console.log("Token sent successfully:", response.data);
      // Xử lý khi gửi OTP thành công, ví dụ hiển thị thông báo cho người dùng
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to send Token:", error);
      setErrorMessage("Failed to send Token. Please try again later.");
      // Xử lý khi gửi OTP thất bại, ví dụ hiển thị thông báo lỗi cho người dùng
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      await sendToken(email);
    } else {
      setErrorMessage("Please enter your email.");
    }
  };

  return (
    <>
      <Link to="/home">
        <button className="home-button">
          <FaHome />
          <IoReturnDownBack />
        </button>
      </Link>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Forget Password</h1>
          <div className="register-link">
            <p>Add your email</p>
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <MdDriveFileRenameOutline className="icon" />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending Token..." : "Send Token"}
          </button>

          <div className="register-link">
            <p>
              Have you got account? <Link to="/login">Login</Link>
            </p>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </>
  );
}

export default FogetPassword;

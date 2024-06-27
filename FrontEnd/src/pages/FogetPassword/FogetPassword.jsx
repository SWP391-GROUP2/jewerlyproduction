import React from "react";
import "./FogetPassword";
import { Link } from "react-router-dom";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";

function FogetPassword() {
  return (
    <>
      <Link to="/">
        <button className="home-button">
          <FaHome />
          <IoReturnDownBack />
        </button>
      </Link>
      <div className="wrapper">
        <form action="">
          <h1>Forget Password</h1>
          <div className="register-link">
            <p>Add your email</p>
          </div>

          <div className="input-box">
            <input type="text" placeholder="email@domain.com" required />
            <MdDriveFileRenameOutline className="icon" />
          </div>

          <button type="submit">Send OTP</button>

          <div className="register-link">
            <p>
              Have you got account ? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default FogetPassword;

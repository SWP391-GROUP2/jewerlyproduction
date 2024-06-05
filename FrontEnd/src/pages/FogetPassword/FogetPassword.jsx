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
          <h1>Quên Mật Khẩu</h1>
          <div className="register-link">
            <p>Thêm email của bạn</p>
          </div>

          <div className="input-box">
            <input type="text" placeholder="email@domain.com" required />
            <MdDriveFileRenameOutline className="icon" />
          </div>

          <button type="submit">Gửi OTP</button>

          <div className="register-link">
            <p>
              Bạn đã có tài khoản ? <Link to="/login">Đăng nhập</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default FogetPassword;

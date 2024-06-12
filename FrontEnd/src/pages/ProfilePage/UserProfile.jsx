import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Link, useNavigate } from "react-router-dom";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/apiRequest";
import { jwtDecode } from "jwt-decode";

function UserProfile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      phone: phone,
      email: email,
      birthday: birthday,
    };
    registerUser(newUser, dispatch, navigate);
  };
  return (
    <>
      <Link to="/">
        <button className="home-button">
          <FaHome />
          <IoReturnDownBack />
        </button>
      </Link>
      <div className="wrapper">
        <form onSubmit={handleRegister}>
          <h1>User Profile</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder="Your Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <MdDriveFileRenameOutline className="icon" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Phone Number"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <MdDriveFileRenameOutline className="icon" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="email@domain.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdDriveFileRenameOutline className="icon" />
          </div>
          <div className="input-box">
            <input
              type="date" // Thay đổi type thành "date" để nhập ngày sinh
              placeholder="Date of Birth" // Thay đổi placeholder thành "Date of Birth"
              required
              onChange={(e) => setBirthday(e.target.value)} // Sửa sự kiện onChange để cập nhật giá trị ngày sinh
            />
            <MdDriveFileRenameOutline className="icon" />{" "}
            {/* Icon có thể giữ nguyên hoặc thay đổi tùy ý */}
          </div>

          <button type="submit">Save Profile</button>

          <div className="register-link">
            <p>
              <Link to="/resetpassword">Change Password</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserProfile;

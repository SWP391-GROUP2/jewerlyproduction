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
        <button className="btn-home">
          <FaHome />
          <IoReturnDownBack />
        </button>
      </Link>
      <div className="user-profile-wrapper">
        <form onSubmit={handleRegister}>
          <h1 className="user-profile-title">User Profile</h1>

          <div className="user-profile-input-box">
            <input
              type="text"
              placeholder="Your Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <MdDriveFileRenameOutline className="user-profile-icon" />
          </div>

          <div className="user-profile-input-box">
            <input
              type="text"
              placeholder="Phone Number"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <MdDriveFileRenameOutline className="user-profile-icon" />
          </div>

          <div className="user-profile-input-box">
            <input
              type="text"
              placeholder="email@domain.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdDriveFileRenameOutline className="user-profile-icon" />
          </div>
          
          <div className="user-profile-input-box">
            <input
              type="date"
              placeholder="Date of Birth"
              required
              onChange={(e) => setBirthday(e.target.value)}
            />
            <MdDriveFileRenameOutline className="user-profile-icon" />
          </div>

          <button type="submit" className="btn-submit">Save Profile</button>

          <div className="user-profile-link">
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

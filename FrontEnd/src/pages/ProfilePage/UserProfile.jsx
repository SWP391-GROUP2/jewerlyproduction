import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";

import { FaUserCircle } from "react-icons/fa"; // Placeholder icon
import axios from "axios";
import { useSelector } from "react-redux";

function UserProfile() {
  const [Name, setName] = useState("");
  const [PhoneNumber, setPhone] = useState("");
  const [DateOfBirth, setBirthday] = useState("");
  const [Avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState("");

  const user = useSelector((state) => state.auth.Login.currentUser);

  useEffect(() => {
    if (user && user.token) {
      getProfile();
    }
  }, [user]);

  const getProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5266/api/Account/Get-Profile",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Get Profile successfully:", res.data);
      setName(res.data.name);
      setPhone(res.data.phoneNumber);
      setEmail(res.data.email);
      setBirthday(res.data.DateOfBirth);
      setAvatar(res.data.avatar);
    } catch (err) {
      console.error("Error Get Profile:", err);
    }
  };

  const updateUser = async (newUserPro) => {
    try {
      const res = await axios.put(
        "http://localhost:5266/api/Account/Update-Profile",
        newUserPro,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Update User successfully:", res.data);
    } catch (err) {
      console.error(
        "Error Update User:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("PhoneNumber", PhoneNumber);
    formData.append("DateOfBirth", DateOfBirth);

    if (Avatar) {
      formData.append("Avatar", Avatar);
    }

    console.log(
      "Updating user with data:",
      Object.fromEntries(formData.entries())
    );
    updateUser(formData);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
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
        <form onSubmit={handleUpdateProfile}>
          <h1 className="user-profile-title">User Profile</h1>

          <div
            className="user-profile-avatar-wrapper"
            onClick={() => document.getElementById("avatar-upload").click()}
          >
            {Avatar ? (
              <img src={Avatar} alt="Avatar" className="user-profile-avatar" />
            ) : (
              <FaUserCircle className="user-profile-avatar-placeholder" />
            )}
            <input
              type="file"
              id="avatar-upload"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </div>

          <div className="user-profile-input-box">
            <input
              type="text"
              placeholder="Your Name"
              value={Name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <MdDriveFileRenameOutline className="user-profile-icon" />
          </div>

          <div className="user-profile-input-box">
            <input
              type="text"
              placeholder="Phone Number"
              value={PhoneNumber}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <MdDriveFileRenameOutline className="user-profile-icon" />
          </div>

          <div className="user-profile-input-box">
            <input
              type="text"
              placeholder="user@domain.com"
              value={email}
              required
              readOnly
            />
            <MdDriveFileRenameOutline className="user-profile-icon" />
          </div>

          <div className="user-profile-input-box">
            <input
              type="date"
              placeholder="Date of Birth"
              value={DateOfBirth}
              required
              onChange={(e) => setBirthday(e.target.value)}
            />
            <MdDriveFileRenameOutline className="user-profile-icon" />
          </div>

          <button type="submit" className="btn-submit">
            Save Profile
          </button>

          <div className="user-profile-link">
            <p>
              <Link to="/customer/resetpassword">Change Password</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserProfile;

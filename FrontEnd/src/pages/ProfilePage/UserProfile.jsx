import React, { useState } from "react";
import "./UserProfile.css"; // Import CSS file
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

function UserProfile() {
  // State cho các trường thông tin
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // State cho password

  // Hàm xử lý khi nhấn nút "Save Profile"
  const saveProfile = () => {
    // Ở đây bạn có thể thực hiện lưu thông tin người dùng vào cơ sở dữ liệu hoặc bất kỳ hành động nào khác
    console.log("Full Name:", fullName);
    console.log("Phone Number:", phoneNumber);
    console.log("Email:", email);
    console.log("Password:", password); // Log password
  };

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <div className="avatar">
        {/* Thêm hình ảnh avatar ở đây */}
        <img src="avatar.jpg" alt="Avatar" />
      </div>
      <div className="form">
        <label htmlFor="fullName">Full Name:</label>
        <div>
          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <MdDriveFileRenameOutline className="icon" />
        </div>

        <label htmlFor="phoneNumber">Phone Number:</label>
        <div>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="Phone Number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <FaPhone className="icon" />
        </div>
        <label htmlFor="email">Email:</label>
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MdEmail className="icon" />
        </div>
        <label htmlFor="password">Password:</label>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <RiLockPasswordLine className="icon" />
          <div className="editpw">
            <a href="#"> Change password ? </a>
          </div>
        </div>
        <div className="center">
          <button type="submit" class="nut">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

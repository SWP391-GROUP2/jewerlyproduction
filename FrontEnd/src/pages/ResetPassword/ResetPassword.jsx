import React, { useState } from "react";
import "./ResetPassword.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.Login.currentUser);

  const ResetPass = async (newPass) => {
    try {
      const response = await axios.post(
        "https://nbjewelrybe.azurewebsites.net/api/Account/change-password",
        newPass,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/home");
        alert("Password updated successfully");
      } else {
        alert("Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error.response || error);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An error occurred while updating the password.");
      }
    }
  };

  const updatePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    const newPass = {
      currentPassword: currentPassword,
      Password: newPassword,
      confirmPassword: confirmPassword,
    };

    ResetPass(newPass);
  };

  return (
    <div className="change-password">
      <h1>Change Password</h1>
      <form onSubmit={updatePassword}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
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
  );
}

export default ResetPassword;

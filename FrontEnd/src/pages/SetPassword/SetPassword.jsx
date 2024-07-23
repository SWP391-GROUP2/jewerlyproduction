import React, { useState } from "react";
import "./SetPassword.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Notify from "../../components/Alert/Alert";
import {
    loginSuccess
} from "../../redux/authSlice";

function SetPassword(){
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const token = location.state?.token;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const SetPassword = async (newPass) => {
        try {
          const res = await axios.post(
            "https://nbjewelrybe.azurewebsites.net/api/GoogleAuth/google-setPassword",
            newPass,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (res.status === 200) {
            dispatch(loginSuccess(res.data));
            const tokenrole = jwtDecode(token);
            const role = tokenrole.role.toLowerCase();
            switch (role) {
            case "admin":
                navigate("/admin/home");
                break;
            case "salestaff":
                navigate("/salestaff/home");
                break;
            case "designstaff":
                navigate("/designstaff/home");
                break;
            case "manager":
                navigate("/manager/home");
                break;
            case "productionstaff":
                navigate("/productionstaff/home");
                break;
            case "customer":
            default:
                navigate("/home");
                break;
                }
        } else
            alert("Failed to update password");
        } catch (error) {
          console.error("Error updating password:", error.response || error);
        }
      };

    const updatePassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            Notify.fail("The passwords must match!");
            return;
        }
        const newPass = {
            Password: newPassword,
            ConfirmPassword: confirmPassword,
        };
        SetPassword(newPass);
    };

        return (
    <div className="change-password">
        <h1>Create Password</h1>
        <form onSubmit={updatePassword}>
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
  <div className="checkbox-container">
    <input
      type="checkbox"
      checked={showPassword}
      onChange={() => setShowPassword(!showPassword)}
    />
    <span>Show Password</span>
  </div>
</div>



            <button type="submit">Save Password</button>
        </form>
    </div>
);

}

export default SetPassword;
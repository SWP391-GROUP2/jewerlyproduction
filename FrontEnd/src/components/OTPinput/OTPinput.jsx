import React, { useEffect, useRef, useState } from "react";
import axios from "axios"; // Make sure to import axios if it's not already
import "./OTPinput.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/apiRequest";

const OtpInput = ({ length = 6, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((State) => State.auth.register.currentUser);

  const handleLogout = () => {
    logOut(dispatch, navigate);
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      verifyOtp(combinedOtp, user.email);
      onOtpSubmit(combinedOtp);
      handleLogout();
    }

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(0, 0);
    if (index > 0 && !otp[index - 1]) {
      for (let i = index - 1; i >= 0; i--) {
        if (!otp[i]) {
          inputRefs.current[i].focus();
          break;
        }
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOtp = async (otp, email) => {
    try {
      const response = await axios.post(
        "http://localhost:5266/api/Email/VerifyOTP",
        { otp, email }
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Failed to verify OTP", error);
      throw error;
    }
  };

  return (
    <div>
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          ref={(input) => (inputRefs.current[index] = input)}
          value={value}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="otpInput"
          maxLength={1}
        />
      ))}
    </div>
  );
};

export default OtpInput;

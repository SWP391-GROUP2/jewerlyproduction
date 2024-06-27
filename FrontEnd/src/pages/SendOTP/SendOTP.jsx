import React from "react";
import OTPinput from "../../components/OTPinput/OTPinput";
import "./SendOTP.css";

function SendOTP() {
  return (
    <div className="OTP-Page">
      <h1>Enter your OTP</h1>
      <OTPinput />
    </div>
  );
}

export default SendOTP;

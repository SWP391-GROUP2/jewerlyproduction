import React from 'react';
import EmailOTP from "../../components/EmailLogin/EmailLogin";
import "./SendOTP.css";

function SendOTP() {
  return (
    <div className="OTP-Page">
      <h1>Login by email</h1>
      <EmailOTP />
    </div>
  );
}

export default SendOTP;

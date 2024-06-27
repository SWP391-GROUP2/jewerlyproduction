import React, { useState } from "react";
import OtpInput from "../OTPinput/OTPinput";

const EmailOTP = () => {
  const [EmailforOTP, setEmailforOTP] = useState("");
  const [showOTPinput, setshowOTPinput] = useState(false)

  const handleEmailforOTP = (event) => {
    setEmailforOTP(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (EmailforOTP.length < 5 || !regex.test(EmailforOTP)) {
      alert("Invalid Email");
      return;
    }
    //call BE API

    
    //SHOW OTP FIELD
    setshowOTPinput(true)
  };

  const onOtpSubmit =(otp )=> {
    console.log("Login Successful", otp)
  }

  return (
    <div>
    {!showOTPinput ? (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={EmailforOTP}
          onChange={handleEmailforOTP}
          placeholder="Enter Email"
        />
        <button type="submit">Submit</button>
      </form>
    ) : (
        <div>
            <p>Enter OTP sent to {EmailforOTP}</p>
            <OtpInput length={6} onOtpSubmit={onOtpSubmit}/>
            </div>
    )}
    </div>
  );
};

export default EmailOTP;
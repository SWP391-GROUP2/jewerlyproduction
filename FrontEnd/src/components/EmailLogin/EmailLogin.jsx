import React, { useState } from "react";
import OtpInput from "../OTPinput/OTPinput";

const EmailOTP = () => {
  const [EmailforOTP, setEmailforOTP] = useState("");
  const [showOTPinput, setshowOTPinput] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleEmailforOTP = (event) => {
    setEmailforOTP(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (EmailforOTP.length < 5 || !regex.test(EmailforOTP)) {
      alert("Invalid Email");
      return;
    }

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: EmailforOTP })
      });

      if (response.ok) {
        //SHOW OTP FIELD
        setshowOTPinput(true);
        setOtpSent(true);
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP", error);
      alert("Error sending OTP");
    }
  };

  const onOtpSubmit = (otp) => {
    console.log("Login Successful", otp);
    // You can also add the logic to verify the OTP with your backend here
  };

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
          <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default EmailOTP;

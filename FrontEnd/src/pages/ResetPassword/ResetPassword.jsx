import React, { useState } from "react";
import "./ResetPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [password, setPassword] = useState("");

  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  const sendOtp = (e) => {
    e.preventDefault();
    // Gửi yêu cầu OTP đến địa chỉ email
    // (Trong ví dụ này, chúng ta chỉ log mã OTP)
    const newOtp = Math.floor(100000 + Math.random() * 900000);
    console.log("OTP:", newOtp);
    setOtp(newOtp);
    setIsOtpSent(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Xử lý submit form tại đây
    console.log("Email:", email);
    console.log("OTP:", otp);
    console.log("Password:", password);
    // Đặt lại trạng thái gửi OTP và xác nhận mật khẩu
    setIsOtpSent(false);
    setIsPasswordConfirmed(false);
  };

  return (
    <div className="forgot-password">
      <h1>Forgot Password</h1>

      {isOtpSent ? (
        <div>
          {isPasswordConfirmed ? (
            <p>Password reset successful!</p>
          ) : (
            <div>
              <p>
                An OTP has been sent to your email address. Please check and
                enter the OTP below:
              </p>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>
            Please enter your email address to receive an OTP to reset your
            password:
          </p>
          <form onSubmit={sendOtp}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Send OTP</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;

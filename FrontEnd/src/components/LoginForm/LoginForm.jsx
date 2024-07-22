import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEyeSlash, FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { loginUser, loginWithGoogle } from "../../redux/apiRequest";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

//./auth/userinfo.email
//./auth/userinfo.profile

// Client Id :
// 565734589214-mct8dr6ds6tkc5labd3pf0k17b40hnce.apps.googleusercontent.com

// Client secret :
// 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

const clientId =
  "565734589214-mct8dr6ds6tkc5labd3pf0k17b40hnce.apps.googleusercontent.com";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(""); // Error state

  const handleLogin = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    try {
      await loginUser(newUser, dispatch, navigate);
    } catch (err) {
      setError("Account does not exist or login failed"); // Set error message
    }
  };

  const onGoogleSuccess = (response) => {
    const tokenId = response.credential;
    loginWithGoogle(tokenId, dispatch, navigate);
  };

  const onGoogleFailure = (error) => {
    console.log("Google Login Failed:", error);
  };

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <Link to="/">
          <button className="home-button">
            <FaHome />
            <IoReturnDownBack />
          </button>
        </Link>
        <div className="wrapper">
          <form onSubmit={handleLogin}>
            <h1>Log in</h1>
            <div className="register-link">
              <p>Enter your email & password to log in</p>
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="email@domain.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "66%",
                  transform: "translateY(-50%)",
                  right: "16px",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {error && <div className="error-message">{error}</div>}{" "}
            {/* Display error message */}
            <div className="remember-forgot">
              <label>
                <label></label>
              </label>
              <Link to="/forget"> Forget password ? </Link>
            </div>
            <button type="submit">Log In</button>
            <div className="register-link">
              <p>continue with</p>
            </div>
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={onGoogleFailure}
              useOneTap
              render={(renderProps) => (
                <button
                  type="button"
                  className="google-button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="icon" />
                  Google
                </button>
              )}
            />
            <div className="register-link">
              <p>
                Have you got any account ? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default LoginForm;

import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiRequest";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };
  return (
    <>
      <Link to="/">
        <button className="home-button">
          <FaHome />
          <IoReturnDownBack />
        </button>
      </Link>
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>LOG IN</h1>
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
              type="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remeber password
            </label>
            <Link to="/foget"> Forget password ? </Link>
          </div>
          <button type="submit">Log In</button>
          <div className="register-link">
            <p>continue with</p>
          </div>

          <button type="submit" className="google-button">
            <FcGoogle className="icon" />
            Google
          </button>

          <div className="register-link">
            <p>
              Have you got any account ? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;

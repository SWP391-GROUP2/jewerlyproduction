import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/apiRequest";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      phone: phone,
      email: email,
      password: password,
    };
    registerUser(newUser, dispatch, navigate);
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
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <div className="register-link">
            <p>Enter your infomation to create new account</p>
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Your Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <MdDriveFileRenameOutline className="icon" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Phone Number"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <MdDriveFileRenameOutline className="icon" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="email@domain.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdDriveFileRenameOutline className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <MdDriveFileRenameOutline className="icon" />
          </div>

          <button type="submit">Create new account</button>

          <div className="register-link">
            <p>
              You have an account ? <Link to="/login">Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { CgProfile } from "react-icons/cg";
import logoImage from "../Assets/Logoqueen.png";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state.auth.Login.currentUser);
  return (
    <header className="header">
      <div className="a-aboutus">
        <p>
          <Link to="/">About Us</Link>
        </p>
      </div>
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="Logo" className="logo-image" />
        </Link>
      </div>
      <div className="header-buttons">
        <Link to="/profile">
          <button className="profile-button">
            <CgProfile />
          </button>
        </Link>
        {user ? (
          <>
            <Link to="/login">
              <button className="button">
                <span class="button-content">Log Out</span>
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="button">
                <span class="button-content">Log In</span>
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

import React from "react";
import "./navbar.css";
import search_icon from "../Assets/search-b.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <Link to="/">
          <li>Home Page</li>
        </Link>
        <li>Sample Product</li>
        <li>Customize Request</li>
        <li>Gold Price</li>
        <li>Blog</li>
      </ul>

      <div className="search-box">
        <input type="text" placeholder="Search" />
        <img src={search_icon} alt="" />
      </div>
    </div>
  );
}

export default Navbar;

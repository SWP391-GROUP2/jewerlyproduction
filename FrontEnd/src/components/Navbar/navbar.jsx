import React from "react";
import "./navbar.css";
import search_icon from "../Assets/search-b.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedPage = event.target.value;
    if (selectedPage) {
      navigate(selectedPage);
    }
  };

  return (
    <div className="navbar">
      <ul>
        <Link to="/">
          <li>Home Page</li>
        </Link>
        <Link to="/product">
          <li>Sample Product</li>
        </Link>
        <Link to="/gemstone">
          <li>Gemstones</li>
        </Link>
        <li>
          <select id="page-select" onChange={handleChange} defaultValue="">
            <option value="" disabled>
              Customize Request
            </option>
            <option value="/">Home</option>
            <option value="/about">About</option>
            <option value="/contact">Contact</option>
          </select>
        </li>
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

import React from "react";
import "./navbar.css";
import search_icon from "../Assets/search-b.png";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.Login.currentUser);

  const handleChange = (event) => {
    const selectedPage = event.target.value;
    if (selectedPage) {
      navigate(selectedPage);
    }
  };

  return (
    <div className="navbar">
      {/* {user ? (
        <> */}
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
            <option value="/">Ring</option>
            <option value="/">Bracelet</option>
            <option value="/">Necklace</option>
            <option value="/">Earrings</option>
          </select>
        </li>
        <Link to="/gold">
          <li>Gold Price</li>
        </Link>
        <li>Blog</li>
      </ul>
      {/* </>
      ) : (
        <>
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
            <Link to="/gold">
              <li>Gold Price</li>
            </Link>
            <li>Blog</li>
          </ul>
        </>
      )} */}
      <div className="search-box">
        <input type="text" placeholder="Search" />
        <img src={search_icon} alt="" />
      </div>
    </div>
  );
}

export default Navbar;

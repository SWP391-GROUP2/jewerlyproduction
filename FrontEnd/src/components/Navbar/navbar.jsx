import React from "react";
import "./navbar.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.Login.currentUser);

  const handleCustomer = (event) => {
    const selectedPage = event.target.value;
    const selectedText = event.target.options[event.target.selectedIndex].text;

    if (selectedPage) {
      navigate(selectedPage, { state: { item: selectedText } });
      event.target.value = ""; // Đặt lại giá trị của <select> sau khi lựa chọn
    }
  };

  return (
    <div className="navbar">
      {user ? (
        <>
          <ul>
            <Link to="/home">
              <li>Home Page</li>
            </Link>
            <Link to="/product">
              <li>Sample Product</li>
            </Link>
            <Link to="/gemstone">
              <li>Gemstones</li>
            </Link>
            <li>
              <select
                id="page-select"
                onChange={handleCustomer}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Customize Request
                </option>
                <option value="/customer/customize">Ring</option>
                <option value="/customer/customize">Bracelet</option>
                <option value="/customer/customize">Necklace</option>
                <option value="/customer/customize">Earrings</option>
              </select>
            </li>
            <Link to="/gold">
              <li>Gold Price</li>
            </Link>
          </ul>
        </>
      ) : (
        <>
          <ul>
            <Link to="/home">
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
          </ul>
        </>
      )}
    </div>
  );
}

export default Navbar;

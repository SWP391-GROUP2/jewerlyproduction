import React from "react";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import "./ProductionStaffSidebar.css"; // Import file CSS

import avatarImage from "../../components/Assets/icon-128x128.png"; // Adjust the path as per your actual folder structure
import logoImage from "../../components/Assets/Logoqueen.png"; // Đường dẫn đến tệp ảnh logo

function ProductionStaffSidebar({
  openSidebarToggle,
  OpenSidebar,
  handleViewChange,
}) {
  const userName = "USER NAME";
  const userRole = "Production Staff";

  return (
    <aside
      id="productionstaff-sidebar"
      className={openSidebarToggle ? "productionstaff-sidebar-responsive" : ""}
    >
      <div className="productionstaff-sidebar-avatar">
        <div className="productionstaff-logo-container">
          <img src={logoImage} alt="Logo" className="productionstaff-logo-image" />
        </div>
        <img
          src={avatarImage}
          alt="Avatar"
          className="productionstaff-avatar-image"
        />
        <div className="productionstaff-user-details">
          <p className="productionstaff-user-name">{userName}</p>
          <p className="productionstaff-user-role">{userRole}</p>
        </div>
      </div>

      <ul className="designstaff-sidebar-list">
        <li className="designstaff-sidebar-list-item">
          <button
            className="salestaff-sidebar-button"
            onClick={() => handleViewChange("orderlist")}
          >
            <BsGrid1X2Fill className="productionstaff-icon" /> Order List
          </button>
        </li>
        <li className="designstaff-sidebar-list-item">
          <button
            className="salestaff-sidebar-button"
            onClick={() => handleViewChange("orderlist")}
          >
            <BsGrid1X2Fill className="productionstaff-icon" /> Product Sample List
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default ProductionStaffSidebar;

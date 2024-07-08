import React from "react";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import "./DesignStaffSidebar.css"; // Import file CSS

import avatarImage from "../../components/Assets/icon-128x128.png"; // Adjust the path as per your actual folder structure
import logoImage from "../../components/Assets/Logoqueen.png"; // Đường dẫn đến tệp ảnh logo

function DesignStaffSidebar({
  openSidebarToggle,
  OpenSidebar,
  handleViewChange,
}) {
  const userName = "USER NAME";
  const userRole = "Design Staff";

  return (
    <aside
      id="designstaff-sidebar"
      className={openSidebarToggle ? "designstaff-sidebar-responsive" : ""}
    >
      <div className="designstaff-sidebar-avatar">
        <div className="designstaff-logo-container">
          <img src={logoImage} alt="Logo" className="designstaff-logo-image" />
        </div>
        <img
          src={avatarImage}
          alt="Avatar"
          className="designstaff-avatar-image"
        />
        <div className="designstaff-user-details">
          <p className="designstaff-user-name">{userName}</p>
          <p className="designstaff-user-role">{userRole}</p>
        </div>
      </div>

      <ul className="designstaff-sidebar-list">
        <li className="designstaff-sidebar-list-item">
          <button
            className="salestaff-sidebar-button"
            onClick={() => handleViewChange("orderlist")}
          >
            <BsGrid1X2Fill className="designstaff-icon" /> Order List
          </button>
        </li>
        <li className="designstaff-sidebar-list-item">
          <button
            className="salestaff-sidebar-button"
            onClick={() => handleViewChange("orderlist")}
          >
            <BsGrid1X2Fill className="designstaff-icon" /> Product Sample List
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default DesignStaffSidebar;

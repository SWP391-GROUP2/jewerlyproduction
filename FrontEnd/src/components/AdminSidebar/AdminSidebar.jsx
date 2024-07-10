import React from "react";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import "./AdminSidebar.css"; // Thay đổi tên file CSS

import avatarImage from "../../components/Assets/icon-128x128.png";
import logoImage from "../../components/Assets/Logoqueen.png";

function AdminSidebar({
  openSidebarToggle,
  OpenSidebar,
  handleViewChange,
}) {
  const userName = "USER NAME";
  const userRole = "Admin"; // Thay đổi tên role nếu cần

  return (
    <aside
      id="admin-sidebar"
      className={openSidebarToggle ? "admin-sidebar-responsive" : ""}
    >
      <div className="admin-sidebar-avatar">
        <div className="admin-logo-container">
          <img src={logoImage} alt="Logo" className="admin-logo-image" />
        </div>
        <img
          src={avatarImage}
          alt="Avatar"
          className="admin-avatar-image"
        />
        <div className="admin-user-details">
          <p className="admin-user-name">{userName}</p>
          <p className="admin-user-role">{userRole}</p>
        </div>
      </div>

      <ul className="admin-sidebar-list">
        <li className="admin-sidebar-list-item">
          <button
            className="admin-sidebar-button"
            onClick={() => handleViewChange("orderlist")}
          >
            <BsGrid1X2Fill className="admin-icon" /> GemstoneList
          </button>
        </li>
        <li className="admin-sidebar-list-item">
          <button
            className="admin-sidebar-button"
            onClick={() => handleViewChange("productlist")}
          >
            <BsGrid1X2Fill className="admin-icon" /> Product Sample List
          </button>
        </li>
        <li className="admin-sidebar-list-item">
          <button
            className="admin-sidebar-button"
            onClick={() => handleViewChange("accountlist")}
          >
            <BsGrid1X2Fill className="admin-icon" /> Account List
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default AdminSidebar;

import React from "react";
import { BsGrid1X2Fill } from "react-icons/bs";
import "./AdminSidebar.css"; // Thay đổi tên file CSS

function AdminSidebar({ openSidebarToggle, OpenSidebar, handleViewChange }) {
  const userName = "USER NAME";
  const userRole = "Admin"; // Thay đổi tên role nếu cần

  return (
    <aside
      id="admin-sidebar"
      className={openSidebarToggle ? "admin-sidebar-responsive" : ""}
    >
      <div className="admin-sidebar-avatar">
        <div className="admin-logo-container">
          <img src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198532/Logoqueen_obg194.png" alt="Logo" className="admin-logo-image" />
        </div>
        <img
          src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198614/icon-128x128_nfr77b.png"
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
            onClick={() => handleViewChange("gemstonelist")}
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
            onClick={() => handleViewChange("createaccount")}
          >
            <BsGrid1X2Fill className="admin-icon" /> Create Account
          </button>
        </li>
        <li className="admin-sidebar-list-item">
          <button
            className="admin-sidebar-button"
            onClick={() => handleViewChange("searchaccount")}
          >
            <BsGrid1X2Fill className="admin-icon" /> Search Account
          </button>
        </li>
        <li className="admin-sidebar-list-item">
          <button
            className="admin-sidebar-button"
            onClick={() => handleViewChange("uploadgemstone")}
          >
            <BsGrid1X2Fill className="admin-icon" /> Upload Gemstone 
          </button>
        </li>
        <li className="admin-sidebar-list-item">
          <button
            className="admin-sidebar-button"
            onClick={() => handleViewChange("uploadproduct")}
          >
            <BsGrid1X2Fill className="admin-icon" /> Upload Product 
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default AdminSidebar;

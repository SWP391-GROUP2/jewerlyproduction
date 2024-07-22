import React from "react";
import { BsGrid1X2Fill } from "react-icons/bs";
import "./DesignStaffSidebar.css"; // Import file CSS

function DesignStaffSidebar({ openSidebarToggle, handleViewChange }) {
  const userName = "USER NAME";
  const userRole = "Design Staff";

  return (
    <aside
      id="designstaff-sidebar"
      className={openSidebarToggle ? "designstaff-sidebar-responsive" : ""}
    >
      <div className="designstaff-sidebar-avatar">
        <div className="designstaff-logo-container">
          <img
            src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198532/Logoqueen_obg194.png"
            alt="Logo"
            className="designstaff-logo-image"
          />
        </div>
        <img
          src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198614/icon-128x128_nfr77b.png"
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
        {/* <li className="designstaff-sidebar-list-item">
          <button
            className="salestaff-sidebar-button"
            onClick={() => handleViewChange("orderlist")}
          >
            <BsGrid1X2Fill className="designstaff-icon" /> Product Sample List
          </button>
        </li> */}
        <li className="designstaff-sidebar-list-item">
          <button
            className="salestaff-sidebar-button"
            onClick={() => handleViewChange("upload3Ddeisgn")}
          >
            <BsGrid1X2Fill className="designstaff-icon" /> Upload 3D Design
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default DesignStaffSidebar;

import React from "react";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import "./ManagerSidebar.css";

function ManagerSidebar({ openSidebarToggle, setCurrentView }) {
  const userName = "USER NAME";
  const userRole = "Manager";

  return (
    <aside
      id="manager-sidebar"
      className={openSidebarToggle ? "manager-sidebar-responsive" : ""}
    >
      <div className="manager-sidebar-avatar">
        <div className="manager-logo-container">
          <img src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198532/Logoqueen_obg194.png" alt="Logo" className="manager-logo-image" />
        </div>
        <img src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198614/icon-128x128_nfr77b.png" alt="Avatar" className="manager-avatar-image" />
        <div className="manager-user-details">
          <p className="manager-user-name">{userName}</p>
          <p className="manager-user-role">{userRole}</p>
        </div>
      </div>

      <ul className="manager-sidebar-list">
        <li className="manager-sidebar-list-item">
          <button
            className="manager-sidebar-button"
            onClick={() => setCurrentView("request")}
          >
            <BsGrid1X2Fill className="manager-icon" /> Request
          </button>
        </li>
        <li className="manager-sidebar-list-item">
          <button
            className="manager-sidebar-button"
            onClick={() => setCurrentView("quotation")}
          >
            <BsFillArchiveFill className="manager-icon" />
            Quotation
          </button>
        </li>
        <li className="manager-sidebar-list-item">
          <button
            className="manager-sidebar-button"
            onClick={() => setCurrentView("orderlist")}
          >
            <BsFillGrid3X3GapFill className="manager-icon" />
            Order List
          </button>
        </li>
        <li className="manager-sidebar-list-item">
          <button
            className="manager-sidebar-button"
            onClick={() => setCurrentView("assigndesign")}
          >
            <BsFillGrid3X3GapFill className="manager-icon" />
            Assign Design Staff
          </button>
        </li>
        <li className="manager-sidebar-list-item">
          <button
            className="manager-sidebar-button"
            onClick={() => setCurrentView("assignproduction")}
          >
            <BsFillGrid3X3GapFill className="manager-icon" />
            Assign Production Staff
          </button>
        </li>
        <li className="manager-sidebar-list-item">
          <button
            className="manager-sidebar-button"
            onClick={() => setCurrentView("salesstaff")}
          >
            <BsPeopleFill className="manager-icon" />
            Sales Staff
          </button>
        </li>
        <li className="manager-sidebar-list-item">
          <button
            className="manager-sidebar-button"
            onClick={() => setCurrentView("designlist")}
          >
            <BsPeopleFill className="manager-icon" />
            Design Staff
          </button>
        </li>
        <li className="manager-sidebar-list-item">
          <button
            className="manager-sidebar-button"
            onClick={() => setCurrentView("productionstaff")}
          >
            <BsPeopleFill className="manager-icon" />
            Production Staff
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default ManagerSidebar;

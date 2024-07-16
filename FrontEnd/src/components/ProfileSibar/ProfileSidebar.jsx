import React from "react";
import { BsGrid1X2Fill, BsFillArchiveFill } from "react-icons/bs";
import "./ProfileSidebar.css";

function ProfileSidebar({ openSidebarToggle, setCurrentView }) {
  return (
    <aside
      id="manager-sidebar-profile"
      className={openSidebarToggle ? "manager-sidebar-responsive" : ""}
    >
      <ul className="manager-sidebar-list">
        <li className="manager-sidebar-list-item">
          <button
            className="manager-sidebar-button"
            onClick={() => setCurrentView("profile")}
          >
            <BsGrid1X2Fill className="manager-icon" />
            Your Profile
          </button>
        </li>
        <li className="manager-sidebar-list-item">
          <button
            className="manager-sidebar-button"
            onClick={() => setCurrentView("request")}
          >
            <BsFillArchiveFill className="manager-icon" />
            Your Request
          </button>
        </li>
        <li className="manager-sidebar-list-item">
          <button
            className="manager-sidebar-button"
            onClick={() => setCurrentView("order")}
          >
            <BsFillArchiveFill className="manager-icon" />
            Your Order
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default ProfileSidebar;

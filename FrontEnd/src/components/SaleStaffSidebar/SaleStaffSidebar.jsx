import React from "react";
import { BsGrid1X2Fill, BsFillArchiveFill } from "react-icons/bs";
import "./SaleStaffSidebar.css";

function SaleStaffSidebar({ openSidebarToggle, setCurrentView }) {
  const userName = "USER NAME";
  const userRole = "Sale Staff";

  return (
    <aside
      id="salestaff-sidebar"
      className={openSidebarToggle ? "salestaff-sidebar-responsive" : ""}
    >
      <div className="salestaff-sidebar-avatar">
        <div className="salestaff-logo-container">
          <img
            src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198532/Logoqueen_obg194.png"
            alt="Logo"
            className="salestaff-logo-image"
          />
        </div>
        <img
          src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198614/icon-128x128_nfr77b.png"
          alt="Avatar"
          className="salestaff-avatar-image"
        />
        <div className="salestaff-user-details">
          <p className="salestaff-user-name">{userName}</p>
          <p className="salestaff-user-role">{userRole}</p>
        </div>
      </div>

      <ul className="salestaff-sidebar-list">
        <li className="salestaff-sidebar-list-item">
          <button
            className="salestaff-sidebar-button"
            onClick={() => setCurrentView("wait_for_quotation")}
          >
            <BsGrid1X2Fill className="salestaff-icon" /> Wait for Quotation
          </button>
        </li>
        <li className="salestaff-sidebar-list-item">
          <button
            className="salestaff-sidebar-button"
            onClick={() => setCurrentView("wait_for_approve")}
          >
            <BsGrid1X2Fill className="salestaff-icon" />
            Wait for Approve
          </button>
        </li>
        <li className="salestaff-sidebar-list-item">
          <button
            className="salestaff-sidebar-button"
            onClick={() => setCurrentView("payment_pending")}
          >
            <BsGrid1X2Fill className="salestaff-icon" />
            Payment Pending
          </button>
        </li>
        <li className="salestaff-sidebar-list-item">
          <button
            className="salestaff-sidebar-button"
            onClick={() => setCurrentView("Reject_list")}
          >
            <BsFillArchiveFill className="salestaff-icon" />
            Reject List
          </button>
        </li>
        <li className="salestaff-sidebar-list-item">
          <button
            className="salestaff-sidebar-button"
            onClick={() => setCurrentView("Order_list")}
          >
            <BsFillArchiveFill className="salestaff-icon" />
            Order List
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default SaleStaffSidebar;

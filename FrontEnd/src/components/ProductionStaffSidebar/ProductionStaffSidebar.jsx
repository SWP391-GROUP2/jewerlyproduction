import React from "react";
import { BsGrid1X2Fill } from "react-icons/bs";
import "./ProductionStaffSidebar.css";

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
          <img
            src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198532/Logoqueen_obg194.png"
            alt="Logo"
            className="productionstaff-logo-image"
          />
        </div>
        <img
          src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198614/icon-128x128_nfr77b.png"
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
            onClick={() => handleViewChange("productlist")}
          >
            <BsGrid1X2Fill className="productionstaff-icon" /> Product Sample
            List
          </button>
        </li>
        <li className="designstaff-sidebar-list-item">
          <button
            className="salestaff-sidebar-button"
            onClick={() => handleViewChange("gemstonelist")}
          >
            <BsGrid1X2Fill className="productionstaff-icon" /> Gemstone List
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default ProductionStaffSidebar;

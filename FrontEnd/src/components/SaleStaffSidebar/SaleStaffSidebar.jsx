// SaleStaffSidebar.jsx
import React from 'react';
import { BsGrid1X2Fill, BsFillArchiveFill } from 'react-icons/bs';
import './SaleStaffSidebar.css'; // Import file CSS

// Import your avatar image
import avatarImage from '../../components/Assets/icon-128x128.png'; // Adjust the path as per your actual folder structure
import logoImage from '../../components/Assets/Logoqueen.png'; // Đường dẫn đến tệp ảnh logo

function SaleStaffSidebar({ openSidebarToggle, OpenSidebar, showWaitForQuotationTable, showWaitForApproveTable, showRejectListTable, showOrderListTable }) {
  // Replace these with actual user information
  const userName = "USER NAME";
  const userRole = "Sale Staff";

  return (
    <aside id="salestaff-sidebar" className={openSidebarToggle ? "salestaff-sidebar-responsive" : ""}>
      <div className='salestaff-sidebar-avatar'>
        <div className="salestaff-logo-container">
          <img src={logoImage} alt="Logo" className="salestaff-logo-image" />
        </div>
        <img src={avatarImage} alt="Avatar" className="salestaff-avatar-image" />
        <div className="salestaff-user-details">
          <p className="salestaff-user-name">{userName}</p>
          <p className="salestaff-user-role">{userRole}</p>
        </div>
      </div>
      
      <ul className='salestaff-sidebar-list'>
        <li className='salestaff-sidebar-list-item'>
          <a href="#" onClick={showWaitForQuotationTable}>
            <BsGrid1X2Fill className='salestaff-icon'/> Wait for Quotation
          </a>
        </li>
        <li className='salestaff-sidebar-list-item'>
          <a href="#" onClick={showWaitForApproveTable}>
            <BsFillArchiveFill className='salestaff-icon'/> Wait for Approve
          </a>
        </li>
        <li className='salestaff-sidebar-list-item'>
          <a href="#" onClick={showRejectListTable}>
            <BsGrid1X2Fill className='salestaff-icon'/> Reject List
          </a>
        </li>
        <li className='salestaff-sidebar-list-item'>
          <a href="#" onClick={showOrderListTable}>
            <BsFillArchiveFill className='salestaff-icon'/> Order List
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default SaleStaffSidebar;

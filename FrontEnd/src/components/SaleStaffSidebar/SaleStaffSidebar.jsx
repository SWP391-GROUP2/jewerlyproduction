import React from 'react';
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';
import './SaleStaffSidebar.css'; // Import file CSS

// Import your avatar image
import avatarImage from '../../components/Assets/icon-128x128.png'; // Adjust the path as per your actual folder structure
import logoImage from '../../components/Assets/Logoqueen.png'; // Đường dẫn đến tệp ảnh logo

function SaleStaffSidebar({ openSidebarToggle, OpenSidebar }) {
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
                <a  href="">
                    <BsGrid1X2Fill className='salestaff-icon'/> Dashboard
                </a>
            </li>
            <li className='salestaff-sidebar-list-item'>
                <a href="">
                    <BsFillArchiveFill className='salestaff-icon'/> Products
                </a>
            </li>
            <li className='salestaff-sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='salestaff-icon'/> Categories
                </a>
            </li>
            <li className='salestaff-sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='salestaff-icon'/> Customers
                </a>
            </li>
            <li className='salestaff-sidebar-list-item'>
                <a href="">
                    <BsListCheck className='salestaff-icon'/> Inventory
                </a>
            </li>
            <li className='salestaff-sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='salestaff-icon'/> Reports
                </a>
            </li>
            <li className='salestaff-sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='salestaff-icon'/> Setting
                </a>
            </li>
        </ul>
    </aside>
  );
}

export default SaleStaffSidebar;

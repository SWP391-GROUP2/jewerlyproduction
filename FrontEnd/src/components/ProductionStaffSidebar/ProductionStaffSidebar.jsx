import React from 'react';
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';
import './ProductionStaffSidebar.css'; // Updated CSS file import

// Import your avatar image and logo image
import avatarImage from '../../components/Assets/icon-128x128.png';
import logoImage from '../../components/Assets/Logoqueen.png';

function ProductionStaffSidebar({ openSidebarToggle, OpenSidebar }) {
  // Replace these with actual user information
  const userName = "USER NAME";
  const userRole = "Production Staff";

  return (
    <aside id="productionstaff-sidebar" className={openSidebarToggle ? "productionstaff-sidebar-responsive" : ""}>
        <div className='productionstaff-sidebar-avatar'>
            <div className="productionstaff-logo-container">
                <img src={logoImage} alt="Logo" className="productionstaff-logo-image" />
            </div>
            <img src={avatarImage} alt="Avatar" className="productionstaff-avatar-image" />
            <div className="productionstaff-user-details">
                <p className="productionstaff-user-name">{userName}</p>
                <p className="productionstaff-user-role">{userRole}</p>
            </div>
        </div>

        <ul className='productionstaff-sidebar-list'>
            <li className='productionstaff-sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='productionstaff-icon'/> Dashboard
                </a>
            </li>
            <li className='productionstaff-sidebar-list-item'>
                <a href="">
                    <BsFillArchiveFill className='productionstaff-icon'/> Products
                </a>
            </li>
            <li className='productionstaff-sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='productionstaff-icon'/> Categories
                </a>
            </li>
            <li className='productionstaff-sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='productionstaff-icon'/> Customers
                </a>
            </li>
            <li className='productionstaff-sidebar-list-item'>
                <a href="">
                    <BsListCheck className='productionstaff-icon'/> Inventory
                </a>
            </li>
            <li className='productionstaff-sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='productionstaff-icon'/> Reports
                </a>
            </li>
            <li className='productionstaff-sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='productionstaff-icon'/> Settings
                </a>
            </li>
        </ul>
    </aside>
  );
}

export default ProductionStaffSidebar;

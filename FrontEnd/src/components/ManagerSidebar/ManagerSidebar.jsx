import React from 'react';
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';
import './ManagerSidebar.css'; // Updated CSS file import

// Import your avatar image and logo image
import avatarImage from '../../components/Assets/icon-128x128.png';
import logoImage from '../../components/Assets/Logoqueen.png';

function ManagerSidebar({ openSidebarToggle, OpenSidebar }) {
  // Replace these with actual user information
  const userName = "USER NAME";
  const userRole = "Manager";

  return (
    <aside id="manager-sidebar" className={openSidebarToggle ? "manager-sidebar-responsive" : ""}>
        <div className='manager-sidebar-avatar'>
            <div className="manager-logo-container">
                <img src={logoImage} alt="Logo" className="manager-logo-image" />
            </div>
            <img src={avatarImage} alt="Avatar" className="manager-avatar-image" />
            <div className="manager-user-details">
                <p className="manager-user-name">{userName}</p>
                <p className="manager-user-role">{userRole}</p>
            </div>
        </div>

        <ul className='manager-sidebar-list'>
            <li className='manager-sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='manager-icon'/> Dashboard
                </a>
            </li>
            <li className='manager-sidebar-list-item'>
                <a href="">
                    <BsFillArchiveFill className='manager-icon'/> Products
                </a>
            </li>
            <li className='manager-sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='manager-icon'/> Categories
                </a>
            </li>
            <li className='manager-sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='manager-icon'/> Customers
                </a>
            </li>
            <li className='manager-sidebar-list-item'>
                <a href="">
                    <BsListCheck className='manager-icon'/> Inventory
                </a>
            </li>
            <li className='manager-sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='manager-icon'/> Reports
                </a>
            </li>
            <li className='manager-sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='manager-icon'/> Settings
                </a>
            </li>
        </ul>
    </aside>
  );
}

export default ManagerSidebar;

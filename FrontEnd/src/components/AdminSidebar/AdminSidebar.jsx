import React from 'react';
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';
import './AdminSidebar.css'; // Import file CSS

// Import your avatar image
import avatarImage from '../../components/Assets/icon-128x128.png'; // Adjust the path as per your actual folder structure
import logoImage from '../../components/Assets/Logoqueen.png'; // Đường dẫn đến tệp ảnh logo

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  // Replace these with actual user information
  const userName = "USER NAME";
  const userRole = "Admin";

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
        <div className='sidebar-avatar'>
        <div className="logo-container">
            <img src={logoImage} alt="Logo" className="logo-image" />
        </div>
            <img src={avatarImage} alt="Avatar" className="avatar-image" />
            <div className="user-details">
                <p className="user-name">{userName}</p>
                <p className="user-role">{userRole}</p>
            </div>
        </div>
        

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a className='sidebar-list-itemx2' href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillArchiveFill className='icon'/> Products
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Customers
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> Inventory
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
        </ul>
    </aside>
  );
}

export default Sidebar;

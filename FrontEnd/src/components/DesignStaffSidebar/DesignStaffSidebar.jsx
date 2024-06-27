import React from 'react';
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';
import './DesignStaffSidebar.css'; // Import file CSS

// Import your avatar image
import avatarImage from '../../components/Assets/icon-128x128.png'; // Adjust the path as per your actual folder structure
import logoImage from '../../components/Assets/Logoqueen.png'; // Đường dẫn đến tệp ảnh logo

function DesignStaffSidebar({ openSidebarToggle, OpenSidebar }) {
  // Replace these with actual user information
  const userName = "USER NAME";
  const userRole = "Design Staff";

  return (
    <aside id="designstaff-sidebar" className={openSidebarToggle ? "designstaff-sidebar-responsive" : ""}>
        <div className='designstaff-sidebar-avatar'>
        <div className="designstaff-logo-container">
            <img src={logoImage} alt="Logo" className="designstaff-logo-image" />
        </div>
            <img src={avatarImage} alt="Avatar" className="designstaff-avatar-image" />
            <div className="designstaff-user-details">
                <p className="designstaff-user-name">{userName}</p>
                <p className="designstaff-user-role">{userRole}</p>
            </div>
        </div>
        

        <ul className='designstaff-sidebar-list'>
            <li className='designstaff-sidebar-list-item'>
                <a  href="">
                    <BsGrid1X2Fill className='designstaff-icon'/> Dashboard
                </a>
            </li>
            <li className='designstaff-sidebar-list-item'>
                <a href="">
                    <BsFillArchiveFill className='designstaff-icon'/> Products
                </a>
            </li>
            <li className='designstaff-sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='designstaff-icon'/> Categories
                </a>
            </li>
            <li className='designstaff-sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='designstaff-icon'/> Customers
                </a>
            </li>
            <li className='designstaff-sidebar-list-item'>
                <a href="">
                    <BsListCheck className='designstaff-icon'/> Inventory
                </a>
            </li>
            <li className='designstaff-sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='designstaff-icon'/> Reports
                </a>
            </li>
            <li className='designstaff-sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='designstaff-icon'/> Setting
                </a>
            </li>
        </ul>
    </aside>
  );
}

export default DesignStaffSidebar;

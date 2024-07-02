import React from 'react';
import { BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import './ManagerSidebar.css';
import avatarImage from '../../components/Assets/icon-128x128.png';
import logoImage from '../../components/Assets/Logoqueen.png';

function ManagerSidebar({ openSidebarToggle, OpenSidebar, setCurrentView }) {
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
          <a href="#" onClick={() => setCurrentView('request')}>
            <BsGrid1X2Fill className='manager-icon' /> Request
          </a>
        </li>
        <li className='manager-sidebar-list-item'>
          <a href="#" onClick={() => setCurrentView('quotation')}>
            <BsFillArchiveFill className='manager-icon' /> Quotation
          </a>
        </li>
        <li className='manager-sidebar-list-item'>
          <a href="">
            <BsFillGrid3X3GapFill className='manager-icon' /> Categories
          </a>
        </li>
        <li className='manager-sidebar-list-item'>
          <a href="">
            <BsPeopleFill className='manager-icon' /> Customers
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default ManagerSidebar;

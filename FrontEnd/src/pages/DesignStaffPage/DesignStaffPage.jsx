import React, { useState } from 'react';
import './DesignStaffPage.css';
import DesignStaffSidebar from '../../components/DesignStaffSidebar/DesignStaffSidebar';
import DesignStaffHeader from '../../components/DesignStaffHeader/DesignStaffHeader';

function DesignStaffPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentView, setCurrentView] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); // State to store selected item details
  const [showDetailPopup, setShowDetailPopup] = useState(false); // State to manage popup visibility

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const requestData = [
    {
      customizeRequestID: 1,
      goldID: 'G001',
      goldweight: '100g',
      customerID: 'C001',
      saleStaffID: 'S001',
      managerID: 'M001',
      type: 'Type A',
      style: 'Style X',
      size: 'L',
      quotation: 'Q001',
      quotationdes: 'Description for Q001',
      quantity: 2,
      status: 'Pending',
    },
    {
      customizeRequestID: 2,
      goldID: 'G002',
      goldweight: '150g',
      customerID: 'C002',
      saleStaffID: 'S002',
      managerID: 'M002',
      type: 'Type B',
      style: 'Style Y',
      size: 'M',
      quotation: 'Q002',
      quotationdes: 'Description for Q002',
      quantity: 1,
      status: 'Completed',
    },
    {
      customizeRequestID: 3,
      goldID: 'G003',
      goldweight: '120g',
      customerID: 'C003',
      saleStaffID: 'S003',
      managerID: 'M003',
      type: 'Type C',
      style: 'Style Z',
      size: 'XL',
      quotation: 'Q003',
      quotationdes: 'Description for Q003',
      quantity: 3,
      status: 'Pending',
    },
  ];

  // Function to handle showing the detail popup
  const showDetail = (item) => {
    setSelectedItem(item); // Set selected item details
    setShowDetailPopup(true); // Show the detail popup
  };

  // Function to hide the detail popup
  const hideDetail = () => {
    setShowDetailPopup(false);
  };

  return (
    <div className='designstaff-page'>
      <DesignStaffSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        handleViewChange={handleViewChange}
      />
      <div className='designstaff-container'>
        <DesignStaffHeader />
        <div className='designstaff-main-container'>
          {currentView === 'orderlist' && (
            <div className='designstaff-table-container'>
              <h2 className='designstaff-table-title'>Order List</h2>
              <table className='designstaff-table'>
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Gold ID</th>
                    <th>Gold Weight</th>
                    <th>Customer ID</th>
                    <th>Sale Staff ID</th>
                    <th>Manager ID</th>
                    <th>Type</th>
                    <th>Style</th>
                    <th>Size</th>
                    <th>Quotation</th>
                    <th>Quotation Description</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requestData.map((item) => (
                    <tr key={item.customizeRequestID}>
                      <td>{item.customizeRequestID}</td>
                      <td>{item.goldID}</td>
                      <td>{item.goldweight}</td>
                      <td>{item.customerID}</td>
                      <td>{item.saleStaffID}</td>
                      <td>{item.managerID}</td>
                      <td>{item.type}</td>
                      <td>{item.style}</td>
                      <td>{item.size}</td>
                      <td>{item.quotation}</td>
                      <td>{item.quotationdes}</td>
                      <td>{item.quantity}</td>
                      <td>{item.status}</td>
                      <td>
                        <button className='designstaff-detail-button' onClick={() => showDetail(item)}>
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Popup */}
      {showDetailPopup && (
        <div className='designstaff-detail-popup'>
          <div className='designstaff-detail-popup-content'>
            <h2>Detail Popup</h2>
            <table className='designstaff-detail-table'>
              <tbody>
                <tr>
                  <td>Request ID:</td>
                  <td>{selectedItem.customizeRequestID}</td>
                </tr>
                <tr>
                  <td>Gold ID:</td>
                  <td>{selectedItem.goldID}</td>
                </tr>
                <tr>
                  <td>Gold Weight:</td>
                  <td>{selectedItem.goldweight}</td>
                </tr>
                <tr>
                  <td>Customer ID:</td>
                  <td>{selectedItem.customerID}</td>
                </tr>
                <tr>
                  <td>Sale Staff ID:</td>
                  <td>{selectedItem.saleStaffID}</td>
                </tr>
                <tr>
                  <td>Manager ID:</td>
                  <td>{selectedItem.managerID}</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>{selectedItem.type}</td>
                </tr>
                <tr>
                  <td>Style:</td>
                  <td>{selectedItem.style}</td>
                </tr>
                <tr>
                  <td>Size:</td>
                  <td>{selectedItem.size}</td>
                </tr>
                <tr>
                  <td>Quotation:</td>
                  <td>{selectedItem.quotation}</td>
                </tr>
                <tr>
                  <td>Quotation Description:</td>
                  <td>{selectedItem.quotationdes}</td>
                </tr>
                <tr>
                  <td>Quantity:</td>
                  <td>{selectedItem.quantity}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>{selectedItem.status}</td>
                </tr>
              </tbody>
            </table>
            <button className='designstaff-close-button' onClick={hideDetail}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesignStaffPage;

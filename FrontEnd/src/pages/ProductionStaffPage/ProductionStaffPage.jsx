import React, { useState } from "react";
import "./ProductionStaffPage.css";
import ProductionStaffSidebar from "../../components/ProductionStaffSidebar/ProductionStaffSidebar";
import ProductionStaffHeader from "../../components/ProductionStaffHeader/ProductionStaffHeader";

function ProductionStaffPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentView, setCurrentView] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  
  const [detailData, setDetailData] = useState(null); // State to store detail data

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    // Clear detail data when changing view
    setDetailData(null);
  };

  const orderData = [
    {
      customizeRequestID: 1,
      goldID: "G001",
      goldweight: "100g",
      customerID: "C001",
      saleStaffID: "S001",
      managerID: "M001",
      type: "Type A",
      style: "Style X",
      size: "L",
      quotation: "Q001",
      quotationdes: "Description for Q001",
      quantity: 2,
      status: "Pending",
      image: "image1.jpg",
    },
    {
      customizeRequestID: 2,
      goldID: "G002",
      goldweight: "150g",
      customerID: "C002",
      saleStaffID: "S002",
      managerID: "M002",
      type: "Type B",
      style: "Style Y",
      size: "M",
      quotation: "Q002",
      quotationdes: "Description for Q002",
      quantity: 1,
      status: "Completed",
      image: "image2.jpg",
    },
    {
      customizeRequestID: 3,
      goldID: "G003",
      goldweight: "120g",
      customerID: "C003",
      saleStaffID: "S003",
      managerID: "M003",
      type: "Type C",
      style: "Style Z",
      size: "XL",
      quotation: "Q003",
      quotationdes: "Description for Q003",
      quantity: 3,
      status: "Pending",
      image: "image3.jpg",
    },
  ];

  const showDetail = (item) => {
    setSelectedItem(item);
    setShowDetailPopup(true);
    
  };

  const hideDetail = () => {
    setShowDetailPopup(false);
  };

  

  const handleViewButtonClick = () => {
    setShowDetailPopup(false); // Close the popup
    // Save detail data before changing view
    setDetailData(selectedItem);
    setCurrentView("newView"); // Change current view to new div view
  };

  // Log detailData to console when it changes
  React.useEffect(() => {
    console.log("Detail Data:", detailData);
  }, [detailData]);

  return (
    <div className="productionstaff-page">
      <ProductionStaffSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        handleViewChange={handleViewChange}
      />
      <div className={`content ${showDetailPopup ? "blur" : ""}`}>
        <div className="productionstaff-container">
          <ProductionStaffHeader />
          <div className="productionstaff-main-container">
            {currentView === "orderlist" && (
              <div className="productionstaff-table-container">
                <h2 className="productionstaff-table-title">Order List</h2>
                <table className="productionstaff-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
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
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.map((item) => (
                      <tr key={item.customizeRequestID} onClick={() => showDetail(item)}>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {currentView === "newView" && (
              <div className="productionstaff-newview">
                <div className="productionstaff-div">Div 1</div>
                <div className="productionstaff-div">Div 2</div>
                <div className="productionstaff-div">Div 3</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDetailPopup && (
        <div className="productionstaff-detail-popup">
          <div className="productionstaff-detail-popup-content">
            <h2>Detail Popup</h2>
            <table className="productionstaff-detail-table">
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
                
                <tr>
                  <td colSpan="2">
                    <button className="productionstaff-close-button" onClick={hideDetail}>
                      Close
                    </button>
                    <button className="productionstaff-add-image-button" onClick={handleViewButtonClick}>
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductionStaffPage;

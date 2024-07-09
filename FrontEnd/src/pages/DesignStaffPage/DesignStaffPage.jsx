import React, { useState } from "react";
import "./DesignStaffPage.css";
import DesignStaffSidebar from "../../components/DesignStaffSidebar/DesignStaffSidebar";
import DesignStaffHeader from "../../components/DesignStaffHeader/DesignStaffHeader";

function DesignStaffPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentView, setCurrentView] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [formImage, setFormImage] = useState(null);
  const [designName, setDesignName] = useState("");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
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
    setUploadedImage(null); // Reset uploaded image state
  };

  const hideDetail = () => {
    setShowDetailPopup(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(URL.createObjectURL(file)); // Store image preview URL
    setSelectedItem({
      ...selectedItem,
      image: file.name, // Update selected item with new image name
    });
  };

  const handleAddImageClick = () => {
    setShowDetailPopup(false);
    setShowFormPopup(true);
  };

  const handleFormImageUpload = (e) => {
    const file = e.target.files[0];
    setFormImage(URL.createObjectURL(file));
    setSelectedItem({
      ...selectedItem,
      image: file.name,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedOrderData = orderData.map((order) =>
      order.customizeRequestID === selectedItem.customizeRequestID
        ? { ...order, image: selectedItem.image, designName: designName }
        : order
    );
    console.log(updatedOrderData); // Replace with actual state update or API call
    setShowFormPopup(false);
  };

  const handleCloseFormPopup = () => {
    setShowFormPopup(false);
    setShowDetailPopup(true);
  };

  return (
    <div className="designstaff-page">
      <DesignStaffSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        handleViewChange={handleViewChange}
      />
      <div className={`content ${showDetailPopup || showFormPopup ? "blur" : ""}`}>
        <div className="designstaff-container">
          <DesignStaffHeader />
          <div className="designstaff-main-container">
            {currentView === "orderlist" && (
              <div className="designstaff-table-container">
                <h2 className="designstaff-table-title">Order List</h2>
                <table className="designstaff-table">
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
          </div>
        </div>
      </div>

      {showDetailPopup && (
        <div className="designstaff-detail-popup">
          <div className="designstaff-detail-popup-content">
            <h2>Detail Popup</h2>
            <table className="designstaff-detail-table">
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
                {uploadedImage && (
                  <tr>
                    <td colSpan="2">
                      <div className="uploaded-image-preview-container">
                        <img
                          src={uploadedImage}
                          alt="Uploaded Preview"
                          className="uploaded-image-preview"
                        />
                      </div>
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan="2">
                    <button className="designstaff-close-button" onClick={hideDetail}>
                      Close
                    </button>
                    <button className="designstaff-add-image-button" onClick={handleAddImageClick}>
                      Add Image
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showFormPopup && (
        <div className="designstaff-form-popup">
          <div className="designstaff-form-popup-content">
            <h2>Add Image</h2>
            <div className="form-container">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label>Order ID:</label>
                  <input type="text" value={selectedItem.customizeRequestID} readOnly />
                </div>
                <div className="form-group">
                  <label>Design Name:</label>
                  <input
                    type="text"
                    value={designName}
                    onChange={(e) => setDesignName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Upload Image:</label>
                  <input type="file" onChange={handleFormImageUpload} />
                </div>
                {formImage && (
                  <div className="form-group">
                    <img src={formImage} alt="Form Preview" className="uploaded-image-preview" />
                  </div>
                )}
                <div className="form-group">
                  <button type="submit" className="designstaff-save-button">
                    Save
                  </button>
                  <button
                    type="button"
                    className="designstaff-close-button"
                    onClick={handleCloseFormPopup}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesignStaffPage;

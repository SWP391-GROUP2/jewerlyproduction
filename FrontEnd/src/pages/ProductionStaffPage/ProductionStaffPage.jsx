import React, { useEffect, useState } from "react";
import "./ProductionStaffPage.css";
import ProductionStaffSidebar from "../../components/ProductionStaffSidebar/ProductionStaffSidebar";
import ProductionStaffHeader from "../../components/ProductionStaffHeader/ProductionStaffHeader";
import axios from "axios";

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

  const [orderData, setOrderData] = useState([]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get("http://localhost:5266/api/Orders");
      setOrderData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchOrder();
    console.log("Your Order", orderData);
  }, []);

  const inproduction = orderData.filter(
    (data) => data.order.status === "In Production"
  );

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
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Design Staff</th>
                      <th>Production Staff</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inproduction.map((item) => (
                      <tr
                        key={item.customizeRequestID}
                        onClick={() => showDetail(item)}
                      >
                        <td>{item.order.orderId}</td>
                        <td>{item.order.customizeRequest.customer.name}</td>
                        <td>{item.order.designStaff?.name ?? "N/A"}</td>
                        <td>{item.order.productionStaff?.name ?? "N/A"}</td>
                        <td>{item.order.totalPrice}</td>
                        <td>{item.order.status}</td>
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
            <h2>Order Detail</h2>
            <table className="productionstaff-detail-table">
              <tbody>
                <tr>
                  <td>Order ID:</td>
                  <td>{selectedItem.order.orderId}</td>
                </tr>
                <tr>
                  <td>Customer Name:</td>
                  <td>{selectedItem.order.customizeRequest.customer.name}</td>
                </tr>
                <tr>
                  <td>Design Staff Name:</td>
                  <td>{selectedItem.order.designStaff?.name ?? "N/A"}</td>
                </tr>
                <tr>
                  <td>Production Staff Name:</td>
                  <td>{selectedItem.order.productionStaff?.name ?? "N/A"}</td>
                </tr>
                <tr>
                  <td>Total Price:</td>
                  <td>{selectedItem.order.totalPrice}</td>
                </tr>
                <tr>
                  <td>Order Date:</td>
                  <td>{selectedItem.order.orderDate}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>{selectedItem.order.status}</td>
                </tr>

                <tr>
                  <td colSpan="2">
                    <button
                      className="productionstaff-close-button"
                      onClick={hideDetail}
                    >
                      Close
                    </button>
                    <button
                      className="productionstaff-add-image-button"
                      onClick={handleViewButtonClick}
                    >
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

import React, { useEffect, useState } from "react";
import "./ProductionStaffPage.css";
import ProductionStaffSidebar from "../../components/ProductionStaffSidebar/ProductionStaffSidebar";
import ProductionStaffHeader from "../../components/ProductionStaffHeader/ProductionStaffHeader";
import axios from "axios";

function ProductionStaffPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentView, setCurrentView] = useState("orderlist"); // Default view
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);

  const [detailData, setDetailData] = useState(null); // State to store detail data
  const [inspectionData, setInspectionData] = useState(null); // State to store inspection data

  const [orderData, setOrderData] = useState([]);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5266/api/Orders");
      setOrderData(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch inspection data for a specific order
  const fetchOrderInspection = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:5266/api/Inspection/order/${orderId}`
      );
      setInspectionData(response.data);
    } catch (error) {
      console.error("Error fetching inspection data:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle input change in inspection data
  const handleInputChange = (index, field, value) => {
    const newInspectionData = [...inspectionData];
    newInspectionData[index][field] = value;
    setInspectionData(newInspectionData);
  };

  // Handle submission of inspection data
  const handleSubmit = async (inspection) => {
    const { orderId, stage, result, comment } = inspection;
    try {
      await axios.put(
        `http://localhost:5266/api/ProductionStaff/record-inspection?orderId=${orderId}&stage=${encodeURIComponent(
          stage
        )}`,
        {
          result,
          comment,
        }
      );
      alert("Data submitted successfully");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Order not found:", error.response.data);
        alert("Order not found. Please check the orderId and stage.");
      } else {
        console.error("Error submitting data:", error);
        alert("Failed to submit data. Please try again later.");
      }
    }
  };

  // Show details of an order
  const showDetail = (item) => {
    setSelectedItem(item);
    setShowDetailPopup(true);
    fetchOrderInspection(item.order.orderId); // Fetch inspection data for selected order
  };

  // Hide order details popup
  const hideDetail = () => {
    setShowDetailPopup(false);
  };

  // Handle view button click (e.g., to view inspection details)
  const handleViewButtonClick = async () => {
    setShowDetailPopup(false); // Close the popup
    setDetailData(selectedItem); // Save detail data before changing view
    setCurrentView("newView"); // Change current view to 'newView'
    await fetchOrderInspection(selectedItem.order.orderId); // Fetch inspection data for selected order
  };
  const inproduction = orderData.filter(
    (data) => data.order.status === "In Production"
  );

  return (
    <div className="productionstaff-page">
      <ProductionStaffSidebar
        openSidebarToggle={openSidebarToggle}
        setOpenSidebarToggle={setOpenSidebarToggle}
        handleViewChange={setCurrentView}
      />
      <div className={`content ${showDetailPopup ? "blur" : ""}`}>
        <div className="productionstaff-container">
          <ProductionStaffHeader />
          <div className="productionstaff-main-container">
            {/* Render order list view */}
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
                    {/* Map through orders in production */}
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
            {/* Render detailed inspection view */}
            {currentView === "newView" && (
              <div className="productionstaff-newview">
                <table className="inspection-table">
                  <thead>
                    <tr>
                      <th>Inspection ID</th>
                      <th>Stage</th>
                      <th>Inspection Date</th>
                      <th>Result</th>
                      <th>Comment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map through inspection data */}
                    {inspectionData &&
                      inspectionData.map((inspection, index) => (
                        <tr key={inspection.inspectionId}>
                          <td>{inspection.inspectionId}</td>
                          <td>{inspection.stage}</td>
                          <td>
                            {new Date(
                              inspection.inspectionDate
                            ).toLocaleString()}
                          </td>
                          <td>
                            <select
                              value={inspection.result}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "result",
                                  e.target.value === "true"
                                )
                              }
                            >
                              <option value="true">True</option>
                              <option value="false">False</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              value={inspection.comment ?? ""}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "comment",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <button onClick={() => handleSubmit(inspection)}>
                              Submit
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
      </div>

      {/* Render detail popup */}
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

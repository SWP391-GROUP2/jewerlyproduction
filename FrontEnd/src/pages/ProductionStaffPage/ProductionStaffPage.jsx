import React, { useEffect, useState } from "react";
import "./ProductionStaffPage.css";
import ProductionStaffSidebar from "../../components/ProductionStaffSidebar/ProductionStaffSidebar";
import ProductionStaffHeader from "../../components/ProductionStaffHeader/ProductionStaffHeader";
import axios from "axios";
import Notify from "../../components/Alert/Alert";

function ProductionStaffPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentView, setCurrentView] = useState("orderlist"); // Default view
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);

  const [inspectionData, setInspectionData] = useState(null); // State to store inspection data

  const [orderData, setOrderData] = useState([]);

  const [currentStage, setCurrentStage] = useState("Material Checking"); // Default stage

  // In danh sách Order
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5266/api/Orders");
      setOrderData(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Lấy danh sách kiểm tra của đơn hàng với orderId
  const fetchOrderInspection = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:5266/api/Inspection/order/${orderId}`
      );
      // Sắp xếp lại các giai đoạn trước khi set vào state
      const sortedData = response.data.sort((a, b) => {
        const order = [
          "Material Checking",
          "In Production Progress",
          "Final Inspection",
        ];
        return order.indexOf(a.stage) - order.indexOf(b.stage);
      });
      setInspectionData(sortedData);
    } catch (error) {
      console.error("Error fetching inspection data:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Xử lý thay đổi đầu vào trong dữ liệu kiểm tra
  const handleInputChange = (index, field, value) => {
    const newInspectionData = [...inspectionData];
    newInspectionData[index][field] = value;
    setInspectionData(newInspectionData);
  };

  // Xử lý gửi dữ liệu kiểm tra
  const handleSubmitInspection = async (inspection) => {
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
      Notify.success("Data submitted successfully");
      if (stage === "Material Checking") {
        setCurrentStage("In Production Progress");
      } else if (stage === "In Production Progress") {
        setCurrentStage("Final Inspection");
      } else if (stage === "Final Inspection") {
        setCurrentStage("Complete");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Order not found:", error.response.data);
        Notify.fail("Order not found. Please check the orderId and stage.");
      } else {
        console.error("Error submitting data:", error);
        Notify.fail("Failed to submit data. Please try again later.");
      }
    }
  };

  const handleUpdateStatus = async () => {
    const orderId = selectedItem.orderId; // Thay thế bằng giá trị thực tế
    try {
      await axios.put(
        `http://localhost:5266/api/ProductionStaff/updateStatus`,
        null,
        {
          params: {
            orderId,
            stage: "Final Inspection",
          },
        }
      );
      Notify.success("Order status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      Notify.fail("Failed to update status. Please try again later.");
    }
  };

  // Hiển thị chi tiết của một đơn hàng
  const showDetail = (item) => {
    setSelectedItem(item);
    setShowDetailPopup(true);
    fetchOrderInspection(item.orderId); // Lấy dữ liệu kiểm tra cho đơn hàng được chọn
  };

  // Ẩn popup chi tiết đơn hàng
  const hideDetail = () => {
    setShowDetailPopup(false);
  };

  // Xử lý nút xem chi tiết (ví dụ: để xem chi tiết kiểm tra)
  const handleViewButtonClick = async () => {
    setShowDetailPopup(false); // Đóng popup
    setCurrentView("newView"); // Chuyển màn hình hiện tại sang 'newView'
    await fetchOrderInspection(selectedItem.orderId); // Lấy dữ liệu kiểm tra cho đơn hàng được chọn
  };
  const inproduction = orderData.filter(
    (data) => data.status === "In Production"
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
            {/* Hiển thị danh sách đơn hàng */}
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
                    {/* Duyệt qua các đơn hàng trong quá trình sản xuất */}
                    {inproduction.map((item) => (
                      <tr key={item.orderId} onClick={() => showDetail(item)}>
                        <td>{item.orderId}</td>
                        <td>{item.customerName}</td>
                        <td>{item?.designStaffName ?? "N/A"}</td>
                        <td>{item?.productionStaffName ?? "N/A"}</td>
                        <td>{item.totalPrice}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Hiển thị chi tiết kiểm tra */}
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
                    {/* Duyệt qua dữ liệu kiểm tra  */}
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
                              disabled={currentStage !== inspection.stage}
                            >
                              <option value="true">Complete</option>
                              <option value="false">Mistake</option>
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
                              disabled={currentStage !== inspection.stage}
                            />
                          </td>
                          <td>
                            <button
                              className="detail-button-s"
                              onClick={() => handleSubmitInspection(inspection)}
                              disabled={currentStage !== inspection.stage}
                            >
                              Submit
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {currentStage === "Complete" && (
                  <button
                    className="productionstaff-final-submit"
                    onClick={handleUpdateStatus}
                  >
                    Complete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hiển thị popup chi tiết */}
      {showDetailPopup && (
        <div className="productionstaff-detail-popup">
          <div className="productionstaff-detail-popup-content">
            <h2>Order Detail</h2>
            <table className="productionstaff-detail-table">
              <tbody>
                <tr>
                  <td>Order ID:</td>
                  <td>{selectedItem.orderId}</td>
                </tr>
                <tr>
                  <td>Customer Name:</td>
                  <td>{selectedItem.customerName}</td>
                </tr>
                <tr>
                  <td>Design Staff Name:</td>
                  <td>{selectedItem?.designStaffName ?? "N/A"}</td>
                </tr>
                <tr>
                  <td>Production Staff Name:</td>
                  <td>{selectedItem?.productionStaffName ?? "N/A"}</td>
                </tr>
                <tr>
                  <td>Total Price:</td>
                  <td>{selectedItem.totalPrice}</td>
                </tr>
                <tr>
                  <td>Order Date:</td>
                  <td>{selectedItem.orderDate}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>{selectedItem.status}</td>
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

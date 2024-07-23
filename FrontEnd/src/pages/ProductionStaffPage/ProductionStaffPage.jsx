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
  const [DesignData, setDesignData] = useState([]);
  const [designItem, set3ddesignItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [gemstones, setGemstones] = useState([]);
  const [productSamples, setProductSamples] = useState([]);
  const url = "https://nbjewelrybe.azurewebsites.net";

  // In danh sách Order
  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://nbjewelrybe.azurewebsites.net/api/Orders");
      setOrderData(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Paginate function for both gemstones and product samples
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle item click
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // Handle popup close
  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  // Calculate current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems =
    currentView === "gemstonelist"
      ? gemstones.slice(indexOfFirstItem, indexOfLastItem)
      : productSamples.slice(indexOfFirstItem, indexOfLastItem);

  // Total number of pages
  const totalItems =
    currentView === "gemstonelist" ? gemstones.length : productSamples.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Fetch gemstones data from API
  useEffect(() => {
    const fetchGemstones = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/api/Gemstones`);
        setGemstones(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchGemstones();
  }, []);

  // Fetch product samples data from API
  useEffect(() => {
    const fetchProductSamples = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${url}/api/ProductSamples/FilterInsearch`
        );
        setProductSamples(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProductSamples();
  }, []);

  // Lấy danh sách kiểm tra của đơn hàng với orderId
  const fetchOrderInspection = async (orderId) => {
    try {
      const response = await axios.get(
        `https://nbjewelrybe.azurewebsites.net/api/Inspection/order/${orderId}`
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

  const fetch3dDesign = async () => {
    try {
      const response = await axios.get("https://nbjewelrybe.azurewebsites.net/api/_3ddesign");
      console.log("Response Data:", response.data); // Kiểm tra dữ liệu phản hồi
      setDesignData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error); // Kiểm tra lỗi
    }
  };

  useEffect(() => {
    fetch3dDesign();
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
        `https://nbjewelrybe.azurewebsites.net/api/ProductionStaff/record-inspection?orderId=${orderId}&stage=${encodeURIComponent(
          stage
        )}`,
        {
          result,
          comment,
        }
      );

      if (result) {
        if (stage === "Material Checking") {
          setCurrentStage("In Production Progress");
          Notify.success("Data submitted successfully");
        } else if (stage === "In Production Progress") {
          setCurrentStage("Final Inspection");
          Notify.success("Data submitted successfully");
        } else if (stage === "Final Inspection") {
          setCurrentStage("Complete");
          Notify.success("Data submitted successfully");
        }
      } else {
        Notify.warning("Process submitted have mistake");
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
        `https://nbjewelrybe.azurewebsites.net/api/ProductionStaff/updateStatus`,
        null,
        {
          params: {
            orderId,
            stage: "Final Inspection",
          },
        }
      );
      Notify.success("Order status updated successfully");
      setCurrentView("orderlist");
    } catch (error) {
      console.error("Error updating status:", error);
      Notify.fail("Failed to update status. Please try again later.");
    }
  };

  // Hiển thị chi tiết của một đơn hàng
  const showDetail = (item) => {
    const designItem = DesignData.find(
      (design) => design.orderId === item.orderId
    );
    console.log("designItem:", designItem);
    set3ddesignItem(designItem);
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
                              <option value="" disabled selected>
                                -- Choose Result --
                              </option>
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
            {currentView === "gemstonelist" && (
              <div className="gemstone-list">
                <h2>Gemstone List</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error.message}</p>
                ) : (
                  <>
                    <div className="gemstone-grid">
                      {currentItems.map((gemstone, index) => (
                        <div
                          key={index}
                          className="gemstone-item"
                          onClick={() => handleItemClick(gemstone)}
                        >
                          <img
                            src={
                              gemstone.image ||
                              "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721234991/no-image-icon-15_kbk0ah.png"
                            }
                            alt={gemstone.name}
                            className="gemstone-product-image"
                          />
                          <div className="details-container">
                            <div className="detail-box">
                              <strong>{gemstone.name}</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Pagination */}
                    <ul className="pagination">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <li
                          key={i}
                          className={`page-item ${
                            currentPage === i + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            onClick={() => paginate(i + 1)}
                            className={`page-link ${
                              currentPage === i + 1 ? "active" : ""
                            }`}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
            {currentView === "productlist" && (
              <div className="product-sample-list">
                <h2>Product Sample List</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error.message}</p>
                ) : (
                  <>
                    <div className="gemstone-grid">
                      {currentItems.map((product, index) => (
                        <div
                          key={index}
                          className="gemstone-item"
                          onClick={() => handleItemClick(product)}
                        >
                          <img
                            src={
                              product.image ||
                              "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721234991/no-image-icon-15_kbk0ah.png"
                            }
                            alt={product.productName}
                            className="gemstone-product-image"
                          />
                          <div className="details-container">
                            <div className="pr-detail-box">
                              <strong>{product.productName}</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Pagination */}
                    <ul className="pagination">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <li
                          key={i}
                          className={`page-item ${
                            currentPage === i + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            onClick={() => paginate(i + 1)}
                            className={`page-link ${
                              currentPage === i + 1 ? "active" : ""
                            }`}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {selectedItem && currentView === "gemstonelist" && (
              <div className="item-popup">
                <div className="item-popup-content">
                  <button
                    className="close-popup-button"
                    onClick={handleClosePopup}
                  >
                    Close
                  </button>
                  <div className="popup-details">
                    <h3>{selectedItem.name}</h3>
                    <img
                      src={
                        selectedItem.image ||
                        "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721234991/no-image-icon-15_kbk0ah.png"
                      }
                      alt={selectedItem.name}
                      className="popup-product-image"
                    />
                    <div className="details-container">
                      <div className="detail-box">
                        <strong>ID: {selectedItem.gemstoneId}</strong>
                      </div>
                      <div className="detail-box">
                        <strong>Size: {selectedItem.size}</strong>
                      </div>
                      <div className="detail-box">
                        <strong>Color: {selectedItem.color}</strong>
                      </div>
                      <div className="detail-box">
                        <strong>
                          Carat Weight: {selectedItem.caratWeight}
                        </strong>
                      </div>
                      <div className="detail-box">
                        <strong>Price: {selectedItem.price}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Popup for selected product */}
            {selectedItem && currentView === "productlist" && (
              <div className="item-popup">
                <div className="item-popup-content">
                  <button
                    className="close-popup-button"
                    onClick={handleClosePopup}
                  >
                    Close
                  </button>
                  <div className="popup-details">
                    <h3>{selectedItem.productName}</h3>
                    <img
                      src={
                        selectedItem.image ||
                        "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721234991/no-image-icon-15_kbk0ah.png"
                      }
                      alt={selectedItem.productName}
                      className="popup-product-image"
                    />
                    <div className="details-container">
                      <div className="detail-box">
                        <strong>
                          Product Sample ID: {selectedItem.productSampleId}
                        </strong>
                      </div>
                      <div className="detail-box">
                        <strong>Type: {selectedItem.type}</strong>
                      </div>
                      <div className="detail-box">
                        <strong>Style: {selectedItem.style}</strong>
                      </div>
                      <div className="detail-box">
                        <strong>Size: {selectedItem.size}</strong>
                      </div>
                      <div className="detail-box">
                        <strong>GoldType: {selectedItem.goldType}</strong>
                      </div>
                      <div className="detail-box">
                        <strong>Price: {selectedItem.price}</strong>
                      </div>
                    </div>
                  </div>
                </div>
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
            <div className="productionstaff-detail-container">
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
                  {designItem.image && (
                    <tr>
                      <td colSpan="2">
                        <img
                          src={designItem.image}
                          alt="Order Ig"
                          style={{ width: "50%", height: "50%" }}
                        />
                      </td>
                    </tr>
                  )}

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
        </div>
      )}
    </div>
  );
}

export default ProductionStaffPage;

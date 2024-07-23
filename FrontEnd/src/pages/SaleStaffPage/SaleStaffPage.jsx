import React, { useEffect, useState } from "react";
import "./SaleStaffPage.css";
import SaleStaffSidebar from "../../components/SaleStaffSidebar/SaleStaffSidebar";
import SaleStaffHeader from "../../components/SaleStaffHeader/SaleStaffHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Notify from "../../components/Alert/Alert";

function SaleStaffPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentView, setCurrentView] = useState("wait_for_quotation");
  const [requestData, setRequestData] = useState([]);
  const [detailPopupData, setDetailPopupData] = useState(null);
  const [detailUpdatePopupData, setDetailUpdatePopupData] = useState(null);
  const [goldWeight, setGoldWeight] = useState("");
  const [fetchDataFlag, setFetchDataFlag] = useState(false);
  const [hasFetchedOrders, setHasFetchedOrders] = useState(false);
  const [OrderData, setOrderData] = useState([]);

  const user = useSelector((State) => State.auth.Login.currentUser);

  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "https://nbjewelrybe.azurewebsites.net/api/CustomerRequests"
      );
      console.log("Response Data:", response.data); // Kiểm tra dữ liệu phản hồi
      setRequestData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error); // Kiểm tra lỗi
      setError(error);
    }
  };

  useEffect(() => {
    if (!hasFetchedOrders && (fetchDataFlag || requestData.length === 0)) {
      fetchRequests();
      setFetchDataFlag(false);
      setHasFetchedOrders(true);
    }
  }, [fetchDataFlag, requestData, hasFetchedOrders]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get("https://nbjewelrybe.azurewebsites.net/api/Orders");
      console.log("Response Data:", response.data); // Kiểm tra dữ liệu phản hồi
      setOrderData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error); // Kiểm tra lỗi
      setError(error);
    }
  };

  useEffect(() => {
    if (!hasFetchedOrders && (fetchDataFlag || OrderData.length === 0)) {
      fetchOrder();
      setFetchDataFlag(false);
      setHasFetchedOrders(true);
    }
  }, [fetchDataFlag, OrderData, hasFetchedOrders]);

  const handleSidebarToggle = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const sendQuote = async (customizeRequestId, goldWeight) => {
    try {
      const headers = {
        Authorization: `Bearer ${user.token}`, // Đảm bảo rằng Authorization header đúng định dạng
      };

      // Tạo chuỗi truy vấn từ params
      const params = new URLSearchParams({
        CustomizeRequestId: customizeRequestId,
        GoldWeight: goldWeight,
      });

      const response = await axios.post(
        `https://nbjewelrybe.azurewebsites.net/api/SaleStaff/send-approved?${params.toString()}`,
        null,
        { headers: headers }
      );

      console.log("Response:", response.data);
      Notify.success("Send Quote Successfully");
      return response.data;
    } catch (error) {
      console.error("Error sending quotation request:", error);
      Notify.fail("Send Quote Failed !");
      throw error;
    }
  };

  const UpdateQuote = async (customizeRequestId, goldWeight) => {
    try {
      const headers = {
        Authorization: `Bearer ${user.token}`, // Đảm bảo rằng Authorization header đúng định dạng
      };

      // Tạo chuỗi truy vấn từ params
      const params = new URLSearchParams({
        CustomizeRequestId: customizeRequestId,
        GoldWeight: goldWeight,
      });

      const response = await axios.put(
        `https://nbjewelrybe.azurewebsites.net/api/SaleStaff/update-approved?${params.toString()}`,
        null,
        { headers: headers }
      );

      console.log("Response:", response.data);
      Notify.success("Send Quote Successfully");
      return response.data;
    } catch (error) {
      console.error("Error sending quotation request:", error);
      Notify.fail("Send Quote Failed !");
      throw error;
    }
  };

  const handleSaveDetailPopup = async () => {
    const { customizeRequestId } = detailPopupData;
    try {
      await sendQuote(customizeRequestId, goldWeight);
      await fetchRequests();
    } catch (error) {
      console.error("Error updating request:", error);
    }
    handleCloseDetailPopup();
  };

  const handleUpdateDetailPopup = async () => {
    const { customizeRequestId } = detailUpdatePopupData;
    try {
      await UpdateQuote(customizeRequestId, goldWeight);
      await fetchRequests();
    } catch (error) {
      console.error("Error updating request:", error);
    }
    handleCloseUpdatePopup();
  };

  const handleShowDetailPopup = (rowData) => {
    setDetailPopupData(rowData);
    setGoldWeight(rowData.goldweight);
  };

  const handleUpdateQuotePopup = (rowData) => {
    setDetailUpdatePopupData(rowData);
    setGoldWeight(rowData.goldweight);
  };

  const handleCheckPayment = async (orderid, quotation) => {
    try {
      if (isNaN(quotation) || quotation <= 0) {
        throw new Error("Invalid quotation value.");
      }

      const price = quotation * 0.3;

      if (isNaN(price)) {
        throw new Error("Calculated price is not a valid number.");
      }

      await changeStatusToDesigner(orderid, price);
      await fetchOrder(); // Cập nhật lại dữ liệu sau khi gọi API
    } catch (error) {
      console.error("Error updating order status:", error.message);
      console.error("Full error object:", error);
    }
  };

  const changeStatusToDesigner = async (orderid, price) => {
    try {
      const response = await axios.put(
        `https://nbjewelrybe.azurewebsites.net/api/Orders/change-status%20To%20Designer?orderID=${orderid}&price=${price}`
      );
      console.log("Order status changed successfully:", response.data);

      // Cập nhật state sau khi gọi API thành công
      setOrderData((prevOrders) =>
        prevOrders.map((order) =>
          order.orderID === orderid
            ? { ...order, status: "Designer", price }
            : order
        )
      );
    } catch (error) {
      console.error("Error changing order status:", error);
    }
  };

  const handleCloseDetailPopup = () => {
    setDetailPopupData(null);
    setGoldWeight("");
  };

  const handleCloseUpdatePopup = () => {
    setDetailUpdatePopupData(null);
    setGoldWeight("");
  };

  const decodedToken = jwtDecode(user.token);
  const salestaffId = decodedToken.sid;

  const waitForQuotationRequests = requestData.filter(
    (data) =>
      data.status === "Wait for Quotation" && data.saleStaffId === salestaffId
  );
  const waitForApproveRequests = requestData.filter(
    (data) =>
      data.status === "Wait For Approval" && data.saleStaffId === salestaffId
  );
  const paymentpendingOrder = OrderData.filter(
    (OrderData) =>
      OrderData.status === "Payment Pending" &&
      OrderData.paymentMethodId === "P001" &&
      OrderData.saleStaffId === salestaffId
  );

  const YourOrder = OrderData.filter(
    (OrderData) => OrderData.saleStaffId === salestaffId
  );

  const rejectListData = requestData.filter(
    (data) =>
      data.status === "Request Reject" && data.saleStaffId === salestaffId
  );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="salestaff-page">
      <SaleStaffSidebar
        openSidebarToggle={openSidebarToggle}
        handleSidebarToggle={handleSidebarToggle}
        setCurrentView={setCurrentView}
      />
      <div className={`content ${detailPopupData ? "blur" : ""}`}>
        <div className="salestaff-container">
          <SaleStaffHeader />
          <div className="salestaff-newdiv">
            {currentView === "wait_for_quotation" && (
              <div>
                <h2 className="table-heading">Request List</h2>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Customize Request ID</th>
                      <th>Customer Name</th>
                      <th>Sales Staff Name</th>
                      <th>Gold Type</th>
                      <th>Type</th>
                      <th>Style</th>
                      <th>Size</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitForQuotationRequests.map((row, index) => (
                      <tr key={index}>
                        <td>{row.customizeRequestId}</td>
                        <td>{row.customerName}</td>
                        <td>{row.saleStaffName}</td>
                        <td>{row.goldType}</td>
                        <td>{row.type}</td>
                        <td>{row.style}</td>
                        <td>{row.size}</td>
                        <td>{row.quantity}</td>
                        <td>{row.status}</td>
                        <td>
                          <button
                            className="salestaff-detail-button"
                            onClick={() => handleShowDetailPopup(row)}
                          >
                            Quote
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {currentView === "wait_for_approve" && (
              <div>
                <h2 className="table-heading">Wait for Approve</h2>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Customize Request ID</th>
                      <th>Customer Name</th>
                      <th>Sales Staff Name</th>
                      <th>Gold Type</th>
                      <th>Type</th>
                      <th>Style</th>
                      <th>Size</th>
                      <th>Quotation</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitForApproveRequests.map((row, index) => (
                      <tr key={index}>
                        <td>{row.customizeRequestId}</td>
                        <td>{row.customerName}</td>
                        <td>{row.saleStaffName}</td>
                        <td>{row.goldType}</td>
                        <td>{row.type}</td>
                        <td>{row.style}</td>
                        <td>{row.size}</td>
                        <td>{row.quotation}</td>
                        <td>{row.quantity}</td>
                        <td>{row.status}</td>
                        <td>
                          <button
                            className="salestaff-detail-button"
                            onClick={() => handleShowDetailPopup(row)}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {currentView === "payment_pending" && (
              <div>
                <h2 className="table-heading">Payment Pending</h2>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Sales Staff</th>
                      <th>Design Staff</th>
                      <th>Production Staff</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentpendingOrder.map((row, index) => (
                      <tr key={index}>
                        <td>{row.orderId}</td>
                        <td>{row.customerName}</td>
                        <td>{row.saleStaffName}</td>
                        <td>{row?.designStaffName || ""}</td>
                        <td>{row?.productionStaffName || ""}</td>
                        <td>{row.totalPrice}</td>
                        <td>{row.status}</td>
                        <td>
                          <button
                            className="salestaff-detail-button"
                            onClick={() =>
                              handleCheckPayment(row.orderId, row.quotation)
                            }
                          >
                            Already Paid
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {currentView === "Reject_list" && (
              <div>
                <h2 className="table-heading">Reject List</h2>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>customizeRequest ID</th>
                      <th>Gold Weight</th>
                      <th>Type</th>
                      <th>Style</th>
                      <th>Size</th>
                      <th>Quotation</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rejectListData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.customizeRequestId}</td>
                        <td>{row.goldWeight}</td>

                        <td>{row.type}</td>
                        <td>{row.style}</td>
                        <td>{row.size}</td>
                        <td>{row.quotation}</td>

                        <td>{row.quantity}</td>
                        <td>{row.status}</td>
                        <td>
                          <button
                            className="salestaff-detail-button"
                            onClick={() => handleUpdateQuotePopup(row)}
                          >
                            Update Quote
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {currentView === "Order_list" && (
              <div>
                <h2 className="table-heading">Order List</h2>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Sales Staff</th>
                      <th>Design Staff</th>
                      <th>Production Staff</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {YourOrder.map((row, index) => (
                      <tr key={index}>
                        <td>{row.orderId}</td>
                        <td>{row.customerName}</td>
                        <td>{row.saleStaffName}</td>
                        <td>{row?.designStaffName || ""}</td>
                        <td>{row?.productionStaffName || ""}</td>
                        <td>{row.totalPrice}</td>
                        <td>{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {detailPopupData && (
        <div className="detail-popup">
          <div className="detail-popup-content">
            <h3>Detail Popup</h3>
            <table className="detail-table">
              <tbody>
                <tr>
                  <td>Customize Request ID:</td>
                  <td>{detailPopupData.customizeRequestId}</td>
                </tr>
                <tr>
                  <td>Customer Name:</td>
                  <td>{detailPopupData.customerName}</td>
                </tr>
                <tr>
                  <td>Gold Type:</td>
                  <td>{detailPopupData.goldType}</td>
                </tr>
                <tr>
                  <td>Gold Weight:</td>
                  <td>
                    {currentView === "wait_for_quotation" ? (
                      <input
                        type="text"
                        value={goldWeight}
                        onChange={(e) => setGoldWeight(e.target.value)}
                        className="detail-input"
                      />
                    ) : (
                      detailPopupData.goldWeight
                    )}
                  </td>
                </tr>

                <tr>
                  <td>Type:</td>
                  <td>{detailPopupData.type}</td>
                </tr>
                <tr>
                  <td>Style:</td>
                  <td>{detailPopupData.style}</td>
                </tr>
                <tr>
                  <td>Size:</td>
                  <td>{detailPopupData.size}</td>
                </tr>
                <tr>
                  <td>Quotation:</td>
                  <td>{detailPopupData.quotation}</td>
                </tr>

                <tr>
                  <td>Quotation Description:</td>
                  <td>{detailPopupData.quotationDes}</td>
                </tr>
                <tr>
                  <td>Quantity:</td>
                  <td>{detailPopupData.quantity}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>{detailPopupData.status}</td>
                </tr>
              </tbody>
            </table>
            <div>
              <button
                className="detail-button-cl"
                onClick={handleCloseDetailPopup}
              >
                Close
              </button>
              {currentView === "wait_for_quotation" && (
                <button
                  className="detail-button-sa"
                  onClick={handleSaveDetailPopup}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {detailUpdatePopupData && (
        <div className="detail-popup">
          <div className="detail-popup-content">
            <h3>Detail Popup</h3>
            <table className="detail-table">
              <tbody>
                <tr>
                  <td>Customize Request ID:</td>
                  <td>{detailUpdatePopupData.customizeRequestId}</td>
                </tr>
                <tr>
                  <td>Customer Name:</td>
                  <td>{detailUpdatePopupData.customerName}</td>
                </tr>
                <tr>
                  <td>Gold Type:</td>
                  <td>{detailUpdatePopupData.goldType}</td>
                </tr>
                <tr>
                  <td>Gold Weight:</td>
                  <td>
                    {currentView === "Reject_list" ? (
                      <input
                        type="text"
                        value={goldWeight}
                        onChange={(e) => setGoldWeight(e.target.value)}
                        className="detail-input"
                      />
                    ) : (
                      detailUpdatePopupData.goldWeight
                    )}
                  </td>
                </tr>

                <tr>
                  <td>Type:</td>
                  <td>{detailUpdatePopupData.type}</td>
                </tr>
                <tr>
                  <td>Style:</td>
                  <td>{detailUpdatePopupData.style}</td>
                </tr>
                <tr>
                  <td>Size:</td>
                  <td>{detailUpdatePopupData.size}</td>
                </tr>
                <tr>
                  <td>Quotation:</td>
                  <td>{detailUpdatePopupData.quotation}</td>
                </tr>

                <tr>
                  <td>Quotation Description:</td>
                  <td>{detailUpdatePopupData.quotationDes}</td>
                </tr>
                <tr>
                  <td>Quantity:</td>
                  <td>{detailUpdatePopupData.quantity}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>{detailUpdatePopupData.status}</td>
                </tr>
              </tbody>
            </table>
            <div>
              <button
                className="detail-button-cl"
                onClick={handleCloseUpdatePopup}
              >
                Close
              </button>
              {currentView === "Reject_list" && (
                <button
                  className="detail-button-sa"
                  onClick={handleUpdateDetailPopup}
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SaleStaffPage;

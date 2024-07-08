import React, { useEffect, useState } from "react";
import "./SaleStaffPage.css";
import SaleStaffSidebar from "../../components/SaleStaffSidebar/SaleStaffSidebar";
import SaleStaffHeader from "../../components/SaleStaffHeader/SaleStaffHeader";
import axios from "axios";
import { useSelector } from "react-redux";

function SaleStaffPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentView, setCurrentView] = useState("wait_for_quotation");
  const [requestData, setRequestData] = useState([]);
  const [detailPopupData, setDetailPopupData] = useState(null);
  const [goldWeight, setGoldWeight] = useState("");
  const [fetchDataFlag, setFetchDataFlag] = useState(false);
  const [hasFetchedOrders, setHasFetchedOrders] = useState(false);

  const user = useSelector((State) => State.auth.Login.currentUser);

  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5266/api/CustomerRequests"
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
  }, [fetchDataFlag, requestData]);

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
        `http://localhost:5266/api/SaleStaff/send-approved?${params.toString()}`,
        null,
        { headers: headers }
      );

      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending quotation request:", error);
      throw error;
    }
  };

  const handleSaveDetailPopup = async () => {
    const { customizeRequestId } = detailPopupData.customerRequest;
    try {
      await sendQuote(customizeRequestId, goldWeight);
      await fetchRequests();
    } catch (error) {
      console.error("Error updating request:", error);
    }
    handleCloseDetailPopup();
  };

  const handleShowDetailPopup = (rowData) => {
    setDetailPopupData(rowData);
    setGoldWeight(rowData.goldweight);
  };

  // Gắn api ok sẽ qua trang update deposit và tạo 3 inspection
  const handleCheckPayment = (rowData) => {
    setDetailPopupData(rowData);
  };

  const handleCloseDetailPopup = () => {
    setDetailPopupData(null);
    setGoldWeight("");
  };

  const waitForQuotationRequests = requestData.filter(
    (data) => data.customerRequest.status === "Wait for Quotation"
  );
  const waitForApproveRequests = requestData.filter(
    (data) => data.customerRequest.status === "Wait For Approval"
  );
  const paymentpendingRequests = requestData.filter(
    (data) => data.customerRequest.status === "Payment Pending"
  );
  const rejectListData = requestData.filter(
    (data) => data.customerRequest.status === "Quotation Rejected"
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
                        <td>{row.customerRequest.customizeRequestId}</td>
                        <td>{row.customerName}</td>
                        <td>{row.saleStaffName}</td>
                        <td>{row.customerRequest.gold.goldType}</td>
                        <td>{row.customerRequest.type}</td>
                        <td>{row.customerRequest.style}</td>
                        <td>{row.customerRequest.size}</td>
                        <td>{row.customerRequest.quantity}</td>
                        <td>{row.customerRequest.status}</td>
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
                        <td>{row.customerRequest.customizeRequestId}</td>
                        <td>{row.customerName}</td>
                        <td>{row.saleStaffName}</td>
                        <td>{row.customerRequest.gold.goldType}</td>
                        <td>{row.customerRequest.type}</td>
                        <td>{row.customerRequest.style}</td>
                        <td>{row.customerRequest.size}</td>
                        <td>{row.customerRequest.quotation}</td>
                        <td>{row.customerRequest.quantity}</td>
                        <td>{row.customerRequest.status}</td>
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
                      <th>Check Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentpendingRequests.map((row, index) => (
                      <tr key={index}>
                        <td>{row.customerRequest.customizeRequestId}</td>
                        <td>{row.customerName}</td>
                        <td>{row.saleStaffName}</td>
                        <td>{row.customerRequest.gold.goldType}</td>
                        <td>{row.customerRequest.type}</td>
                        <td>{row.customerRequest.style}</td>
                        <td>{row.customerRequest.size}</td>
                        <td>{row.customerRequest.quotation}</td>
                        <td>{row.customerRequest.quantity}</td>
                        <td>{row.customerRequest.status}</td>
                        <td>
                          <button
                            className="salestaff-detail-button"
                            onClick={() => handleCheckPayment(row)}
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
                      <th>Gold ID</th>
                      <th>Gold Weight</th>
                      <th>Customer ID</th>
                      <th>Sales Staff ID</th>
                      <th>Manager ID</th>
                      <th>Type</th>
                      <th>Style</th>
                      <th>Size</th>
                      <th>Quotation</th>
                      <th>Quotation Description</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rejectListData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.goldID}</td>
                        <td>{row.goldweight}</td>
                        <td>{row.customerID}</td>
                        <td>{row.saleStaffID}</td>
                        <td>{row.managerID}</td>
                        <td>{row.type}</td>
                        <td>{row.style}</td>
                        <td>{row.size}</td>
                        <td>{row.quotation}</td>
                        <td>{row.quotationDescription}</td>
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
                  <td>{detailPopupData.customerRequest.customizeRequestId}</td>
                </tr>
                <tr>
                  <td>Customer Name:</td>
                  <td>{detailPopupData.customerName}</td>
                </tr>
                <tr>
                  <td>Gold Type:</td>
                  <td>{detailPopupData.customerRequest.gold.goldType}</td>
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
                      detailPopupData.customerRequest.goldWeight
                    )}
                  </td>
                </tr>

                <tr>
                  <td>Type:</td>
                  <td>{detailPopupData.customerRequest.type}</td>
                </tr>
                <tr>
                  <td>Style:</td>
                  <td>{detailPopupData.customerRequest.style}</td>
                </tr>
                <tr>
                  <td>Size:</td>
                  <td>{detailPopupData.customerRequest.size}</td>
                </tr>
                <tr>
                  <td>Quotation:</td>
                  <td>{detailPopupData.customerRequest.quotation}</td>
                </tr>

                <tr>
                  <td>Quotation Description:</td>
                  <td>{detailPopupData.customerRequest.quotationDes}</td>
                </tr>
                <tr>
                  <td>Quantity:</td>
                  <td>{detailPopupData.customerRequest.quantity}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>{detailPopupData.customerRequest.status}</td>
                </tr>
              </tbody>
            </table>
            <div>
              <button
                className="detail-button"
                onClick={handleCloseDetailPopup}
              >
                Close
              </button>
              {currentView === "wait_for_quotation" && (
                <button
                  className="detail-button"
                  onClick={handleSaveDetailPopup}
                >
                  Save
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

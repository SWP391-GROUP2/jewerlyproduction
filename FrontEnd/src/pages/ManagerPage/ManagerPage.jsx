import { useEffect, useState } from "react";
import "./ManagerPage.css";
import ManagerSidebar from "../../components/ManagerSidebar/ManagerSidebar";
import ManagerHeader from "../../components/ManagerHeader/ManagerHeader";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

function ManagerPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false); // State for confirmation popup
  const [customizeRequestId, setSelectedRow] = useState(null);


  const [saleStaffId, setAssignedEmployee] = useState("");
  const [designStaffId, setAssignedDesignEmployee] = useState("");
  const [productionStaffId, setAssignedProductionEmployee] = useState("");


  const [currentView, setCurrentView] = useState("request");
  const [quotationView, setQuotationView] = useState("");
  const [detailPopupOpen, setDetailPopupOpen] = useState(false);
  const [PopupOpenDetail, setPopupOpenDetail] = useState(false);

  const [OrderdetailPopupOpen, setOrderDetailPopupOpen] = useState(false);
  

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [requestData, setRequestData] = useState([]);
  const [OrderData, setOrderData] = useState([]);
  const [SaleStaff, setSaleStaff] = useState([]);
  const [DesignStaff, setDesignStaff] = useState([]);
  const [ProductionStaff, setProductionStaff] = useState([]);

  const [fetchDataFlag, setFetchDataFlag] = useState(false);
  const [hasFetchedOrders, setHasFetchedOrders] = useState(false);

  const [assignDesignPopupOpen, setAssignDesignPopupOpen] = useState(false);
  const [assignProductionPopupOpen, setAssignProductionPopupOpen] = useState(false);



  

  

  const user = useSelector((State) => State.auth.Login.currentUser);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedOrders && (fetchDataFlag || requestData.length === 0)) {
      fetchRequests();
      setFetchDataFlag(false);
      setHasFetchedOrders(true);
    }
  }, [fetchDataFlag, requestData]); // Thêm requestData vào dependency để cập nhật khi requestData thay đổi

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5266/api/CustomerRequests"
        );
        setOrderData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    console.log("Your Order", OrderData);
  }, []);

  useEffect(() => {
    const fetchSaleStaff = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5266/api/Manager/Staff/Sales/List"
        );
        setSaleStaff(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleStaff();
    console.log("Your Sale Staff List", SaleStaff);
  }, []);

  useEffect(() => {
    const fetchDesignStaff = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5266/api/Manager/Staff/Design/List"
        );
        setDesignStaff(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesignStaff();
    console.log("Your Design Staff List", DesignStaff);
  }, []);

  useEffect(() => {
    const fetchProductionStaff = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5266/api/Manager/Staff/Production/List"
        );
        setProductionStaff(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductionStaff();
    console.log("Your Design Staff List", ProductionStaff);
  }, []);

  const pendingRequests = requestData.filter(
    (requestData) => requestData.customerRequest.status === "Pending"
  );
  const waitquotation = requestData.filter(
    (requestData) => requestData.customerRequest.status === "Wait for Quotation"
  );
  const waitapprove = requestData.filter(
    (requestData) => requestData.customerRequest.status === "Wait For Approval"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleAssignClick = (index) => {
    setSelectedRow(index);
    setPopupOpen(true);
  };

  const handleAssignedEmployee = (selectedEmployeeId) => {
    setAssignedEmployee(selectedEmployeeId);
  };

  const handleAssignedDesignEmployee = (selectedEmployeeId) => {
    setAssignedDesignEmployee(selectedEmployeeId);
  };

  const handleAssignedProductionEmployee = (selectedEmployeeId) => {
    setAssignedProductionEmployee(selectedEmployeeId);
  };

  const handleRejectClick = (index) => {
    setSelectedRow(index); // This is correct as per the context
    setConfirmationPopupOpen(true);
  };

  const handleConfirmReject = () => {
    const updatedRequestData = requestData.filter(
      (_, index) => index !== customizeRequestId
    );
    setRequestData(updatedRequestData);
    setConfirmationPopupOpen(false);
  };

  const ApproveRequest = async (customizeRequestId) => {
    try {
      const headers = {
        Authorization: `Bearer ${user.token}`, // Đảm bảo rằng Authorization header đúng định dạng
      };

      const response = await axios.post(
        `http://localhost:5266/api/Manager/approveQuotation/${customizeRequestId}`,
        {}, // Sử dụng một object rỗng nếu không có body
        { headers: headers } // Thêm headers vào đây
      );

      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending quotation request:", error);
      throw error;
    }
  };

  const handleApproveClick = async () => {
    const { customizeRequestId } = selectedRequest.customerRequest;
    try {
      await ApproveRequest(customizeRequestId);
      await fetchRequests();
    } catch (error) {
      console.error("Error updating request:", error);
    }

    setDetailPopupOpen(false);
  };

  const fetchAssign = async (assignsalestaff) => {
    try {
      const response = await axios.post(
        "http://localhost:5266/api/Manager/assignSaleStaff",
        assignsalestaff
      );

      // Xử lý dữ liệu nhận được từ API (nếu cần)
      return response.data;
    } catch (error) {
      // Xử lý lỗi (nếu cần)
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  };

  const handleAssign = async () => {
    const decodedToken = jwtDecode(user.token);
    const managerId = decodedToken.sid;

    const assignStaff = {
      customizeRequestId: customizeRequestId,
      managerId: managerId,
      saleStaffId: saleStaffId,
    };

    try {
      await fetchAssign(assignStaff);
      await fetchRequests(); // Cập nhật lại requestData sau khi assign thành công
      setPopupOpen(false);
    } catch (error) {
      console.error("Error assigning staff:", error);
    }
  };

  const handleRowClick = (customizeRequestId) => {
    const selectedRequest = requestData.find(
      (request) =>
        request.customerRequest.customizeRequestId === customizeRequestId
    );
    setSelectedRequest(selectedRequest);
    setDetailPopupOpen(true);
  };

  const handleRowOrderClick = (orderid) => {
    const selectedOrder = OrderData.find(
      (order) =>
        order.orderId === orderid
    );
    setSelectedOrder(selectedOrder);
    setOrderDetailPopupOpen(true);
  };

  const handleRowDetailClick = (customizeRequestId) => {
    const selectedRequest = requestData.find(
      (request) =>
        request.customerRequest.customizeRequestId === customizeRequestId
    );
    setSelectedRequest(selectedRequest);
    setPopupOpenDetail(true);
  };

  return (
    <div className="manager-page">
      <ManagerSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        setCurrentView={setCurrentView}
      />
      <div
        className={`content ${
          popupOpen || confirmationPopupOpen ? "blur" : ""
        }`}
      >
        <ManagerHeader />
        {currentView === "request" && (
          <div className="new-div">
            <h2 className="table-heading">Request List</h2>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID Customize Request</th>
                  <th>Customer Name</th>
                  <th>Sales Staff Name</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((row, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      handleRowDetailClick(
                        row.customerRequest.customizeRequestId
                      )
                    }
                  >
                    <td>{row.customerRequest.customizeRequestId}</td>
                    <td>{row.customerName}</td>
                    <td>{row.saleStaffName}</td>
                    <td>{row.customerRequest.status}</td>
                    <td>
                      <button
                        className="detail-button-s"
                        onClick={(e) => {
                          e.stopPropagation(); // Ngăn chặn sự kiện click hàng
                          handleAssignClick(
                            row.customerRequest.customizeRequestId
                          );
                        }}
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {currentView === "quotation" && (
          <div className="new-div">
            <h2 className="table-heading">Quotation List</h2>
            <select
              className="custom-select"
              value={quotationView}
              onChange={(e) => setQuotationView(e.target.value)}
            >
              <option value="">Select View</option>
              <option value="wait_for_quotation">Wait for Quotation</option>
              <option value="wait_for_approve">Wait for Approve</option>
            </select>
            {quotationView === "wait_for_quotation" && (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID Customize Request</th>
                    <th>Customer Name</th>
                    <th>Sales Staff Name</th>
                  </tr>
                </thead>
                <tbody>
                  {waitquotation.map((row, index) => (
                    <tr
                      key={index}
                      onClick={() =>
                        handleRowDetailClick(
                          row.customerRequest.customizeRequestId
                        )
                      }
                    >
                      <td>{row.customerRequest.customizeRequestId}</td>
                      <td>{row.customerName}</td>
                      <td>{row.saleStaffName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {quotationView === "wait_for_approve" && (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID Customize Request</th>
                    <th>Customer Name</th>
                    <th>Sales Staff Name</th>
                    <th>Quotation</th>
                  </tr>
                </thead>
                <tbody>
                  {waitapprove.map((row, index) => (
                    <tr
                      key={index}
                      onClick={() =>
                        handleRowClick(row.customerRequest.customizeRequestId)
                      }
                    >
                      <td>{row.customerRequest.customizeRequestId}</td>
                      <td>{row.customerName}</td>
                      <td>{row.saleStaffName}</td>
                      <td>{row.customerRequest.quotation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {currentView === "orderlist" && (
  <div className="new-div">
    <h2 className="table-heading">Order List</h2>
    <table className="custom-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer Name</th>
          <th>Design Staff Name</th>
          <th>Production Staff Name</th>
        </tr>
      </thead>
      <tbody>
        {OrderData.map((row, index) => (
          <tr key={index} onClick={() => handleRowOrderClick(index)}>
            <td>{row.id}</td>
            <td>{row.customer}</td>
            <td>{row.designStaff}</td>
            <td>{row.productionStaff}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

        {currentView === "salesstaff" && (
          <div className="new-div">
            <h2 className="table-heading">Sales Staff List</h2>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Requests</th>
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {SaleStaff.map((row, index) => (
                  <tr key={index}>
                    <td className="avatar">
                      <img
                        src={
                          row.appUser.avatar
                            ? row.appUser.avatar
                            : "https://res.cloudinary.com/dfvplhyjj/image/upload/v1719657663/txeadynuhg4akiyaww34.jpg"
                        }
                        alt="avatar"
                      />
                    </td>
                    <td>{row.appUser.id}</td>
                    <td>{row.appUser.name}</td>
                    <td>{row.appUser.email}</td>
                    <td>{row.requestCount}</td>
                    <td>{row.orderCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {currentView === "designlist" && (
          <div className="new-div">
            <h2 className="table-heading">Design Staff List</h2>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {DesignStaff.map((row, index) => (
                  <tr key={index}>
                    <td className="avatar">
                      <img
                        src={
                          row.appUser.avatar
                            ? row.appUser.avatar
                            : "https://res.cloudinary.com/dfvplhyjj/image/upload/v1719657663/txeadynuhg4akiyaww34.jpg"
                        }
                        alt="avatar"
                      />
                    </td>
                    <td>{row.appUser.id}</td>
                    <td>{row.appUser.name}</td>
                    <td>{row.appUser.email}</td>
                    <td>{row.orderCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {currentView === "productionstaff" && (
          <div className="new-div">
            <h2 className="table-heading">Production Staff List</h2>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {ProductionStaff.map((row, index) => (
                  <tr key={index}>
                    <td className="avatar">
                      <img
                        src={
                          row.appUser.avatar
                            ? row.appUser.avatar
                            : "https://res.cloudinary.com/dfvplhyjj/image/upload/v1719657663/txeadynuhg4akiyaww34.jpg"
                        }
                        alt="avatar"
                      />
                    </td>
                    <td>{row.appUser.id}</td>
                    <td>{row.appUser.name}</td>
                    <td>{row.appUser.email}</td>
                    <td>{row.orderCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {popupOpen && <div className="overlay" onClick={handleAssignClick}></div>}
      {popupOpen && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Assign Employee</h2>
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Number of Quoted</th>
                </tr>
              </thead>
              <tbody>
                {SaleStaff.map((staff, index) => (
                  <tr
                    key={index}
                    onClick={() => handleAssignedEmployee(staff.appUser.id)}
                    className={
                      saleStaffId === staff.appUser.id ? "selected" : ""
                    }
                  >
                    <td>{staff.appUser.name}</td>
                    <td>{staff.appUser.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="popup_button" onClick={handleAssign}>
              Assign
            </button>
            <button
              className="popup_button"
              onClick={() => setPopupOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {confirmationPopupOpen && (
        <div className="confirmation-popup">
          <div className="confirmation-popup-inner">
            <h2>Are you sure?</h2>
            <button
              className="confirmation-popup_button"
              onClick={handleConfirmReject}
            >
              Yes
            </button>
            <button
              className="confirmation-popup_button"
              onClick={() => setConfirmationPopupOpen(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
      {detailPopupOpen && (
        <div className="overlay" onClick={handleRowClick}></div>
      )}
      {detailPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-inner">
              <h2>Request Detail</h2>
              {selectedRequest && (
                <div className="details-container">
                  <div className="detail-box">
                    <strong>ID Customize Request:</strong>{" "}
                    {selectedRequest.customerRequest.customizeRequestId}
                  </div>
                  <div className="detail-box">
                    <strong>Customer Name:</strong>{" "}
                    {selectedRequest.customerName}
                  </div>
                  <div className="detail-box">
                    <strong>Sales Staff Name:</strong>{" "}
                    {selectedRequest.saleStaffName}
                  </div>
                  <div className="detail-box">
                    <strong>Gold Type:</strong>{" "}
                    {selectedRequest.customerRequest.gold.goldType}
                  </div>
                  <div className="detail-box">
                    <strong>Gold Weight:</strong>{" "}
                    {selectedRequest.customerRequest.goldWeight}
                  </div>
                  <div className="detail-box">
                    <strong>Type:</strong>{" "}
                    {selectedRequest.customerRequest.type}
                  </div>
                  <div className="detail-box">
                    <strong>Style:</strong>{" "}
                    {selectedRequest.customerRequest.style}
                  </div>
                  <div className="detail-box">
                    <strong>Size:</strong>{" "}
                    {selectedRequest.customerRequest.size}
                  </div>
                  <div className="detail-box">
                    <strong>Quotation:</strong>{" "}
                    {selectedRequest.customerRequest.quotation}
                  </div>
                  <div className="detail-box">
                    <strong>Quotation Description:</strong>{" "}
                    {selectedRequest.customerRequest.quotationDes}
                  </div>
                  <div className="detail-box">
                    <strong>Quantity:</strong>{" "}
                    {selectedRequest.customerRequest.quantity}
                  </div>
                  <div className="detail-box">
                    <strong>Status:</strong>{" "}
                    {selectedRequest.customerRequest.status}
                  </div>
                  {/* Thêm các thông tin chi tiết khác của yêu cầu nếu cần */}
                </div>
              )}
              <div className="popup_acction_close">
                <div>
                  <button
                    className="popup_button_approve"
                    onClick={handleApproveClick}
                  >
                    Approve
                  </button>
                  <button
                    className="popup_button_reject"
                    onClick={() => setDetailPopupOpen(false)}
                  >
                    Reject
                  </button>
                </div>

                <div>
                  <button
                    className="popup_button"
                    onClick={() => setDetailPopupOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {PopupOpenDetail && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-inner">
              <h2>Request Detail</h2>
              {selectedRequest && (
                <div className="details-container">
                  <div className="detail-box">
                    <strong>ID Customize Request:</strong>{" "}
                    {selectedRequest.customerRequest.customizeRequestId}
                  </div>
                  <div className="detail-box">
                    <strong>Customer Name:</strong>{" "}
                    {selectedRequest.customerName}
                  </div>
                  <div className="detail-box">
                    <strong>Sales Staff Name:</strong>{" "}
                    {selectedRequest.saleStaffName}
                  </div>
                  <div className="detail-box">
                    <strong>Gold Type:</strong>{" "}
                    {selectedRequest.customerRequest.gold.goldType}
                  </div>
                  <div className="detail-box">
                    <strong>Gold Weight:</strong>{" "}
                    {selectedRequest.customerRequest.goldWeight}
                  </div>
                  <div className="detail-box">
                    <strong>Type:</strong>{" "}
                    {selectedRequest.customerRequest.type}
                  </div>
                  <div className="detail-box">
                    <strong>Style:</strong>{" "}
                    {selectedRequest.customerRequest.style}
                  </div>
                  <div className="detail-box">
                    <strong>Size:</strong>{" "}
                    {selectedRequest.customerRequest.size}
                  </div>
                  <div className="detail-box">
                    <strong>Quotation:</strong>{" "}
                    {selectedRequest.customerRequest.quotation}
                  </div>
                  <div className="detail-box">
                    <strong>Quotation Description:</strong>{" "}
                    {selectedRequest.customerRequest.quotationDes}
                  </div>
                  <div className="detail-box">
                    <strong>Quantity:</strong>{" "}
                    {selectedRequest.customerRequest.quantity}
                  </div>
                  <div className="detail-box">
                    <strong>Status:</strong>{" "}
                    {selectedRequest.customerRequest.status}
                  </div>
                  {/* Thêm các thông tin chi tiết khác của yêu cầu nếu cần */}
                </div>
              )}

              <div>
                <button
                  className="popup_button"
                  onClick={() => setPopupOpenDetail(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        
      {OrderdetailPopupOpen && (
  <div className="popup-overlay">
    <div className="popup">
      <div className="popup-inner">
        <h2>Order Detail</h2>
        {selectedRequest && (
          <div className="details-container">
            <div className="detail-box">
              <strong>ID Customize Request:</strong>{" "}
              {selectedRequest.customerRequest.customizeRequestId}
            </div>
            <div className="detail-box">
              <strong>Customer Name:</strong>{" "}
              {selectedRequest.customerName}
            </div>
            <div className="detail-box">
              <strong>Sales Staff Name:</strong>{" "}
              {selectedRequest.saleStaffName}
            </div>
            <div className="detail-box">
              <strong>Gold Type:</strong>{" "}
              {selectedRequest.customerRequest.gold.goldType}
            </div>
            <div className="detail-box">
              <strong>Gold Weight:</strong>{" "}
              {selectedRequest.customerRequest.goldWeight}
            </div>
            <div className="detail-box">
              <strong>Type:</strong>{" "}
              {selectedRequest.customerRequest.type}
            </div>
            <div className="detail-box">
              <strong>Style:</strong>{" "}
              {selectedRequest.customerRequest.style}
            </div>
            <div className="detail-box">
              <strong>Size:</strong>{" "}
              {selectedRequest.customerRequest.size}
            </div>
            <div className="detail-box">
              <strong>Quotation:</strong>{" "}
              {selectedRequest.customerRequest.quotation}
            </div>
            <div className="detail-box">
              <strong>Quotation Description:</strong>{" "}
              {selectedRequest.customerRequest.quotationDes}
            </div>
            <div className="detail-box">
              <strong>Quantity:</strong>{" "}
              {selectedRequest.customerRequest.quantity}
            </div>
            <div className="detail-box">
              <strong>Status:</strong>{" "}
              {selectedRequest.customerRequest.status}
            </div>
            {/* Thêm các thông tin chi tiết khác của yêu cầu nếu cần */}
          </div>
        )}

        
        <div className="Full-Button">
        <button
          className="popup_button"
            onClick={() => setOrderDetailPopupOpen(false)}
          >   
          Close
          </button>
          <div className="assign-buttons">
            <button className="popup_button" onClick={() => setAssignDesignPopupOpen(true)}>
              Assign Design Staff
            </button>
            <button className="popup_button" onClick={() => setAssignProductionPopupOpen(true)}>
      Assign Production Staff
    </button>
                </div>
        </div>
        
        
      </div>
    </div>
  </div>
)}
{assignProductionPopupOpen && (
  <div className="popup-overlay">
    <div className="popup">
      <div className="popup-inner">
        <h2>Assign Production Staff</h2>
        <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Number of Quoted</th>
                </tr>
              </thead>
              <tbody>
                {ProductionStaff.map((staff, index) => (
                  <tr
                    key={index}
                    onClick={() => handleAssignedProductionEmployee(staff.appUser.id)}
                    className={
                      productionStaffId === staff.appUser.id ? "selected" : ""
                    }
                  >
                    <td>{staff.appUser.name}</td>
                    <td>{staff.appUser.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="popup_button" onClick={handleAssign}>
              Assign
            </button>
            <button
              className="popup_button"
              onClick={() => setAssignProductionPopupOpen(false)}
            >
              Close
            </button>
      </div>
    </div>
  </div>
)}
{assignDesignPopupOpen  && (
  <div className="popup-overlay">
    <div className="popup">
      <div className="popup-inner">
        <h2>Assign Design Staff</h2>
        <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Number of Quoted</th>
                </tr>
              </thead>
              <tbody>
                {DesignStaff.map((staff, index) => (
                  <tr
                    key={index}
                    onClick={() => handleAssignedDesignEmployee(staff.appUser.id)}
                    className={
                      designStaffId === staff.appUser.id ? "selected" : ""
                    }
                  >
                    <td>{staff.appUser.name}</td>
                    <td>{staff.appUser.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="popup_button" onClick={handleAssign}>
              Assign
            </button>
            <button
              className="popup_button"
              onClick={() => setAssignDesignPopupOpen(false)}
            >
              Close
            </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default ManagerPage;

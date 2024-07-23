import { useEffect, useState } from "react";
import "./ManagerPage.css";
import ManagerSidebar from "../../components/ManagerSidebar/ManagerSidebar";
import ManagerHeader from "../../components/ManagerHeader/ManagerHeader";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import Notify from "../../components/Alert/Alert";

function ManagerPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false); // State for confirmation popup
  const [customizeRequestId, setSelectedRow] = useState(null);
  const [orderId, setSelectedOrderRow] = useState(null);

  const [saleStaffId, setAssignedEmployee] = useState("");
  const [designStaffId, setAssignedDesignEmployee] = useState("");
  const [productionStaffId, setAssignedProductionEmployee] = useState("");

  const [currentView, setCurrentView] = useState("request");
  const [quotationView, setQuotationView] = useState("");
  const [detailPopupOpen, setDetailPopupOpen] = useState(false);
  const [PopupOpenDetail, setPopupOpenDetail] = useState(false);

  const [OrderdetailPopupOpen, setOrderDetailPopupOpen] = useState(false);
  const [OrderDesignPopupOpen, setOrderDesignPopupOpen] = useState(false);
  const [OrderProductionPopupOpen, setOrderProductionPopupOpen] =
    useState(false);

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
  const [assignProductionPopupOpen, setAssignProductionPopupOpen] =
    useState(false);

  const user = useSelector((State) => State.auth.Login.currentUser);

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

  const fetchOrder = async () => {
    try {
      const response = await axios.get("https://nbjewelrybe.azurewebsites.net/api/Orders");
      setOrderData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    console.log("Your Order", OrderData);
  }, []);

  useEffect(() => {
    const fetchSaleStaff = async () => {
      try {
        const response = await axios.get(
          "https://nbjewelrybe.azurewebsites.net/api/Manager/Staff/Sales/List"
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
          "https://nbjewelrybe.azurewebsites.net/api/Manager/Staff/Design/List"
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
          "https://nbjewelrybe.azurewebsites.net/api/Manager/Staff/Production/List"
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
    (data) => data.status === "Pending"
  );

  const waitquotation = requestData.filter(
    (data) => data.status === "Wait for Quotation"
  );

  const waitapprove = requestData.filter(
    (data) => data.status === "Wait For Approval"
  );

  const assigndesigner = OrderData.filter(
    (data) => data.status === "Assigning Designer"
  );

  const assignproduction = OrderData.filter(
    (data) => data.status === "Assigning Production"
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

  const handleAssignClickOrderProduction = (index) => {
    setSelectedOrderRow(index);
    setAssignProductionPopupOpen(true);
  };

  const handleAssignClickOrderDesign = (index) => {
    setSelectedOrderRow(index);
    setAssignDesignPopupOpen(true);
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
        `https://nbjewelrybe.azurewebsites.net/api/Manager/approveQuotation/${customizeRequestId}`,
        {}, // Sử dụng một object rỗng nếu không có body
        { headers: headers } // Thêm headers vào đây
      );

      console.log("Response:", response.data);
      Notify.success("Approve Request Successfully");
      return response.data;
    } catch (error) {
      console.error("Error sending quotation request:", error);
      Notify.fail("Approve Request Failed !");
      throw error;
    }
  };

  const RejectRequest = async (customizeRequestId) => {
    try {
      const response = await axios.post(
        `https://nbjewelrybe.azurewebsites.net/api/CustomerRequests/reject/${customizeRequestId}`
      );

      console.log("Response:", response.data);
      Notify.success("Reject Request Successfully");
      return response.data;
    } catch (error) {
      console.error("Error sending quotation request:", error);
      Notify.fail("Reject Request Failed !");
      throw error;
    }
  };

  const handleApproveClick = async () => {
    const { customizeRequestId } = selectedRequest;
    try {
      await ApproveRequest(customizeRequestId);
      await fetchRequests();
    } catch (error) {
      console.error("Error updating request:", error);
    }

    setDetailPopupOpen(false);
  };

  const handleRejectClick = async () => {
    const { customizeRequestId } = selectedRequest;
    try {
      await RejectRequest(customizeRequestId);
      await fetchRequests();
    } catch (error) {
      console.error("Error updating request:", error);
    }

    setDetailPopupOpen(false);
  };

  const fetchAssignSales = async (assignsalestaff) => {
    try {
      const response = await axios.post(
        "https://nbjewelrybe.azurewebsites.net/api/Manager/assignSaleStaff",
        assignsalestaff
      );

      // Xử lý dữ liệu nhận được từ API (nếu cần)
      Notify.success("Assign Sales Staff Successfully");
      return response.data;
    } catch (error) {
      // Xử lý lỗi (nếu cần)
      console.error("There was a problem with the fetch operation:", error);
      Notify.fail("Assign Sales Staff Failed !");
      throw error;
    }
  };

  const handleAssignSales = async () => {
    const decodedToken = jwtDecode(user.token);
    const managerId = decodedToken.sid;

    const assignStaff = {
      customizeRequestId: customizeRequestId,
      managerId: managerId,
      saleStaffId: saleStaffId,
    };

    try {
      await fetchAssignSales(assignStaff);
      await fetchRequests(); // Cập nhật lại requestData sau khi assign thành công
      setPopupOpen(false);
    } catch (error) {
      console.error("Error assigning staff:", error);
    }
  };

  const fetchAssignProduction = async (assignProductionStaff) => {
    try {
      const response = await axios.post(
        "https://nbjewelrybe.azurewebsites.net/api/Manager/assignProductionStaff",
        assignProductionStaff
      );

      // Xử lý dữ liệu nhận được từ API (nếu cần)
      Notify.success("Assign Production Staff Successfully");
      return response.data;
    } catch (error) {
      // Xử lý lỗi (nếu cần)
      console.error("There was a problem with the fetch operation:", error);
      Notify.fail("Assign Production Staff Failed !");
      throw error;
    }
  };

  const handleAssignProduction = async () => {
    const assignProductionStaff = {
      OrderId: orderId,
      ProductionStaffId: productionStaffId,
    };

    try {
      await fetchAssignProduction(assignProductionStaff);
      await fetchOrder(); // Cập nhật lại requestData sau khi assign thành công
      setPopupOpen(false);
      setOrderProductionPopupOpen(false);
      setAssignProductionPopupOpen(false);
    } catch (error) {
      console.error("Error assigning staff:", error);
    }
  };

  const fetchAssignDesign = async (orderId, designStaffId) => {
    try {
      const response = await axios.post(
        `https://nbjewelrybe.azurewebsites.net/api/Manager/assignDesignStaff?orderID=${orderId}&designstaffID=${designStaffId}`
      );

      // Xử lý dữ liệu nhận được từ API (nếu cần)
      Notify.success("Assign Design Staff Successfully");
      return response.data;
    } catch (error) {
      // Xử lý lỗi (nếu cần)
      console.error("There was a problem with the fetch operation:", error);
      Notify.fail("Assign Design Staff Failed !");
      throw error;
    }
  };

  const handleAssignDesign = async () => {
    try {
      await fetchAssignDesign(orderId, designStaffId);
      await fetchOrder(); // Cập nhật lại orderData sau khi assign thành công
      setPopupOpen(false);
      setOrderDesignPopupOpen(false);
      setAssignDesignPopupOpen(false);
    } catch (error) {
      console.error("Error assigning staff:", error);
    }
  };

  const handleRowClick = (customizeRequestId) => {
    const selectedRequest = requestData.find(
      (request) => request.customizeRequestId === customizeRequestId
    );
    setSelectedRequest(selectedRequest);
    setDetailPopupOpen(true);
  };

  const handleRowOrderClick = (orderId) => {
    const selectedOrder = OrderData.find((order) => order.orderId === orderId);

    setSelectedOrder(selectedOrder);
    setOrderDetailPopupOpen(true);
    console.log("selectOrder", selectedOrder);
  };

  const handleDesignOrderClick = (orderId) => {
    const selectedOrder = OrderData.find((order) => order.orderId === orderId);

    setSelectedOrder(selectedOrder);
    setOrderDesignPopupOpen(true);
    console.log("selectOrder", selectedOrder);
  };

  const handleProductionOrderClick = (orderId) => {
    const selectedOrder = OrderData.find((order) => order.orderId === orderId);

    setSelectedOrder(selectedOrder);
    setOrderProductionPopupOpen(true);
    console.log("selectOrder", selectedOrder);
  };

  const handleRowDetailClick = (customizeRequestId) => {
    const selectedRequest = requestData.find(
      (request) => request.customizeRequestId === customizeRequestId
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
                    onClick={() => handleRowDetailClick(row.customizeRequestId)}
                  >
                    <td>{row.customizeRequestId}</td>
                    <td>{row.customerName}</td>
                    <td>{row.saleStaffName}</td>
                    <td>{row.status}</td>
                    <td>
                      <button
                        className="detail-button-s"
                        onClick={(e) => {
                          e.stopPropagation(); // Ngăn chặn sự kiện click hàng
                          handleAssignClick(row.customizeRequestId);
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
                        handleRowDetailClick(row.customizeRequestId)
                      }
                    >
                      <td>{row.customizeRequestId}</td>
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
                      onClick={() => handleRowClick(row.customizeRequestId)}
                    >
                      <td>{row.customizeRequestId}</td>
                      <td>{row.customerName}</td>
                      <td>{row.saleStaffName}</td>
                      <td>{row.quotation}</td>
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
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Design Staff</th>
                  <th>Production Staff</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {OrderData.map((row, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowOrderClick(row.orderId)}
                  >
                    <td>{row.orderId}</td>
                    <td>{row.customerName}</td>
                    <td>{row?.designStaffName ?? "N/A"}</td>
                    <td>{row?.productionStaffName ?? "N/A"}</td>
                    <td>{row.totalPrice}</td>
                    <td>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentView === "assigndesign" && Array.isArray(assigndesigner) && (
          <div className="new-div">
            <h2 className="table-heading">Assign Design Staff</h2>
            <table className="custom-table">
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
                {assigndesigner.map((row, index) => (
                  <tr
                    key={index}
                    onClick={() => handleDesignOrderClick(row.orderId)}
                  >
                    <td>{row.orderId}</td>
                    <td>{row.customerName}</td>
                    <td>{row?.designStaffName ?? "N/A"}</td>
                    <td>{row?.productionStaffName ?? "N/A"}</td>
                    <td>{row.totalPrice}</td>
                    <td>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentView === "assignproduction" &&
          Array.isArray(assignproduction) && (
            <div className="new-div">
              <h2 className="table-heading">Assign Production Staff</h2>
              <table className="custom-table">
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
                  {assignproduction.map((row, index) => (
                    <tr
                      key={index}
                      onClick={() => handleProductionOrderClick(row.orderId)}
                    >
                      <td>{row.orderId}</td>
                      <td>{row.customerName}</td>
                      <td>{row?.designStaffName ?? "N/A"}</td>
                      <td>{row?.productionStaffName ?? "N/A"}</td>
                      <td>{row.totalPrice}</td>
                      <td>{row.status}</td>
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
                            : "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198614/icon-128x128_nfr77b.png"
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
                            : "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198614/icon-128x128_nfr77b.png"
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
                            : "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198614/icon-128x128_nfr77b.png"
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
            <button className="popup_button" onClick={handleAssignSales}>
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
                    {selectedRequest.customizeRequestId}
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
                    <strong>Gold Type:</strong> {selectedRequest.goldType}
                  </div>
                  <div className="detail-box">
                    <strong>Gold Weight:</strong> {selectedRequest.goldWeight}
                  </div>
                  <div className="detail-box">
                    <strong>Type:</strong> {selectedRequest.type}
                  </div>
                  <div className="detail-box">
                    <strong>Style:</strong> {selectedRequest.style}
                  </div>
                  <div className="detail-box">
                    <strong>Size:</strong> {selectedRequest.size}
                  </div>
                  <div className="detail-box">
                    <strong>Quotation:</strong> {selectedRequest.quotation}
                  </div>
                  <div className="detail-box">
                    <strong>Quotation Description:</strong>{" "}
                    {selectedRequest.quotationDes}
                  </div>
                  <div className="detail-box">
                    <strong>Quantity:</strong> {selectedRequest.quantity}
                  </div>
                  <div className="detail-box">
                    <strong>Status:</strong> {selectedRequest.status}
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
                    onClick={handleRejectClick}
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
                    {selectedRequest.customizeRequestId}
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
                    <strong>Gold Type:</strong> {selectedRequest.goldType}
                  </div>
                  <div className="detail-box">
                    <strong>Gold Weight:</strong> {selectedRequest.goldWeight}
                  </div>
                  <div className="detail-box">
                    <strong>Type:</strong> {selectedRequest.type}
                  </div>
                  <div className="detail-box">
                    <strong>Style:</strong> {selectedRequest.style}
                  </div>
                  <div className="detail-box">
                    <strong>Size:</strong> {selectedRequest.size}
                  </div>
                  <div className="detail-box">
                    <strong>Quotation:</strong> {selectedRequest.quotation}
                  </div>
                  <div className="detail-box">
                    <strong>Quotation Description:</strong>{" "}
                    {selectedRequest.quotationDes}
                  </div>
                  <div className="detail-box">
                    <strong>Quantity:</strong> {selectedRequest.quantity}
                  </div>
                  <div className="detail-box">
                    <strong>Status:</strong> {selectedRequest.status}
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
              {selectedOrder && (
                <div className="details-container">
                  <div className="detail-box">
                    <strong>Order ID:</strong> {selectedOrder.orderId}
                  </div>
                  <div className="detail-box">
                    <strong>Customer Name:</strong> {selectedOrder.customerName}
                  </div>
                  <div className="detail-box">
                    <strong>Design Staff Name:</strong>{" "}
                    {selectedOrder?.designStaffName ?? "N/A"}
                  </div>
                  <div className="detail-box">
                    <strong>Production Staff Name:</strong>{" "}
                    {selectedOrder?.productionStaffName ?? "N/A"}
                  </div>
                  <div className="detail-box">
                    <strong>Total Price:</strong> {selectedOrder.totalPrice}
                  </div>
                  <div className="detail-box">
                    <strong>Customize Request ID:</strong>{" "}
                    {selectedOrder.customizeRequestId}
                  </div>
                  <div className="detail-box">
                    <strong>Status:</strong> {selectedOrder.status}
                  </div>
                  <div className="detail-box">
                    <strong>Order Date:</strong> {selectedOrder.orderDate}
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
              </div>
            </div>
          </div>
        </div>
      )}

      {OrderDesignPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-inner">
              <h2>Order Detail</h2>
              {selectedOrder && (
                <div className="details-container">
                  <div className="detail-box">
                    <strong>Order ID:</strong> {selectedOrder.orderId}
                  </div>
                  <div className="detail-box">
                    <strong>Customer Name:</strong> {selectedOrder.customerName}
                  </div>
                  <div className="detail-box">
                    <strong>Design Staff Name:</strong>{" "}
                    {selectedOrder?.designStaffName ?? "N/A"}
                  </div>
                  <div className="detail-box">
                    <strong>Production Staff Name:</strong>{" "}
                    {selectedOrder?.productionStaffName ?? "N/A"}
                  </div>
                  <div className="detail-box">
                    <strong>Total Price:</strong> {selectedOrder.totalPrice}
                  </div>
                  <div className="detail-box">
                    <strong>Customize Request ID:</strong>{" "}
                    {selectedOrder.customizeRequestId}
                  </div>
                  <div className="detail-box">
                    <strong>Status:</strong> {selectedOrder.status}
                  </div>
                  <div className="detail-box">
                    <strong>Order Date:</strong> {selectedOrder.orderDate}
                  </div>

                  {/* Thêm các thông tin chi tiết khác của yêu cầu nếu cần */}
                </div>
              )}

              <div className="Full-Button">
                <button
                  className="popup_button"
                  onClick={() => setOrderDesignPopupOpen(false)}
                >
                  Close
                </button>
                <div className="assign-buttons">
                  <button
                    className="popup_button"
                    onClick={() =>
                      handleAssignClickOrderDesign(selectedOrder.orderId)
                    }
                  >
                    Assign Design Staff
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {OrderProductionPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-inner">
              <h2>Order Detail</h2>
              {selectedOrder && (
                <div className="details-container">
                  <div className="detail-box">
                    <strong>Order ID:</strong> {selectedOrder.orderId}
                  </div>
                  <div className="detail-box">
                    <strong>Customer Name:</strong> {selectedOrder.customerName}
                  </div>
                  <div className="detail-box">
                    <strong>Design Staff Name:</strong>{" "}
                    {selectedOrder?.designStaffName ?? "N/A"}
                  </div>
                  <div className="detail-box">
                    <strong>Production Staff Name:</strong>{" "}
                    {selectedOrder?.productionStaffName ?? "N/A"}
                  </div>
                  <div className="detail-box">
                    <strong>Total Price:</strong> {selectedOrder.totalPrice}
                  </div>
                  <div className="detail-box">
                    <strong>Customize Request ID:</strong>{" "}
                    {selectedOrder.customizeRequestId}
                  </div>
                  <div className="detail-box">
                    <strong>Status:</strong> {selectedOrder.status}
                  </div>
                  <div className="detail-box">
                    <strong>Order Date:</strong> {selectedOrder.orderDate}
                  </div>

                  {/* Thêm các thông tin chi tiết khác của yêu cầu nếu cần */}
                </div>
              )}

              <div className="Full-Button">
                <button
                  className="popup_button"
                  onClick={() => setOrderProductionPopupOpen(false)}
                >
                  Close
                </button>
                <div className="assign-buttons">
                  <button
                    className="popup_button"
                    onClick={() =>
                      handleAssignClickOrderProduction(selectedOrder.orderId)
                    }
                  >
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
                      onClick={() =>
                        handleAssignedProductionEmployee(staff.appUser.id)
                      }
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
              <button className="popup_button" onClick={handleAssignProduction}>
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
      {assignDesignPopupOpen && (
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
                      onClick={() =>
                        handleAssignedDesignEmployee(staff.appUser.id)
                      }
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
              <button className="popup_button" onClick={handleAssignDesign}>
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

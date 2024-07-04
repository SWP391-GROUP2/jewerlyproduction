import { useEffect, useState } from "react";
import "./ManagerPage.css";
import ManagerSidebar from "../../components/ManagerSidebar/ManagerSidebar";
import ManagerHeader from "../../components/ManagerHeader/ManagerHeader";
import axios from "axios";

function ManagerPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false); // State for confirmation popup
  const [selectedRow, setSelectedRow] = useState(null);
  const [assignedEmployee, setAssignedEmployee] = useState("");
  const [currentView, setCurrentView] = useState("request");
  const [quotationView, setQuotationView] = useState("");
  const [detailPopupOpen, setDetailPopupOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [requestData, setRequestData] = useState([]);
  const [OrderData, setOrderData] = useState([]);
  const [SaleStaff, setSaleStaff] = useState([]);
  const [DesignStaff, setDesignStaff] = useState([]);
  const [ProductionStaff, setProductionStaff] = useState([]);

  const [quotationData, setQuotationData] = useState([
    {
      id: 1,
      customer: "John Doe",
      salesStaff: "Jane Smith",
      quotation: "Pending",
    },
    {
      id: 2,
      customer: "Mary Johnson",
      salesStaff: "Jim Brown",
      quotation: "Pending",
    },
    {
      id: 3,
      customer: "Robert Wilson",
      salesStaff: "Susan Clark",
      quotation: "Pending",
    },
    {
      id: 4,
      customer: "Linda Williams",
      salesStaff: "Michael Brown",
      quotation: "Pending",
    },
    {
      id: 5,
      customer: "James Davis",
      salesStaff: "Patricia Garcia",
      quotation: "Pending",
    },
  ]);

  const employees = [
    "Jane Smith",
    "Jim Brown",
    "Susan Clark",
    "Michael Brown",
    "Patricia Garcia",
    "Christopher Anderson",
    "Jessica Lewis",
    "Brian Walker",
  ];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5266/api/CustomerRequests"
        );
        setRequestData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
    console.log("Your request", requestData);
  }, []);

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
          "http://localhost:5266/api/CustomerRequests"
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
          "http://localhost:5266/api/CustomerRequests"
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
          "http://localhost:5266/api/CustomerRequests"
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
    (requestData) => requestData.status === "Pending"
  );
  const waitquotation = requestData.filter(
    (requestData) => requestData.status === "Wait for Quotation"
  );
  const waitapprove = requestData.filter(
    (requestData) => requestData.status === "Wait for Approve"
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

  const handleAssignedEmployee = (employee) => {
    setAssignedEmployee(employee);
  };

  const handleRejectClick = (index) => {
    setSelectedRow(index); // This is correct as per the context
    setConfirmationPopupOpen(true);
  };

  const handleConfirmReject = () => {
    const updatedRequestData = requestData.filter(
      (_, index) => index !== selectedRow
    );
    setRequestData(updatedRequestData);
    setConfirmationPopupOpen(false);
  };

  const handleAssign = () => {
    if (selectedRow !== null) {
      const updatedRequestData = requestData.map((row, index) => {
        if (index === selectedRow) {
          return { ...row, salesStaff: assignedEmployee };
        }
        return row;
      });
      setRequestData(updatedRequestData);

      const updatedQuotationData = quotationData.map((row, index) => {
        if (index === selectedRow) {
          return { ...row, salesStaff: assignedEmployee };
        }
        return row;
      });
      setQuotationData(updatedQuotationData);

      setPopupOpen(false);
    }
  };

  const handleRowClick = (index) => {
    setSelectedRequest(requestData[index]);
    setDetailPopupOpen(true);
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
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((row, index) => (
                  <tr key={index} onClick={() => handleRowClick(index)}>
                    <td>{row.customizeRequestId}</td>
                    <td>{row.customerId}</td>
                    <td>{row.saleStaffId}</td>
                    <td>
                      <button
                        className="detail-button"
                        onClick={(e) => {
                          e.stopPropagation(); // Ngăn chặn sự kiện click hàng
                          handleAssignClick(index);
                        }}
                      >
                        Assign
                      </button>
                    </td>
                    <td>
                      <button
                        className="reject-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRejectClick(index);
                        }}
                      >
                        Reject
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
                    <tr key={index} onClick={() => handleRowClick(index)}>
                      <td>{row.customizeRequestId}</td>
                      <td>{row.customerId}</td>
                      <td>{row.saleStaffId}</td>
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
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {waitapprove.map((row, index) => (
                    <tr key={index} onClick={() => handleRowClick(index)}>
                      <td>{row.customizeRequestId}</td>
                      <td>{row.customerId}</td>
                      <td>{row.saleStaffId}</td>
                      <td>{row.quotation}</td>
                      <td>
                        <button
                          className="detail-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRejectClick(index);
                          }}
                        >
                          Approve
                        </button>
                      </td>
                      <td>
                        <button
                          className="reject-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRejectClick(index);
                          }}
                        >
                          Reject
                        </button>
                      </td>
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
                  <th>ID Customize Request</th>
                  <th>Customer Name</th>
                  <th>Sales Staff Name</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {OrderData.map((row, index) => (
                  <tr key={index} onClick={() => handleRowClick(index)}>
                    <td>{row.id}</td>
                    <td>{row.customer}</td>
                    <td>{row.salesStaff}</td>
                    <td>
                      <button
                        className="detail-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAssignClick(index);
                        }}
                      >
                        Assign
                      </button>
                    </td>
                    <td>
                      <button
                        className="reject-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRejectClick(index);
                        }}
                      >
                        Reject
                      </button>
                    </td>
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
                  <th>ID Customize Request</th>
                  <th>Customer Name</th>
                  <th>Sales Staff Name</th>
                </tr>
              </thead>
              <tbody>
                {SaleStaff.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.customer}</td>
                    <td>{row.salesStaff}</td>
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
                  <th>ID Customize Request</th>
                  <th>Customer Name</th>
                  <th>Sales Staff Name</th>
                </tr>
              </thead>
              <tbody>
                {DesignStaff.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.customer}</td>
                    <td>{row.salesStaff}</td>
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
                  <th>ID Customize Request</th>
                  <th>Customer Name</th>
                  <th>Sales Staff Name</th>
                </tr>
              </thead>
              <tbody>
                {ProductionStaff.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.customer}</td>
                    <td>{row.salesStaff}</td>
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
                {employees.map((employee, index) => (
                  <tr
                    key={index}
                    onClick={() => handleAssignedEmployee(employee)}
                    className={assignedEmployee === employee ? "selected" : ""}
                  >
                    <td>{employee}</td>
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
                    {selectedRequest.customizeRequestId}
                  </div>
                  <div className="detail-box">
                    <strong>Customer Name:</strong> {selectedRequest.customerId}
                  </div>
                  <div className="detail-box">
                    <strong>Sales Staff Name:</strong>{" "}
                    {selectedRequest.saleStaffId}
                  </div>
                  {/* Thêm các thông tin chi tiết khác của yêu cầu nếu cần */}
                </div>
              )}
              <button
                className="popup_button"
                onClick={() => setDetailPopupOpen(false)}
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

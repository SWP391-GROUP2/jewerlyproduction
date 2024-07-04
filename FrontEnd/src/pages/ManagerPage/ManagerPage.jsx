import { useState } from "react";
import "./ManagerPage.css";
import ManagerSidebar from "../../components/ManagerSidebar/ManagerSidebar";
import ManagerHeader from "../../components/ManagerHeader/ManagerHeader";

function ManagerPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false); // State for confirmation popup
  const [selectedRow, setSelectedRow] = useState(null);
  const [assignedEmployee, setAssignedEmployee] = useState("");
  const [currentView, setCurrentView] = useState("");
  const [quotationView, setQuotationView] = useState("");
  const [detailPopupOpen, setDetailPopupOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [requestData, setRequestData] = useState([
    { id: 1, customer: "John Doe", salesStaff: "Jane Smith" },
    { id: 2, customer: "Mary Johnson", salesStaff: "Jim Brown" },
    { id: 3, customer: "Robert Wilson", salesStaff: "Susan Clark" },
    { id: 4, customer: "Linda Williams", salesStaff: "Michael Brown" },
    { id: 5, customer: "James Davis", salesStaff: "Patricia Garcia" },
    { id: 6, customer: "Barbara Martinez", salesStaff: "Christopher Anderson" },
    { id: 7, customer: "Thomas Thompson", salesStaff: "Jessica Lewis" },
    { id: 8, customer: "Karen White", salesStaff: "Brian Walker" },
    { id: 9, customer: "John Doe", salesStaff: "Jane Smith" },
    { id: 10, customer: "Mary Johnson", salesStaff: "Jim Brown" },
    { id: 11, customer: "Robert Wilson", salesStaff: "Susan Clark" },
    { id: 12, customer: "Linda Williams", salesStaff: "Michael Brown" },
    { id: 13, customer: "James Davis", salesStaff: "Patricia Garcia" },
    {
      id: 14,
      customer: "Barbara Martinez",
      salesStaff: "Christopher Anderson",
    },
    { id: 15, customer: "Thomas Thompson", salesStaff: "Jessica Lewis" },
    { id: 16, customer: "Karen White", salesStaff: "Brian Walker" },
  ]);

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
                {requestData.map((row, index) => (
                  <tr key={index} onClick={() => handleRowClick(index)}>
                    <td>{row.id}</td>
                    <td>{row.customer}</td>
                    <td>{row.salesStaff}</td>
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
                  {quotationData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.id}</td>
                      <td>{row.customer}</td>
                      <td>{row.salesStaff}</td>
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
                  {quotationData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.id}</td>
                      <td>{row.customer}</td>
                      <td>{row.salesStaff}</td>
                      <td>{row.quotation}</td>
                      <td>
                        <button className="detail-button">Approve</button>
                      </td>
                      <td>
                        <button
                          className="reject-button"
                          onClick={() => handleRejectClick(index)}
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
                {requestData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.customer}</td>
                    <td>{row.salesStaff}</td>
                    <td>
                      <button
                        className="detail-button"
                        onClick={() => handleAssignClick(index)}
                      >
                        Detail
                      </button>
                    </td>
                    <td>
                      <button
                        className="reject-button"
                        onClick={() => handleRejectClick(index)}
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
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {requestData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.customer}</td>
                    <td>{row.salesStaff}</td>
                    <td>
                      <button
                        className="detail-button"
                        onClick={() => handleAssignClick(index)}
                      >
                        Detail
                      </button>
                    </td>
                    <td>
                      <button
                        className="reject-button"
                        onClick={() => handleRejectClick(index)}
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
        {currentView === "designlist" && (
          <div className="new-div">
            <h2 className="table-heading">Design Staff List</h2>
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
                {requestData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.customer}</td>
                    <td>{row.salesStaff}</td>
                    <td>
                      <button
                        className="detail-button"
                        onClick={() => handleAssignClick(index)}
                      >
                        Detail
                      </button>
                    </td>
                    <td>
                      <button
                        className="reject-button"
                        onClick={() => handleRejectClick(index)}
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
        {currentView === "productionstaff" && (
          <div className="new-div">
            <h2 className="table-heading">Production Staff List</h2>
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
                {requestData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.customer}</td>
                    <td>{row.salesStaff}</td>
                    <td>
                      <button
                        className="detail-button"
                        onClick={() => handleAssignClick(index)}
                      >
                        Detail
                      </button>
                    </td>
                    <td>
                      <button
                        className="reject-button"
                        onClick={() => handleRejectClick(index)}
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
                <div>
                  <p>
                    <strong>ID Customize Request:</strong> {selectedRequest.id}
                  </p>
                  <p>
                    <strong>Customer Name:</strong> {selectedRequest.customer}
                  </p>
                  <p>
                    <strong>Sales Staff Name:</strong>{" "}
                    {selectedRequest.salesStaff}
                  </p>
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

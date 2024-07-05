import React, { useState } from "react";
import "./SaleStaffPage.css";
import SaleStaffSidebar from "../../components/SaleStaffSidebar/SaleStaffSidebar";
import SaleStaffHeader from "../../components/SaleStaffHeader/SaleStaffHeader";

function SaleStaffPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentView, setCurrentView] = useState("wait_for_quotation");
  const [requestData, setRequestData] = useState([
    // Data for Wait for Quotation
    {
      customizeRequestID: 1,
      goldID: "G001",
      goldweight: "100g",
      customerID: "C001",
      saleStaffID: "S001",
      managerID: "M001",
      type: "Type A",
      style: "Style X",
      size: "L",
      quotation: "Q001",
      quotationdes: "Description for Q001",
      quantity: 2,
      status: "Pending",
    },
    {
      customizeRequestID: 2,
      goldID: "G002",
      goldweight: "150g",
      customerID: "C002",
      saleStaffID: "S002",
      managerID: "M002",
      type: "Type B",
      style: "Style Y",
      size: "M",
      quotation: "Q002",
      quotationdes: "Description for Q002",
      quantity: 1,
      status: "Completed",
    },
    {
      customizeRequestID: 3,
      goldID: "G003",
      goldweight: "120g",
      customerID: "C003",
      saleStaffID: "S003",
      managerID: "M003",
      type: "Type C",
      style: "Style Z",
      size: "XL",
      quotation: "Q003",
      quotationdes: "Description for Q003",
      quantity: 3,
      status: "Pending",
    },
  ]);

  const waitForApproveData = [
    // Data for Wait for Approve
    {
      customizeRequestID: 4,
      goldID: "G004",
      goldweight: "110g",
      customerID: "C004",
      saleStaffID: "S004",
      managerID: "M004",
      type: "Type D",
      style: "Style W",
      size: "S",
      quotation: "Q004",
      quotationdes: "Description for Q004",
      quantity: 2,
      status: "Approved",
    },
    {
      customizeRequestID: 5,
      goldID: "G005",
      goldweight: "130g",
      customerID: "C005",
      saleStaffID: "S005",
      managerID: "M005",
      type: "Type E",
      style: "Style P",
      size: "M",
      quotation: "Q005",
      quotationdes: "Description for Q005",
      quantity: 1,
      status: "Not Approved",
    },
    {
      customizeRequestID: 6,
      goldID: "G006",
      goldweight: "125g",
      customerID: "C006",
      saleStaffID: "S006",
      managerID: "M006",
      type: "Type F",
      style: "Style Q",
      size: "L",
      quotation: "Q006",
      quotationdes: "Description for Q006",
      quantity: 3,
      status: "Approved",
    },
  ];

  const rejectListData = [
    // Data for Reject List
    {
      customizeRequestID: 7,
      goldID: "G007",
      goldweight: "115g",
      customerID: "C007",
      saleStaffID: "S007",
      managerID: "M007",
      type: "Type G",
      style: "Style R",
      size: "S",
      quotation: "Q007",
      quotationdes: "Description for Q007",
      quantity: 2,
      status: "Rejected",
    },
    {
      customizeRequestID: 8,
      goldID: "G008",
      goldweight: "135g",
      customerID: "C008",
      saleStaffID: "S008",
      managerID: "M008",
      type: "Type H",
      style: "Style S",
      size: "M",
      quotation: "Q008",
      quotationdes: "Description for Q008",
      quantity: 1,
      status: "Rejected",
    },
    {
      customizeRequestID: 9,
      goldID: "G009",
      goldweight: "140g",
      customerID: "C009",
      saleStaffID: "S009",
      managerID: "M009",
      type: "Type I",
      style: "Style T",
      size: "L",
      quotation: "Q009",
      quotationdes: "Description for Q009",
      quantity: 3,
      status: "Rejected",
    },
  ];

  const orderListData = [
    // Data for Order List
    {
      customizeRequestID: 10,
      goldID: "G010",
      goldweight: "145g",
      customerID: "C010",
      saleStaffID: "S010",
      managerID: "M010",
      type: "Type J",
      style: "Style U",
      size: "XL",
      quotation: "Q010",
      quotationdes: "Description for Q010",
      quantity: 4,
      status: "Ordered",
    },
    {
      customizeRequestID: 11,
      goldID: "G011",
      goldweight: "155g",
      customerID: "C011",
      saleStaffID: "S011",
      managerID: "M011",
      type: "Type K",
      style: "Style V",
      size: "XXL",
      quotation: "Q011",
      quotationdes: "Description for Q011",
      quantity: 2,
      status: "Ordered",
    },
    {
      customizeRequestID: 12,
      goldID: "G012",
      goldweight: "160g",
      customerID: "C012",
      saleStaffID: "S012",
      managerID: "M012",
      type: "Type L",
      style: "Style W",
      size: "M",
      quotation: "Q012",
      quotationdes: "Description for Q012",
      quantity: 1,
      status: "Ordered",
    },
  ];

  const [detailPopupData, setDetailPopupData] = useState(null);
  const [goldWeight, setGoldWeight] = useState("");
  const [note, setNote] = useState("");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleShowWaitForQuotationTable = () => {
    setCurrentView("wait_for_quotation");
  };

  const handleShowWaitForApproveTable = () => {
    setCurrentView("wait_for_approve");
  };

  const handleShowRejectListTable = () => {
    setCurrentView("Reject_list");
  };

  const handleShowOrderListTable = () => {
    setCurrentView("Order_list");
  };

  const handleShowDetailPopup = (rowData) => {
    setDetailPopupData(rowData);
    setGoldWeight(rowData.goldweight);
    setNote("");
  };

  const handleCloseDetailPopup = () => {
    setDetailPopupData(null);
    setGoldWeight("");
    setNote("");
  };

  const handleSaveDetailPopup = () => {
    const index = requestData.findIndex(
      (item) => item.customizeRequestID === detailPopupData.customizeRequestID
    );
    if (index !== -1) {
      const updatedRequestData = [...requestData];
      updatedRequestData[index].goldweight = goldWeight;
      setRequestData(updatedRequestData);
    }
    handleCloseDetailPopup();
  };

  return (
    <div className="salestaff-page">
      <SaleStaffSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        showWaitForQuotationTable={handleShowWaitForQuotationTable}
        showWaitForApproveTable={handleShowWaitForApproveTable}
        showRejectListTable={handleShowRejectListTable}
        showOrderListTable={handleShowOrderListTable}
      />
      <div className="salestaff-container">
        <SaleStaffHeader />
        <div className="salestaff-newdiv">
          {currentView === "wait_for_quotation" && (
            <div>
              <h2 className="table-heading">Request List</h2>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Gold ID</th>
                    <th>Gold Weight</th>
                    <th>Customer ID</th>
                    <th>SaleStaff ID</th>
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
                  {requestData.map((row, index) => (
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
                      <td>{row.quotationdes}</td>
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

          {currentView === "wait_for_approve" && (
            <div>
              <h2 className="table-heading">Wait for Approve</h2>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Gold ID</th>
                    <th>Gold Weight</th>
                    <th>Customer ID</th>
                    <th>SaleStaff ID</th>
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
                  {waitForApproveData.map((row, index) => (
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
                      <td>{row.quotationdes}</td>
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

          {currentView === "Reject_list" && (
            <div>
              <h2 className="table-heading">Reject List</h2>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Gold ID</th>
                    <th>Gold Weight</th>
                    <th>Customer ID</th>
                    <th>SaleStaff ID</th>
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
                      <td>{row.quotationdes}</td>
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

          {currentView === "Order_list" && (
            <div>
              <h2 className="table-heading">Order List</h2>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Gold ID</th>
                    <th>Gold Weight</th>
                    <th>Customer ID</th>
                    <th>SaleStaff ID</th>
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
                  {orderListData.map((row, index) => (
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
                      <td>{row.quotationdes}</td>
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
      {detailPopupData && (
        <div className="detail-popup">
          <div className="detail-popup-content">
            <h3>Detail Popup</h3>
            <table className="detail-table">
              <tbody>
                <tr>
                  <td>Gold ID:</td>
                  <td>{detailPopupData.goldID}</td>
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
                      detailPopupData.goldweight
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Customer ID:</td>
                  <td>{detailPopupData.customerID}</td>
                </tr>
                <tr>
                  <td>SaleStaff ID:</td>
                  <td>{detailPopupData.saleStaffID}</td>
                </tr>
                <tr>
                  <td>Manager ID:</td>
                  <td>{detailPopupData.managerID}</td>
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
                  <td>{detailPopupData.quotationdes}</td>
                </tr>
                <tr>
                  <td>Quantity:</td>
                  <td>{detailPopupData.quantity}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>{detailPopupData.status}</td>
                </tr>
                {currentView === "wait_for_quotation" && (
                  <tr>
                    <td>Note:</td>
                    <td>
                      <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="detail-input"
                      />
                    </td>
                  </tr>
                )}
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

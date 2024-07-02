import { useState } from 'react';
import './ManagerPage.css';
import ManagerSidebar from '../../components/ManagerSidebar/ManagerSidebar';
import ManagerHeader from '../../components/ManagerHeader/ManagerHeader';

function ManagerPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false); // State for confirmation popup
  const [selectedRow, setSelectedRow] = useState(null);
  const [assignedEmployee, setAssignedEmployee] = useState('');
  const [currentView, setCurrentView] = useState('');
  const [quotationView, setQuotationView] = useState('');

  const [requestData, setRequestData] = useState([
    { id: 1, customer: 'John Doe', salesStaff: 'Jane Smith' },
    { id: 2, customer: 'Mary Johnson', salesStaff: 'Jim Brown' },
    { id: 3, customer: 'Robert Wilson', salesStaff: 'Susan Clark' },
    { id: 4, customer: 'Linda Williams', salesStaff: 'Michael Brown' },
    { id: 5, customer: 'James Davis', salesStaff: 'Patricia Garcia' },
    { id: 6, customer: 'Barbara Martinez', salesStaff: 'Christopher Anderson' },
    { id: 7, customer: 'Thomas Thompson', salesStaff: 'Jessica Lewis' },
    { id: 8, customer: 'Karen White', salesStaff: 'Brian Walker' },
  ]);

  const [quotationData, setQuotationData] = useState([
    { id: 1, customer: 'John Doe', salesStaff: 'Jane Smith', quotation: 'Pending' },
    { id: 2, customer: 'Mary Johnson', salesStaff: 'Jim Brown', quotation: 'Pending' },
    { id: 3, customer: 'Robert Wilson', salesStaff: 'Susan Clark', quotation: 'Pending' },
    { id: 4, customer: 'Linda Williams', salesStaff: 'Michael Brown', quotation: 'Pending' },
    { id: 5, customer: 'James Davis', salesStaff: 'Patricia Garcia', quotation: 'Pending' },
  ]);

  const employees = [
    'Jane Smith', 'Jim Brown', 'Susan Clark', 'Michael Brown',
    'Patricia Garcia', 'Christopher Anderson', 'Jessica Lewis', 'Brian Walker'
  ];

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleDetailClick = (index) => {
    setSelectedRow(index);
    setPopupOpen(true);
  };

  const handleRejectClick = (index) => {
    setSelectedRow(index);
    setConfirmationPopupOpen(true);
  };

  const handleConfirmReject = () => {
    const updatedRequestData = requestData.filter((_, index) => index !== selectedRow);
    setRequestData(updatedRequestData);
    setConfirmationPopupOpen(false);
  };

  const handleAssign = () => {
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
  };

  return (
    <div className='manager-page'>
      <ManagerSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} setCurrentView={setCurrentView} />
      <div className={`content ${popupOpen || confirmationPopupOpen ? 'blur' : ''}`}>
        <ManagerHeader />
        {currentView === 'request' && (
          <div className='new-div'>
            <h2 className='table-heading'>Request List</h2>
            <table className='custom-table'>
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
                    <td><button className='detail-button' onClick={() => handleDetailClick(index)}>Detail</button></td>
                    <td><button className='reject-button' onClick={() => handleRejectClick(index)}>Reject</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {currentView === 'quotation' && (
          <div className='new-div'>
            <h2 className='table-heading'>Quotation List</h2>
            <select
              className='custom-select'
              value={quotationView}
              onChange={(e) => setQuotationView(e.target.value)}
            >
              <option value=''>Select View</option>
              <option value='wait_for_quotation'>Wait for Quotation</option>
              <option value='wait_for_approve'>Wait for Approve</option>
            </select>
            {quotationView === 'wait_for_quotation' && (
              <table className='custom-table'>
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
            {quotationView === 'wait_for_approve' && (
              <table className='custom-table'>
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
                      <td><button className='detail-button'>Approve</button></td>
                      <td><button className='reject-button' onClick={() => handleRejectClick(index)}>Reject</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      {popupOpen && (
        <div className='popup'>
          <div className='popup-inner'>
            <h2>Assign Employee</h2>
            <select
              className='custom-select'
              value={assignedEmployee}
              onChange={(e) => setAssignedEmployee(e.target.value)}
            >
              <option value=''>Select Employee</option>
              {employees.map((employee, index) => (
                <option key={index} value={employee}>{employee}</option>
              ))}
            </select>
            <button className="popup_button" onClick={handleAssign}>Assign</button>
            <button className="popup_button" onClick={() => setPopupOpen(false)}>Close</button>
          </div>
        </div>
      )}
      {confirmationPopupOpen && (
        <div className='confirmation-popup'>
          <div className='confirmation-popup-inner'>
            <h2>Are you sure?</h2>
            <button className="confirmation-popup_button" onClick={handleConfirmReject}>Yes</button>
            <button className="confirmation-popup_button" onClick={() => setConfirmationPopupOpen(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagerPage;

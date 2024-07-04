import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";

import { FaUserCircle } from "react-icons/fa"; // Placeholder icon
import axios from "axios";
import { useSelector } from "react-redux";
import ProfileSidebar from "../../components/ProfileSibar/ProfileSidebar";

function UserProfile() {
  const [Name, setName] = useState("");
  const [PhoneNumber, setPhone] = useState("");
  const [DateOfBirth, setBirthday] = useState("");
  const [Avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState("");
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentView, setCurrentView] = useState("profile");

  const [detailPopupOpen, setDetailPopupOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [requestData, setRequestData] = useState([]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleRowClick = (index) => {
    setSelectedRequest(requestData[index]);
    setDetailPopupOpen(true);
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

  const handleAssignClick = (index) => {
    setSelectedRow(index);
    setConfirmationPopupOpen(true);
  };

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

  const user = useSelector((state) => state.auth.Login.currentUser);

  useEffect(() => {
    if (user && user.token) {
      getProfile();
    }
  }, [user]);

  const getProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5266/api/Account/Get-Profile",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Get Profile successfully:", res.data);
      setName(res.data.name);
      setPhone(res.data.phoneNumber);
      setEmail(res.data.email);
      setBirthday(res.data.DateOfBirth);
      setAvatar(res.data.avatar);
    } catch (err) {
      console.error("Error Get Profile:", err);
    }
  };

  const updateUser = async (newUserPro) => {
    try {
      const res = await axios.put(
        "http://localhost:5266/api/Account/Update-Profile",
        newUserPro,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Update User successfully:", res.data);
    } catch (err) {
      console.error(
        "Error Update User:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("PhoneNumber", PhoneNumber);
    formData.append("DateOfBirth", DateOfBirth);

    if (Avatar) {
      formData.append("Avatar", Avatar);
    }

    console.log(
      "Updating user with data:",
      Object.fromEntries(formData.entries())
    );
    updateUser(formData);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Link to="/">
        <button className="btn-home">
          <FaHome />
          <IoReturnDownBack />
        </button>
      </Link>
      <div className="manager-page-profile">
        <ProfileSidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
          setCurrentView={setCurrentView}
        />
        <div
          className={`content ${
            detailPopupOpen || confirmationPopupOpen ? "blur" : ""
          }`}
        >
          {currentView === "profile" && (
            <div className="user-profile-wrapper">
              <form onSubmit={handleUpdateProfile}>
                <h1 className="user-profile-title">User Profile</h1>

                <div
                  className="user-profile-avatar-wrapper"
                  onClick={() =>
                    document.getElementById("avatar-upload").click()
                  }
                >
                  {Avatar ? (
                    <img
                      src={Avatar}
                      alt="Avatar"
                      className="user-profile-avatar"
                    />
                  ) : (
                    <FaUserCircle className="user-profile-avatar-placeholder" />
                  )}
                  <input
                    type="file"
                    id="avatar-upload"
                    style={{ display: "none" }}
                    onChange={handleAvatarChange}
                  />
                </div>

                <div className="user-profile-input-box">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={Name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                  <MdDriveFileRenameOutline className="user-profile-icon" />
                </div>

                <div className="user-profile-input-box">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={PhoneNumber}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <MdDriveFileRenameOutline className="user-profile-icon" />
                </div>

                <div className="user-profile-input-box">
                  <input
                    type="text"
                    placeholder="user@domain.com"
                    value={email}
                    required
                    readOnly
                  />
                  <MdDriveFileRenameOutline className="user-profile-icon" />
                </div>

                <div className="user-profile-input-box">
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    value={DateOfBirth}
                    required
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                  <MdDriveFileRenameOutline className="user-profile-icon" />
                </div>

                <button type="submit" className="btn-submit">
                  Save Profile
                </button>

                <div className="user-profile-link">
                  <p>
                    <Link to="/customer/resetpassword">Change Password</Link>
                  </p>
                </div>
              </form>
            </div>
          )}
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {requestData.map((row, index) => (
                    <tr key={index} onClick={() => handleRowClick(index)}>
                      <td>{row.customizeRequestId}</td>
                      <td>{row.customerId}</td>
                      <td>{row.saleStaffId}</td>
                      <td>{row.status}</td>
                      <td>
                        <button
                          className="detail-button"
                          onClick={(e) => {
                            e.stopPropagation(); // Ngăn chặn sự kiện click hàng
                            handleAssignClick(index);
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
            </div>
          )}
          {currentView === "order" && (
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
            </div>
          )}
        </div>
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
                      <strong>ID Customize Request:</strong>{" "}
                      {selectedRequest.customizeRequestId}
                    </p>
                    <p>
                      <strong>Customer Name:</strong>{" "}
                      {selectedRequest.customerId}
                    </p>
                    <p>
                      <strong>Sales Staff Name:</strong>{" "}
                      {selectedRequest.saleStaffId}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedRequest.status}
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
    </>
  );
}

export default UserProfile;

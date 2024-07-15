import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Link, useNavigate } from "react-router-dom";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";

import { FaUserCircle } from "react-icons/fa"; // Placeholder icon
import axios from "axios";
import { useSelector } from "react-redux";
import ProfileSidebar from "../../components/ProfileSibar/ProfileSidebar";
import { jwtDecode } from "jwt-decode";
import Notify from "../../components/Alert/Alert";

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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [requestData, setRequestData] = useState([]);
  const [OrderData, setOrderData] = useState([]);
  const [fetchDataFlag, setFetchDataFlag] = useState(false);
  const [hasFetchedOrders, setHasFetchedOrders] = useState(false);

  const [ApprovePopupOpen, setApprovePopupOpen] = useState(false);
  const [RejectPopupOpen, setRejectPopupOpen] = useState(false);

  const [approveSelectedRequest, setapproveSelectedRequest] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [hasFetchedDesigns, setHasFetchedDesigns] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [DesignData, setDesignData] = useState([]);

  const navigate = useNavigate();

  const user = useSelector((State) => State.auth.Login.currentUser);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleRowClick = (customizeRequestId) => {
    const selectedRequest = requestData.find(
      (request) =>
        request.customerRequest.customizeRequestId === customizeRequestId
    );
    setSelectedRequest(selectedRequest);
    setDetailPopupOpen(true);
  };

  const navigateToProductDetail = (customizeRequestId) => {
    navigate(`/customer/checkoutpage/${customizeRequestId}`); // Chuyển hướng đến trang chi tiết sản phẩm
  };
  const navigateToOrdeDetail = (orderId) => {
    navigate(`/customer/checkoutlast/${orderId}`); // Chuyển hướng đến trang chi tiết sản phẩm
  };

  const handleRejectClick = (index) => {
    setRejectPopupOpen(true);
  };

  const handleYesReject = () => {
    setRejectPopupOpen(false);
  };

  const handleApproveClick = (customizeRequestId) => {
    const approveSelectedRequest = requestData.find(
      (request) =>
        request.customerRequest.customizeRequestId === customizeRequestId
    );
    setapproveSelectedRequest(approveSelectedRequest);
    setApprovePopupOpen(true);
  };
  const hideDetail = () => {
    setShowDetailPopup(false);
  };

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
  function chunkArray(array, size) {
    return array.reduce(
      (acc, _, index) =>
        index % size ? acc : [...acc, array.slice(index, index + size)],
      []
    );
  }

  useEffect(() => {
    if (!hasFetchedOrders && (fetchDataFlag || requestData.length === 0)) {
      fetchRequests();
      setFetchDataFlag(false);
    }
  }, [fetchDataFlag, requestData]);

  const decodedToken = jwtDecode(user.token);
  const customerId = decodedToken.sid;

  const RequestsOfCustomer = requestData.filter(
    (requestData) => requestData.customerRequest.customerId === customerId
  );

  console.log("Filtered Requests:", customerId); // Kiểm tra kết quả lọc

  const fetchOrder = async () => {
    try {
      const response = await axios.get("http://localhost:5266/api/Orders");
      console.log("Response Data:", response.data); // Kiểm tra dữ liệu phản hồi
      setOrderData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error); // Kiểm tra lỗi
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedOrders && (fetchDataFlag || OrderData.length === 0)) {
      fetchOrder();
      setFetchDataFlag(false);
      setHasFetchedOrders(true);
    }
  }, [fetchDataFlag, OrderData]);

  const OrderOfCustomer = OrderData.filter(
    (OrderData) => OrderData.order.customizeRequest.customerId === customerId
  );
  const showDetail = (item) => {
    setSelectedItem(item);
    setShowDetailPopup(true);
    setUploadedImage(null); // Reset uploaded image state
  };

  const fetch3dDesign = async () => {
    try {
      const response = await axios.get("http://localhost:5266/api/_3ddesign");
      console.log("Response Data:", response.data); // Kiểm tra dữ liệu phản hồi
      setDesignData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error); // Kiểm tra lỗi
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedDesigns && (fetchDataFlag || DesignData.length === 0)) {
      fetch3dDesign();
      setFetchDataFlag(false);
      setHasFetchedDesigns(true);
    }
  }, [fetchDataFlag, DesignData]);

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
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const _3ddesigns =
    selectedItem && selectedItem.order
      ? DesignData.filter(
          (design) => design.orderId === selectedItem.order.orderId
        )
      : [];

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
            detailPopupOpen || ApprovePopupOpen || RejectPopupOpen ? "blur" : ""
          }`}
        >
          {currentView === "profile" && (
            <div className="user-profile-wrapper">
              <form onSubmit={handleUpdateProfile}>
                <h1 className="user-profile-title">User Profile</h1>

                <div
                  className="user-profile-avatar-wrapper"
                  onClick={() => document.getElementById("avatar-upload").click()}
                >
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="user-profile-avatar"
                    />
                  ) : (
                    Avatar ? (
                      <img
                        src={Avatar}
                        alt="Avatar"
                        className="user-profile-avatar"
                      />
                    ) : (
                      <FaUserCircle className="user-profile-avatar-placeholder" />
                    )
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

                <button type="submit" className="btn-submit" onClick={() => Notify.success("Profile updated successfully")}>
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
                    <th>Quotation</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {RequestsOfCustomer.map((row, index) => (
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
                      <td>{row.customerRequest.status}</td>
                      {row.customerRequest.status === "Quotation Approved" ? (
                        <>
                          <td>
                            <button
                              className="detail-button-s"
                              onClick={(e) => {
                                e.stopPropagation(); // Ngăn chặn sự kiện click hàng
                                handleApproveClick(
                                  row.customerRequest.customizeRequestId
                                );
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
                        </>
                      ) : row.customerRequest.status === "Request Approved" ? (
                        <>
                          <td>
                            <button
                              className="detail-button-s"
                              onClick={(e) => {
                                e.stopPropagation(); // Ngăn chặn sự kiện click hàng
                                navigateToProductDetail(
                                  row.customerRequest.customizeRequestId
                                );
                              }}
                            >
                              Continue Paying
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td></td>
                          <td></td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {currentView === "order" && (
            <div className="designstaff-table-container">
              <h2 className="designstaff-table-title">Order List</h2>
              <table className="designstaff-table">
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#f2f2f2",
                      color: "#333",
                      borderBottom: "1px solid #ddd",
                      textAlign: "left",
                    }}
                  >
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Sales Staff</th>
                    <th>Design Staff</th>
                    <th>Production Staff</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Approve</th>
                  </tr>
                </thead>
                <tbody>
                  {OrderOfCustomer.map((item) => (
                    <tr
                      key={item.order.orderId}
                      onClick={() => showDetail(item)}
                    >
                      <td>{item.order.orderId}</td>
                      <td>{item.order.customizeRequest.customer.name}</td>
                      <td>
                        {item.order.customizeRequest.saleStaff?.name ?? "N/A"}
                      </td>
                      <td>{item.order.designStaff?.name ?? "N/A"}</td>
                      <td>{item.order.productionStaff?.name ?? "N/A"}</td>
                      <td>{item.order.totalPrice}</td>
                      <td>
                        {item.order.designStaff || item.order.productionStaff
                          ? item.order.status
                          : "In Process"}
                      </td>
                      {item.order.status === "Choosing Payment" &&
                      item.order.designStaff &&
                      item.order.productionStaff ? (
                        <>
                          <td>
                            <button
                              className="detail-button-s"
                              onClick={(e) => {
                                e.stopPropagation(); // Ngăn chặn sự kiện click hàng
                                navigateToOrdeDetail(item.order.orderId);
                              }}
                            >
                              Approve
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td></td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {ApprovePopupOpen && (
          <div className="confirmation-popup">
            <div className="confirmation-popup-inner">
              <h2>Are you sure for approve ?</h2>
              <button
                className="confirmation-popup_button"
                onClick={() =>
                  navigateToProductDetail(
                    approveSelectedRequest.customerRequest.customizeRequestId
                  )
                }
              >
                Yes
              </button>
              <button
                className="confirmation-popup_button"
                onClick={() => setApprovePopupOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        )}
        {RejectPopupOpen && (
          <div className="confirmation-popup">
            <div className="confirmation-popup-inner">
              <h2>Are you sure for reject ?</h2>
              <button
                className="confirmation-popup_button"
                onClick={handleYesReject}
              >
                Yes
              </button>
              <button
                className="confirmation-popup_button"
                onClick={() => setRejectPopupOpen(false)}
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
        {showDetailPopup && (
          <div className="designstaff-detail-popup">
            <div className="designstaff-detail-popup-content1">
              <div className="designstaff-detail-popup-content2">
                <h2>Detail Popup</h2>
                <div className="designstaff-tables-container">
                  <table className="designstaff-detail-table1">
                    <tbody>
                      <tr>
                        <strong>ID :</strong>
                        <td>{selectedItem.order.orderId}</td>
                      </tr>
                      <tr>
                        <strong>Gold :</strong>
                        <td>
                          {selectedItem.order.customizeRequest.gold.goldType}
                        </td>
                      </tr>
                      <tr>
                        <strong>Gold Weight :</strong>
                        <td>
                          {selectedItem.order.customizeRequest.goldWeight}
                        </td>
                      </tr>
                      <tr>
                        <strong>Customer :</strong>
                        <td>
                          {selectedItem.order.customizeRequest.customer.name}
                        </td>
                      </tr>
                      <tr>
                        <strong>Sales :</strong>
                        <td>
                          {selectedItem.order.customizeRequest.saleStaff
                            ?.name ?? "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <strong>Designer :</strong>
                        <td>{selectedItem.order.designStaff?.name ?? "N/A"}</td>
                      </tr>
                      <tr>
                        <strong>Production :</strong>
                        <td>
                          {selectedItem.order.productionStaff?.name ?? "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <strong>Manager :</strong>
                        <td>
                          {selectedItem.order.customizeRequest.manager?.name ??
                            "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <strong>Type :</strong>
                        <td>{selectedItem.order.customizeRequest.type}</td>
                      </tr>
                      <tr>
                        <strong>Style :</strong>
                        <td>{selectedItem.order.customizeRequest.style}</td>
                      </tr>
                      <tr>
                        <strong>Size :</strong>
                        <td>{selectedItem.order.customizeRequest.size}</td>
                      </tr>

                      {uploadedImage && (
                        <tr>
                          <td colSpan="2">
                            <img
                              src={uploadedImage}
                              alt="Uploaded Preview"
                              className="uploaded-image-preview"
                            />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  <table className="designstaff-detail-table2">
                    <tbody className="_3dDesign">
                      {chunkArray(_3ddesigns, 2).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((_3ddesign) => (
                            <td
                              key={_3ddesign._3dDesignId}
                              className="ImageTable"
                            >
                              <img src={_3ddesign.image} alt="image" />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <button
                    className="designstaff-close-button"
                    onClick={hideDetail}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserProfile;

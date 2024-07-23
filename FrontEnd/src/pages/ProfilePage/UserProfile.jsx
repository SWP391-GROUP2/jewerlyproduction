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

  const [isPopupShipping, setIsPopupShipping] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");

  const [OrderAddress, setOrderAddress] = useState(null);

  const navigate = useNavigate();

  const user = useSelector((State) => State.auth.Login.currentUser);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleRowClick = (customizeRequestId) => {
    const selectedRequest = requestData.find(
      (request) => request.customizeRequestId === customizeRequestId
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

  const handleRejectClick = (customizeRequestId) => {
    const approveSelectedRequest = requestData.find(
      (request) => request.customizeRequestId === customizeRequestId
    );
    setapproveSelectedRequest(approveSelectedRequest);
    setRejectPopupOpen(true);
  };

  const handleYesReject = (Id) => {
    CancelRequest(Id);
    setRejectPopupOpen(false);
  };

  const handleApproveClick = (customizeRequestId) => {
    const approveSelectedRequest = requestData.find(
      (request) => request.customizeRequestId === customizeRequestId
    );
    setapproveSelectedRequest(approveSelectedRequest);
    setApprovePopupOpen(true);
  };
  const hideDetail = () => {
    setShowDetailPopup(false);
  };

  const ShippingPopupOpen = (orderId) => {
    setOrderAddress(orderId);
    setIsPopupShipping(true);
  };

  const ShippingPopupClose = () => {
    fetchOrder();
    setIsPopupShipping(false);
  };

  const handleAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleSubmitAddress = () => {
    // Xử lý việc gửi địa chỉ nhận hàng
    handleUpdateAddress(OrderAddress, shippingAddress);
    ShippingPopupClose();
  };

  const designs =
    selectedItem && selectedItem
      ? DesignData.filter((design) => design.orderId === selectedItem.orderId)
      : [];

  const handleUpdateAddress = async (OrderAddress, shippingAddress) => {
    try {
      const res = await axios.put(
        `https://nbjewelrybe.azurewebsites.net/api/Orders/Update address`,
        null,
        {
          params: {
            orderID: OrderAddress,
            address: shippingAddress,
          },
        }
      );
      console.log("Response Data:", res.data);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const CancelRequest = async (customizeRequestId) => {
    try {
      const res = await axios.put(
        `https://nbjewelrybe.azurewebsites.net/api/CustomerRequests/cancel/${customizeRequestId}`
      );
      console.log("Response Data:", res.data);
      Notify.success("Reject Request Successfully");
    } catch (error) {
      console.error("Error updating address:", error);
      Notify.fail("Reject Request Failed !");
    }
  };

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
    (requestData) => requestData.customerId === customerId
  );

  console.log("Filtered Requests:", customerId); // Kiểm tra kết quả lọc

  const fetchOrder = async () => {
    try {
      const response = await axios.get("https://nbjewelrybe.azurewebsites.net/api/Orders");
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
    (OrderData) => OrderData.customerId === customerId
  );
  const showDetail = (item) => {
    setSelectedItem(item);
    setShowDetailPopup(true);
    setUploadedImage(null); // Reset uploaded image state
  };

  const fetch3dDesign = async () => {
    try {
      const response = await axios.get("https://nbjewelrybe.azurewebsites.net/api/_3ddesign");
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
        "https://nbjewelrybe.azurewebsites.net/api/Account/Get-Profile",
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
        "https://nbjewelrybe.azurewebsites.net/api/Account/Update-Profile",
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
      ? DesignData.filter((design) => design.orderId === selectedItem.orderId)
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
                  onClick={() =>
                    document.getElementById("avatar-upload").click()
                  }
                >
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="user-profile-avatar"
                    />
                  ) : Avatar ? (
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

                <button
                  type="submit"
                  className="btn-submit"
                  onClick={() => Notify.success("Profile updated successfully")}
                >
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {RequestsOfCustomer.map((row, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(row.customizeRequestId)}
                    >
                      <td>{row.customizeRequestId}</td>
                      <td>{row.customerName}</td>
                      <td>{row.saleStaffName}</td>
                      <td>{row.quotation}</td>
                      <td>{row.status}</td>
                      {row.status === "Quotation Approved" ? (
                        <>
                          <td>
                            <button
                              className="detail-button-s"
                              onClick={(e) => {
                                e.stopPropagation(); // Ngăn chặn sự kiện click hàng
                                handleApproveClick(row.customizeRequestId);
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
                                handleRejectClick(row.customizeRequestId);
                              }}
                            >
                              Reject
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
                    <tr key={item.orderId} onClick={() => showDetail(item)}>
                      <td>{item.orderId}</td>
                      <td>{item.customerName}</td>
                      <td>{item?.saleStaffName ?? "N/A"}</td>
                      <td>{item?.designStaffName ?? "N/A"}</td>
                      <td>{item?.productionStaffName ?? "N/A"}</td>
                      <td>{item.totalPrice}</td>
                      <td>
                        {item.designStaffName || item.productionStaffName
                          ? item.status
                          : "In Process"}
                      </td>
                      {item.status === "Choosing Payment" &&
                      item.designStaffName &&
                      item.productionStaffName ? (
                        <>
                          <td>
                            <button
                              className="detail-button-s"
                              onClick={(e) => {
                                e.stopPropagation(); // Ngăn chặn sự kiện click hàng
                                navigateToOrdeDetail(item.orderId);
                              }}
                            >
                              Approve
                            </button>
                          </td>
                        </>
                      ) : item.status === "Shipping" ? (
                        <>
                          <td>
                            <button
                              className="detail-button-shipping"
                              onClick={(e) => {
                                e.stopPropagation(); // Ngăn chặn sự kiện click hàng
                                ShippingPopupOpen(item.orderId);
                              }}
                            >
                              <span>Enter Shipping Address</span>
                              <svg
                                width="34"
                                height="34"
                                viewBox="0 0 74 74"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="37"
                                  cy="37"
                                  r="35.5"
                                  stroke="black"
                                  stroke-width="3"
                                ></circle>
                                <path
                                  d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                                  fill="black"
                                ></path>
                              </svg>
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
                    approveSelectedRequest.customizeRequestId
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
                onClick={() =>
                  handleYesReject(approveSelectedRequest.customizeRequestId)
                }
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
                        <td>
                          <strong>ID :</strong>
                        </td>
                        <td>{selectedItem.orderId}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Gold :</strong>
                        </td>
                        <td>{selectedItem.goldType}</td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>Gold Weight :</strong>
                        </td>
                        <td>{selectedItem.goldWeight}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Customer :</strong>
                        </td>
                        <td>{selectedItem.customerName}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Sales :</strong>
                        </td>
                        <td>{selectedItem?.saleStaffName ?? "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Designer :</strong>
                        </td>
                        <td>{selectedItem?.designStaffName ?? "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Production :</strong>
                        </td>
                        <td>{selectedItem?.productionStaffName ?? "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>Manager :</strong>
                        </td>
                        <td>{selectedItem?.managerName ?? "N/A"}</td>
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
                      {chunkArray(designs, 2).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((designs) => (
                            <td
                              key={designs._3dDesignId}
                              className="ImageTable"
                            >
                              <img src={designs.image} alt="imag" />
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

        {isPopupShipping && (
          <div className="popup">
            <h2>Enter Shipping Address</h2>
            <textarea
              value={shippingAddress}
              onChange={handleAddressChange}
              placeholder="Enter the shipping address here..."
            ></textarea>

            <div className="popup-buttons-ship">
              <button
                className="submit-button-ship"
                onClick={handleSubmitAddress}
              >
                Submit
              </button>
              <button
                className="close-button-ship"
                onClick={ShippingPopupClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserProfile;

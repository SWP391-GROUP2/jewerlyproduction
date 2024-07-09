import React, { useEffect, useState } from "react";
import "./DesignStaffPage.css";
import DesignStaffSidebar from "../../components/DesignStaffSidebar/DesignStaffSidebar";
import DesignStaffHeader from "../../components/DesignStaffHeader/DesignStaffHeader";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useSelector } from "react-redux";

function DesignStaffPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentView, setCurrentView] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [OrderData, setOrderData] = useState([]);
  const [DesignData, setDesignData] = useState([]);
  const [fetchDataFlag, setFetchDataFlag] = useState(false);
  const [hasFetchedOrders, setHasFetchedOrders] = useState(false);
  const [hasFetchedDesigns, setHasFetchedDesigns] = useState(false);
  const [selectedDesignId, setselectedDesignId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const user = useSelector((State) => State.auth.Login.currentUser);

  const decodedToken = jwtDecode(user.token);
  const designStaffId = decodedToken.sid;

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
    (OrderData) =>
      OrderData.order.designStaffId === designStaffId
  );

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

  const handleDelete = (id) => {
    setselectedDesignId(id);
    setFetchDataFlag(true);
  }

  const delete3dDesign = async () => {
    try {
      const response = await axios.delete('http://localhost:5266/api/_3ddesign',
      {
        params: {
          id: selectedDesignId,
        },
      }
    )
      console.log("Response Data:", response.data);
      setDesignData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetchDataFlag) {
      delete3dDesign();
      setFetchDataFlag(false);
    }
  }, [fetchDataFlag]);

  const showDetail = (item) => {
    setSelectedItem(item);
    setShowDetailPopup(true);
    setUploadedImage(null); // Reset uploaded image state
  };

  

  const hideDetail = () => {
    setShowDetailPopup(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(URL.createObjectURL(file)); // Store image preview URL
    setSelectedItem({
      ...selectedItem,
      image: file.name, // Update selected item with new image name
    });
  };

  

  const handleSave = () => {
    const updatedOrderData = OrderData.map((order) =>
      order.customizeRequestID === selectedItem.customizeRequestID
        ? { ...order, image: selectedItem.image }
        : order
    );

    // Update orderData state or send API request to save changes
    console.log(updatedOrderData); // Replace with actual state update or API call
    setShowDetailPopup(false);
  };

  const _3ddesigns = selectedItem && selectedItem.order
  ? DesignData.filter((design) => design.orderId === selectedItem.order.orderId)
  : [];

  return (
    <div className="designstaff-page">
      <DesignStaffSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        handleViewChange={handleViewChange}
      />
      <div className={`content ${showDetailPopup ? "blur" : ""}`}>
        <div className="designstaff-container">
          <DesignStaffHeader />
          <div className="designstaff-main-container">
            {currentView === "orderlist" && (
              <div className="designstaff-table-container">
                <h2 className="designstaff-table-title">Order List</h2>
                <table className="designstaff-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Sales Staff</th>
                      <th>Design Staff</th> 
                      <th>Production Staff</th>
                      <th>Price</th>
                      <th>Status</th> 
                    </tr>
                  </thead>
                  <tbody>
                    {OrderData.map((item) => (
                      <tr key={item.order.orderId} onClick={() => showDetail(item)}>
                        <td>{item.order.orderId}</td>
                        <td>{item.order.customizeRequest.customer.name}</td>
                        <td>{item.order.customizeRequest.saleStaff.name}</td>
                        <td>{item.order.designStaff?.name ?? 'N/A'}</td>
                        <td>{item.order.productionStaff?.name ?? 'N/A'}</td>
                        <td>{item.order.totalPrice}</td>
                        <td>{item.order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDetailPopup && (
        <div className="designstaff-detail-popup">
          <div className="designstaff-detail-popup-content1">
          <div className="designstaff-detail-popup-content2">
  <h2>Detail Popup</h2>
  <div className="designstaff-tables-container">
    <table className="designstaff-detail-table1">
      <tbody>
        <tr>
          <td>ID</td>
          <td>{selectedItem.order.orderId}</td>
        </tr>
        <tr>
          <td>Gold</td>
          <td>{selectedItem.order.customizeRequest.gold.goldType}</td>
        </tr>
        <tr>
          <td>Gold Weight</td>
          <td>{selectedItem.order.customizeRequest.goldWeight}</td>
        </tr>
        <tr>
          <td>Customer</td>
          <td>{selectedItem.order.customizeRequest.customer.name}</td>
        </tr>
        <tr>
          <td>Sales</td>
          <td>{selectedItem.order.customizeRequest.saleStaff.name}</td>
        </tr>
        <tr>
          <td>Designer</td>
          <td>{selectedItem.order.designStaff?.name ?? 'N/A'}</td>
        </tr>
        <tr>
          <td>Production</td>
          <td>{selectedItem.order.productionStaff?.name ?? 'N/A'}</td>
        </tr>
        <tr>
          <td>Manager</td>
          <td>{selectedItem.order.customizeRequest.manager.name}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td>{selectedItem.order.customizeRequest.type}</td>
        </tr>
        <tr>
          <td>Style</td>
          <td>{selectedItem.order.customizeRequest.style}</td>
        </tr>
        <tr>
          <td>Size</td>
          <td>{selectedItem.order.customizeRequest.size}</td>
        </tr>
        
        {uploadedImage && (
          <tr>
            <td colSpan="2">
              <img src={uploadedImage} alt="Uploaded Preview" className="uploaded-image-preview" />
            </td>
          </tr>
        )}
      </tbody>
    </table>

    <table className="designstaff-detail-table2">
      <tbody className="_3dDesign">
        {_3ddesigns.map(_3ddesigns => (
        <tr key={_3ddesigns._3dDesignId}>
          <td><img src= {_3ddesigns.image} alt="image" /></td>
          <td><button onClick={() => handleDelete(_3ddesigns._3dDesignId)}>Delete</button></td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div>
    <button className="designstaff-close-button" onClick={hideDetail}>Close</button>
    <button className="designstaff-add-image-button" onClick={handleImageUpload}>Add Image</button>
  </div>
</div>

</div>

        </div>
      )}
    </div>
  );
}

export default DesignStaffPage;



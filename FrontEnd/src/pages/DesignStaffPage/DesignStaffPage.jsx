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
  const [orderId, setOrderId] = useState(null);
  const [designImage, setDesignImage] = useState(null);

 const [designName, setDesignName] = useState("");
  const [formImage, setFormImage] = useState(null);

  const [showFormPopup, setShowFormPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function chunkArray(array, size) {
    return array.reduce((acc, _, index) => index % size ? acc : [...acc, array.slice(index, index + size)], []);
  }
  

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

  const handleCloseFormPopup = () => {
    setShowFormPopup(false);
    setShowDetailPopup(true);
  };

  const delete3dDesign = async () => {
    try {
      await axios.delete('http://localhost:5266/api/_3ddesign', {
        params: {
          id: selectedDesignId,
        },
      });
      // Remove the deleted design from the local state
      setDesignData(prevDesigns => prevDesigns.filter(design => design._3dDesignId !== selectedDesignId));
      console.log("Design deleted successfully");
    } catch (error) {
      console.error("Error deleting design:", error);
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

    const handle3dDesign = async (orderId) => {
      await handleUpload3dDesign;
    } 

    useEffect(() => {
      if (fetchDataFlag) {
        handleUpload3dDesign();
        setFetchDataFlag(false);
      }
    }, [fetchDataFlag]);

    const handleUpload3dDesign = () => {
      const formData = new FormData();
      formData.append("DesignName", designName);
      formData.append("OrderId", orderId)
      formData.append("DesignStaffId", designStaffId);
      formData.append("Image", designImage);
      console.log(
        "Updating 3dDesign with data:",
        Object.fromEntries(formData.entries())
      );
      upload3dDesign(formData);
    };

    const upload3dDesign = async (formData) => {
      try {
        const res = await axios.post(
          `http://localhost:5266/api/_3ddesign/Upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          }
        );
        console.log(res)
        console.log("Upload successfully:", res.data);
        setDesignData(prevDesigns => prevDesigns.filter(design => design._3dDesignId !== selectedDesignId));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
      finally {
        setLoading(false);
      }
    };

  const hideDetail = () => {
    setShowDetailPopup(false);
  };

  const handleFileInputChange = (e) => {
    handleFormImageUpload(e);
    handleDesignChange(e);
  };

  const handleFormImageUpload = (e) => {
    const file = e.target.files[0];
    setFormImage(URL.createObjectURL(file));
    setSelectedItem({
      ...selectedItem,
image: file.name,
    });
  };

  const handleDesignChange = (e) => {
    setDesignImage(e.target.files[0]);
  };

  const handleSetOrder = (index) => {
    setOrderId(index);
  }

  const handleImageUpload = () => {
    setShowDetailPopup(false);
    setShowFormPopup(true);
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
                      <th>Send Design</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OrderOfCustomer.map((item) => (
                      <tr key={item.order.orderId} onClick={() => showDetail(item)}>
                        <td>{item.order.orderId}</td>
                        <td>{item.order.customizeRequest.customer.name}</td>
                        <td>{item.order.customizeRequest.saleStaff?.name ?? 'N/A'}</td>
                        <td>{item.order.designStaff?.name ?? 'N/A'}</td>
                        <td>{item.order.productionStaff?.name ?? 'N/A'}</td>
                        <td>{item.order.totalPrice}</td>
                        <td>{item.order.status}</td>
                        <td></td>
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
          <td>{selectedItem.order.customizeRequest.saleStaff?.name ?? 'N/A'}</td>
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
          <td>{selectedItem.order.customizeRequest.manager?.name ?? 'N/A'}</td>
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
    {chunkArray(_3ddesigns, 2).map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map(_3ddesign => (
          <td key={_3ddesign._3dDesignId} className="ImageTable">
            <img src={_3ddesign.image} alt="image" />
            <button className="designstaff-close-button" onClick={() => handleDelete(_3ddesign._3dDesignId)}>Delete</button>
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
  </div>
  <div>
    <button className="designstaff-close-button" onClick={hideDetail}>Close</button>
    <button className="designstaff-add-image-button" onClick={() => { handleImageUpload(); handleSetOrder(selectedItem.order.orderId); }}>
      Add Image
    </button>  
  </div>
</div>

</div>

        </div>
      )}{showFormPopup && (
        <div className="designstaff-form-popup">
          <div className="designstaff-form-popup-content">
            <h2>Add Image</h2>
            <div className="form-container">
              <form onSubmit={handleUpload3dDesign}>
                <div className="form-group">
                  <label>Design Name:</label>
                  <input
                    type="text"
                    value={designName}
onChange={(e) => setDesignName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Upload Image:</label>
                  <input type="file" onChange={(e) => handleFileInputChange(e)} />
                </div>
                {formImage && (
                  <div className="form-group">
                    <img src={formImage} alt="Form Preview" className="uploaded-image-preview"/>
                  </div>
                )}
                <div className="form-group">
                  <button type="submit" className="designstaff-save-button" onClick={() => handle3dDesign(selectedItem.order.orderId)}>
                    Save
                  </button>
                  <button
                    type="button"
                    className="designstaff-close-button"
                    onClick={handleCloseFormPopup}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
  
}


export default DesignStaffPage;

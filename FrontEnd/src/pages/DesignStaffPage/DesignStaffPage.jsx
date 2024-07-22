import React, { useEffect, useState } from "react";
import "./DesignStaffPage.css";
import DesignStaffSidebar from "../../components/DesignStaffSidebar/DesignStaffSidebar";
import DesignStaffHeader from "../../components/DesignStaffHeader/DesignStaffHeader";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useSelector } from "react-redux";
import Notify from "../../components/Alert/Alert";

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

  const [name, setName] = useState("");
  const [productSampleList, setProductSampleList] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [selectedProductSample, setSelectedProductSample] = useState("");

  const [productSamples, setProductSamples] = useState([]);


  const [selectedImages, setSelectedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);




  useEffect(() => {
    // Fetch product samples from API
    const fetchProductSamples = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5266/api/ProductSamples"
        );
        setProductSamples(response.data);
      } catch (error) {
        console.error("Error fetching product samples:", error);
      }
    };

    fetchProductSamples();
  }, []);

  const handleProductSampleClick = () => {
    setIsPopupVisible(true);
  };

  const handleProductSampleSelect = (sample) => {
    setSelectedProductSample(sample);
    setProductSampleList(sample.productName); // Display product name
    setIsPopupVisible(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 3) {
      alert('You can only upload up to 3 images.');
      return;
    }
    const newImages = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleUploadImage = async () => {
    if(name == "") Notify.warning("Please provide design name");
    else{
      if (selectedProductSample && imageFiles.length > 0) {
        const uploadPromises = imageFiles.map(async (file) => {
          const formData = new FormData();
          formData.append('Image', file);
          formData.append('DesignName', name);
          formData.append('ProductSampleId', selectedProductSample.productSampleId);
          formData.append('DesignStaffId', designStaffId);
    
          console.log("Uploading 3dDesign with data:", Object.fromEntries(formData.entries()));
    
          await upload3dDesign(formData);
        });
    
        await Promise.all(uploadPromises);
      } else {
        console.log('Please select a Design');
        Notify.warning("Please select a Design");
      }
    }
  };
  

  const handleDeleteImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  function chunkArray(array, size) {
    return array.reduce(
      (acc, _, index) =>
        index % size ? acc : [...acc, array.slice(index, index + size)],
      []
    );
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
    }
  };

  useEffect(() => {
    if (!hasFetchedOrders && (fetchDataFlag || OrderData.length === 0)) {
      fetchOrder();
      setFetchDataFlag(false);
      setHasFetchedOrders(true);
    }
  }, [fetchDataFlag, OrderData]);

  const OrderOfCustomer = OrderData.filter((item) => {
    // Check if designStaffId matches
    const hasDesignStaff = item.designStaffId === designStaffId;

    // Check if status matches any of the specified values
    const statusMatches = ["Design Pending"].includes(item.status);

    // Return true if both conditions are met
    return hasDesignStaff && statusMatches;
  });

  const fetch3dDesign = async () => {
    try {
      const response = await axios.get("http://localhost:5266/api/_3ddesign");
      console.log("Response Data:", response.data); // Kiểm tra dữ liệu phản hồi
      setDesignData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error); // Kiểm tra lỗi
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
  };

  const handleCloseFormPopup = () => {
    setShowFormPopup(false);
    setShowDetailPopup(true);
  };

  const delete3dDesign = async () => {
    try {
      await axios.delete("http://localhost:5266/api/_3ddesign", {
        params: {
          id: selectedDesignId,
        },
      });
      // Remove the deleted design from the local state
      setDesignData((prevDesigns) =>
        prevDesigns.filter((design) => design._3dDesignId !== selectedDesignId)
      );
      console.log("Design deleted successfully");
    } catch (error) {
      console.error("Error deleting design:", error);
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
  };

  useEffect(() => {
    if (fetchDataFlag) {
      handleUpload3dDesign();
      setFetchDataFlag(false);
    }
  }, [fetchDataFlag]);

  const handleUpload3dDesign = async () => {
    const formData = new FormData();
    formData.append("DesignName", designName);
    formData.append("OrderId", orderId);
    formData.append("DesignStaffId", designStaffId);
    formData.append("Image", designImage);
    console.log(
      "Updating 3dDesign with data:",
      Object.fromEntries(formData.entries())
    );
    await upload3dDesign(formData);
  };

  const upload3dDesign = async (formData) => {
    try {
      const res = await axios.post(
        `http://localhost:5266/api/_3ddesign/Upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      console.log("Upload successfully:", res.data);
      setDesignData((prevDesigns) =>
        prevDesigns.filter((design) => design._3dDesignId !== selectedDesignId)
      );
      console.log("All images have been uploaded.");
      Notify.success("Designs uploaded successfully")
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const desginCompleted = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5266/api/Orders/change-status To Production?orderId=${orderId}`
      );
      console.log(res);
      console.log("Upload successfully:", res.data);
      fetchOrder();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleToProduction = async (orderID) => {
    try {
      await setOrderId(orderID);
      handleToProduction2(orderID);
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const handleToProduction2 = (orderID) => {
    desginCompleted(orderID);
    fetchOrder();
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
  };

  const handleImageUpload = () => {
    setShowDetailPopup(false);
    setShowFormPopup(true);
  };

  const _3ddesigns =
    selectedItem && selectedItem
      ? DesignData.filter((design) => design.orderId === selectedItem.orderId)
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
                      <tr key={item.orderId}>
                        <td onClick={() => showDetail(item)}>{item.orderId}</td>
                        <td onClick={() => showDetail(item)}>
                          {item.customerName}
                        </td>
                        <td onClick={() => showDetail(item)}>
                          {item?.saleStaffName ?? "N/A"}
                        </td>
                        <td onClick={() => showDetail(item)}>
                          {item?.designStaffName ?? "N/A"}
                        </td>
                        <td onClick={() => showDetail(item)}>
                          {item?.productionStaffName ?? "N/A"}
                        </td>
                        <td onClick={() => showDetail(item)}>
                          {item.totalPrice}
                        </td>
                        <td onClick={() => showDetail(item)}>{item.status}</td>
                        <td>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToProduction(item.orderId);
                            }}
                          >
                            Send
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {currentView === "upload3Ddeisgn" && (

        <div className="designstaff-data-entry-container">
          <h2 className="designstaff-data-entry-title">Enter Data</h2>
          <form className="designstaff-data-entry-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="designstaff-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productSampleList">ProductSample List</label>
              <input
                type="text"
                id="productSampleList"
                className="designstaff-input"
                value={productSampleList}
                onClick={handleProductSampleClick}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageUpload">Upload Image</label>
              <input
                type="file"
                id="imageUpload"
                className="designstaff-input"
                onChange={handleImageChange}
                multiple
              />
            </div>
            <div className="uploaded-images">
              {selectedImages.map((image, index) => (
                <div key={index} className="uploaded-image">
                  <img src={image} alt={`Uploaded ${index}`} />
                  <button type="button" onClick={() => handleDeleteImage(index)}>X</button>
                </div>
              ))}
            </div>
            <button 
              type="button"
              className="designstaff-submit-button"
              onClick={handleUploadImage}
            >
              Upload Image
            </button>
          </form>
        </div>
      )}


            {isPopupVisible && (
              <div className="popup-productlist-overlay">
                <div className="popup-productlist-content">
                  <h3>Select a Product Sample</h3>
                  <table className="popup-productlist-table">
                    <thead>
                      <tr>
                        <th>Product Sample ID</th>
                        <th>Product Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productSamples.map((sample) => (
                        <tr
                          key={sample.productSampleId}
                          onClick={() => handleProductSampleSelect(sample)}
                        >
                          <td>{sample.productSampleId}</td>
                          <td>{sample.productName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    className="closecloseclose"
                    onClick={() => setIsPopupVisible(false)}
                  >
                    Close
                  </button>
                </div>
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
                      <td>{selectedItem.orderId}</td>
                    </tr>
                    <tr>
                      <td>Gold</td>
                      <td>{selectedItem.goldType}</td>
                    </tr>
                    <tr>
                      <td>Gold Weight</td>
                      <td>{selectedItem.goldWeight}</td>
                    </tr>
                    <tr>
                      <td>Customer</td>
                      <td>{selectedItem.customerName}</td>
                    </tr>
                    <tr>
                      <td>Sales</td>
                      <td>{selectedItem?.saleStaffName ?? "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Designer</td>
                      <td>{selectedItem?.designStaffName ?? "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Production</td>
                      <td>{selectedItem?.productionStaffName ?? "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Manager</td>
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
                    {chunkArray(_3ddesigns, 2).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((_3ddesign) => (
                          <td
                            key={_3ddesign._3dDesignId}
                            className="ImageTable"
                          >
                            <img src={_3ddesign.image} alt="image3d" />
                            <button
                              className="designstaff-close-button"
                              onClick={() =>
                                handleDelete(_3ddesign._3dDesignId)
                              }
                            >
                              Delete
                            </button>
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
                <button
                  className="designstaff-add-image-button"
                  onClick={() => {
                    handleImageUpload();
                    handleSetOrder(selectedItem.orderId);
                  }}
                >
                  Add Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFormPopup && (
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
                  <input
                    type="file"
                    onChange={(e) => handleFileInputChange(e)}
                  />
                </div>
                {formImage && (
                  <div className="form-group">
                    <img
                      src={formImage}
                      alt="Form Preview"
                      className="uploaded-image-preview"
                    />
                  </div>
                )}
                <div className="form-group">
                  <button
                    type="submit"
                    className="designstaff-save-button"
                    onClick={() => handle3dDesign(selectedItem.orderId)}
                  >
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

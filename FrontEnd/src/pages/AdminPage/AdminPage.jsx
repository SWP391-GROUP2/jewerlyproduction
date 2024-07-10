import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../components/AdminHeader/AdminHeader';

function AdminPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [activeView, setActiveView] = useState('');
  const [gemstones, setGemstones] = useState([]);
  const [productSamples, setProductSamples] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleViewChange = (view) => {
    setActiveView(view);
    setSelectedItem(null);
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Fetch gemstones data from API
  useEffect(() => {
    const fetchGemstones = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5266/api/Gemstones');
        setGemstones(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchGemstones();
  }, []);

  // Fetch product samples data from API
  useEffect(() => {
    const fetchProductSamples = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5266/api/ProductSamples');
        setProductSamples(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProductSamples();
  }, []);

  // Paginate function for both gemstones and product samples
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeView === 'orderlist' ? gemstones.slice(indexOfFirstItem, indexOfLastItem) : productSamples.slice(indexOfFirstItem, indexOfLastItem);

  // Total number of pages
  const totalItems = activeView === 'orderlist' ? gemstones.length : productSamples.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle item click
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // Handle popup close
  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  return (
    <div className='admin-page'>
      <AdminSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} handleViewChange={handleViewChange} />
      <div className='admin-container'>
        <AdminHeader />
        <div className='additional-content'>
          {/* Conditionally render based on active view */}
          {activeView === 'orderlist' && (
            <div className='gemstone-list'>
              <h2>Gemstone List</h2>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error.message}</p>
              ) : (
                <>
                  <div className='gemstone-grid'>
                    {currentItems.map((gemstone, index) => (
                      <div key={index} className='gemstone-item' onClick={() => handleItemClick(gemstone)}>
                        <img
                          src={require(`../../components/Assets/${gemstone.image}.jpg`)}
                          alt={gemstone.name}
                          className="gemstone-product-image"
                        />
                        {/* <p>{gemstone.name}</p> */}
                        <div className="details-container">
                  <div className="detail-box">
                    <strong> {gemstone.name}</strong>
                  </div>
                  </div>
                      </div>
                    ))}
                  </div>
                  {/* Pagination */}
                  <ul className='pagination'>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button
                          onClick={() => paginate(i + 1)}
                          className={`page-link ${currentPage === i + 1 ? 'active' : ''}`}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
          {activeView === 'productlist' && (
            <div className='product-sample-list'>
              <h2>Product Sample List</h2>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error.message}</p>
              ) : (
                <>
                  <div className='gemstone-grid'>
                    {currentItems.map((product, index) => (
                      <div key={index} className='gemstone-item' onClick={() => handleItemClick(product)}>
                        <img
                          src={require(`../../components/Assets/${product.image}.jpg`)}
                          alt={product.productName}
                          className="gemstone-product-image"
                        />
                        {/* <p>{product.productName}</p> */}
                        <div className="details-container">
                  <div className="detail-box">
                    <strong> {product.productName}</strong>
                  </div>
                  </div>
                        
                      </div>
                    ))}
                  </div>
                  {/* Pagination */}
                  <ul className='pagination'>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button
                          onClick={() => paginate(i + 1)}
                          className={`page-link ${currentPage === i + 1 ? 'active' : ''}`}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
          {selectedItem && activeView === 'orderlist' && (
          <div className='item-popup'>
            <div className='item-popup-content'>
              <button className='close-popup-button' onClick={handleClosePopup}>Close</button>
              <div className='popup-details'>
                <h3>{selectedItem.name}</h3>
                <img
                  src={require(`../../components/Assets/${selectedItem.image}.jpg`)}
                  alt={selectedItem.name}
                  className="popup-product-image"
                />
                <div className="details-container">
                  <div className="detail-box">
                    <strong>ID: {selectedItem.gemstoneId}</strong>
                  </div>
                  <div className="detail-box">
                    <strong>Size: {selectedItem.size}</strong>
                  </div>
                  <div className="detail-box">
                    <strong>Color: {selectedItem.color}</strong>
                  </div>
                  <div className="detail-box">
                    <strong>Carat Weight: {selectedItem.caratWeight}</strong>
                  </div>
                  <div className="detail-box">
                    <strong>Price: {selectedItem.price}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Popup for selected product */}
        {selectedItem && activeView === 'productlist' && (
          <div className='item-popup'>
            <div className='item-popup-content'>
              <button className='close-popup-button' onClick={handleClosePopup}>Close</button>
              <div className='popup-details'>
                <h3>{selectedItem.productName}</h3>
                <img
                  src={require(`../../components/Assets/${selectedItem.image}.jpg`)}
                  alt={selectedItem.productName}
                  className="popup-product-image"
                />
                <div className="details-container">
                  <div className="detail-box">
                    <strong>Product Sample ID: {selectedItem.productSampleId}</strong>
                  </div>
                  <div className="detail-box">
                    <strong>Type: {selectedItem.type}</strong>
                  </div>
                  <div className="detail-box">
                    <strong>Description: {selectedItem.description}</strong>
                  </div>
                  <div className="detail-box">
                    <strong>Price: {selectedItem.price}</strong>
                  </div>
                  <div className="detail-box">
                    <strong>Gold Type: {selectedItem.goldType}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;

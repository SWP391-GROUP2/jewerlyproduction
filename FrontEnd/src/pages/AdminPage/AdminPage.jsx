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

  const [userAccounts, setUserAccounts] = useState([]);//
  const [selectedUser, setSelectedUser] = useState(null); // State để lưu thông tin user được chọn
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

// Fetch user accounts data from API
useEffect(() => {
  const fetchUserAccounts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5266/api/Admin/GetAllUser');
      setUserAccounts(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  fetchUserAccounts();
}, []);



  const deleteUserAccount = async (userId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5266/api/UserAccounts/${userId}`);
      // Refresh user accounts after deletion
      const response = await axios.get('http://localhost:5266/api/UserAccounts');
      setUserAccounts(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
// Show user details in popup
const showUserDetails = (user) => {
  setSelectedUser(user);
};

// Close popup
const handleCloseUserPopup = () => {
  setSelectedUser(null);
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
                        <div className="details-container">
                          <div className="detail-box">
                            <strong>{gemstone.name}</strong>
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
                        <div className="details-container">
                          <div className="detail-box">
                            <strong>{product.productName}</strong>
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
          {activeView === 'accountlist' && (
            <div className='user-account-list'>
              <h2>User Account List</h2>
              <table className='user-account-table'>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userAccounts.map((user) => (
                    <tr key={user.userId} onClick={() => showUserDetails(user)}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className='DElete_button_but' onClick={() => deleteUserAccount(user.userId)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                      <strong>Category: {selectedItem.category}</strong>
                    </div>
                    <div className="detail-box">
                      <strong>Price: {selectedItem.price}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Popup for selected user details */}
          
{selectedUser && (
  <div className='popup-container'>
    <div className='popup-account'>
      <div className='popup-account-content'>
        <button className='close-popup-button' onClick={handleCloseUserPopup}>Close</button>
        <div className='popup-details'>
          <h3>User Details</h3>
          {/* <p><strong>User ID:</strong> {selectedUser.id}</p>
          <p><strong>Username:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Role:</strong> {selectedUser.role}</p> */}
          <div className="details-container">
                    <div className="detail-box">
                      <strong>User ID: {selectedUser.id}</strong>
                    </div>
                    <div className="detail-box">
                      <strong>Username: {selectedUser.name}</strong>
                    </div>
                    <div className="detail-box">
                      <strong>Email: {selectedUser.email}</strong>
                    </div>
                    <div className="detail-box">
                      <strong>Role: {selectedUser.role}</strong>
                    </div>
                    <div className="detail-box">
                      <strong>Phone Number: {selectedUser.phoneNumber}</strong>
                    </div>
                    
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

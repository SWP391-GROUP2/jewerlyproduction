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

  const [selectedUser, setSelectedUser] = useState(null); // State để lưu thông tin user được chọn

  const [searchRole, setSearchRole] = useState(''); // State để lưu role từ input
  const [similarAccounts, setSimilarAccounts] = useState([]); // State để lưu danh sách tài khoản tương tự
  const [loadingSimilarAccounts, setLoadingSimilarAccounts] = useState(false); // State để xử lý trạng thái loading khi fetch API
  const [errorSimilarAccounts, setErrorSimilarAccounts] = useState(null); // State để xử lý trạng thái lỗi khi fetch API

  const itemsPerPage = 8;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    role: '',
  }); 
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
 
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

// Xóa tài khoản người dùng
const handleDeleteUser = async (userId) => {
  try {
      const response = await axios.put(`http://localhost:5266/api/Admin/DeleteUser?id=${userId}`);
      alert(response.data.message || 'User deleted successfully');
       // Cập nhật danh sách similarAccounts
       setSimilarAccounts((prevAccounts) => 
        prevAccounts.filter((account) => account.userId !== userId)
    );
  } catch (error) {
      alert(error.response?.data?.message || 'Error deleting user');
  }
};


// Close popup
const handleCloseUserPopup = () => {
  setSelectedUser(null);
};

// Show delete confirmation popup
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await axios.post('http://localhost:5266/api/Account/register/Staff', formData);
    setFormData({
      email: '',
      password: '',
      name: '',
      phoneNumber: '',
      role: '',
    });
    setLoading(false);
    setShowSuccessPopup(true);
  } catch (error) {
    setError(error);
    setLoading(false);
    alert('Error creating user');
  }
};
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};
  
const handleCloseSuccessPopup = () => {
  setShowSuccessPopup(false);
};
const fetchSimilarAccounts = async () => {
  setLoadingSimilarAccounts(true);
  try {
    let response;
    if (searchRole === '') {
      // Call GetAllUser API if searchRole is empty
      response = await axios.get('http://localhost:5266/api/Admin/GetAllUser');
    } else {
      // Call GetUserByRole API if searchRole is selected
      response = await axios.get(`http://localhost:5266/api/Admin/GetUserByRole?role=${searchRole}`);
    }
    setSimilarAccounts(response.data);
    setLoadingSimilarAccounts(false);
  } catch (error) {
    setErrorSimilarAccounts(error);
    setLoadingSimilarAccounts(false);
  }
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
          {activeView === 'createaccount' && (
            <div className='create-account-form'>
              <h2>Create Account</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label className='trashlabel' htmlFor='email'>Email:</label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label className='trashlabel' htmlFor='password'>Password:</label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label className='trashlabel' htmlFor='name'>Name:</label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label className='trashlabel' htmlFor='phoneNumber'>Phone Number:</label>
                  <input
                    type='text'
                    id='phoneNumber'
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label className='trashlabel' htmlFor='role'>Role:</label>
                  <input
                    type='text'
                    id='role'
                    name='role'
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <button type='submit' className='create-button'>
                    Create
                  </button>
                </div>
              </form>
            </div>
          )}
          {/* Popup for selected user details */}

          {activeView === 'searchaccount' && (
  <div className='search-account-form'>
    <h2>Search Account</h2>
    <select value={searchRole} onChange={(e) => setSearchRole(e.target.value)}>
      <option value="">All</option>
      <option value="manager">Manager</option>
      <option value="designstaff">Design Staff</option>
      <option value="productionstaff">Production Staff</option>
      <option value="salestaff">Sale Staff</option>
    </select>
    <button className='siucapvipro' onClick={fetchSimilarAccounts}>Search</button>

    {loadingSimilarAccounts ? (
      <p>Loading...</p>
    ) : errorSimilarAccounts ? (
      <p>Error: {errorSimilarAccounts.message}</p>
    ) : (
      <div className="similar-accounts">
        <table className='user-account-table'>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {similarAccounts.map((account) => (
              // Kiểm tra emailConfirmed của từng account trước khi hiển thị
              account.emailConfirmed && (
                <tr key={account.userId}>
                  <td>{account.userId}</td>
                  <td>{account.userName}</td>
                  <td>{account.roles}</td>
                  <td>
                  <button className='siucapvipro' onClick={() => handleDeleteUser(account.userId)}>Delete</button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}


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
                      <strong>User ID: {selectedUser.userId}</strong>
                    </div>
                    <div className="detail-box">
                      <strong>Username: {selectedUser.userName}</strong>
                    </div>
                    
                    <div className="detail-box">
                      <strong>Role: {selectedUser.roles}</strong>
                    </div>
                    
                    
              </div>
        </div>
      </div>
    </div>
  </div>
)}
{showSuccessPopup && (
                <div className='popup'>
                  <div className='popup-content'>
                    <button className='DElete_button_but' onClick={handleCloseSuccessPopup}>
                      X
                    </button>
                    <h2>Account Created Successfully!</h2>
                    <p>The new account has been successfully created.</p>
                  </div>
                </div>
              )}
{/* Xác nhận xóa người dùng */}

          
        </div>
      </div>
    </div>
  );
}

export default AdminPage;

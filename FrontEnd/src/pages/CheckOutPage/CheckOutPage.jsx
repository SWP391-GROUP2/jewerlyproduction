import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/Footer";
import "./CheckOutPage.css"; 
import productImage from '../../components/Assets/nhanvang.png'; // Import image from assets folder

const CheckOutPage = () => {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    address: '',
    notes: '',
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!document.querySelector('input[type="checkbox"]').checked) {
      setShowPopup(true);
    } else {
      // Submit form logic
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="checkout-page">
      <div className="head-checkout">
        <Header />
        <Navbar />
      </div>
      
      <div className="middle-content">
        <div className="content-wrapper">
          <div className="shipping-address">
            <h2>Shipping Address</h2>
            <form>
              <label>
                Full Name *
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="fullname-input"
                />
              </label>

              <div className="two-columns">
                <div className="column">
                  <label>
                    Phone Number *
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </label>
                  <label>
                    City *
                    <select
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select city</option>
                      {/* Add options here */}
                    </select>
                  </label>
                </div>
                <div className="column">
                  <label>
                    Email Address *
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </label>
                  <label>
                    District *
                    <select
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select district</option>
                      {/* Add options here */}
                    </select>
                  </label>
                </div>
              </div>

              <label>
                Address *
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                  className="address-input"
                />
              </label>
            </form>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-total">
              <div className="total-item">
                <span>Subtotal</span>
                <span>10,965,000₫</span>
              </div>
              <hr className="divider" />
              <div className="shipping">
                <span>Shipping</span>
                <span>100,000₫</span>
              </div>
              <div className="total-amount">
                <span>Total</span>
                <span>11,065,000₫</span>
              </div>
              <hr className="divider" />
            </div>
            <div className="product">
              <h3>Products</h3>
              <div className="product-item">
                <img src={productImage} alt="Gold Ring" /> {/* Use imported image */}
                <div className="product-details">
                  <span>Gold Ring x 1</span>
                  <span>10,965,000₫</span>
                </div>
              </div>
            </div>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Write any notes for your order, e.g., special delivery instructions."
            />
            <div className="payment-method">
              <h3>Payment Method</h3>
              <span>Bank Transfer</span>
            </div>
            <div className="terms">
              <label>
                <input type="checkbox" required />
                I have read and agree to the return policy, delivery terms, privacy policy, and terms of service for online shopping *
              </label>
            </div>
            <button className="place-order" onClick={handleSubmit}>PLACE ORDER</button>
          </div>

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <p>You must agree to the return policy, delivery terms, privacy policy, and terms of service for online shopping.</p>
                <button onClick={closePopup}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CheckOutPage;

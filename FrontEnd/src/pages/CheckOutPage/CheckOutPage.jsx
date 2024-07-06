import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/Footer";
import "./CheckOutPage.css";
import productImage from "../../components/Assets/nhanvang.png"; // Import image from assets folder

const CheckOutPage = () => {
  const [showPopup, setShowPopup] = useState(false);

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

      <div className="order-summary">
        <h2>Your Qotation Summary</h2>
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
          <h3>Your Order Detail</h3>
          <div className="product-item">
            <img src={productImage} alt="Gold Ring" />{" "}
            {/* Use imported image */}
            <div className="product-details">
              <span>Gold Ring x 1</span>
              <span>10,965,000₫</span>
            </div>
          </div>
        </div>
        <textarea
          name="notes"
          value="notes"
          placeholder="Write any notes for your order, e.g., special delivery instructions."
        />
        <div className="payment-method">
          <h3>Payment Method</h3>
          <span>Bank Transfer</span>
        </div>

        <button className="place-order" onClick={handleSubmit}>
          PLACE ORDER
        </button>
      </div>

      {showPopup && (
        <div className="popup-s">
          <div className="popup-content">
            <p>
              You must agree to the return policy, delivery terms, privacy
              policy, and terms of service for online shopping.
            </p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CheckOutPage;

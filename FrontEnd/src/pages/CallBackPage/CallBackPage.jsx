import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/Footer";

function CallBack() {
  const [quotation, setQuotation] = useState(0);
  const [total, setTotal] = useState(0);

  const [goldType, setgoldType] = useState("");
  const [goldWeight, setgoldWeight] = useState(0);
  const [type, settype] = useState("");
  const [style, setstyle] = useState("");
  const [size, setsize] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [quotationDes, setQuotationDes] = useState("");
  const [quotationPercentage, setQuotationPercentage] = useState(0);
  const [GemstoneData, setGemstoneData] = useState([]);

  const handlePlaceOrder = () => {};

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
            <span>
              <strong>Subtotal</strong>
            </span>
            <span>{quotation} đ</span>
          </div>
          <div className="shipping">
            <span>
              <strong>Deposit Amount</strong>
            </span>
            <span>{quotationPercentage} đ</span>
          </div>
          <hr className="divider" />
          <div className="total-amount">
            <span>
              <strong>Total</strong>
            </span>
            <span>{total} ₫</span>
          </div>
          <hr className="divider" />
        </div>

        <h2>Your Order Detail</h2>
        <div className="order-total">
          <div className="total-item">
            <span>
              <strong>Order ID</strong>
            </span>
            <span>//Order ID</span>
          </div>
          <hr className="divider" />
          <div className="shipping">
            <span>
              <strong>Gold Type</strong>
            </span>
            <span>{goldType}</span>
          </div>
          <hr className="divider" />
          <div className="total-amount">
            <span>
              <strong>Gold Weight</strong>
            </span>
            <span>{goldWeight} gram</span>
          </div>
          <hr className="divider" />
          <div className="total-amount">
            <span>
              <strong>Type</strong>
            </span>
            <span>{type}</span>
          </div>
          <hr className="divider" />
          <div className="total-amount">
            <span>
              <strong>Style</strong>
            </span>
            <span>{style}</span>
          </div>
          <hr className="divider" />
          <div className="total-amount">
            <span>
              <strong>Size</strong>
            </span>
            <span>size {size}</span>
          </div>
          <hr className="divider" />
          <div className="total-amount">
            <span>
              <strong>Quantity</strong>
            </span>
            <span>{quantity}</span>
          </div>
          <hr className="divider" />
          <div className="total-amount">
            <span>
              <strong>Gemstones</strong>
            </span>
            <ul>
              {GemstoneData.map((gemstone) => (
                <li key={gemstone.gemstoneId}>{gemstone.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <textarea
          name="notes"
          value={quotationDes}
          placeholder="Write any notes for your order, e.g., special delivery instructions."
        />

        <button className="place-order" onClick={handlePlaceOrder}>
          PLACE ORDER
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default CallBack;

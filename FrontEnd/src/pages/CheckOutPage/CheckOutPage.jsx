import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/Footer";
import "./CheckOutPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const CheckOutPage = () => {
  const { customizeRequestId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [RequestData, setRequestData] = useState([]);
  const [error, setError] = useState(null);
  const [quotationPercentage, setQuotationPercentage] = useState(0);
  const [quotation, setQuotation] = useState(0);
  const [total, setTotal] = useState(0);

  const [goldType, setgoldType] = useState("");
  const [goldWeight, setgoldWeight] = useState(0);
  const [type, settype] = useState("");
  const [style, setstyle] = useState("");
  const [size, setsize] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [quotationDes, setQuotationDes] = useState("");

  const [GemstoneData, setGemstoneData] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5266/api/CustomerRequests"
      );
      console.log("Response Data:", response.data);
      setRequestData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  const fetchGemstone = async () => {
    try {
      const response = await axios.get("http://localhost:5266/api/Gemstones");
      console.log("Gemstone Data:", response.data);
      setGemstoneData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchGemstone();
  }, [customizeRequestId]);

  const RequestsCurrent = RequestData.filter(
    (RequestData) =>
      RequestData.customerRequest.customizeRequestId === customizeRequestId
  );

  const GemstoneCurrent = GemstoneData.filter(
    (GemstoneData) => GemstoneData.customizeRequestId === customizeRequestId
  );

  console.log("RequestsCurrent Data:", RequestsCurrent);
  console.log("GemstoneCurrent Data:", GemstoneCurrent);

  // Kiểm tra nếu mảng RequestsCurrent có phần tử và `customerRequest` tồn tại
  useEffect(() => {
    if (RequestsCurrent.length > 0 && RequestsCurrent[0].customerRequest) {
      const quotation = RequestsCurrent[0].customerRequest.quotation;
      const percentage = (quotation * 0.4).toFixed(2);
      const totalafter = (quotation - percentage).toFixed(2);

      setTotal(totalafter);
      setQuotation(quotation);
      setQuotationPercentage(percentage);
      console.log("Quotation 40%:", percentage);
      const GT = RequestsCurrent[0].customerRequest.gold.goldType;
      setgoldWeight(RequestsCurrent[0].customerRequest.goldWeight);
      settype(RequestsCurrent[0].customerRequest.type);
      setstyle(RequestsCurrent[0].customerRequest.style);
      setsize(RequestsCurrent[0].customerRequest.size);
      setquantity(RequestsCurrent[0].customerRequest.quantity);
      setQuotationDes(RequestsCurrent[0].customerRequest.quotationDes);
      setgoldType(GT);
    } else {
      console.log(
        "No requests found with the given customizeRequestId or customerRequest is undefined."
      );
    }
  }, [RequestsCurrent]);

  if (error) return <div>Error: {error.message}</div>;

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
              <strong>Customize Request ID</strong>
            </span>
            <span>{customizeRequestId}</span>
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
              {GemstoneCurrent.map((gemstone) => (
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
        <div className="payment-method">
          <button className="payment-method-button">
            <h4>Choose Payment Method</h4>
          </button>
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

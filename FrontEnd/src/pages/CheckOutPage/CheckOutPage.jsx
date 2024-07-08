import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/Footer";
import "./CheckOutPage.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CheckOutPage = () => {
  const { customizeRequestId } = useParams();
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

  const [showMethodPopup, setShowMethodPopup] = useState(false);
  const [createSuccessPopup, setcreateSuccessPopup] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState(null);

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

  const handleMethod = () => {
    setShowMethodPopup(true);
  };

  const handleMethodChoose = (method) => {
    setPaymentMethodId(method);
  };

  const approveRequest = async () => {
    try {
      const response = await axios.post(
        `/api/CustomerRequests/approve/${customizeRequestId}`,
        null,
        {
          params: {
            paymentMethodId: paymentMethodId,
          },
        }
      );
      console.log("Response:", response.data);
      // Handle success
    } catch (error) {
      console.error("Error approving request:", error);
      // Handle error
    }
  };

  const handleSubmitMethodChoose = () => {
    approveRequest();
    setShowMethodPopup(false);
  };

  const handleMethod001 = () => {
    setcreateSuccessPopup(true);
  };

  const handleMethod002 = () => {
    setShowMethodPopup(false);
  };

  const handlePlaceOrder = () => {
    if (paymentMethodId === "P001") {
      handleMethod001();
    } else if (paymentMethodId === "P002") {
      handleMethod002();
    } else {
      console.error("Invalid payment method");
    }
  };

  const closePopup = () => {
    setShowMethodPopup(false);
  };

  const closePopupPM = () => {
    setcreateSuccessPopup(false);
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
          <button className="payment-method-button" onClick={handleMethod}>
            <h4>Choose Payment Method</h4>
          </button>
        </div>

        <button className="place-order" onClick={handlePlaceOrder}>
          PLACE ORDER
        </button>
      </div>

      {showMethodPopup && (
        <>
          <div className="overlaymethod"></div>
          <div className="popup-s">
            <div className="popup-content">
              <h2>Choose Your Payment Method</h2>
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    value="P001"
                    onClick={() => handleMethodChoose("P001")}
                    style={{
                      backgroundColor:
                        paymentMethodId === "P001" ? "lightblue" : "white",
                    }}
                  >
                    <td>Pay for cash</td>
                  </tr>
                  <tr
                    value="P002"
                    onClick={() => handleMethodChoose("P002")}
                    style={{
                      backgroundColor:
                        paymentMethodId === "P002" ? "lightblue" : "white",
                    }}
                  >
                    <td>VN Pay</td>
                  </tr>
                </tbody>
              </table>
              <div className="popup_acction_close">
                <div>
                  <button onClick={handleSubmitMethodChoose}>Submit</button>
                </div>
                <div>
                  <button onClick={closePopup}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {createSuccessPopup && (
        <>
          <div className="overlaymethod"></div>
          <div className="popup-s">
            <div className="popup-content">
              <h2>Your Order Create Successfull</h2>

              <div className="popup_acction_close">
                <div>
                  <Link to="/customer/profile">
                    <button onClick={closePopupPM}>Close</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default CheckOutPage;

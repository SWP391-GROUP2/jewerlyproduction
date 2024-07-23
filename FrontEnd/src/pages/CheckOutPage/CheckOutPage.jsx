import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/Footer";
import "./CheckOutPage.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Notify from "../../components/Alert/Alert";

const CheckOutPage = () => {
  const { customizeRequestId } = useParams();
  const [RequestData, setRequestData] = useState([]);
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
  const [orderID, setorderID] = useState("");

  const [showMethodPopup, setShowMethodPopup] = useState(false);
  const [createSuccessPopup, setcreateSuccessPopup] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [OrderData, setOrderData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const [shouldCallCashPayment, setShouldCallCashPayment] = useState(false);
  const [shouldCallVNPpayment, setShouldCallVNPpayment] = useState(false);

  const [price, setPrice] = useState(0);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "https://nbjewelrybe.azurewebsites.net/api/CustomerRequests"
      );
      console.log("Response Data:", response.data);
      setRequestData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchGemstone = async () => {
    try {
      const response = await axios.get("https://nbjewelrybe.azurewebsites.net/api/Gemstones");
      console.log("Gemstone Data:", response.data);
      setGemstoneData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchGemstone();
  }, [customizeRequestId]);

  const RequestsCurrent = RequestData.filter(
    (RequestData) => RequestData.customizeRequestId === customizeRequestId
  );

  const GemstoneCurrent = GemstoneData.filter(
    (GemstoneData) => GemstoneData.customizeRequestId === customizeRequestId
  );

  console.log("RequestsCurrent Data:", RequestsCurrent);
  console.log("GemstoneCurrent Data:", GemstoneCurrent);

  // Kiểm tra nếu mảng RequestsCurrent có phần tử và `customerRequest` tồn tại
  useEffect(() => {
    if (RequestsCurrent.length > 0 && RequestsCurrent[0]) {
      const quotation = RequestsCurrent[0].quotation;
      const percentage = (quotation * 0.3).toFixed(2);
      const totalafter = (quotation - percentage).toFixed(2);

      setTotal(totalafter);
      setQuotation(quotation);
      setPrice(percentage);
      setQuotationPercentage(percentage);
      console.log("Quotation 30%:", percentage);
      const GT = RequestsCurrent[0].goldType;
      setgoldWeight(RequestsCurrent[0].goldWeight);
      settype(RequestsCurrent[0].type);
      setstyle(RequestsCurrent[0].style);
      setsize(RequestsCurrent[0].size);
      setquantity(RequestsCurrent[0].quantity);
      setQuotationDes(RequestsCurrent[0].quotationDes);
      setgoldType(GT);
    } else {
      console.log(
        "No requests found with the given customizeRequestId or customerRequest is undefined."
      );
    }
  }, [RequestsCurrent]);

  const handleMethod = () => {
    setShowMethodPopup(true);
  };

  const fetchOrder = async () => {
    try {
      const response = await axios.get("https://nbjewelrybe.azurewebsites.net/api/Orders");
      console.log("Response Data:", response.data); // Kiểm tra dữ liệu phản hồi
      setOrderData(response.data);
      setDataFetched(true); // Đánh dấu rằng dữ liệu đã được tải
    } catch (error) {
      console.error("Error fetching data:", error); // Kiểm tra lỗi
    }
  };

  useEffect(() => {
    if (dataFetched) {
      const foundOrder = OrderData.find(
        (order) => order.customizeRequestId === customizeRequestId
      );

      if (foundOrder) {
        console.log(`Found orderId: ${foundOrder.orderId}`);
        setorderID(foundOrder.orderId);
      } else {
        console.log("OrderId not found for the given CustomizerequestId.");
      }
    }
  }, [dataFetched, OrderData]);

  const handleMethodChoose = (method) => {
    setPaymentMethodId(method);
  };

  const approveRequest = async () => {
    try {
      const response = await axios.post(
        `https://nbjewelrybe.azurewebsites.net/api/CustomerRequests/approve/${customizeRequestId}`,
        null,
        {
          params: {
            paymentMethodId: paymentMethodId,
          },
        }
      );
      if (response) {
        console.log("Response:", response.data);
        Notify.success("Choose payment successful!");
      } else {
        alert("Choose payment failed!");
      }
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

  const CashPayment = async (orderID) => {
    try {
      console.log("OrderID:", orderID);

      const response = await axios.put(
        "https://nbjewelrybe.azurewebsites.net/api/Orders/change-status to PaymendPending",
        null,
        {
          params: { orderID },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (orderID && shouldCallCashPayment) {
      CashPayment(orderID);
      setShouldCallCashPayment(false);
    }
  }, [orderID, shouldCallCashPayment]);

  useEffect(() => {
    if (orderID && shouldCallVNPpayment) {
      VNPpayment(price, orderID);
      setShouldCallVNPpayment(false);
    }
  }, [price, orderID, shouldCallVNPpayment]);

  const handleMethod001 = () => {
    setcreateSuccessPopup(true);
  };

  const VNPpayment = async (price, orderID) => {
    try {
      // Kiểm tra giá trị của price và orderID
      console.log("Price:", price);
      console.log("OrderID:", orderID);

      const response = await axios.post(
        `https://nbjewelrybe.azurewebsites.net/api/Payment/CreatePaymentUrl`,
        null,
        {
          params: {
            price: price, // giá trị price cần được định nghĩa trước hoặc lấy từ đâu đó
            orderID: orderID, // giá trị orderID cần được định nghĩa trước hoặc lấy từ đâu đó
          },
        }
      );
      console.log("Response:", response.data);
      // Chuyển hướng tới đường link thanh toán
      window.location.href = response.data;
    } catch (error) {
      console.error("Error creating payment URL:", error);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Request data:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
    }
  };

  const handleMethod002 = async () => {
    await fetchOrder();
    setShouldCallVNPpayment(true);
    setShowMethodPopup(false);
  };

  const CashStatus = async () => {
    await fetchOrder();
    setShouldCallCashPayment(true);
    setcreateSuccessPopup(false);
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
                  <Link to="/customer/profile">
                    <button onClick={closePopup}>Close</button>
                  </Link>
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
                  <button onClick={CashStatus}>Close</button>
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

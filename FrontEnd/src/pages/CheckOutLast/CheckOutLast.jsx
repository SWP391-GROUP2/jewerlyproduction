import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/Footer";
import "../CheckOutPage/CheckOutPage.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CheckOutLast = () => {
  const { orderId } = useParams();

  const [showMethodPopup, setShowMethodPopup] = useState(false);
  const [createSuccessPopup, setcreateSuccessPopup] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [OrderData, setOrderData] = useState([]);
  const [shouldCallCashPayment, setShouldCallCashPayment] = useState(false);
  const [shouldCallVNPpayment, setShouldCallVNPpayment] = useState(false);
  const [selectedOrder, setSelectedRequest] = useState(null);

  //lấy list order
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get("https://nbjewelrybe.azurewebsites.net/api/Orders");
        console.log("Response Data:", response.data);
        setOrderData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrder();
  }, []);

  //chọn selectedOrder để lấy thông tin
  useEffect(() => {
    if (OrderData.length > 0) {
      const order = OrderData.find((order) => order.orderId === orderId);
      if (order) {
        setSelectedRequest(order);
      } else {
        console.warn(`Order with ID ${orderId} not found.`);
      }
    }
  }, [OrderData, orderId]);

  useEffect(() => {
    console.log("selectedOrder Data:", selectedOrder);
  }, [selectedOrder]);

  //api VNpay
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

  //thanh toan bang cash
  const CashPayment = async (orderID) => {
    try {
      console.log("OrderID:", orderID);

      const response = await axios.put(
        "https://nbjewelrybe.azurewebsites.net/api/Orders/change-status to Shipping",
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

  //Mở popup chọn method
  const handleMethod = () => {
    setShowMethodPopup(true);
  };

  //set Payment Method Id
  const handleMethodChoose = (method) => {
    setPaymentMethodId(method);
  };

  //Mở popup yes no cho Cash
  const handleMethod001 = () => {
    setcreateSuccessPopup(true);
  };

  //Chạy lại list order -> để dùng effect chạy api
  const handleMethod002 = () => {
    setShouldCallVNPpayment(true);
    setShowMethodPopup(false);
  };

  //Chạy lại list order -> để dùng effect chạy api
  const CashStatus = () => {
    setShouldCallCashPayment(true);
    setcreateSuccessPopup(false);
  };

  //handle thay đổi theo method
  const handlePlaceOrder = () => {
    if (paymentMethodId === "P001") {
      handleMethod001();
    } else if (paymentMethodId === "P002") {
      handleMethod002();
    } else {
      console.error("Invalid payment method");
    }
  };

  //Đóng submit vì ko cần chạy api method
  const closePopup = () => {
    setShowMethodPopup(false);
  };

  // Effect để gọi API VNPpayment khi shouldCallVNPpayment thay đổi
  useEffect(() => {
    if (shouldCallVNPpayment) {
      VNPpayment(selectedOrder.totalPrice, selectedOrder.orderId);
      setShouldCallVNPpayment(false); // Đặt lại để không gọi lại API nữa
    }
  }, [shouldCallVNPpayment, selectedOrder]);

  // Effect để gọi API CashPayment khi shouldCallCashPayment thay đổi
  useEffect(() => {
    const callCashPayment = async () => {
      try {
        if (shouldCallCashPayment && selectedOrder) {
          await CashPayment(selectedOrder.orderId);
          console.log("Cash payment success.");
          // Thực hiện các xử lý cần thiết khi thanh toán bằng tiền mặt thành công
        }
      } catch (error) {
        console.error("Error while processing cash payment:", error);
        // Xử lý lỗi khi thanh toán bằng tiền mặt thất bại
      } finally {
        setShouldCallCashPayment(false); // Đặt lại để không gọi lại API nữa
      }
    };

    callCashPayment();
  }, [shouldCallCashPayment, selectedOrder]);

  return (
    <div className="checkout-page">
      <div className="head-checkout">
        <Header />
        <Navbar />
      </div>

      <div className="order-summary">
        <h2>Your Order Detail</h2>
        <div className="order-total">
          <div className="total-item">
            <span>
              <strong>Order ID</strong>
            </span>
            <span>{orderId}</span>
          </div>
          <hr className="divider" />
          <div className="shipping">
            <span>
              <strong>Customer</strong>
            </span>
            <span>{selectedOrder ? selectedOrder.customerName : "N/A"}</span>
          </div>
          <hr className="divider" />
          <div className="total-amount">
            <span>
              <strong>Sale Staff</strong>
            </span>
            <span>{selectedOrder ? selectedOrder.saleStaffName : "N/A"}</span>
          </div>
          <hr className="divider" />
          <div className="total-amount">
            <span>
              <strong>Design Staff</strong>
            </span>
            <span>
              {selectedOrder ? selectedOrder?.designStaffName : "N/A"}
            </span>
          </div>
          <hr className="divider" />
          <div className="total-amount">
            <span>
              <strong>Production Staff</strong>
            </span>
            <span>
              {selectedOrder ? selectedOrder?.productionStaffName : "N/A"}
            </span>
          </div>
          <hr className="divider" />
          <div className="total-amount">
            <span>
              <strong>Total Price</strong>
            </span>
            <span>{selectedOrder ? selectedOrder.totalPrice : "N/A"}</span>
          </div>
          <hr className="divider" />
          <div className="total-amount">
            <span>
              <strong>Status</strong>
            </span>
            <span>{selectedOrder ? selectedOrder.status : "N/A"}</span>
          </div>
        </div>
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
                  <button onClick={closePopup}>Submit</button>
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

export default CheckOutLast;

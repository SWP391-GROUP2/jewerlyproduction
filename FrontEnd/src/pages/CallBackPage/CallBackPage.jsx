import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/Footer";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function CallBack() {
  const location = useLocation(); // Lấy đối tượng location từ react-router để truy cập query params từ URL
  const [response, setResponse] = useState(null); // Khởi tạo state để lưu trữ phản hồi từ API
  const [error, setError] = useState(null); // Thêm state để lưu trữ lỗi

  useEffect(() => {
    // Hàm async để gọi API xử lý thanh toán
    const executePayment = async () => {
      try {
        // Gọi API với phương thức GET và gửi query params trong phần body
        const response = await axios.get(
          `https://nbjewelrybe.azurewebsites.net/api/Payment/Check${location.search}`
        );

        setResponse(response.data); // Cập nhật state với dữ liệu phản hồi từ API
      } catch (error) {
        console.error("Error executing payment:", error); // In ra lỗi nếu có vấn đề xảy ra khi gọi API
        setError(error); // Lưu trữ lỗi vào state
      }
    };

    executePayment(); // Gọi hàm thực thi thanh toán khi component được mount hoặc khi location thay đổi
  }, [location.search]);

  return (
    <div className="checkout-page">
      <div className="head-checkout">
        <Header />
        <Navbar />
      </div>

      <div className="order-summary">
        <h2>Transaction Detail</h2>
        {response ? (
          <div className="order-total">
            <div className="total-item">
              <span>
                <strong>Success</strong>
              </span>
              <span>{response.success ? "Yes" : "No"}</span>
            </div>
            <hr className="divider" />
            <div className="shipping">
              <span>
                <strong>PaymentMethod </strong>
              </span>
              <span>{response.paymentMethod}</span>
            </div>
            <hr className="divider" />
            <div className="total-amount">
              <span>
                <strong>OrderId</strong>
              </span>
              <span>{response.orderDescription}</span>
            </div>
            <hr className="divider" />
            <div className="total-amount">
              <span>
                <strong>TransactionId </strong>
              </span>
              <span>{response.transactionId}</span>
            </div>
            <hr className="divider" />
            <div className="total-amount">
              <span>
                <strong>VnPayResponseCode </strong>
              </span>
              <span>{response.vnPayResponseCode}</span>
            </div>
            <hr className="divider" />
            <strong>Order Description </strong>
            <textarea
              name="notes"
              value={response.orderId}
              placeholder="Write any notes for your order, e.g., special delivery instructions."
              readOnly
            />
          </div>
        ) : error ? (
          <div className="error-message">
            <p>Error fetching transaction details: {error.message}</p>
          </div>
        ) : (
          <div className="loading-message">
            <p>Loading transaction details...</p>
          </div>
        )}
        <Link to="/customer/profile">
          <button className="place-order">Complete</button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default CallBack;

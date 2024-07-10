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
    const query = new URLSearchParams(location.search); // Tạo đối tượng URLSearchParams để phân tích cú pháp query params từ URL
    const params = Object.fromEntries(query.entries()); // Chuyển đổi query params thành đối tượng JavaScript

    // Hàm async để gọi API xử lý thanh toán
    const executePayment = async () => {
      try {
        // Gọi API với phương thức GET và gửi query params trong phần body
        const response = await axios.get(
          "http://localhost:5266/api/Payment/PaymentCallback"
        );

        setResponse(response.data); // Cập nhật state với dữ liệu phản hồi từ API
      } catch (error) {
        console.error("Error executing payment:", error); // In ra lỗi nếu có vấn đề xảy ra khi gọi API
        setError(error); // Lưu trữ lỗi vào state
      }
    };

    executePayment(); // Gọi hàm thực thi thanh toán khi component được mount hoặc khi location thay đổi
  }, [location]);

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
              <span>{response.success}</span>
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
              <span>{response.orderId}</span>
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
                <strong>Token </strong>
              </span>
              <span>{response.token}</span>
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
              value={response.orderDescription}
              placeholder="Write any notes for your order, e.g., special delivery instructions."
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

import React from "react";
import Header from "../../components/Header/Header";
import "./GemstonePage.css"; // Bạn có thể tạo và tùy chỉnh CSS cho HomePage nếu cần
import Navbar from "../../components/Navbar/navbar";
import Slideshow from "../../components/Slideshow/Slideshow";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Filter";

function GemstonePage() {
  return (
    <div className="home-page">
      <div className="Head">
        <Header />
        <Navbar />
      </div>

      <div className="Slideshow">
        <Slideshow interval={10000} />
      </div>

      <div className="main-content">
        <Sidebar className="Sidebar" />
        <div className="content">
          {/* Các sản phẩm sẽ được hiển thị ở đây */}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default GemstonePage;

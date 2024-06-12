import React from "react";
import Header from "../../components/Header/Header";
import "./ProductPage.css"; // Bạn có thể tạo và tùy chỉnh CSS cho HomePage nếu cần
import Navbar from "../../components/Navbar/navbar";
import Slideshow from "../../components/Slideshow/Slideshow";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Filter";

function ProductPage() {
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
      </div>

      <Footer />
    </div>
  );
}

export default ProductPage;

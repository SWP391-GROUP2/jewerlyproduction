import React from "react";
import Header from "../../components/Header/Header";
import "./CustomizePage.css"; // Bạn có thể tạo và tùy chỉnh CSS cho HomePage nếu cần
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/Footer";
import CustomizeForm from "../../components/CustomizeForm/CustomizeForm";

function CustomizePage() {
  return (
    <div className="home-page">
      <div className="Head">
        <Header />
        <Navbar />
      </div>
      <CustomizeForm />
      <Footer />
    </div>
  );
}

export default CustomizePage;

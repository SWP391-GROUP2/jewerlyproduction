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
        <img
          src={
            "https://file.hstatic.net/200000103143/file/1640_x_250_1_92795b1e4d2148c399d851f7dce7c7b7.gif"
          }
          alt=""
          className="l1"
        />
      </div>
      <CustomizeForm />
      <Footer />
    </div>
  );
}

export default CustomizePage;

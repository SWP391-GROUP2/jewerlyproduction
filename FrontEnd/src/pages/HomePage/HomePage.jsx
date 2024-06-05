import React from "react";
import Header from "../../components/Header/Header";
import "./HomePage.css"; // Bạn có thể tạo và tùy chỉnh CSS cho HomePage nếu cần
import Navbar from "../../components/Navbar/navbar";
import Slideshow from "../../components/Slideshow/Slideshow";
import Footer from "../../components/Footer/Footer";

function HomePage() {
  return (
    <div className="home-page">
      <div>
        <Header />
        <Navbar />
      </div>
      <div className="Slideshow">
        <Slideshow interval={10000} />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;

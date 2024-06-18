import React from "react";
import Header from "../../components/Header/Header";
import "./HomePage.css"; // Bạn có thể tạo và tùy chỉnh CSS cho HomePage nếu cần
import Navbar from "../../components/Navbar/navbar";
import Slideshow from "../../components/Slideshow/Slideshow";
import Footer from "../../components/Footer/Footer";
import Image1 from "../../components/Assets/p1.png";
import Image2 from "../../components/Assets/p2.png";
import ImageButtons from "../../components/ImageButtons/ImageButtons";
import La from "../../components/Assets/l1.png";

function HomePage() {
  return (
    <div className="home-page">
      <div className="Head">
        <Header />
        <Navbar />
      </div>

      <div className="Slideshow">
        <Slideshow interval={10000} />
      </div>

      <div className="image-container">
        <img src={Image1} alt="" className="image" />
        <img src={Image2} alt="" className="image" />
      </div>
      <div className="content">
        <h2>Welcome to NB Jewelry Store</h2>
        <p>
          At NB Jewelry Store, we offer exquisite and beautiful jewelry
          collections, providing you with the finest shopping experience.
        </p>
      </div>
      <img src={La} alt="" className="l1" />
      <h2 className="h2">Jewelry Style</h2>
      <ImageButtons />
      <img
        src={
          "https://file.hstatic.net/200000103143/file/1640_x_250_1_92795b1e4d2148c399d851f7dce7c7b7.gif"
        }
        alt=""
        className="l1"
      />
      <Footer />
    </div>
  );
}

export default HomePage;

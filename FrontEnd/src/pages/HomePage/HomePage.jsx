import React from "react";
import Header from "../../components/Header/Header";
import "./HomePage.css";
import Navbar from "../../components/Navbar/navbar";
import Slideshow from "../../components/Slideshow/Slideshow";
import Footer from "../../components/Footer/Footer";
import ImageButtons from "../../components/ImageButtons/ImageButtons";

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
      <div className="content">
        <h2>Welcome to NB Jewelry Store</h2>
        <p>
          At NB Jewelry Store, we offer exquisite and beautiful jewelry
          collections, providing you with the finest shopping experience.
        </p>
      </div>
      <h2 className="h2">Jewelry Style</h2>
      <ImageButtons />
      <img
        src={
          "https://file.hstatic.net/200000103143/file/1640_x_250_1_92795b1e4d2148c399d851f7dce7c7b7.gif"
        }
        alt=""
        className="l1"
      />
      <div className="image-container">
        <img
          src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721208584/p1_gmqhyd.png"
          alt=""
          className="image"
        />
        <img
          src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721208586/p2_hvxt9f.png"
          alt=""
          className="image"
        />
      </div>

      <img
        src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721208627/l1_dhrcig.png"
        alt=""
        className="l1"
      />

      <Footer />
    </div>
  );
}

export default HomePage;

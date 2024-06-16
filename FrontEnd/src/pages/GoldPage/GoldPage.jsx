import React from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/Footer";
import "./GoldPage.css";

function GoldPage() {
  return (
    <div className="home-page">
      <div className="Head">
        <Header />
        <Navbar />
      </div>
      <iframe
        frameborder="0"
        width="99%"
        height="750px"
        src="https://webtygia.com/api/vang?bgheader=b53e3e&colorheader=ffffff&padding=5&fontsize=13&hienthi=&"
      ></iframe>
      <Footer />
    </div>
  );
}

export default GoldPage;

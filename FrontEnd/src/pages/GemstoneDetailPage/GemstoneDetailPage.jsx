import React from "react";
import Header from "../../components/Header/Header";
import "./GemstoneDetailPage.css";
import Navbar from "../../components/Navbar/navbar";
import GemstoneDetail from "../GemstoneDetail/GemstoneDetail";
import Footer from "../../components/Footer/Footer";

function GemstoneDetailPage() {
  return (
    <div className="home-page">
      <div className="Head">
        <Header />
        <Navbar />
      </div>

      <div>
        <GemstoneDetail />
      </div>

      <Footer />
    </div>
  );
}

export default GemstoneDetailPage;

import React from "react";
import Header from "../../components/Header/Header";
import "./ProductDetailsPage.css"; 
import Navbar from "../../components/Navbar/navbar";
import ProductDetails from "../ProductDetails/ProductDetails";
import Footer from "../../components/Footer/Footer";


function ProductDetailsPage() {
  return (
    <div className="home-page">
      <div className="Head">
        <Header />
        <Navbar />
      </div>

        <div>
            <ProductDetails/>
        </div>

      
      

      <Footer />
    </div>
  );
}

export default ProductDetailsPage;
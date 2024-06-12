import React from "react";
import "./Product.css";

function Product({ image, name, price }) {
  return (
    <div className="product-card">
      <img
        src={
          "https://cdn.pnj.io/images/detailed/202/sp-gnpfxmw000273-nhan-vang-trang-14k-dinh-ngoc-trai-freshwater-pnj-1.png"
        }
        alt={name}
        className="product-image"
      />
      <h3 className="product-name">Freshwater Ring</h3>
      <p className="product-price">$ 300</p>
    </div>
  );
}
export default Product;

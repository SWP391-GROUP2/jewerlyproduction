import React from "react";
import Product from "../Product/Product";
import "./ProductSlider.css";

function ProductSlider({ products }) {
  return (
    <div className="product-slider">
      {products.map((product, index) => (
        <Product key={index} {...product} />
      ))}
    </div>
  );
}

export default ProductSlider;

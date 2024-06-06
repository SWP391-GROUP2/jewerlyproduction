import React from "react";
import "./Product.css";

function Product({ image, name, price }) {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
    </div>
  );
}
export default Product;

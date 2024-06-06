import React, { useState } from "react";
import "./HotProductsCarousel.css";
import product1 from "../Assets/b1.png";
import product2 from "../Assets/b2.png";
import product3 from "../Assets/b3.png";
import product4 from "../Assets/b4.png";
import product5 from "../Assets/b5.png";

const HotProductsCarousel = () => {
  const products = [
    { id: 1, image: product1, name: "Product 1", price: "$10.00" },
    { id: 2, image: product2, name: "Product 2", price: "$20.00" },
    { id: 3, image: product3, name: "Product 3", price: "$30.00" },
    { id: 4, image: product4, name: "Product 4", price: "$40.00" },
    { id: 5, image: product5, name: "Product 5", price: "$50.00" },
    // Add more products as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % products.length);
  };

  return (
    <div className="carousel-container">
      <button className="carousel-arrow left-arrow" onClick={handlePrevious}>
        &lt;
      </button>
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="carousel-item">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-overlay">
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-arrow right-arrow" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default HotProductsCarousel;

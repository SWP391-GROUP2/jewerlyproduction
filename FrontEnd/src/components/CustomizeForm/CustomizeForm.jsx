import React from "react";
import "./CustomizeForm.css";
import { useLocation } from "react-router-dom";

function CustomizeForm() {
  const location = useLocation();
  const { state } = location;
  const { item } = state || {}; // Lấy dữ liệu từ state

  const options = [
    { id: 1, name: "Solitaire", imgSrc: "../Assets/S.png" },
    { id: 2, name: "ThreeStone", imgSrc: "../Assets/T.png" },
    { id: 3, name: "Pave", imgSrc: "../Assets/P.png" },
  ];

  return (
    <div className="customizer-container">
      <main className="main-content">
        <h1 className="title">Customize Your Jewelry</h1>
        <h2 className="subtitle">{item && <p>Selected Item: {item}</p>}</h2>
        <div className="customize-options-wrapper">
          <div className="customize-options">
            <div className="option-section">
              <div className="style">
                <h3>STYLE</h3>
                <div className="options-grid">
                  {options.map((option) => (
                    <div key={option.id} className="option-box">
                      <img src={option.imgSrc} alt={option.name} />
                      <p>{option.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="view-with">
                <h3>GEMSTONE</h3>
                <div className="options-grid">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="option-box"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="option-section">
              <div className="metal">
                <h3>Gold</h3>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="checkbox-option">
                    <input type="checkbox" id={`metal${i}`} />
                    <label htmlFor={`metal${i}`}>abc</label>
                  </div>
                ))}
              </div>
              <div className="stone">
                <h3>SIZE</h3>
                <div className="options-grid">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="option-box"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="option-section">
              <div className="metal">
                <h3>QUANTITY</h3>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="checkbox-option">
                    <input type="checkbox" id={`metal${i}`} />
                    <label htmlFor={`metal${i}`}>abc</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button className="create-button">Create your model</button>
        <div className="divider"></div>
        <div className="model-gallery">
          <div className="model-preview"></div>
          <div className="model-preview"></div>
          <div className="model-preview"></div>
          <div className="model-preview"></div>
        </div>
        <button className="view-more-button">View More</button>
      </main>
    </div>
  );
}

export default CustomizeForm;

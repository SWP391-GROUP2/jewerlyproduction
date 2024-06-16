import React from "react";
import "./CustomizeForm.css";

function CustomizeForm() {
  return (
    <div className="customizer-container">
      <main className="main-content">
        <h1 className="title">Customize Your Jewelry</h1>
        <h2 className="subtitle">TYPE OF JEWELRY</h2>
        <div className="customize-options-wrapper">
          <div className="customize-options">
            <div className="option-section">
              <div className="style">
                <h3>STYLE</h3>
                <div className="options-grid">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="option-box"></div>
                  ))}
                </div>
              </div>
              <div className="view-with">
                <h3>VIEW WITH</h3>
                <div className="options-grid">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="option-box"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="option-section">
              <div className="metal">
                <h3>METAL</h3>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="checkbox-option">
                    <input type="checkbox" id={`metal${i}`} />
                    <label htmlFor={`metal${i}`}>abc</label>
                  </div>
                ))}
              </div>
              <div className="stone">
                <h3>STONE</h3>
                <div className="options-grid">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="option-box"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="other">
              <h3>OTHER..</h3>
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

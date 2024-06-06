import React from "react";
import "./ImageButtons.css";
import ring from "../Assets/ring.png";
import necklace from "../Assets/necklace.png";
import bracelet from "../Assets/bracelet.png";
import earrings from "../Assets/earrings.png";

const ImageButtons = ({ onButtonClick }) => {
  return (
    <div className="button-container">
      <div className="button-with-caption">
        <button className="image-button" onClick={() => onButtonClick("ring")}>
          <img src={ring} alt="Ring" className="button-image" />
        </button>
        <p className="caption">Ring</p>
      </div>
      <div className="button-with-caption">
        <button
          className="image-button"
          onClick={() => onButtonClick("necklace")}
        >
          <img src={necklace} alt="Necklace" className="button-image" />
        </button>
        <p className="caption">Necklace</p>
      </div>
      <div className="button-with-caption">
        <button
          className="image-button"
          onClick={() => onButtonClick("bracelet")}
        >
          <img src={bracelet} alt="Bracelet" className="button-image" />
        </button>
        <p className="caption">Bracelet</p>
      </div>
      <div className="button-with-caption">
        <button
          className="image-button"
          onClick={() => onButtonClick("earrings")}
        >
          <img src={earrings} alt="Earrings" className="button-image" />
        </button>
        <p className="caption">Earrings</p>
      </div>
    </div>
  );
};

export default ImageButtons;

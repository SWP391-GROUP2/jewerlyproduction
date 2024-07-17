import React from "react";
import "./ImageButtons.css";

const ImageButtons = ({ onButtonClick }) => {
  return (
    <div className="button-container">
      <div className="button-with-caption">
        <button className="image-button" onClick={() => onButtonClick("ring")}>
          <img src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721208073/ring_bnh80h.png" alt="Ring" className="button-image" />
        </button>
        <p className="caption">Ring</p>
      </div>
      <div className="button-with-caption">
        <button
          className="image-button"
          onClick={() => onButtonClick("necklace")}
        >
          <img src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721208073/necklace_v339mp.png" alt="Necklace" className="button-image" />
        </button>
        <p className="caption">Necklace</p>
      </div>
      <div className="button-with-caption">
        <button
          className="image-button"
          onClick={() => onButtonClick("bracelet")}
        >
          <img src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721208072/bracelet_n860dr.png" alt="Bracelet" className="button-image" />
        </button>
        <p className="caption">Bracelet</p>
      </div>
      <div className="button-with-caption">
        <button
          className="image-button"
          onClick={() => onButtonClick("earrings")}
        >
          <img src="https://res.cloudinary.com/dfvplhyjj/image/upload/v1721208072/earrings_t9jk3w.png" alt="Earrings" className="button-image" />
        </button>
        <p className="caption">Earrings</p>
      </div>
    </div>
  );
};

export default ImageButtons;

import React, { useState, useEffect } from "react";
import "./Slideshow.css";

const images = [
  "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198229/s1_voavyx.png",
  "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198229/s2_kizyj3.png",
  "https://res.cloudinary.com/dfvplhyjj/image/upload/v1721198229/s3_i3ide4.png"
];

function Slideshow({ interval = 10000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    } else if (currentIndex < 0) {
      setCurrentIndex(images.length - 1);
    }
  };

  return (
    <div className="slideshow">
      <div
        className="slideshow-inner"
        style={{
          transform: `translateX(-${(currentIndex + 1) * 100}%)`,
          transition: isTransitioning ? "transform 1s ease-in-out" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="slide">
          <img src={images[images.length - 1]} alt={`Slide ${images.length}`} />
        </div>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
        <div className="slide">
          <img src={images[0]} alt="Slide 1" />
        </div>
      </div>
      <button className="prev" onClick={handlePrev}>
        &#10094;
      </button>
      <button className="next" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
}

export default Slideshow;

import React, { useState, useEffect } from "react";

const ImageCarousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="text-overlay">
            <h2
              className="font-bold text-custom-blue md:text-[32px] text-[15px]"
              style={{ letterSpacing: "2px" }}
            >
              {slide.title}
            </h2>
            <p className="text-[12px] md:text-[16px]">{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;

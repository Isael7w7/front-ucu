import React, { useState } from 'react';
import '../styles/Carousel.css';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + itemsPerSlide) % items.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - itemsPerSlide + items.length) % items.length
    );
  };

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      visible.push(items[(currentIndex + i) % items.length]);
    }
    return visible;
  };

  return (
    <div className="carousel">
      <button className="carousel-btn prev" onClick={prevSlide}>❮</button>
      
      <div className="carousel-content">
        <div className="carousel-grid">
          {getVisibleItems().map((item, index) => (
            <div key={index} className="carousel-item">
              <div className="evento-card-carousel">
                <div className="evento-header">
                  <h3>{item.titulo}</h3>
                  <span className={`categoria-badge ${item.categoria}`}>
                    {item.categoria}
                  </span>
                </div>

                <div className="evento-info">
                  <div className="info-item">
                    <span className="icon">📅</span>
                    <span>{item.fecha} a las {item.hora}</span>
                  </div>
                  <div className="info-item">
                    <span className="icon">📍</span>
                    <span>{item.ubicacion}</span>
                  </div>
                  <div className="info-item">
                    <span className="icon">👥</span>
                    <span>{item.asistentes} personas</span>
                  </div>
                </div>

                <p className="evento-descripcion">{item.descripcion}</p>

                <button className="evento-btn">Registrarse</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-btn next" onClick={nextSlide}>❯</button>

      <div className="carousel-dots">
        {Array.from({ length: Math.ceil(items.length / itemsPerSlide) }).map((_, index) => (
          <button
            key={index}
            className={`dot ${index === Math.floor(currentIndex / itemsPerSlide) ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index * itemsPerSlide)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

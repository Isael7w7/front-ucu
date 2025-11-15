import React, { useState, useEffect, useRef } from 'react';
import '../styles/Carousel.css';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);
  
  const itemsPerSlide = isMobile ? 1 : 3;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + itemsPerSlide) % items.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [itemsPerSlide, items.length]);

  const nextSlide = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      (prevIndex + itemsPerSlide) % items.length
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      (prevIndex - itemsPerSlide + items.length) % items.length
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left - next slide
      nextSlide();
    }
    if (touchEnd - touchStart > 50) {
      // Swipe right - prev slide
      prevSlide();
    }
  };

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      visible.push(items[(currentIndex + i) % items.length]);
    }
    return visible;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className="carousel"
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-content">
        <div className={`carousel-grid ${isAnimating ? 'animate-slide' : ''}`}>
          {getVisibleItems().map((item, index) => (
            <div key={index} className="carousel-item">
              <div className="evento-card-carousel">
                <img src={item.imagen_url} alt={item.titulo} className="evento-image" />
                
                <div className="evento-content">
                  <h3>{item.titulo}</h3>
                  
                  <div className="evento-info">
                    <div className="info-row">
                      <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>{formatDate(item.fecha)}</span>
                    </div>

                    <div className="info-row">
                      <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>Ver ubicación</span>
                    </div>
                  </div>

                  <p className="evento-descripcion">{item.cuerpo}</p>

                  <button 
                    className="evento-btn"
                    onClick={() => window.open(`https://www.google.com/maps/?q=${item.lat},${item.lng}`, '_blank')}
                    title="Ver ubicación en Google Maps"
                  >
                    Ver ubicación
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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

import React, { useState, useEffect, useRef } from 'react';
import '../styles/ComerciosCarousel.css';

const ComerciosCarousel = ({ items }) => {
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

  const getCategoryColor = (categoria) => {
    const colors = {
      tienda: '#D4A574',
      servicios: '#F5DEB3',
      alimentacion: '#C89060',
      produccion: '#E8C9A0'
    };
    return colors[categoria?.toLowerCase()] || '#D4A574';
  };

  const handleContacto = (comercio) => {
    // Abre el enlace de contacto (Facebook) del comercio
    if (comercio.enlaceContacto) {
      window.open(comercio.enlaceContacto, '_blank');
    } else {
      // Si no tiene contacto, muestra mensaje
      alert(`No hay información de contacto disponible para ${comercio.nombre}`);
    }
  };

  return (
    <div 
      className="comercios-carousel"
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-content-comercios">
        <div className={`comercios-grid-carousel ${isAnimating ? 'animate-slide' : ''}`}>
          {getVisibleItems().map((comercio, index) => (
            <div key={index} className="comercio-carousel-item">
              <div className="comercio-pill">
                <div className="comercio-pill-header">
                  <h3>{comercio.nombre}</h3>
                  <span 
                    className="comercio-categoria"
                    style={{ backgroundColor: getCategoryColor(comercio.categoria) }}
                  >
                    {comercio.categoria}
                  </span>
                </div>

                <p className="comercio-pill-descripcion">{comercio.descripcion}</p>

                <a
                  href={comercio.enlaceMapa || `https://www.google.com/maps/?q=${comercio.lat},${comercio.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="comercio-maps-btn"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" fill="none" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Ver Ubicación
                </a>

                <button
                  className="comercio-pill-btn"
                  onClick={() => handleContacto(comercio)}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" fill="none" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Contactar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-dots-comercios">
        {Array.from({ length: Math.ceil(items.length / itemsPerSlide) }).map((_, index) => (
          <button
            key={index}
            className={`dot-comercios ${index === Math.floor(currentIndex / itemsPerSlide) ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index * itemsPerSlide)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ComerciosCarousel;

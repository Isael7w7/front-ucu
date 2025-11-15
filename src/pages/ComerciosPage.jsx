import React, { useState } from 'react';
import '../styles/Comercios.css';

const ComerciosPage = () => {
  const [comercios] = useState([
    {
      id: 1,
      nombre: 'Panadería El Sabor',
      descripcion: 'Pan fresco y productos de panadería diariamente',
      lat: 21.032100,
      lng: -89.746200,
      categoria: 'alimentacion'
    },
    {
      id: 2,
      nombre: 'Ferretería Juan',
      descripcion: 'Materiales de construcción y herramientas de calidad',
      lat: 21.032500,
      lng: -89.745800,
      categoria: 'tienda'
    },
    {
      id: 3,
      nombre: 'Salón de Belleza Miriam',
      descripcion: 'Cortes, peinados y tratamientos capilares profesionales',
      lat: 21.031800,
      lng: -89.746500,
      categoria: 'servicios'
    },
    {
      id: 4,
      nombre: 'Tienda de Ropa Moda Joven',
      descripcion: 'Ropa y accesorios para jóvenes con estilo',
      lat: 21.031500,
      lng: -89.746000,
      categoria: 'tienda'
    },
    {
      id: 5,
      nombre: 'Comedor Casero',
      descripcion: 'Comida casera y tradicional todos los días',
      lat: 21.032200,
      lng: -89.745900,
      categoria: 'alimentacion'
    },
    {
      id: 6,
      nombre: 'Taller de Carpintería',
      descripcion: 'Muebles y trabajos de carpintería personalizados',
      lat: 21.031900,
      lng: -89.746300,
      categoria: 'produccion'
    }
  ]);

  const getCategoryColor = (categoria) => {
    const colors = {
      tienda: '#FF6B6B',
      servicios: '#4ECDC4',
      alimentacion: '#FFE66D',
      produccion: '#95E1D3'
    };
    return colors[categoria] || '#8B2E47';
  };

  const getGoogleMapsUrl = (lat, lng) => {
    return `https://www.google.com/maps?q=${lat},${lng}&z=16`;
  };

  return (
    <div className="comercios-page">
      <div className="comercios-container">
        <h1>Catálogo de Comercios</h1>
        <p className="subtitle">Descubre los negocios locales de tu comunidad</p>

        <div className="comercios-grid">
          {comercios.map(comercio => (
            <div key={comercio.id} className="comercio-pill">
              <div className="comercio-pill-header">
                <h3>{comercio.nombre}</h3>
              </div>

              <p className="comercio-categoria" style={{ backgroundColor: getCategoryColor(comercio.categoria) }}>
                {comercio.categoria.charAt(0).toUpperCase() + comercio.categoria.slice(1)}
              </p>

              <p className="comercio-pill-descripcion">{comercio.descripcion}</p>

              <a 
                href={getGoogleMapsUrl(comercio.lat, comercio.lng)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="comercio-btn comercio-maps-btn"
              >
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Ver Ubicación
              </a>

              <button className="comercio-btn comercio-pill-btn">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Contactar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComerciosPage;

import React, { useState } from 'react';
import '../styles/Comercios.css';

const ComerciosPage = () => {
  const [comercios] = useState([
    {
      id: 1,
      nombre: 'Panadería El Sabor',
      categoria: 'alimentos',
      ubicacion: 'Calle Principal #123',
      telefono: '555-0101',
      horario: '06:00 - 20:00',
      descripcion: 'Pan fresco y productos de panadería',
      rating: 4.8
    },
    {
      id: 2,
      nombre: 'Ferretería Juan',
      categoria: 'ferreteria',
      ubicacion: 'Av. Secundaria #456',
      telefono: '555-0102',
      horario: '08:00 - 18:00',
      descripcion: 'Materiales de construcción y herramientas',
      rating: 4.5
    },
    {
      id: 3,
      nombre: 'Salón de Belleza Miriam',
      categoria: 'servicios',
      ubicacion: 'Calle Tercera #789',
      telefono: '555-0103',
      horario: '09:00 - 19:00',
      descripcion: 'Cortes, peinados y tratamientos capilares',
      rating: 4.7
    },
    {
      id: 4,
      nombre: 'Tienda de Ropa Moda Joven',
      categoria: 'ropa',
      ubicacion: 'Centro Comercial Local',
      telefono: '555-0104',
      horario: '10:00 - 20:00',
      descripcion: 'Ropa y accesorios para jóvenes',
      rating: 4.3
    },
    {
      id: 5,
      nombre: 'Comedor Casero',
      categoria: 'alimentos',
      ubicacion: 'Calle 4ta #200',
      telefono: '555-0105',
      horario: '11:00 - 21:00',
      descripcion: 'Comida casera y tradicional',
      rating: 4.6
    },
    {
      id: 6,
      nombre: 'Farmacia Central',
      categoria: 'servicios',
      ubicacion: 'Centro #300',
      telefono: '555-0106',
      horario: '07:00 - 22:00',
      descripcion: 'Farmacia y productos de salud',
      rating: 4.4
    }
  ]);

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
                <span className="rating">⭐ {comercio.rating}</span>
              </div>

              <p className="comercio-categoria">{comercio.categoria}</p>

              <div className="comercio-pill-info">
                <p><strong>📍</strong> {comercio.ubicacion}</p>
                <p><strong>📞</strong> {comercio.telefono}</p>
                <p><strong>🕐</strong> {comercio.horario}</p>
              </div>

              <p className="comercio-pill-descripcion">{comercio.descripcion}</p>

              <button className="comercio-pill-btn">Contactar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComerciosPage;

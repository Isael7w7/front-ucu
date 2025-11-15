import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/ComerciosMapView.css';

// Colores para las categorías
const categoryColors = {
  'Alimentos y Bebidas': '#FF6B6B',
  'Educación y Cultura': '#4ECDC4',
  'Deportes y Recreación': '#45B7D1',
  'Automotriz': '#F7B731',
  'Salud y Bienestar': '#5F27CD',
  'Servicios': '#00D2D3',
  'Tecnología': '#341F97',
  'Moda y Belleza': '#EE5A6F'
};

// Función para crear iconos personalizados por categoría
const createCustomIcon = (categoria) => {
  const color = categoryColors[categoria] || '#8B2E47';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(45deg);
          color: white;
          font-weight: bold;
          font-size: 12px;
        ">📍</div>
      </div>
    `,
    iconSize: [24, 32],
    iconAnchor: [12, 32],
    popupAnchor: [0, -32]
  });
};

// Componente para ajustar el mapa cuando cambian los filtros
function MapUpdater({ comercios }) {
  const map = useMap();
  
  useEffect(() => {
    if (comercios.length > 0) {
      const bounds = comercios.map(c => [c.lat, c.lng]);
      if (bounds.length === 1) {
        map.setView(bounds[0], 16);
      } else {
        map.fitBounds(bounds, { 
          padding: [30, 30],
          maxZoom: 17
        });
      }
    }
  }, [comercios, map]);
  
  return null;
}

const ComerciosMapView = ({ comercios }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredComercios, setFilteredComercios] = useState(comercios);

  const ucuCenter = [21.032100, -89.746200];
  
  // Límites del perímetro de Ucú
  const ucuBounds = [
    [21.0250, -89.7550], // Suroeste
    [21.0400, -89.7350]  // Noreste
  ];

  // Obtener categorías únicas
  const categories = [...new Set(comercios.map(c => c.categoria))].sort();

  // Filtrar comercios
  useEffect(() => {
    let filtered = comercios;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (selectedCategory) {
      filtered = filtered.filter(c => c.categoria === selectedCategory);
    }

    setFilteredComercios(filtered);
  }, [searchTerm, selectedCategory, comercios]);

  // Mapear categorías del backend a las de la UI
  const getCategoryColor = (categoria) => {
    const mapeo = {
      'alimentacion': 'Alimentos y Bebidas',
      'tienda': 'Servicios',
      'servicios': 'Servicios',
      'produccion': 'Automotriz'
    };
    const categoriaMapeada = mapeo[categoria.toLowerCase()] || categoria;
    return categoryColors[categoriaMapeada] || '#8B2E47';
  };

  const handleWhatsApp = (comercio) => {
    if (comercio.enlaceContacto) {
      window.open(comercio.enlaceContacto, '_blank');
    } else {
      alert(`No hay información de contacto para ${comercio.nombre}`);
    }
  };

  return (
    <div className="comercios-map-view">
      {/* Barra de búsqueda y filtros */}
      <div className="map-controls">
        <div className="search-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Buscar comercio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
              title="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="results-count">
          {filteredComercios.length} comercio{filteredComercios.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Leyenda de colores */}
      <div className="map-legend">
        <h4>Categorías</h4>
        <div className="legend-items">
          {categories.map(cat => (
            <button
              key={cat}
              className={`legend-item ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
              title={`Filtrar por ${cat}`}
            >
              <span 
                className="legend-color" 
                style={{ backgroundColor: getCategoryColor(cat) }}
              ></span>
              <span className="legend-label">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mapa */}
      <div className="map-container-full">
        <MapContainer
          center={ucuCenter}
          zoom={15}
          minZoom={15}
          maxZoom={18}
          style={{ width: '100%', height: '100%' }}
          scrollWheelZoom={true}
          maxBounds={ucuBounds}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapUpdater comercios={filteredComercios} />

          {filteredComercios.map((comercio) => (
            <Marker
              key={comercio.id}
              position={[comercio.lat, comercio.lng]}
              icon={createCustomIcon(comercio.categoria)}
            >
              <Popup className="comercio-popup">
                <div className="popup-content">
                  <h3>{comercio.nombre}</h3>
                  <span 
                    className="popup-category" 
                    style={{ backgroundColor: getCategoryColor(comercio.categoria) }}
                  >
                    {comercio.categoria}
                  </span>
                  <p className="popup-description">{comercio.descripcion}</p>
                  <div className="popup-actions">
                    <a
                      href={comercio.enlaceMapa || `https://www.google.com/maps?q=${comercio.lat},${comercio.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="popup-btn popup-btn-maps"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      Ver Ubicación
                    </a>
                    <button
                      onClick={() => handleWhatsApp(comercio)}
                      className="popup-btn popup-btn-contact"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      Contactar
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ComerciosMapView;

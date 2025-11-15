import React, { useState, useEffect } from 'react';
import ComerciosCarousel from '../components/ComerciosCarousel';
import '../styles/Comercios.css';

const ComerciosPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [comercios, setComercios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch comercios del backend
  useEffect(() => {
    const fetchComercios = async () => {
      try {
        setLoading(true);
        console.log('Iniciando fetch de comercios...');
        const response = await fetch('https://ucudigital.onrender.com/api/comercios');
        
        console.log('Respuesta status:', response.status, 'ok:', response.ok);
        
        if (!response.ok) {
          throw new Error(`Error en la API: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Datos recibidos del backend:', data);
        
        // Mapear los datos del backend a la estructura local
        const comerciosMapeados = data.comercios.map(comercio => ({
          id: comercio.ComercioID,
          nombre: comercio.Nombre,
          descripcion: comercio.Descripcion,
          categoria: mapearCategoria(comercio.Categoria),
          enlaceMapa: comercio.Link !== 'NULL' ? comercio.Link : null, // Link = enlace del mapa
          enlaceContacto: comercio.LinkFacebook, // LinkFacebook = enlace de contacto
          // Coordenadas por defecto (ya que el backend no las proporciona)
          lat: 21.032100,
          lng: -89.746200
        }));
        
        console.log('Comercios mapeados:', comerciosMapeados);
        setComercios(comerciosMapeados);
        setError(null);
      } catch (err) {
        console.error('Error fetching comercios:', err);
        console.log('Respuesta de error:', err);
        setError('No se pudo cargar los comercios. Intenta más tarde.');
        // Fallback a datos vacíos
        setComercios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComercios();
  }, []);

  // Función para mapear categorías del backend a nuestras categorías
  const mapearCategoria = (categoriaBackend) => {
    const mapeo = {
      'Alimentos y Bebidas': 'alimentacion',
      'Educación y Cultura': 'tienda',
      'Deportes y Recreación': 'servicios',
      'Automotriz': 'produccion'
    };
    return mapeo[categoriaBackend] || 'tienda';
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCategoryColor = (categoria) => {
    const colors = {
      tienda: '#D4A574',
      servicios: '#F5DEB3',
      alimentacion: '#C89060',
      produccion: '#E8C9A0'
    };
    return colors[categoria] || '#8B2E47';
  };

  const getGoogleMapsUrl = (lat, lng) => {
    return `https://www.google.com/maps?q=${lat},${lng}&z=16`;
  };

  const handleContactoWhatsApp = (comercio) => {
    // Abre el enlace de contacto (Facebook) del comercio
    if (comercio.enlaceContacto) {
      window.open(comercio.enlaceContacto, '_blank');
    } else {
      // Si no tiene contacto, muestra mensaje
      alert(`No hay información de contacto disponible para ${comercio.nombre}`);
    }
  };

  if (loading) {
    return (
      <div className="comercios-page">
        <div className="comercios-container">
          <h1>Catálogo de Comercios</h1>
          <p className="subtitle">Cargando comercios...</p>
          <div className="loading-spinner">Cargando</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="comercios-page">
        <div className="comercios-container">
          <h1>Catálogo de Comercios</h1>
          <p className="subtitle error-message">{error}</p>
        </div>
      </div>
    );
  }

  if (comercios.length === 0) {
    return (
      <div className="comercios-page">
        <div className="comercios-container">
          <h1>Catálogo de Comercios</h1>
          <p className="subtitle">No hay comercios disponibles en este momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="comercios-page">
      <div className="comercios-container">
        <h1>Catálogo de Comercios</h1>
        <p className="subtitle">Descubre los negocios locales de tu comunidad</p>

        {isMobile ? (
          <ComerciosCarousel items={comercios} />
        ) : (
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
                  href={comercio.enlaceMapa || getGoogleMapsUrl(comercio.lat, comercio.lng)} 
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

                <button 
                  className="comercio-btn comercio-pill-btn"
                  onClick={() => handleContactoWhatsApp(comercio)}
                >
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Contactar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComerciosPage;

// src/pages/LandingPage.jsx
import React from 'react';
import MapComponent from '../components/MapComponent';

const LandingPage = () => {
  // Coordenadas actualizadas para centrar en Mérida, Yucatán, México.
  // Latitud: 20.967, Longitud: -89.624
  const ucuLocation = [21.031940305999093, -89.74636956802323];
  // Zoom ajustado para mostrar una buena vista del estado o la ciudad central.
  // Un zoom de 9 muestra casi todo el estado. Un zoom de 12 centra bien la ciudad.
  const ucuZoom = 15;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Bienvenido a la Landing Page de UCU Frontend</h1>
      <p>Explora nuestras ubicaciones principales en el mapa interactivo de Yucatán.</p>

      <section style={{ margin: '40px 0' }}>
        <h2>Nuestra Ubicación en Yucatán</h2>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <MapComponent
            // Usa las nuevas coordenadas y zoom
            center={ucuLocation}
            zoom={ucuZoom}
            markerPosition={ucuLocation}
            popupText="¡Estamos en Yucatán!"
          />
        </div>
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>Más Información</h2>
        <p>Aquí irá el resto del contenido de tu landing page.</p>
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Contáctanos
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
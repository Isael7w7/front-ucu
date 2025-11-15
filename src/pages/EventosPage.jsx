import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import '../styles/Eventos.css';

const EventosPage = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);
        console.log('Iniciando fetch de eventos');
        const response = await fetch('https://ucudigital.onrender.com/api/obtenerEventos');
        console.log('Respuesta status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos recibidos del backend:', data);
        
        if (data.eventos && Array.isArray(data.eventos)) {
          setEventos(data.eventos);
          console.log('Eventos cargados exitosamente:', data.eventos.length);
        } else {
          throw new Error('Estructura de datos inválida');
        }
      } catch (err) {
        console.error('Error al obtener eventos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  if (loading) {
    return (
      <div className="eventos-page">
        <div className="eventos-container">
          <h1>Eventos de la Comunidad</h1>
          <p className="loading-message">Cargando eventos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="eventos-page">
        <div className="eventos-container">
          <h1>Eventos de la Comunidad</h1>
          <p className="error-message">Error al cargar eventos: {error}</p>
        </div>
      </div>
    );
  }

  if (eventos.length === 0) {
    return (
      <div className="eventos-page">
        <div className="eventos-container">
          <h1>Eventos de la Comunidad</h1>
          <p className="empty-message">No hay eventos disponibles en este momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="eventos-page">
      <div className="eventos-container">
        <h1>Eventos de la Comunidad</h1>
        <p className="subtitle">Participa en los eventos próximos de tu comunidad</p>

        <Carousel items={eventos} />
      </div>
    </div>
  );
};

export default EventosPage;

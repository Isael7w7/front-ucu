import React, { useState } from 'react';
import Carousel from '../components/Carousel';
import '../styles/Eventos.css';

const EventosPage = () => {
  const [eventos] = useState([
    {
      id: 1,
      titulo: 'Limpieza Comunitaria',
      cuerpo: 'Jornada de limpieza y embellecimiento del parque central. Aportamos a mantener nuestra comunidad limpia y ordenada.',
      fecha: '2025-11-20T09:00:00',
      lat: 21.032000,
      lng: -89.746400,
      imagen_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjX1I7yVUmYZ_FoCXjszlxbu3hT9SrEqrkdg&s'
    },
    {
      id: 2,
      titulo: 'Reunión de Junta Directiva',
      cuerpo: 'Discusión de asuntos importantes de la comunidad. Se tratarán temas relevantes sobre el desarrollo y bienestar de la zona.',
      fecha: '2025-11-22T18:00:00',
      lat: 21.031800,
      lng: -89.746100,
      imagen_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjX1I7yVUmYZ_FoCXjszlxbu3hT9SrEqrkdg&s'
    },
    {
      id: 3,
      titulo: 'Taller de Emprendimiento',
      cuerpo: 'Aprende a emprender tu propio negocio con expertos en el área. Descubre estrategias para iniciar y desarrollar tu empresa.',
      fecha: '2025-11-25T10:00:00',
      lat: 21.032300,
      lng: -89.745900,
      imagen_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjX1I7yVUmYZ_FoCXjszlxbu3hT9SrEqrkdg&s'
    }
  ]);

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

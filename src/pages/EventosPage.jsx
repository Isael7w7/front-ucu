import React, { useState } from 'react';
import Carousel from '../components/Carousel';
import '../styles/Eventos.css';

const EventosPage = () => {
  const [eventos] = useState([
    {
      id: 1,
      titulo: 'Limpieza Comunitaria',
      fecha: '2025-11-20',
      hora: '09:00',
      ubicacion: 'Parque Central',
      descripcion: 'Jornada de limpieza y embellecimiento del parque',
      categoria: 'limpieza',
      asistentes: 24
    },
    {
      id: 2,
      titulo: 'Reunión de Junta Directiva',
      fecha: '2025-11-22',
      hora: '18:00',
      ubicacion: 'Casa Comunal',
      descripcion: 'Discusión de asuntos importantes de la comunidad',
      categoria: 'reunion',
      asistentes: 12
    },
    {
      id: 3,
      titulo: 'Taller de Emprendimiento',
      fecha: '2025-11-25',
      hora: '10:00',
      ubicacion: 'Centro Comunitario',
      descripcion: 'Aprende a emprender tu propio negocio con expertos',
      categoria: 'taller',
      asistentes: 45
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

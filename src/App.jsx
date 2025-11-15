// src/App.jsx
import React, { useRef } from 'react';
import MainLayout from './layouts/MainLayout';
import EventosPage from './pages/EventosPage';
import ComerciosPage from './pages/ComerciosPage';
import ReportarPage from './pages/ReportarPage';
import './App.css';

function App() {
  const eventosRef = useRef(null);
  const comerciosRef = useRef(null);
  const reportarRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MainLayout
      onReportar={() => scrollToSection(reportarRef)}
      onEventos={() => scrollToSection(eventosRef)}
      onComercios={() => scrollToSection(comerciosRef)}
    >
      {/* Sección de Descripción General */}
      <section className="description-section">
        <div className="description-container">
          <h2>Bienvenido a tu Comunidad Digital</h2>
          <p>Descubre todas las oportunidades que tu comunidad tiene para ofrecerte. Desde eventos que fortalecen nuestros lazos, comercios locales que impulsan nuestra economía, hasta canales para reportar y mejorar nuestro entorno. Aquí encontrarás todo lo que necesitas para ser parte activa del desarrollo y bienestar de nuestra comunidad.</p>
        </div>
      </section>

      <section ref={eventosRef} className="page-section" id="eventos">
        <EventosPage />
      </section>
      
      <section ref={comerciosRef} className="page-section" id="comercios">
        <ComerciosPage />
      </section>
      
      <section ref={reportarRef} className="page-section" id="reportar">
        <ReportarPage />
      </section>
    </MainLayout>
  );
}

export default App;
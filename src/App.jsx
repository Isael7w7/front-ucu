// src/App.jsx
import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
    <div className="app-container">
      <Navbar 
        onReportar={() => scrollToSection(reportarRef)}
        onEventos={() => scrollToSection(eventosRef)}
        onComercios={() => scrollToSection(comerciosRef)}
      />
      
      <section ref={eventosRef} className="page-section" id="eventos">
        <EventosPage />
      </section>
      
      <section ref={comerciosRef} className="page-section" id="comercios">
        <ComerciosPage />
      </section>
      
      <section ref={reportarRef} className="page-section" id="reportar">
        <ReportarPage />
      </section>

      <Footer />
    </div>
  );
}

export default App;
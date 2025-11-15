// src/App.jsx
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import EventosPage from './pages/EventosPage';
import ComerciosPage from './pages/ComerciosPage';
import ReportarPage from './pages/ReportarPage';
import LoginPage from './components/Login.jsx'; // 👈 RUTA CORREGIDA: ahora busca en 'components'
import Dashboard from './pages/Dashboard';
import './App.css';

// -------------------------------------------------------------------------
// COMPONENTE CONTENEDOR DE LA PÁGINA PRINCIPAL (Scroll Content)
// -------------------------------------------------------------------------

const HomePageContent = ({ eventosRef, comerciosRef, reportarRef }) => {
  return (
    <>
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
    </>
  );
};

// -------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (Rutas y Lógica de Navegación)
// -------------------------------------------------------------------------

function App() {

  const MainApp = () => {
    const navigate = useNavigate();

    // Referencias para la navegación por scroll
    const eventosRef = useRef(null);
    const comerciosRef = useRef(null);
    const reportarRef = useRef(null);

    // Función de scroll
    const scrollToSection = (ref) => {
      if (window.location.pathname !== '/') {
        navigate('/');
        console.log("Navegando a la Home para hacer scroll. Click de nuevo.");
      }

      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

    // 💡 FUNCIÓN CLAVE: Redirige al componente Login.jsx
    const handleLoginRedirect = () => {
      navigate('/login');
    };

    return (
      <MainLayout
        onReportar={() => scrollToSection(reportarRef)}
        onEventos={() => scrollToSection(eventosRef)}
        onComercios={() => scrollToSection(comerciosRef)}
        onLogin={handleLoginRedirect}
      >
        <Routes>
          {/* RUTA PRINCIPAL: Contenido de scroll */}
          <Route
            path="/"
            element={
              <HomePageContent
                eventosRef={eventosRef}
                comerciosRef={comerciosRef}
                reportarRef={reportarRef}
              />
            }
          />

          {/* RUTA DE LOGIN: Componente Login.jsx */}
          <Route path="/login" element={<LoginPage />} />

          {/* RUTA DASHBOARD: Página mostrada tras login */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Opcional: Ruta para manejar URLs desconocidas */}
          <Route path="*" element={<h1>404 | Página no encontrada</h1>} />

        </Routes>
      </MainLayout>
    );
  };

  // El componente principal envuelve todo con el Router
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
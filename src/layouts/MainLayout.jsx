// src/layouts/MainLayout.jsx

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // Asegúrate de tener este componente
import '../styles/MainLayout.css';

// Importamos el CSS del Layout si lo tienes, sino debes crearlo
// import '../styles/MainLayout.css'; 

const MainLayout = ({ children, onReportar, onEventos, onComercios, onLogin, onHome }) => {
  return (
    <div className="app-container"> {/* Contenedor flex para Sticky Footer */}
      <Navbar
        onReportar={onReportar}
        onEventos={onEventos}
        onComercios={onComercios}
        onLogin={onLogin}
        onHome={onHome}
      />

      <main className="main-content"> {/* Contenido principal */}
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
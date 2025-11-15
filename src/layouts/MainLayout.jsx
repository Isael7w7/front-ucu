import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children, onReportar, onEventos, onComercios }) => {
  return (
    <div className="app-container">
      <Navbar 
        onReportar={onReportar}
        onEventos={onEventos}
        onComercios={onComercios}
      />
      
      {children}

      <Footer />
    </div>
  );
};

export default MainLayout;

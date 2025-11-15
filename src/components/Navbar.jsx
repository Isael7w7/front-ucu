import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ 
  onReportar, 
  onEventos, 
  onComercios,
  logoText = 'XuxCu',
  logoYear = 'Cuidadana, Empleos y Comercio',
  logoSrc = '/Logo XuxCu.svg'
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = (callback) => {
    callback();
    setMenuOpen(false);
  };

  const menuItems = [
    { label: 'Reportar', onClick: onReportar },
    { label: 'Eventos', onClick: onEventos },
    { label: 'Comercios', onClick: onComercios }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo y Nombre (Izquierda) */}
        <div className="navbar-logo">
          <img src={logoSrc} alt="Logo" className="logo-image" />
          <div className="logo-text-container">
            <span className="logo-text">{logoText}</span>
            <span className="logo-year">{logoYear}</span>
          </div>
        </div>

        {/* Hamburger Menu */}
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu Central */}
        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          {menuItems.map((item, index) => (
            <button 
              key={index}
              className="nav-link"
              onClick={() => handleClick(item.onClick)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Social Links */}
        <div className="navbar-actions">
          <a href="#" className="social-link">f</a>
          <a href="#" className="social-link">📷</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

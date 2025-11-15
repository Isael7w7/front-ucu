import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = ({
  onReportar,
  onEventos,
  onComercios,
  onLogin = () => { }, // agregado: callback para inicio de sesión
  logoText = 'XuxCú',
  logoYear = 'Cuidadana, Eventos y Comercio',
  logoSrc = '/Logo XuxCu.svg',
  onHome = () => { } // callback para ir a home
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
    { label: 'Eventos', onClick: onEventos },
    { label: 'Comercios', onClick: onComercios },
    { label: 'Reportes', onClick: onReportar },

  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo y Nombre (Izquierda) */}
        <button 
          className="navbar-logo"
          onClick={() => handleClick(onHome)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          title="Ir a la página principal"
        >
          <img src={logoSrc} alt="Logo" className="logo-image" />
          <div className="logo-text-container">
            <span className="logo-text">
              X<span className="logo-white">u</span>x<span className="logo-white">C</span><span className="logo-white">ú</span>
            </span>
            <span className="logo-year">{logoYear}</span>
          </div>
        </button>

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
          <a href="#" className="social-link" title="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a href="#" className="social-link" title="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
            </svg>
          </a>

          {/* Botón de Inicio de sesión agregado */}
          <button
            className="login-button"
            onClick={() => handleClick(onLogin)}
            title="Iniciar sesión"
          >
            Inicio de sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

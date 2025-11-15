import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo y descripción */}
          <div className="footer-section">
            <img src="/Logo XuxCu.svg" alt="Logo UCÚ" className="footer-logo" />
            <div className="footer-info">
              <h3 className="footer-title">XuxCu</h3>
              <p className="footer-tagline">Cuidadana, Empleos y Comercio</p>
            </div>
          </div>

          {/* Enlaces */}
          <div className="footer-section">
            <h4>Navegación</h4>
            <ul>
              <li><a href="#eventos">Eventos</a></li>
              <li><a href="#comercios">Comercios</a></li>
              <li><a href="#reportar">Reportar</a></li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-links">
              <a href="#" className="social-icon">f</a>
              <a href="#" className="social-icon">📷</a>
            </div>
          </div>

          {/* Contacto */}
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>📞 Teléfono: +52 (ejemplo)</p>
            <p>📧 Email: info@ucu.gob.mx</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} H. Ayuntamiento de UCÚ. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

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
              <a href="#" className="social-icon" title="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="social-icon" title="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div className="footer-section">
            <h4>Contacto</h4>
            <div className="contact-info">
              <div className="contact-item">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+52 (ejemplo)</span>
              </div>
              <div className="contact-item">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>info@ucu.gob.mx</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} H. Ayuntamiento de UCÚ. Todos los derechos reservados.</p>
          <div className="footer-credit">
            <span>Creado por</span>
            <img src="/kancode-logo.png" alt="KanCode" className="kancode-logo" />
            <span>KanCode</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

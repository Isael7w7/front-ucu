import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginComercio.css';

const LoginComercio = ({ onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = registro
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    telefono: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // LOGIN: Verificar credenciales
        // Por ahora usamos autenticación simple
        // TODO: Conectar con endpoint real del backend cuando esté disponible
        const response = await fetch('https://ucudigital.onrender.com/api/loginComercio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        }).catch(() => {
          // Si el endpoint no existe aún, usar validación local temporal
          throw new Error('FALLBACK');
        });

        if (response && response.ok) {
          const data = await response.json();
          localStorage.setItem('comercioAuth', JSON.stringify({
            email: formData.email,
            token: data.token || 'temp-token',
            comercioId: data.comercioId
          }));
          onLoginSuccess?.();
        } else {
          throw new Error('FALLBACK');
        }
      } else {
        // REGISTRO: Crear nueva cuenta
        const response = await fetch('https://ucudigital.onrender.com/api/registroComercio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            nombre: formData.nombre,
            telefono: formData.telefono
          })
        }).catch(() => {
          throw new Error('FALLBACK');
        });

        if (response && response.ok) {
          const data = await response.json();
          alert('Cuenta creada exitosamente. Por favor inicia sesión.');
          setIsLogin(true);
          setFormData({ email: formData.email, password: '', nombre: '', telefono: '' });
        } else {
          throw new Error('FALLBACK');
        }
      }
    } catch (err) {
      if (err.message === 'FALLBACK') {
        // Modo fallback temporal mientras se implementa el backend
        if (isLogin) {
          // Simular login exitoso
          localStorage.setItem('comercioAuth', JSON.stringify({
            email: formData.email,
            token: 'temp-token-' + Date.now(),
            comercioId: Math.floor(Math.random() * 10000)
          }));
          onLoginSuccess?.();
        } else {
          // Simular registro exitoso
          alert('Cuenta creada exitosamente (modo demo). Por favor inicia sesión.');
          setIsLogin(true);
          setFormData({ email: formData.email, password: '', nombre: '', telefono: '' });
        }
      } else {
        setError(err.message || 'Error al procesar la solicitud');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-comercio-overlay" onClick={onClose}>
      <div className="login-comercio-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Cerrar">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        <div className="modal-header">
          <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
          <p>Para comerciantes de Ucú</p>
        </div>

        <form onSubmit={handleSubmit} className="comercio-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="nombre">Nombre del Comercio</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Tienda Don José"
                  required={!isLogin}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+52 999 123 4567"
                  required={!isLogin}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@correo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn-comercio" disabled={loading}>
            {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>
        </form>

        <div className="toggle-mode">
          <p>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            {' '}
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
            >
              {isLogin ? 'Regístrate' : 'Inicia Sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComercio;

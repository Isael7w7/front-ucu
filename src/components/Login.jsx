// src/components/Login.jsx (o src/pages/Login.jsx)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // agregado: estilos minimalistas para login

const Login = ({ onSubmit } = {}) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Para manejar errores
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const credentials = { usuario, password };

    try {
      if (onSubmit) {
        // Si se pasa un callback (para API), lo ejecuta
        await onSubmit(credentials);
      } else {
        // Comportamiento por defecto (simulado)
        await new Promise((res, rej) => setTimeout(Math.random() > 0.1 ? res : rej, 800)); // 10% de fallo simulado
        console.log('✅ Inicio de sesión simulado exitoso.', credentials);
      }
      navigate('/'); // Redirigir al home al tener éxito
    } catch (err) {
      console.error('❌ Error de login:', err?.message || err);
      setError('Usuario o contraseña incorrectos. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrap">
      <div className="login-card-minimal" role="main" aria-labelledby="login-title">
        <h1 id="login-title" className="login-title">Iniciar sesión</h1>
        <p className="login-sub">Accede con tu usuario y contraseña</p>

        <form className="login-form-minimal" onSubmit={handleSubmit} autoComplete="on">
          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              id="usuario"
              name="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              placeholder="tu.usuario"
              className="input-minimal"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="input-minimal"
            />
          </div>

          {error && <p className="login-error-message" role="alert">{error}</p>}

          <div className="actions-row">
            <button
              type="button"
              className="back-btn-login"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Volver
            </button>

            <button
              type="submit"
              className="submit-btn-login"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Iniciar sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
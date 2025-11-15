import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/PublicarComercio.css';
import MapComponent from './MapComponent';

const PublicarEvento = ({ onClose }) => {
  const getLocalDatetimeInput = () => {
    const d = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
    return d.toISOString().slice(0, 16);
  };

  const [formData, setFormData] = useState({
    titulo: '',
    cuerpo: '',
    fecha: getLocalDatetimeInput(),
    latitud: -34.901112,
    longitud: -56.164531
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCoordinatesSaved = (lat, lng) => {
    setFormData(prev => ({ ...prev, latitud: lat, longitud: lng }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Construir payload exactamente con los campos que el backend espera
    const payload = {
      Titulo: formData.titulo,
      Cuerpo: formData.cuerpo,
      Fecha: new Date(formData.fecha).toISOString(),
      Lat: Number(parseFloat(formData.latitud).toFixed(6)),
      Lng: Number(parseFloat(formData.longitud).toFixed(6))
    };

    console.log('📤 Enviando evento:', payload);

    try {
      const token = JSON.parse(localStorage.getItem('comercioAuth') || '{}').token;

      const res = await fetch('https://ucudigital.onrender.com/api/crearEvento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const json = await res.json();
      console.log('✅ Evento creado:', json);

      toast.success('Evento creado correctamente.', { position: 'top-right', autoClose: 4000 });

      // limpiar formulario (mantener lat/lng o resetear según prefieras)
      setFormData({
        titulo: '',
        cuerpo: '',
        fecha: getLocalDatetimeInput(),
        latitud: formData.latitud,
        longitud: formData.longitud
      });

      setTimeout(() => { if (onClose) onClose(); }, 1500);

    } catch (err) {
      console.error('❌ Error creando evento:', err);
      toast.error('Error creando el evento. Revisa la consola.', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="publicar-comercio-overlay" onClick={onClose}>
      <ToastContainer />
      <div className="publicar-comercio-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Cerrar">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        <div className="modal-header">
          <h2>Publicar Evento</h2>
          <p>Completa los datos del evento</p>
        </div>

        <form onSubmit={handleSubmit} className="publicar-form">
          <div className="form-group">
            <label htmlFor="titulo">Título *</label>
            <input id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Ej: Concierto en la Plaza" required />
          </div>

          <div className="form-group">
            <label htmlFor="cuerpo">Descripción *</label>
            <textarea id="cuerpo" name="cuerpo" value={formData.cuerpo} onChange={handleChange} rows="4" required />
          </div>

          <div className="form-group">
            <label htmlFor="fecha">Fecha y hora *</label>
            <input type="datetime-local" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Ubicación *</label>
            <div className="map-container-small">
              <MapComponent
                center={[formData.latitud, formData.longitud]}
                zoom={15}
                markerPosition={[formData.latitud, formData.longitud]}
                popupText="Ubicación del evento"
                onCoordinatesSaved={handleCoordinatesSaved}
              />
            </div>
            <div className="coordenadas-mini">
              <span>Lat: {Number(formData.latitud).toFixed(6)}</span>
              <span>Lng: {Number(formData.longitud).toFixed(6)}</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-publicar" disabled={loading}>{loading ? 'Enviando...' : 'Crear Evento'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicarEvento;

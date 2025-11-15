import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/PublicarComercio.css';
import MapComponent from './MapComponent';

const PublicarComercio = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'Alimentos y Bebidas',
    telefono: '',
    email: '',
    facebook: '',
    direccion: '',
    latitud: 21.032100,
    longitud: -89.746200
  });
  const [loading, setLoading] = useState(false);

  // Verificar autenticación
  useEffect(() => {
    const auth = localStorage.getItem('comercioAuth');
    if (auth) {
      const { email } = JSON.parse(auth);
      setFormData(prev => ({ ...prev, email }));
    }
  }, []);

  const categorias = [
    'Alimentos y Bebidas',
    'Educación y Cultura',
    'Deportes y Recreación',
    'Automotriz',
    'Salud y Bienestar',
    'Servicios',
    'Tecnología',
    'Moda y Belleza'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCoordinatesSaved = (lat, lng) => {
    setFormData(prev => ({
      ...prev,
      latitud: lat,
      longitud: lng
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const comercioData = {
      comercio: {
        Nombre: formData.nombre,
        Descripcion: formData.descripcion,
        Categoria: formData.categoria,
        Link: `https://www.google.com/maps?q=${formData.latitud},${formData.longitud}`,
        LinkFacebook: formData.facebook,
        Telefono: formData.telefono,
        Email: formData.email,
        Direccion: formData.direccion,
        Latitud: formData.latitud,
        Longitud: formData.longitud
      }
    };

    console.log('📤 Enviando comercio:', comercioData);

    try {
      const response = await fetch('https://ucudigital.onrender.com/api/crearComercio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Si el backend requiere autenticación
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('comercioAuth') || '{}').token}`
        },
        body: JSON.stringify(comercioData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Comercio publicado:', result);

      toast.success('¡Comercio publicado exitosamente! Será revisado por el equipo.', {
        position: "top-right",
        autoClose: 5000
      });

      // Limpiar formulario
      setFormData({
        nombre: '',
        descripcion: '',
        categoria: 'Alimentos y Bebidas',
        telefono: '',
        email: formData.email, // Mantener email
        facebook: '',
        direccion: '',
        latitud: 21.032100,
        longitud: -89.746200
      });

      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('❌ Error:', error);
      toast.error('Error al publicar el comercio. Intenta nuevamente.', {
        position: "top-right"
      });
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
          <h2>Publicar Mi Comercio</h2>
          <p>Completa la información de tu negocio</p>
        </div>

        <form onSubmit={handleSubmit} className="publicar-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre del Comercio *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Restaurante La Palapa"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoria">Categoría *</label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción *</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe tu negocio, productos o servicios..."
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telefono">Teléfono *</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+52 999 123 4567"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contacto@micomercio.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="facebook">Facebook (opcional)</label>
            <input
              type="url"
              id="facebook"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/micomercio"
            />
          </div>

          <div className="form-group">
            <label htmlFor="direccion">Dirección *</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              placeholder="Calle, número, colonia"
              required
            />
          </div>

          <div className="form-group">
            <label>Ubicación en el Mapa *</label>
            <div className="map-container-small">
              <MapComponent
                center={[formData.latitud, formData.longitud]}
                zoom={15}
                markerPosition={[formData.latitud, formData.longitud]}
                popupText="Ubicación de tu comercio"
                onCoordinatesSaved={handleCoordinatesSaved}
              />
            </div>
            <p className="map-help">Haz clic en el mapa para seleccionar la ubicación exacta</p>
            <div className="coordenadas-mini">
              <span>Lat: {formData.latitud.toFixed(6)}</span>
              <span>Lng: {formData.longitud.toFixed(6)}</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-publicar" disabled={loading}>
              {loading ? 'Publicando...' : 'Publicar Comercio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicarComercio;

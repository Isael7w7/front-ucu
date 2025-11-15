import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import '../styles/Reportar.css';

const ReportarPage = () => {
  const ucuLocation = [21.031940305999093, -89.74636956802323];
  const ucuZoom = 15;

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    tipo: 'Inundaciones',
    descripcion: '',
    latitud: ucuLocation[0],
    longitud: ucuLocation[1]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMapClick = (lat, lng) => {
    setFormData(prev => ({
      ...prev,
      latitud: lat,
      longitud: lng
    }));
  };

  const handleCoordinatesSaved = (lat, lng) => {
    // Actualizar las coordenadas cuando se guardan (doble click)
    setFormData(prev => ({
      ...prev,
      latitud: lat,
      longitud: lng
    }));
    console.log(`✅ Coordenadas actualizadas en el formulario: [${lat.toFixed(6)}, ${lng.toFixed(6)}]`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reporteData = {
      reporte: {
        '@Nombre': formData.nombre,
        '@Apellido': formData.apellido,
        '@Tipo': formData.tipo,
        '@Descripcion': formData.descripcion,
        '@Latitud': formData.latitud,
        '@Longitud': formData.longitud
      }
    };
    console.log('Reporte enviado:', JSON.stringify(reporteData, null, 2));
    alert('¡Reporte enviado exitosamente!');
    setFormData({
      nombre: '',
      apellido: '',
      tipo: 'Inundaciones',
      descripcion: '',
      latitud: ucuLocation[0],
      longitud: ucuLocation[1]
    });
  };

  return (
    <div className="reportar-page">
      <div className="reportar-container">
        <h1>Reportar un Problema</h1>
        <p className="subtitle">Ayúdanos a mejorar la comunidad reportando problemas</p>

        <div className="reportar-content">
          {/* Formulario */}
          <div className="reportar-form-section">
            <form onSubmit={handleSubmit} className="reportar-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Tu apellido"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="tipo">Tipo de Reporte</label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                >
                  <option value="Inundaciones">Inundaciones</option>
                  <option value="Baches">Baches</option>
                  <option value="Luminarias Dañadas">Luminarias Dañadas</option>
                  <option value="Fugas">Fugas</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Describe el problema con detalles..."
                  rows="5"
                  required
                ></textarea>
              </div>

              {/* <div className="form-group">
                <label>Coordenadas</label>
                <div className="coordenadas-display">
                  <p><strong>Latitud:</strong> {formData.latitud.toFixed(6)}</p>
                  <p><strong>Longitud:</strong> {formData.longitud.toFixed(6)}</p>
                </div>
              </div> */}

              <button type="submit" className="submit-btn">Enviar Reporte</button>
            </form>
          </div>

          {/* Mapa */}
          <div className="reportar-map-section">
            <h3>Selecciona la ubicación en el mapa</h3>
            <MapComponent
              center={[formData.latitud, formData.longitud]}
              zoom={ucuZoom}
              markerPosition={[formData.latitud, formData.longitud]}
              popupText="Ubicación del reporte"
              onMapClick={handleMapClick}
              onCoordinatesSaved={handleCoordinatesSaved}
            />
            <p className="map-info">Haz clic en el mapa para actualizar la ubicación</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportarPage;

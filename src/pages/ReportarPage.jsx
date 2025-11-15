import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import '../styles/Reportar.css';

const ReportarPage = () => {
  const ucuLocation = [21.031940305999093, -89.74636956802323];
  const ucuZoom = 15;

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: 'infraestructura',
    ubicacion: '',
    imagen: null,
    coordenadas: ucuLocation
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      imagen: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reporte enviado:', formData);
    alert('¡Reporte enviado exitosamente!');
    setFormData({
      titulo: '',
      descripcion: '',
      categoria: 'infraestructura',
      ubicacion: '',
      imagen: null,
      coordenadas: ucuLocation
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
              <div className="form-group">
                <label htmlFor="titulo">Título del Reporte</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ej: Bache en la calle Principal"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="categoria">Categoría</label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                >
                  <option value="infraestructura">Infraestructura</option>
                  <option value="seguridad">Seguridad</option>
                  <option value="servicios">Servicios</option>
                  <option value="limpieza">Limpieza</option>
                  <option value="otros">Otros</option>
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

              <div className="form-group">
                <label htmlFor="ubicacion">Ubicación (Texto)</label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  placeholder="Ej: Calle Principal, esquina con Avenida Secundaria"
                />
              </div>

              <div className="form-group">
                <label htmlFor="imagen">Cargar Imagen (Opcional)</label>
                <input
                  type="file"
                  id="imagen"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <button type="submit" className="submit-btn">Enviar Reporte</button>
            </form>
          </div>

          {/* Mapa */}
          <div className="reportar-map-section">
            <h3>Selecciona la ubicación en el mapa</h3>
            <MapComponent
              center={formData.coordenadas}
              zoom={ucuZoom}
              markerPosition={formData.coordenadas}
              popupText="Ubicación del reporte"
            />
            <p className="map-info">Haz clic en el mapa para actualizar la ubicación</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportarPage;

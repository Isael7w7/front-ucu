import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import '../styles/Reportar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReportarPage = () => {
  // 💡 ENDPOINT DEFINIDO
  const API_URL = 'https://ucudigital.onrender.com/api/crearReporte';

  // Coordenadas y zoom iniciales para el mapa
  const ucuLocation = [21.031940305999093, -89.74636956802323];
  const ucuZoom = 15;

  // 💡 ESTADO INICIAL DEL FORMULARIO
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '', // Mapea a 'Numero' en el payload
    direccion: '', // Mapea a 'Direccion' en el payload
    tipo: 'Foco Fundido',
    descripcion: '',
    latitud: ucuLocation[0],
    longitud: ucuLocation[1]
  });

  // Manejador general de cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejador para actualizar coordenadas desde el mapa
  const handleCoordinatesSaved = (lat, lng) => {
    setFormData(prev => ({
      ...prev,
      latitud: lat,
      longitud: lng
    }));
    console.log(`✅ Coordenadas actualizadas en el formulario: [${lat.toFixed(6)}, ${lng.toFixed(6)}]`);
  };

  // 💡 FUNCIÓN PRINCIPAL DE ENVÍO DE DATOS A LA API (POST) CON TOASTIFY
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. CONSTRUCCIÓN DEL PAYLOAD ANIDADO
    const reporteData = {
      reporte: { // <-- Estructura anidada solicitada
        Nombre: formData.nombre,
        Apellido: formData.apellido,
        Tipo: formData.tipo,
        Descripcion: formData.descripcion,
        Latitud: formData.latitud,
        Longitud: formData.longitud,
        Direccion: formData.direccion,
        Numero: formData.telefono // Mapeo de 'telefono' a 'Numero'
      }
    };

    // 2. REQUISITO: MOSTRAR EL PAYLOAD EN CONSOLA ANTES DE ENVIAR
    console.log('====================================================');
    console.log('✅ PAYLOAD LISTO PARA ENVÍO (Objeto JS):', reporteData);
    console.log('====================================================');

    try {
      // 3. ENVÍO DE LA PETICIÓN POST
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reporteData), // Convertir el objeto a JSON
      });

      if (!response.ok) {
        // Manejo de errores HTTP
        const errorBody = await response.text();
        throw new Error(`Error HTTP ${response.status}: ${errorBody}`);
      }

      const result = await response.json();
      console.log('✅ Reporte enviado con éxito. Respuesta del servidor:', result);

      // 🔔 ALERTA BONITA (TOASTIFY) USANDO LA RESPUESTA
      toast.success(
        `✅ ${result.mensaje} Tu ID de reporte es: ${result.ReporteID}`,
        {
          position: "top-right",
          autoClose: 6000,
        }
      );

      // Limpiar el formulario
      setFormData({
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: '',
        tipo: 'Foco Fundido',
        descripcion: '',
        latitud: ucuLocation[0],
        longitud: ucuLocation[1]
      });

    } catch (error) {
      console.error('❌ Error al enviar el reporte:', error);
      toast.error(`Hubo un error. Revisa la consola o intenta más tarde.`, {
        position: "top-right"
      });
    }
  };

  return (
    <div className="reportar-page">
      {/* 💡 CONTENEDOR DE TOASTIFY (Necesario para mostrar las alertas) */}
      <ToastContainer />
      <div className="reportar-container">
        <h1>Reportar un Problema</h1>
        <p className="subtitle">Ayúdanos a mejorar la comunidad reportando problemas</p>
        <div className="reportar-content">
          {/* Formulario */}
          <div className="reportar-form-section">

            <form onSubmit={handleSubmit} className="reportar-form">
              <div className="form-row">
                {/* CAMPO NOMBRE */}
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
                {/* CAMPO APELLIDO */}
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

              {/* CAMPO TELÉFONO */}
              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
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

              {/* CAMPO DIRECCIÓN */}
              <div className="form-group">
                <label htmlFor="direccion">Dirección (Referencia)</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Calle, número, colonia, referencia"
                  required
                />
              </div>

              {/* CAMPO TIPO DE REPORTE */}
              <div className="form-group">
                <label htmlFor="tipo">Tipo de Reporte</label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                >
                  <option value="" selected>Selecciona el Problema</option>
                  <option value="Foco Fundido">Foco Fundido</option>
                  <option value="Baches">Baches</option>
                  <option value="Inundaciones">Inundaciones</option>
                  <option value="Fugas">Fugas</option>
                </select>
              </div>

              {/* CAMPO DESCRIPCIÓN */}
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

              {/* COORDENADAS */}
              <div className="form-group">
                <label>Coordenadas (Latitud, Longitud)</label>
                <div className="coordenadas-display">
                  <p><strong>Latitud:</strong> {formData.latitud.toFixed(6)}</p>
                  <p><strong>Longitud:</strong> {formData.longitud.toFixed(6)}</p>
                </div>
              </div>

              <button type="submit" className="submit-btn">Enviar Reporte</button>
            </form>
          </div>

          {/* Mapa */}
          <div className="reportar-map-section">
            <div className="map-header">
              <h3>Selecciona la ubicación en el mapa</h3>
              <div className="help-tooltip">
                <span className="help-icon">?</span>
                <div className="tooltip-content">
                  <p><strong>Un click:</strong> Marca la ubicación exacta</p>
                </div>
              </div>
            </div>
            <MapComponent
              center={[formData.latitud, formData.longitud]}
              zoom={ucuZoom}
              markerPosition={[formData.latitud, formData.longitud]}
              popupText="Ubicación del reporte"
              onCoordinatesSaved={handleCoordinatesSaved}
            />
            <p className="map-info">Presiona para seleccionar la ubicación</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportarPage;
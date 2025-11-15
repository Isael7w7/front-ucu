import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import '../styles/Reportar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReportarPage = () => {
  // ENDPOINT DEFINIDO
  const API_URL = 'https://ucudigital.onrender.com/api/crearReporte';

  // Coordenadas y zoom iniciales para el mapa
  const ucuLocation = [21.031940305999093, -89.74636956802323];
  const ucuZoom = 15;

  // ESTADO INICIAL DEL FORMULARIO
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '', // Mapea a 'Numero' en el payload
    direccion: '', // Mapea a 'Direccion' en el payload
    tipo: 'Foco Fundido',
    descripcion: '',
    latitud: ucuLocation[0],
    longitud: ucuLocation[1],
    imagen: null // Para simular imagen
  });

  // Estado del chatbot
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hola! Soy tu asistente. ¿En qué puedo ayudarte?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Manejador general de cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejador para subir imagen (simulado)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imagen: file.name
      }));
      toast.success(`Imagen "${file.name}" agregada correctamente`, {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  // Manejador para enviar mensaje del chatbot
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Agregar mensaje del usuario
    const newMessages = [...chatMessages, { type: 'user', text: chatInput }];
    setChatMessages(newMessages);
    setChatInput('');

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponses = [
        'Puedo ayudarte a reportar problemas en Ucú',
        'Usa el mapa para seleccionar la ubicación exacta',
        'Describe el problema con detalles para mejor seguimiento',
        'Puedes agregar una foto del problema',
        'Después de enviar, recibirás un ID de reporte',
        'Estoy aquí para ayudarte con tus reportes'
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setChatMessages(prev => [...prev, { type: 'bot', text: randomResponse }]);
    }, 500);
  };

  // Manejador para actualizar coordenadas desde el mapa
  const handleCoordinatesSaved = (lat, lng) => {
    setFormData(prev => ({
      ...prev,
      latitud: lat,
      longitud: lng
    }));
      console.log(`Coordenadas actualizadas en el formulario: [${lat.toFixed(6)}, ${lng.toFixed(6)}]`);
  };

  // 💡 FUNCIÓN PRINCIPAL DE ENVÍO DE DATOS A LA API (POST) CON TOASTIFY
  const handleSubmit = async (e) => {
    e.preventDefault();

    // CONSTRUCCIÓN DEL PAYLOAD ANIDADO
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

    // MOSTRAR EL PAYLOAD EN CONSOLA ANTES DE ENVIAR
    console.log('====================================================');
    console.log('PAYLOAD LISTO PARA ENVÍO (Objeto JS):', reporteData);
    console.log('====================================================');

    try {
      // ENVÍO DE LA PETICIÓN POST
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
      console.log('Reporte enviado con éxito. Respuesta del servidor:', result);

      // ALERTA BONITA (TOASTIFY) USANDO LA RESPUESTA
      toast.success(
        `${result.mensaje} Tu ID de reporte es: ${result.ReporteID}`,
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
      console.error('Error al enviar el reporte:', error);
      toast.error(`Hubo un error. Revisa la consola o intenta más tarde.`, {
        position: "top-right"
      });
    }
  };

  return (
    <div className="reportar-page">
      {/* CONTENEDOR DE TOASTIFY (Necesario para mostrar las alertas) */}
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

              {/* CAMPO TIPO DE REPORTE - BOTONES CON ICONOS */}
              <div className="form-group">
                <label>Tipo de Reporte</label>
                <div className="tipo-reporte-buttons">
                  <button
                    type="button"
                    className={`tipo-btn ${formData.tipo === 'Foco Fundido' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, tipo: 'Foco Fundido' }))}
                    title="Reportar foco fundido"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 7.13V4m0 14.87V20M23 13.13h3m-19 0H1m19.485-6.485l2.121-2.121M5.636 18.364l-2.121 2.121m13.858 0l2.121 2.121M5.636 5.636L3.515 3.515M12 6a6 6 0 100 12 6 6 0 000-12z"></path>
                    </svg>
                    <span>Foco Fundido</span>
                  </button>

                  <button
                    type="button"
                    className={`tipo-btn ${formData.tipo === 'Baches' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, tipo: 'Baches' }))}
                    title="Reportar baches"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 7c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V7z"></path>
                      <path d="M6 10h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z"></path>
                      <path d="M8 19h8"></path>
                    </svg>
                    <span>Baches</span>
                  </button>

                  <button
                    type="button"
                    className={`tipo-btn ${formData.tipo === 'Inundaciones' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, tipo: 'Inundaciones' }))}
                    title="Reportar inundación"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 20h20L12 2z"></path>
                      <line x1="12" y1="9" x2="12" y2="15"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span>Inundaciones</span>
                  </button>

                  <button
                    type="button"
                    className={`tipo-btn ${formData.tipo === 'Fugas' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, tipo: 'Fugas' }))}
                    title="Reportar fuga"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.1 0-2.24 1.8-5.4 6-9.34 4.2 3.94 6 7.1 6 9.34 0 3.53-2.65 6.1-6 6.1zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
                    </svg>
                    <span>Fugas</span>
                  </button>
                </div>
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

              {/* BOTÓN DE IMAGEN */}
              <div className="form-group">
                <label>Agregar Foto (Opcional)</label>
                <div className="image-upload-wrapper">
                  <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className="image-upload-btn"
                    onClick={() => document.getElementById('imagen').click()}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span>Subir Foto</span>
                  </button>
                  {formData.imagen && (
                    <div className="image-preview">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                      </svg>
                      {formData.imagen}
                    </div>
                  )}
                </div>
              </div>
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

        {/* CHATBOT FLOTANTE */}
        <div className={`chatbot-container ${chatbotOpen ? 'open' : ''}`}>
          {chatbotOpen && (
            <div className="chatbot-window">
              <div className="chatbot-header">
                <h4>Asistente Ucú</h4>
                <button 
                  type="button"
                  className="chatbot-close"
                  onClick={() => setChatbotOpen(false)}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                  </svg>
                </button>
              </div>
              <div className="chatbot-messages">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.type}`}>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="chatbot-input">
                <input
                  type="text"
                  placeholder="Escribe tu pregunta..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <button type="submit">Enviar</button>
              </form>
            </div>
          )}
          <button
            type="button"
            className="chatbot-toggle"
            onClick={() => setChatbotOpen(!chatbotOpen)}
            title="Abrir asistente"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportarPage;
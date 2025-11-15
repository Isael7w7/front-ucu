
// Importa las funciones necesarias de react-dom/client para renderizar
import React from 'react';
import ReactDOM from 'react-dom/client';
// Importa el componente principal App que acabamos de crear
import App from './App.jsx';
// Importa estilos globales (archivo de estilos en src/styles)
// import './styles/main.css'; 
// Importa los estilos base de Leaflet
import 'leaflet/dist/leaflet.css';
// Encuentra el elemento DOM donde se montará la aplicación (generalmente el div con id="root")
const rootElement = document.getElementById('root');

// Usa createRoot para crear un root de React y renderizar la aplicación
ReactDOM.createRoot(rootElement).render(
  // <React.StrictMode> ayuda a encontrar problemas potenciales en la aplicación
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
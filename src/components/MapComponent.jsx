// src/components/MapComponent.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// Importa el ícono predeterminado de Leaflet para que los marcadores se muestren correctamente
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';

// Para evitar problemas con los íconos de Leaflet en Webpack/Vite
// Esto es necesario para que los marcadores Leaflet se visualicen
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Componente para manejar eventos del mapa
// Solo escucha click: al hacer click colocamos el marcador y llamamos callbacks
const MapEvents = ({ onMapClick, onCoordinatesSaved }) => {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      if (onMapClick) onMapClick(lat, lng);
      if (onCoordinatesSaved) onCoordinatesSaved(lat, lng);
    }
  });
  return null;
};

const MapComponent = ({ center, zoom, markerPosition, popupText, onMapClick, onCoordinatesSaved }) => {
  // Estado para la posición del marcador (colocado por click)
  const [markerPos, setMarkerPos] = useState(markerPosition || center);
  
  // Valor por defecto para el centro del mapa si no se provee
  const defaultCenter = [21.031940305999093, -89.74636956802323]; // Ucú, Yucatán
  const defaultZoom = 15;

  // Límites más precisos del perímetro de Ucú
  const ucuBounds = [
    [21.0250, -89.7550], // Suroeste
    [21.0400, -89.7350]  // Noreste
  ];

  // Al hacer click, colocamos el marcador y guardamos coordenadas
  const handleMapClickInternal = (lat, lng) => {
    const newPos = [lat, lng];
    setMarkerPos(newPos);
    console.log(`📍 Marcador colocado en: Latitud: ${lat.toFixed(6)}, Longitud: ${lng.toFixed(6)}`);
    if (onCoordinatesSaved) onCoordinatesSaved(lat, lng);
  };

  // Crear un DivIcon SVG color "guinda" (burgundy) para el marcador
  const guindaColor = '#7a2230';
  const guindaSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32">
      <path d="M12 0C5.6 0 0 5.6 0 12c0 8 12 20 12 20s12-12 12-20C24 5.6 18.4 0 12 0z" fill="${guindaColor}"/>
      <circle cx="12" cy="12" r="4" fill="#fff"/>
    </svg>
  `;

  const guindaIcon = L.divIcon({
    html: guindaSvg,
    className: '',
    iconSize: [24, 32],
    iconAnchor: [12, 32],
    popupAnchor: [0, -28]
  });

  // Cursor usando el mismo SVG (encodeado) para que coincida con el icono
  const guindaCursor = `url("data:image/svg+xml;utf8,${encodeURIComponent(guindaSvg)}") 12 32, auto`;

  return (
    // MapContainer es el contenedor principal del mapa de react-leaflet
    // style={{ height: '500px', width: '100%' }} es crucial para que el mapa sea visible
    <MapContainer
      center={center || defaultCenter}
      zoom={zoom || defaultZoom}
      minZoom={15}
      maxZoom={18}
      scrollWheelZoom={true}
      doubleClickZoom={false}
      style={{
        height: '280px',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        borderRadius: '8px',
        cursor: guindaCursor
      }}
      maxBounds={ucuBounds}
      maxBoundsViscosity={1.0}
    >
      {/* TileLayer define el proveedor de los "tiles" del mapa (las imágenes de fondo) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Componente para capturar eventos del mapa: click coloca marcador y guarda coordenadas */}
      <MapEvents onMapClick={onMapClick} onCoordinatesSaved={handleMapClickInternal} />

      {/* Marcador fijo en la posición seleccionada (no draggable) */}
      {markerPos && (
        <Marker position={markerPos} icon={guindaIcon}>
          {popupText && <Popup>{popupText}</Popup>}
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
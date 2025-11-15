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
  const defaultZoom = 13;

  const ucuBounds = [
    [21.0200, -89.7600], // Suroeste
    [21.0450, -89.7300]  // Noreste
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
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="42" viewBox="0 0 30 42">
      <path d="M15 0C7 0 0 7 0 15c0 10 15 27 15 27s15-17 15-27C30 7 23 0 15 0z" fill="${guindaColor}"/>
      <circle cx="15" cy="15" r="5" fill="#fff"/>
    </svg>
  `;

  const guindaIcon = L.divIcon({
    html: guindaSvg,
    className: '',
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -36]
  });

  // Cursor usando el mismo SVG (encodeado) para que coincida con el icono
  const guindaCursor = `url("data:image/svg+xml;utf8,${encodeURIComponent(guindaSvg)}") 15 42, auto`;

  return (
    // MapContainer es el contenedor principal del mapa de react-leaflet
    // style={{ height: '500px', width: '100%' }} es crucial para que el mapa sea visible
    <MapContainer
      center={center || defaultCenter}
      zoom={zoom || defaultZoom}
      minZoom={15}
      scrollWheelZoom={true}
      doubleClickZoom={false}
      style={{
        height: '500px',
        width: '100%',
        borderRadius: '8px',
        // Cursor que usa el mismo SVG guinda del marcador
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
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
        // Cambia el cursor por la imagen del marker cuando el mouse esté sobre el mapa
        cursor: `url('https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png') 12 41, auto`
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
        <Marker position={markerPos}>
          {popupText && <Popup>{popupText}</Popup>}
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
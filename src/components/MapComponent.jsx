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
const MapEvents = ({ onMapClick, onDoubleClick }) => {
  const map = useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
    dblclick: (e) => {
      // Prevenir zoom en doble click
      e.originalEvent.preventDefault();
      L.DomEvent.stop(e.originalEvent);
      
      // Llamar callback con las coordenadas del doble click
      if (onDoubleClick) {
        onDoubleClick(e.latlng.lat, e.latlng.lng);
      }
    }
  });
  return null;
};

const MapComponent = ({ center, zoom, markerPosition, popupText, onMapClick, onCoordinatesSaved }) => {
  const [draggedMarkerPos, setDraggedMarkerPos] = useState(markerPosition);
  
  // Valor por defecto para el centro del mapa si no se provee
  const defaultCenter = [21.031940305999093, -89.74636956802323]; // Ucú, Yucatán
  const defaultZoom = 13;

  const ucuBounds = [
    [21.0200, -89.7600], // Suroeste
    [21.0450, -89.7300]  // Noreste
  ];

  // Handler cuando termina el arrastre del marcador
  const handleMarkerDragEnd = (e) => {
    const newPos = [e.target.getLatLng().lat, e.target.getLatLng().lng];
    setDraggedMarkerPos(newPos);
    console.log(`📍 Marcador movido a: Latitud: ${newPos[0].toFixed(6)}, Longitud: ${newPos[1].toFixed(6)}`);
    console.log(`💾 Coordenadas guardadas: [${newPos[0].toFixed(6)}, ${newPos[1].toFixed(6)}]`);
    
    // Guardar coordenadas cuando termina el arrastre
    if (onCoordinatesSaved) {
      onCoordinatesSaved(newPos[0], newPos[1]);
    }
  };

  // Handler para doble click - mueve el marcador y guarda las coordenadas
  const handleDoubleClick = (lat, lng) => {
    const newPos = [lat, lng];
    setDraggedMarkerPos(newPos);
    console.log(`Marcador colocado en: Latitud: ${lat.toFixed(6)}, Longitud: ${lng.toFixed(6)}`);
    console.log(`Coordenadas guardadas: [${lat.toFixed(6)}, ${lng.toFixed(6)}]`);
    
    // Llamar el callback para guardar coordenadas en el padre
    if (onCoordinatesSaved) {
      onCoordinatesSaved(lat, lng);
    }
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
      style={{ height: '500px', width: '100%', borderRadius: '8px' }}
      maxBounds={ucuBounds}
      maxBoundsViscosity={1.0}
    >
      {/* TileLayer define el proveedor de los "tiles" del mapa (las imágenes de fondo) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Componente para capturar eventos del mapa */}
      <MapEvents onMapClick={onMapClick} onDoubleClick={handleDoubleClick} />

      {/* Marcador con draggable */}
      {draggedMarkerPos && (
        <Marker 
          position={draggedMarkerPos}
          draggable={true}
          eventHandlers={{
            dragend: handleMarkerDragEnd
          }}
        >
          {popupText && <Popup>{popupText}</Popup>}
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
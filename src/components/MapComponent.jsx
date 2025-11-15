// src/components/MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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


const MapComponent = ({ center, zoom, markerPosition, popupText }) => {
  // Valor por defecto para el centro del mapa si no se provee
  const defaultCenter = [51.505, -0.09]; // Londres
  const defaultZoom = 13;

  return (
    // MapContainer es el contenedor principal del mapa de react-leaflet
    // style={{ height: '500px', width: '100%' }} es crucial para que el mapa sea visible
    <MapContainer
      center={center || defaultCenter}
      zoom={zoom || defaultZoom}
      scrollWheelZoom={false} // Deshabilita el zoom con la rueda del ratón
      style={{ height: '500px', width: '100%', borderRadius: '8px' }}
    >
      {/* TileLayer define el proveedor de los "tiles" del mapa (las imágenes de fondo) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Si se proporciona una posición de marcador, se añade un Marker al mapa */}
      {markerPosition && (
        <Marker position={markerPosition}>
          {/* Popup es un elemento emergente que aparece al hacer clic en el marcador */}
          {popupText && <Popup>{popupText}</Popup>}
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
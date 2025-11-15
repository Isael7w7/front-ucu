# 🏛️ Front-UCU: Portal Digital de la Comunidad

Bienvenido al repositorio del frontend de **XuxCú** — una plataforma integral para la ciudadanía digital, eventos comunitarios, comercios locales y reportes de mejora en el municipio de Ucú, Yucatán.

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Instalación y Configuración](#instalación-y-configuración)
5. [Flujo de Trabajo](#flujo-de-trabajo)
6. [Componentes Principales](#componentes-principales)
7. [Páginas del Sitio](#páginas-del-sitio)
8. [Mapas y Geolocalización](#mapas-y-geolocalización)
9. [Estilos y Diseño](#estilos-y-diseño)
10. [Comandos Disponibles](#comandos-disponibles)
11. [Contribución](#contribución)

---

## 🎯 Descripción General

Front-UCU es una aplicación web moderna construida con **React** y **Vite** que ofrece a los ciudadanos de Ucú:

- 📌 **Eventos**: Información y calendario de eventos comunitarios
- 🏪 **Comercios**: Directorio de negocios locales con geolocalización
- 📢 **Reportes**: Herramienta para reportar problemas y sugerencias de mejora
- 💬 **Chatbot**: Asistente virtual integrado con WhatsApp
- 🗺️ **Mapas Interactivos**: Visualización de ubicaciones con Leaflet

---

## 🔧 Tecnologías Utilizadas

### Core
- **React 18+**: Librería para construir interfaces de usuario
- **Vite**: Herramienta de build ultrarrápida
- **React Router**: Enrutamiento de aplicación (si se usa)
- **React Leaflet 4**: Mapas interactivos basados en Leaflet

### Estilos
- **CSS 3**: Estilos nativos con variables CSS y animaciones
- **Responsive Design**: Mobile-first architecture

### APIs y Servicios
- **OpenStreetMap**: Proveedor de mapas (tiles gratuitos)
- **Leaflet 1.7.1**: Librería de mapas interactivos

### Control de Versiones
- **Git**: Versionado de código
- **GitHub**: Repositorio remoto

---

## 📁 Estructura del Proyecto

```
front-ucu/
├── public/                          # Archivos públicos estáticos
│   ├── Logo XuxCu.svg               # Logo principal
│   └── kancode-logo.png             # Logo del creador
│
├── src/
│   ├── components/                  # Componentes reutilizables
│   │   ├── Navbar.jsx               # Barra de navegación
│   │   ├── Footer.jsx               # Pie de página
│   │   ├── MapComponent.jsx         # Componente de mapa interactivo
│   │   ├── ComerciosMapView.jsx     # Mapa de comercios
│   │   └── ...
│   │
│   ├── pages/                       # Páginas principales
│   │   ├── LandingPage.jsx          # Página de inicio (hero + mapa)
│   │   ├── EventosPage.jsx          # Página de eventos
│   │   ├── ComerciosPage.jsx        # Página de comercios
│   │   ├── ReportarPage.jsx         # Página para crear reportes
│   │   └── ...
│   │
│   ├── styles/                      # Archivos CSS globales y por componente
│   │   ├── index.css                # Reset y estilos globales
│   │   ├── App.css                  # Estilos de la aplicación principal
│   │   ├── MainLayout.css           # Layout del contenedor principal
│   │   ├── Navbar.css               # Estilos de la navegación
│   │   ├── Footer.css               # Estilos del pie de página
│   │   └── ...
│   │
│   ├── App.jsx                      # Componente raíz de la aplicación
│   ├── main.jsx                     # Punto de entrada de React
│   └── index.css                    # Estilos globales
│
├── eslint.config.js                 # Configuración de ESLint
├── vite.config.js                   # Configuración de Vite
├── package.json                     # Dependencias y scripts
├── package-lock.json                # Lock de versiones
└── README.md                         # Este archivo

```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- **Node.js** 16+ (recomendado 18+)
- **npm** 7+ o **yarn**
- **Git**

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/Isael7w7/front-ucu.git
cd front-ucu
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Crear un archivo `.env` (si es necesario):**
```env
# Opcional: configurar variables de entorno
VITE_API_URL=http://localhost:3000
```

4. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```

5. **Abrir en navegador:**
```
http://localhost:5173
```

---

## 🔄 Flujo de Trabajo

### Rama Principal: `test` (rama de desarrollo)

El proyecto usa una rama `test` como rama principal de desarrollo. El flujo es:

1. **Crear una rama de feature:**
```bash
git checkout -b feature/nombre-feature
```

2. **Realizar cambios:**
```bash
# Editar archivos, crear componentes, etc.
git add .
git commit -m "feat(componente): descripción del cambio"
```

3. **Hacer push a la rama:**
```bash
git push origin feature/nombre-feature
```

4. **Crear Pull Request** en GitHub contra la rama `test`

5. **Revisar y mergear** en `test`

### Estrategia de Commits

Usamos **Conventional Commits** para mantener un historial claro:

- `feat(modulo): descripción` — Nueva funcionalidad
- `fix(modulo): descripción` — Corrección de bugs
- `style(modulo): descripción` — Cambios de estilos/CSS
- `refactor(modulo): descripción` — Reorganización de código
- `docs(modulo): descripción` — Cambios de documentación
- `perf(modulo): descripción` — Mejoras de rendimiento
- `test(modulo): descripción` — Adición de tests

### Ejemplo:
```bash
git commit -m "feat(map): cambiar color del marcador a guinda"
git commit -m "style(navbar): alinear elementos y reducir logo"
git commit -m "fix(footer): remover espacios en blanco"
```

---

## 🧩 Componentes Principales

### `Navbar.jsx`
Barra de navegación sticky con:
- Logo y nombre de la plataforma
- Menú central: Eventos, Comercios, Reportes
- Redes sociales (Facebook, Instagram)
- Botón de WhatsApp Chatbot
- Botón de Inicio de Sesión
- Menú hamburguesa responsivo (móviles)

**Archivo de estilos:** `src/styles/Navbar.css`

### `Footer.jsx`
Pie de página con:
- Logo y descripción de XuxCú
- Sección "Síguenos" con redes sociales
- Sección "Contacto" con teléfono y email
- Copyright y créditos a KanCode
- Animaciones y diseño responsivo

**Archivo de estilos:** `src/styles/Footer.css`

### `MapComponent.jsx`
Mapa interactivo usando React Leaflet con:
- Centro por defecto en Ucú, Yucatán (21.031940, -89.746370)
- Zoom predeterminado: nivel 13
- Límites geográficos para no salir de Ucú (`maxBounds`, `maxBoundsViscosity`)
- Click para colocar marcador guinda
- Cursor personalizado (SVG guinda)
- Scroll wheel zoom habilitado
- Sin doble-click zoom
- Callback `onCoordinatesSaved(lat, lng)` para guardar coordenadas

**Características:**
- Marcador con SVG color guinda (`#7a2230`)
- Soporte para popups
- Eventos de click para interactividad

---

## 📄 Páginas del Sitio

### `LandingPage.jsx`
Página de bienvenida con:
- Imagen hero (mapa integrado)
- Descripción de la plataforma
- Llamada a la acción

### `EventosPage.jsx`
Página que muestra eventos comunitarios

### `ComerciosPage.jsx`
Página con mapa de comercios locales

### `ReportarPage.jsx`
Formulario para crear reportes:
- Campos de descripción
- Ubicación en mapa
- Envío de reporte

---

## 🗺️ Mapas y Geolocalización

### MapComponent.jsx - API

```jsx
<MapComponent
  center={[21.031940, -89.746370]}    // Centro inicial
  zoom={13}                           // Nivel de zoom
  markerPosition={[21.031940, -89.746370]} // Posición inicial del marcador
  popupText="Ubicación de UCÚ"       // Texto del popup
  onMapClick={(lat, lng) => {}}       // Callback al hacer click
  onCoordinatesSaved={(lat, lng) => {}} // Callback al guardar coordenadas
/>
```

### Marcador Guinda

El marcador usa un `L.divIcon` con SVG personalizado:
- Color: guinda (`#7a2230`)
- Tamaño: 30x42 píxeles
- Hotspot: [15, 42] (base del marcador)

### Cursor Personalizado

El cursor del mapa cambia al mismo SVG guinda cuando pasas el mouse.

---

## 🎨 Estilos y Diseño

### Paleta de Colores

- **Primario (Guinda):** `#8B2E47`
- **Guinda Oscuro:** `#7a2230`
- **Acento Claro:** `#a83a57`
- **Texto Claro (Wheat):** `#F5DEB3`
- **Texto Secundario:** `#D4A574`
- **WhatsApp:** `#25D366`

### Variables CSS Globales

Se definen en archivos CSS bajo `:root`:
```css
:root {
  --nav-primary: #8B2E47;      /* Burgundy principal */
  --nav-accent: #a83a57;        /* Burgundy más claro */
  --nav-contrast: #F5DEB3;      /* Wheat para texto */
}
```

### Animaciones

- `slideUpFooter`: Transición suave del footer
- `fadeInUp`: Fade-in con movimiento hacia arriba
- `bounceIn`: Efecto bounce al cargar
- `popIn`: Pop-in para elementos interactivos

### Responsive Design

Breakpoints utilizados:
- **Desktop:** 1024px+ (grid 4 columnas)
- **Tablet:** 768px - 1023px (grid 2 columnas)
- **Mobile:** < 768px (grid 1 columna, stacked)

---

## 📦 Comandos Disponibles

### Desarrollo

```bash
# Iniciar servidor de desarrollo (hot reload)
npm run dev

# Compilar para producción
npm run build

# Previsualizar build en local
npm run preview
```

### Linting

```bash
# Ejecutar ESLint
npm run lint

# Fixar errores de ESLint automáticamente
npm run lint -- --fix
```

### Git

```bash
# Ver estado
git status

# Agregar cambios
git add .

# Hacer commit
git commit -m "feat(componente): descripción"

# Push a rama remota
git push origin nombre-rama

# Pull changes from remote
git pull origin nombre-rama
```

---

## 🤝 Contribución

### Pautas para Contribuir

1. **Crea una rama** con un nombre descriptivo:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

2. **Realiza cambios** siguiendo las convenciones de código

3. **Escribe commits claros** usando Conventional Commits

4. **Haz push** a tu rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

5. **Abre un Pull Request** explicando tus cambios

### Convenciones de Código

- **Nombres de archivos:** CamelCase para componentes (`MapComponent.jsx`), kebab-case para estilos (`navbar.css`)
- **Variables:** camelCase
- **Constantes:** UPPER_SNAKE_CASE
- **Comentarios:** Claros y concisos

### Estilo Visual

- Mantener coherencia con la paleta de colores
- Usar animaciones sutiles (transiciones 0.3s - 0.6s)
- Asegurar accesibilidad (contraste, tamaños de texto)
- Responsive desde mobile

---

## 🐛 Resolución de Problemas

### El servidor de desarrollo no inicia
```bash
# Limpiar cache de node_modules
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Los estilos no se aplican
- Verifica que el archivo CSS esté importado en el componente
- Revisa que los selectores CSS sean específicos
- Limpia el cache del navegador (Ctrl + Shift + Delete)

### Los mapas no cargan
- Verifica conexión a internet (OpenStreetMap requiere internet)
- Revisa la consola del navegador (F12) para errores
- Asegúrate que `src/components/MapComponent.jsx` esté correctamente importado

---

## 🔗 Repositorio del Backend

El backend de XuxCú está alojado en un repositorio separado. Para descargar e instalar el backend:

**Repositorio:** [ucuDigital](https://github.com/LuisChito/ucuDigital)

### Instalación del Backend

```bash
# Clonar el repositorio del backend
git clone https://github.com/LuisChito/ucuDigital.git
cd ucuDigital

# Seguir las instrucciones del README del backend para instalar dependencias
# y configurar la base de datos
```

**Nota:** Asegúrate de tener el backend ejecutándose antes de probar funcionalidades que requieran API calls.

---

## 🚀 Enlaces de Despliegue

Una vez que el proyecto esté desplegado en producción, aquí irán los links de acceso:

### Frontend
- **URL del despliegue:**: https://front-emkrgwiul-luischitos-projects.vercel.app/

### Backend
- **URL del repositorio del backend**: https://github.com/LuisChito/ucuDigital

### Base de Datos
- **Proveedor:** [SQLSERVER]

---

## 📞 Contacto y Soporte

- **GitHub Frontend:** Isael7w7/front-ucu
- **GitHub Backend:** LuisChito/ucuDigital

---

## 📄 Licencia

Este proyecto es propiedad del H. Ayuntamiento de Ucú. Todos los derechos reservados.

---

## 🙏 Créditos

**Creado por:** KanCode  
**Plataforma:** XuxCú - Ciudadana, Eventos y Comercio  
**Municipio:** Isael Ojeda, Luis Salazar, Diego Tzec, Rafael Ferrusca, Fernando Caceres

---

**Última actualización:** 15 de noviembre de 2025
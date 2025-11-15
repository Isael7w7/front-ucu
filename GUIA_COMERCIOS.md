# 🏪 Sistema de Publicación de Comercios - Guía de Uso

## ✨ Nuevas Funcionalidades Implementadas

### 1️⃣ Banner CTA en Página de Comercios
- Aparece al final de la sección de comercios
- Invita a los comerciantes a publicar su negocio
- Diseño atractivo y responsive

### 2️⃣ Sistema de Registro/Login para Comerciantes
- Modal elegante para crear cuenta o iniciar sesión
- Validación de formularios
- Autenticación con localStorage (temporal) o JWT (backend)

### 3️⃣ Formulario de Publicación
- Formulario completo con todos los datos del comercio
- Integración con mapa para seleccionar ubicación
- Selector de categorías
- Validación de campos requeridos

---

## 🎯 Flujo de Usuario

### Para Comerciantes:

1. **Visitar la página de comercios** → Ver el banner "¿Tienes un comercio en Ucú?"

2. **Hacer clic en "Publicar Mi Comercio"** → Se abre el modal de login/registro

3. **Crear cuenta (primera vez):**
   - Nombre del comercio
   - Teléfono
   - Email
   - Contraseña

4. **Iniciar sesión (usuarios existentes):**
   - Email
   - Contraseña

5. **Completar formulario de publicación:**
   - Nombre del comercio
   - Categoría (desplegable)
   - Descripción
   - Teléfono de contacto
   - Email
   - Facebook (opcional)
   - Dirección
   - Ubicación en mapa (hacer clic para seleccionar)

6. **Enviar** → El comercio se publica y aparecerá en el catálogo

---

## 🔧 Archivos Creados/Modificados

### Nuevos Componentes:
```
src/components/LoginComercio.jsx          - Modal de login/registro
src/components/PublicarComercio.jsx       - Formulario de publicación
```

### Nuevos Estilos:
```
src/styles/LoginComercio.css              - Estilos del modal de autenticación
src/styles/PublicarComercio.css           - Estilos del formulario de publicación
```

### Archivos Modificados:
```
src/pages/ComerciosPage.jsx               - Agregado banner CTA y modales
src/styles/Comercios.css                  - Agregados estilos del banner
```

### Documentación:
```
BACKEND_ENDPOINTS.md                      - Especificación de endpoints necesarios
```

---

## 🌐 Integración con Backend

### Endpoints Requeridos:

1. **POST** `/api/registroComercio` - Crear cuenta de comerciante
2. **POST** `/api/loginComercio` - Autenticar comerciante
3. **POST** `/api/crearComercio` - Publicar nuevo comercio

Ver `BACKEND_ENDPOINTS.md` para especificaciones completas.

### Modo Actual:
El sistema funciona en **modo fallback** que usa `localStorage` para simular autenticación si el backend no está disponible. Esto permite desarrollo y testing sin necesidad del backend completo.

Cuando implementes los endpoints en el backend, el frontend automáticamente los usará.

---

## 🎨 Características de Diseño

✅ **Responsive** - Funciona en desktop, tablet y móvil
✅ **Animaciones suaves** - Transiciones elegantes
✅ **UX intuitiva** - Flujo claro y guiado
✅ **Accesible** - Formularios con labels y placeholders descriptivos
✅ **Toast notifications** - Feedback visual con react-toastify
✅ **Mapa interactivo** - Selección de ubicación con Leaflet

---

## 📱 Responsive Breakpoints

- **Desktop** (>768px): Banner horizontal, formulario en 2 columnas
- **Tablet** (768px): Banner apilado, formulario adaptado
- **Mobile** (<480px): Todo en columna única, botones full-width

---

## 🧪 Testing

### Para probar el flujo completo:

1. Navega a la sección de Comercios en la página principal
2. Scroll hasta el final para ver el banner CTA
3. Clic en "Publicar Mi Comercio"
4. Prueba el registro creando una cuenta temporal
5. Completa el formulario de publicación
6. Verifica que aparezca el toast de éxito

### Datos de prueba sugeridos:
```
Email: test@comercio.com
Password: 123456
Nombre: Tienda de Prueba
Categoría: Alimentos y Bebidas
Teléfono: +52 999 999 9999
```

---

## 🚀 Próximos Pasos

### Para el Backend:
1. Implementar los 3 endpoints listados en `BACKEND_ENDPOINTS.md`
2. Configurar autenticación JWT
3. Agregar sistema de aprobación de comercios (opcional)
4. Validación de datos en el servidor

### Mejoras Futuras (Opcional):
- Upload de imágenes del comercio
- Panel de administración para aprobar comercios
- Edición de comercios publicados
- Dashboard para comerciantes con estadísticas
- Sistema de verificación por email

---

## ❓ Preguntas Frecuentes

**P: ¿El sistema funciona sin backend?**
R: Sí, usa un modo fallback temporal con localStorage para testing.

**P: ¿Los comercios publicados aparecen inmediatamente?**
R: En modo fallback sí. Con backend real, depende de si implementas sistema de aprobación.

**P: ¿Puedo modificar las categorías?**
R: Sí, edita el array `categorias` en `PublicarComercio.jsx`

**P: ¿Cómo personalizo los colores del banner?**
R: Edita las variables CSS en `.comerciantes-cta-banner` en `Comercios.css`

---

## 📞 Soporte

Para dudas o problemas con la implementación, revisa:
1. Consola del navegador (logs detallados)
2. `BACKEND_ENDPOINTS.md` para especificaciones de API
3. Comentarios en el código fuente

---

**Creado por:** KanCode  
**Fecha:** Noviembre 2025  
**Versión:** 1.0.0

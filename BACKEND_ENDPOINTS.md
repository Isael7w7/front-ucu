# Endpoints del Backend - UCU Digital

Este documento lista los endpoints que el frontend espera del backend para la funcionalidad de comercios.

## 🏪 Endpoints de Comercios

### 1. Registro de Comerciante

**POST** `/api/registroComercio`

Crea una nueva cuenta para un comerciante.

**Request Body:**
```json
{
  "email": "comerciante@example.com",
  "password": "password123",
  "nombre": "Nombre del Comercio",
  "telefono": "+52 999 123 4567"
}
```

**Response (200):**
```json
{
  "mensaje": "Cuenta creada exitosamente",
  "comercioId": 123
}
```

---

### 2. Login de Comerciante

**POST** `/api/loginComercio`

Autentica un comerciante existente.

**Request Body:**
```json
{
  "email": "comerciante@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "jwt-token-aqui",
  "comercioId": 123,
  "mensaje": "Login exitoso"
}
```

---

### 3. Crear/Publicar Comercio

**POST** `/api/crearComercio`

Permite a un comerciante autenticado publicar su negocio.

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "comercio": {
    "Nombre": "Restaurante La Palapa",
    "Descripcion": "Restaurante de comida típica yucateca",
    "Categoria": "Alimentos y Bebidas",
    "Link": "https://www.google.com/maps?q=21.032100,-89.746200",
    "LinkFacebook": "https://facebook.com/lapalapa",
    "Telefono": "+52 999 123 4567",
    "Email": "contacto@lapalapa.com",
    "Direccion": "Calle Principal #123, Centro",
    "Latitud": 21.032100,
    "Longitud": -89.746200
  }
}
```

**Response (200):**
```json
{
  "mensaje": "Comercio creado exitosamente",
  "ComercioID": 456
}
```

---

### 4. Obtener Comercios (Ya existente)

**GET** `/api/comercios`

Lista todos los comercios aprobados.

**Response (200):**
```json
{
  "comercios": [
    {
      "ComercioID": 1,
      "Nombre": "Tienda Don José",
      "Descripcion": "Abarrotes y productos básicos",
      "Categoria": "Alimentos y Bebidas",
      "Link": "https://maps.google.com/...",
      "LinkFacebook": "https://facebook.com/..."
    }
  ]
}
```

---

## 📋 Categorías Disponibles

Las categorías soportadas por el frontend son:

- `Alimentos y Bebidas`
- `Educación y Cultura`
- `Deportes y Recreación`
- `Automotriz`
- `Salud y Bienestar`
- `Servicios`
- `Tecnología`
- `Moda y Belleza`

---

## 🔐 Notas de Seguridad

1. El endpoint `/api/crearComercio` debe validar que el usuario esté autenticado mediante el token JWT
2. Se recomienda implementar validación de campos en el backend
3. Los comercios nuevos deberían requerir aprobación administrativa antes de aparecer públicamente
4. Las contraseñas deben ser hasheadas con bcrypt o similar

---

## 🎯 Estado Actual

**Modo Fallback Temporal:** El frontend actualmente usa localStorage como fallback si los endpoints no están disponibles. Esto permite desarrollo sin backend completo, pero debe ser reemplazado por la integración real.

**Para activar el backend real:**
1. Implementar los endpoints listados arriba
2. El frontend automáticamente intentará usarlos
3. Si fallan, volverá al modo fallback temporal

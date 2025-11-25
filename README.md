# 📚 Biblioteca Virtual - Sistema Completo de Gestión

Sistema full-stack completo para la gestión de una biblioteca de libros. Incluye API RESTful con .NET 8 y una aplicación web moderna con React + TypeScript + Material UI.

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Tecnologías](#-tecnologías)
- [Características](#-características)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación Completa](#-instalación-completa)
- [Backend - API REST](#-backend---api-rest)
- [Frontend - Aplicación Web](#-frontend---aplicación-web)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Pruebas](#-pruebas)
- [Solución de Problemas](#-solución-de-problemas)

## 🎯 Descripción General

Sistema de gestión de biblioteca que permite:
- 📖 Visualizar catálogo de libros con paginación
- ➕ Agregar nuevos libros con validaciones completas
- 🔍 Interfaz moderna y responsive
- ⚡ API RESTful con alto rendimiento
- 🛡️ Validaciones robustas en frontend y backend


## 🛠️ Tecnologías Utilizadas

### Backend (.NET)
- **.NET 8.0** - Framework principal
- **ASP.NET Core Web API** - API RESTful
- **Entity Framework Core 9.0** - ORM
- **SQL Server** - Base de datos
- **FluentValidation** - Validación de modelos
- **Swagger/OpenAPI** - Documentación interactiva
- **Memory Cache** - Optimización de consultas

### Frontend (React)
- **React 19** - Biblioteca UI
- **TypeScript** - Type safety
- **Material UI (MUI)** - Componentes y diseño
- **Context API** - Gestión de estado
- **Axios** - Cliente HTTP
- **Vite** - Build tool y dev server
- **date-fns** - Manejo de fechas

## 🚀 Características

### Backend
- ✅ CRUD completo de libros
- ✅ Validación de datos con FluentValidation
- ✅ Paginación de resultados
- ✅ Caché en memoria (5 minutos) para optimización
- ✅ Manejo global de excepciones
- ✅ Documentación Swagger interactiva
- ✅ Soporte CORS para frontend
- ✅ Patrón Repository + Service (arquitectura limpia)
- ✅ Migraciones automáticas con EF Core

### Frontend
- ✅ Interfaz moderna y atractiva con Material UI
- ✅ Diseño completamente responsive
- ✅ Paginación integrada
- ✅ Validaciones en tiempo real
- ✅ Estados de carga con spinners
- ✅ Notificaciones de éxito/error
- ✅ Animaciones y transiciones suaves
- ✅ Type safety completo con TypeScript
- ✅ Arquitectura escalable con Context API


## 📋 Requisitos Previos

### Backend
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/sql-server/sql-server-downloads) (LocalDB, Express o cualquier edición)

### Frontend
- [Node.js 18+](https://nodejs.org/) (recomendado v22)
- npm (incluido con Node.js)

### Herramientas Recomendadas
- [Visual Studio 2022](https://visualstudio.microsoft.com/) o [VS Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/) o [Thunder Client](https://www.thunderclient.com/) para probar la API

## ⚙️ Instalación Completa

### 🔧 Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/JoseBertoni/Books.git
cd Books
```

### 🔧 Paso 2: Configurar y Ejecutar el Backend

```bash
# Ir al directorio del backend
cd LibraryAPI

# Configurar la cadena de conexión en appsettings.json
# Editar: "Server=TU_SERVIDOR;Database=Libreria;..."

# Aplicar migraciones de base de datos
dotnet ef database update

# Ejecutar la API
dotnet run
```

La API estará disponible en: **http://localhost:5057**  
Swagger UI: **http://localhost:5057/swagger**

### 🔧 Paso 3: Configurar y Ejecutar el Frontend

```bash
# Abrir otra terminal y ir al directorio del frontend
cd LibraryFront

# Instalar dependencias
npm install

# Configurar la URL de la API en el archivo .env
# VITE_API_BASE_URL=http://localhost:5057/api

# Ejecutar la aplicación
npm run dev
```

La aplicación web estará disponible en: **http://localhost:5173**

### 🚀 ¡Listo! Abre tu navegador en http://localhost:5173

---

## 🔙 Backend - API REST

### Estructura del Proyecto

```
LibraryAPI/
├── Controllers/          # Controladores de la API
│   └── LibrosController.cs
├── Domain/              # Modelos de dominio
│   ├── Libro.cs
│   └── DTOs/
│       └── CreateLibroDto.cs
├── Infrastructure/      # Infraestructura y servicios
│   ├── Converters/
│   │   └── DateOnlyJsonConverter.cs
│   ├── Data/
│   │   └── AppDbContext.cs
│   ├── Middleware/
│   │   └── GlobalExceptionHandlerMiddleware.cs
│   ├── Migrations/
│   ├── Repositories/
│   │   ├── ILibroRepository.cs
│   │   └── LibroRepository.cs
│   ├── Services/
│   │   ├── ILibroService.cs
│   │   └── LibroService.cs
│   └── Validators/
│       └── CreateLibroDtoValidator.cs
└── Program.cs           # Punto de entrada
```

### Configuración de Base de Datos

Edita `LibraryAPI/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=TU_SERVIDOR;Database=Libreria;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

**Ejemplos de cadenas de conexión:**

```plaintext
# SQL Server local con Windows Authentication
Server=(localdb)\\mssqllocaldb;Database=Libreria;Trusted_Connection=True;

# SQL Server Express
Server=.\\SQLEXPRESS;Database=Libreria;Trusted_Connection=True;TrustServerCertificate=True;

# SQL Server con usuario y contraseña
Server=localhost;Database=Libreria;User Id=sa;Password=TuPassword;TrustServerCertificate=True;
```


## 🔌 Endpoints de la API

### Base URL: `http://localhost:5057/api`

### 📖 Obtener todos los libros (GET)

**Endpoint:** `GET /api/Libros`

**Parámetros de consulta:**
- `pageNumber` (opcional, default: 1) - Número de página
- `pageSize` (opcional, default: 10, max: 100) - Cantidad de libros por página

**Ejemplo de solicitud:**
```bash
GET http://localhost:5057/api/Libros?pageNumber=1&pageSize=10
```

**Ejemplo de respuesta (200 OK):**
```json
{
  "items": [
    {
      "id": 1,
      "titulo": "El Resplandor",
      "autor": "Stephen King",
      "descripcion": "Novela de terror sobre un hotel embrujado",
      "genero": "Horror",
      "fechaPublicacion": "1977-01-28"
    },
    {
      "id": 2,
      "titulo": "Cien años de soledad",
      "autor": "Gabriel García Márquez",
      "descripcion": "Obra maestra del realismo mágico",
      "genero": "Ficción",
      "fechaPublicacion": "1967-05-30"
    }
  ],
  "pageNumber": 1,
  "pageSize": 10,
  "totalCount": 2,
  "totalPages": 1,
  "hasPreviousPage": false,
  "hasNextPage": false
}
```

### ➕ Crear un nuevo libro (POST)

**Endpoint:** `POST /api/Libros`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "titulo": "1984",
  "autor": "George Orwell",
  "descripcion": "Novela distópica sobre un futuro totalitario",
  "genero": "Ciencia Ficción",
  "fechaPublicacion": "1949-06-08"
}
```

**Validaciones:**
- `titulo`: Requerido, máximo 200 caracteres
- `autor`: Requerido, máximo 200 caracteres
- `descripcion`: Requerida
- `genero`: Opcional, máximo 100 caracteres
- `fechaPublicacion`: Requerida, no puede ser fecha futura

**Ejemplo de respuesta exitosa (201 Created):**
```json
{
  "id": 3,
  "titulo": "1984",
  "autor": "George Orwell",
  "descripcion": "Novela distópica sobre un futuro totalitario",
  "genero": "Ciencia Ficción",
  "fechaPublicacion": "1949-06-08"
}
```

**Ejemplo de respuesta con error de validación (400 Bad Request):**
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Titulo": ["El título es requerido"],
    "FechaPublicacion": ["La fecha de publicación no puede ser futura"]
  }
}
```


---

## 🧪 Pruebas

### Probar el Backend con Swagger

1. Ejecuta la API: `dotnet run` en `LibraryAPI/`
2. Abre el navegador en: http://localhost:5057/swagger
3. Prueba los endpoints directamente desde la interfaz

### Probar con PowerShell (Windows)

**Obtener libros:**
```powershell
Invoke-WebRequest -Uri "http://localhost:5057/api/Libros" -Method GET -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Crear un libro:**
```powershell
$body = '{"titulo":"El Quijote","autor":"Miguel de Cervantes","descripcion":"La obra cumbre de la literatura española","genero":"Clásico","fechaPublicacion":"1605-01-16"}'
Invoke-WebRequest -Uri "http://localhost:5057/api/Libros" -Method POST -Body $body -ContentType "application/json; charset=utf-8" -UseBasicParsing
```


### Probar con cURL (Linux/Mac/Windows Git Bash)

**Obtener libros:**
```bash
curl -X GET "http://localhost:5057/api/Libros?pageNumber=1&pageSize=10"
```

**Crear un libro:**
```bash
curl -X POST "http://localhost:5057/api/Libros" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "El Quijote",
    "autor": "Miguel de Cervantes",
    "descripcion": "La obra cumbre de la literatura española",
    "genero": "Clásico",
    "fechaPublicacion": "1605-01-16"
  }'
```


### Probar el Frontend

1. Ejecuta el backend primero
2. Ejecuta el frontend: `npm run dev` en `LibraryFront/`
3. Abre el navegador en: http://localhost:5173
4. Prueba las siguientes acciones:
   - ✅ Ver lista de libros con paginación
   - ✅ Navegar entre páginas
   - ✅ Agregar un nuevo libro
   - ✅ Validar errores en el formulario
   - ✅ Ver notificaciones de éxito/error

### Prueba de Integración Completa

```bash
# Terminal 1: Backend
cd LibraryAPI
dotnet run

# Terminal 2: Frontend
cd LibraryFront
npm run dev

# Navegador: http://localhost:5173
# Prueba crear un libro y verifica que aparezca en la lista
```

---

## 📄 Documentación Interactiva (Swagger)

Una vez que la aplicación esté ejecutándose, puedes acceder a la documentación interactiva en:

```
http://localhost:5057/swagger
```

Swagger UI te permite:
- Ver todos los endpoints disponibles
- Probar las peticiones directamente desde el navegador
- Ver los esquemas de datos
- Consultar las respuestas esperadas


---

## 🎨 Frontend - Aplicación Web

### Estructura del Proyecto

```
LibraryFront/
├── src/
│   ├── components/          # Componentes React
│   │   ├── ErrorSnackbar/   # Notificaciones de error
│   │   ├── Layout/          # Layout principal
│   │   ├── LibroCard/       # Card de libro individual
│   │   ├── LibroForm/       # Formulario de creación
│   │   └── LibroList/       # Lista con paginación
│   ├── context/             # Context API
│   │   └── LibrosContext.tsx
│   ├── services/            # Servicios HTTP
│   │   └── api.service.ts
│   ├── types/               # TypeScript types
│   │   └── libro.types.ts
│   ├── config/              # Configuración
│   │   └── api.config.ts
│   ├── App.tsx              # Componente principal
│   └── main.tsx             # Punto de entrada
├── .env                     # Variables de entorno
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Componentes Principales

#### 1️⃣ **LibroForm** - Formulario de Creación
- Campos: Título, Autor, Género, Fecha de Publicación, Descripción
- Validaciones en tiempo real
- Mensajes de error específicos por campo
- Estados de carga con spinner
- Notificación de éxito
- Layout responsive (2 columnas en desktop)

#### 2️⃣ **LibroList** - Lista con Paginación
- Grid responsive (3 columnas desktop, 2 tablet, 1 móvil)
- Paginación completa con navegación
- Indicadores de carga
- Estado vacío con mensaje informativo
- Información de resultados (mostrando X de Y)

#### 3️⃣ **LibroCard** - Tarjeta de Libro
- Efecto hover con elevación
- Chip de género con color
- Fecha formateada en español
- Descripción truncada
- Animación de entrada suave

#### 4️⃣ **Layout** - Estructura Principal
- Header con icono y título
- Container responsive
- Footer con información
- Fondo optimizado para contraste

### Configuración del Frontend

Edita `LibraryFront/.env`:

```env
VITE_API_BASE_URL=http://localhost:5057/api
```

### Scripts Disponibles

```bash
# Modo desarrollo (con hot reload)
npm run dev

# Compilar para producción
npm run build

# Vista previa de build de producción
npm run preview

# Linter
npm run lint
```

### Características de UX/UI

- 🎨 **Material Design** con componentes MUI
- 📱 **100% Responsive** - Se adapta a todos los dispositivos
- ⚡ **Animaciones suaves** - Transiciones y efectos hover
- 🎯 **Feedback visual** - Loading states y notificaciones
- ♿ **Accesible** - Cumple estándares ARIA
- 🌈 **Tema personalizado** - Colores corporativos consistentes

### Validaciones del Formulario

| Campo | Validaciones |
|-------|-------------|
| **Título** | Obligatorio, máx. 200 caracteres |
| **Autor** | Obligatorio, máx. 100 caracteres |
| **Descripción** | Obligatoria, máx. 1000 caracteres |
| **Género** | Obligatorio, lista predefinida (11 opciones) |
| **Fecha** | Obligatoria, no puede ser futura |

### Géneros Disponibles

- Ficción
- No Ficción
- Ciencia Ficción
- Fantasía
- Misterio
- Romance
- Thriller
- Biografía
- Historia
- Tecnología
- Otro

---

## 🏗️ Arquitectura del Proyecto

### Patrón de Diseño

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (React)                  │
│  ┌──────────────────────────────────────────────┐  │
│  │  Components → Context API → Services         │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP (Axios)
                      │
┌─────────────────────▼───────────────────────────────┐
│                 Backend (.NET API)                   │
│  ┌──────────────────────────────────────────────┐  │
│  │  Controllers → Services → Repository → DB    │  │
│  └──────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

### Patrones Implementados

#### Backend
- **Repository Pattern**: Abstracción del acceso a datos
- **Service Pattern**: Lógica de negocio centralizada
- **Dependency Injection**: IoC Container de .NET
- **Middleware Pattern**: Manejo global de excepciones
- **DTO Pattern**: Separación entre dominio y API

#### Frontend
- **Context API**: Gestión de estado global
- **Component Pattern**: Componentes reutilizables
- **Custom Hooks**: Lógica compartida
- **Service Layer**: Comunicación con API
- **Type Safety**: TypeScript estricto

---

## 🧪 Pruebas

### Probar el Backend


---

## 🔧 Comandos Útiles

**Crear nueva migración:**
```bash
dotnet ef migrations add NombreDeLaMigracion
```

**Aplicar migraciones:**
```bash
dotnet ef database update
```

**Revertir última migración:**
```bash
dotnet ef database update NombreDeMigracionAnterior
```

**Eliminar última migración:**
```bash
dotnet ef migrations remove
```

### Compilar y ejecutar

**Compilar:**
```bash
dotnet build
```

**Ejecutar:**
```bash
dotnet run
```

**Ejecutar con recarga automática:**
```bash
dotnet watch run
```

## 🐛 Solución de Problemas

### Error de conexión a SQL Server
- Verifica que SQL Server esté ejecutándose
- Confirma que la cadena de conexión en `appsettings.json` sea correcta
- Asegúrate de que el usuario tenga permisos en la base de datos

### Error 400 al crear un libro
- Verifica que el JSON esté bien formado
- Asegúrate de que todos los campos requeridos estén presentes
- Confirma que la fecha no sea futura
- Revisa que los campos no excedan la longitud máxima

### Los nuevos libros no aparecen inmediatamente
- Es normal: el caché está activo y expira cada 5 minutos
- Puedes cambiar los parámetros de paginación para ver una clave de caché diferente
- O espera 5 minutos para que el caché expire

## 👨‍💻 Autor

**Jose Bertoni**
- GitHub: [@JoseBertoni](https://github.com/JoseBertoni)

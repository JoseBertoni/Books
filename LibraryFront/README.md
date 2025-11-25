# Biblioteca Virtual - Frontend

Frontend desarrollado con React, TypeScript y Material UI para la gestión de libros.

## 🚀 Tecnologías

- **React 19** con TypeScript
- **Material UI (MUI)** para el diseño
- **Context API** para gestión de estado
- **Axios** para comunicación con la API
- **Vite** como bundler
- **date-fns** para manejo de fechas

## 📋 Características

- ✅ Listado de libros con paginación
- ✅ Formulario para agregar nuevos libros
- ✅ Validaciones completas en el frontend
- ✅ Manejo de errores con mensajes claros
- ✅ Diseño responsive y moderno
- ✅ Animaciones y transiciones suaves
- ✅ Estados de carga (loading states)
- ✅ Notificaciones con Snackbars

## 🛠️ Instalación

1. Asegúrate de tener Node.js instalado (versión 18 o superior)

2. Instala las dependencias:
```bash
npm install
```

3. Configura la URL de la API en el archivo `.env`:
```env
VITE_API_URL=https://localhost:7285/api
```

> Nota: El archivo `.env.example` ya contiene la configuración por defecto.

## 🏃‍♂️ Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Build para Producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ErrorSnackbar/   # Notificaciones de error
│   ├── Layout/          # Layout principal
│   ├── LibroCard/       # Card de libro individual
│   ├── LibroForm/       # Formulario de creación
│   └── LibroList/       # Lista con paginación
├── context/             # Context API
│   └── LibrosContext.tsx
├── services/            # Servicios HTTP
│   └── api.service.ts
├── types/               # TypeScript types
│   └── libro.types.ts
├── config/              # Configuración
│   └── api.config.ts
├── App.tsx              # Componente principal
└── main.tsx            # Punto de entrada
```

## 🎨 Características de UX

- **Cards con hover effects** que elevan al pasar el mouse
- **Formulario con validaciones en tiempo real**
- **Paginación integrada** para navegar entre páginas
- **Estados de carga** con spinners
- **Mensajes de error y éxito** claramente visibles
- **Diseño responsive** que se adapta a móviles y tablets
- **Tema personalizado** con colores corporativos

## 🔗 Conexión con el Backend

Asegúrate de que el backend (.NET API) esté corriendo antes de iniciar el frontend. La API debe estar disponible en:

- `https://localhost:7285` (o la URL configurada en `.env`)

El backend debe tener CORS configurado para permitir peticiones desde:
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (Create React App, si aplica)

## 📝 Validaciones Implementadas

### Formulario de Libro:
- **Título**: Obligatorio, máximo 200 caracteres
- **Autor**: Obligatorio, máximo 100 caracteres
- **Descripción**: Obligatoria, máximo 1000 caracteres
- **Género**: Obligatorio, selección de lista predefinida
- **Fecha de publicación**: Obligatoria, no puede ser futura

## 🌐 API Endpoints Utilizados

- `GET /api/Libros?pageNumber={n}&pageSize={n}` - Obtener libros paginados
- `POST /api/Libros` - Crear nuevo libro

## 👨‍💻 Desarrollo

El proyecto utiliza las mejores prácticas de React:
- Componentes funcionales con hooks
- TypeScript para type safety
- Context API para estado global
- Custom hooks para lógica reutilizable
- Separación de responsabilidades
- Código limpio y mantenible

---

Desarrollado como parte del Challenge Técnico Remitee

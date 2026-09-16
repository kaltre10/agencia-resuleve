# Tareas del Proyecto

## ETAPA 1: Documentacion
- [x] Crear PLAN.md
- [x] Crear TASKS.md
- [x] Crear SPECS.md

## ETAPA 2: Servidor - Setup
- [x] Inicializar proyecto Node (npm init)
- [x] Instalar dependencias
- [x] Crear estructura de carpetas
- [x] Configurar .env con variables de entorno
- [x] Crear configuracion de base de datos (config/db.js)

## ETAPA 3: Servidor - Modelo y Auth
- [x] Crear modelo User (models/User.js)
- [x] Crear servicio de auth (services/authService.js)
- [x] Crear middleware de autenticacion (middlewares/auth.js)
- [x] Crear middleware de roles (middlewares/role.js)
- [x] Crear middleware de errores (middlewares/errorHandler.js)
- [x] Crear rutas de auth (routes/auth.js)
- [x] Crear controlador de auth (controllers/authController.js)

## ETAPA 4: Servidor - Rutas Protegidas
- [x] Crear ruta GET /api/users (admin only)
- [x] Configurar express-validator para validacion
- [x] Crear seed.js para usuario admin

## ETAPA 5: Frontend - Setup
- [x] Crear proyecto Vite + React
- [x] Instalar dependencias (react-router-dom, axios, zustand, sonner)
- [x] Configurar Shadcn/ui con componentes
- [x] Configurar .env con VITE_API_URL
- [x] Configurar vite.config.js con alias @ y proxy
- [x] Configurar jsconfig.json para aliases

## ETAPA 6: Frontend - Auth
- [x] Crear instancia de axios con fallback de baseURL
- [x] Crear store de auth con Zustand (store/authStore.js)
- [x] Crear componente ProtectedRoute con soporte de roles
- [x] Crear pagina de Login con shadcn
- [x] Configurar interceptores de axios

## ETAPA 7: Frontend - Paginas y UI
- [x] Crear Dashboard (protegido)
- [x] Crear Home (publica, sin boton login)
- [x] Crear AdminPanel (solo admin)
- [x] Crear pagina Unauthorized
- [x] Configurar rutas con React Router
- [x] Implementar dark mode con next-themes
- [x] Agregar ThemeToggle a todas las paginas
- [x] Agregar cursor-pointer a componentes shadcn
- [x] Usar lucide-react para iconos (sin SVG inline)

## ETAPA 8: Integracion
- [x] Conectar login con backend
- [x] Verificar proteccion de rutas por roles
- [x] Testear endpoints con test-login.js
- [x] Actualizar SPECS.md con todas las lecciones aprendidas
- [x] Limpiar archivos de test innecesarios

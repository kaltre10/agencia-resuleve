# Planificacion del Proyecto - Landing Page Administrable

## Vision General

Sistema de landing page administrable desde servidor, con autenticacion JWT y panel de administracion protegido.

## Arquitectura

`
lotery/
├── server/          (Express + Mongoose + JWT)
│   ├── src/
│   │   ├── config/         # Conexion DB, variables de entorno
│   │   ├── controllers/    # Logica de negocio
│   │   ├── middlewares/    # Auth, roles, error handler
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Endpoints API
│   │   ├── services/       # Logica encapsulada
│   │   └── app.js          # Entry point
│   └── package.json
│
└── client/          (React + Vite + Shadcn)
    ├── src/
    │   ├── api/            # Axios instance
    │   ├── components/     # Componentes reutilizables
    │   ├── hooks/          # Custom hooks
    │   ├── pages/          # Vistas (Login, Dashboard, Home)
    │   ├── store/          # Estado global (Zustand)
    │   └── routes/         # Navegacion
    └── package.json
`

## Stack Tecnologico

| Capa | Tecnologia |
|------|------------|
| Frontend | React + Vite |
| UI | Shadcn/ui |
| Estado | Zustand |
| HTTP Client | Axios |
| Router | React Router DOM |
| Backend | Express |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcryptjs |
| Validacion | express-validator |

## Modelo de Datos

### User
- name: String (requerido)
- email: String (requerido, unico, lowercase)
- password: String (requerido, hasheado con bcrypt)
- role: String (enum: admin, user, default: user)
- isActive: Boolean (default: true)
- timestamps: createdAt, updatedAt

## Autenticacion

1. Login: POST /api/auth/login -> retorna { token, user }
2. Verificacion: GET /api/auth/me -> retorna user del token
3. Proteccion: Middleware authMiddleware verifica JWT
4. Roles: roleMiddleware(['admin']) protege rutas por rol

## Endpoints

### Publicos
- POST /api/auth/login - Iniciar sesion

### Protegidos (cualquier rol autenticado)
- GET /api/auth/me - Obtener usuario actual

### Protegidos (solo admin)
- GET /api/users - Listar usuarios
- GET /api/landing - Obtener contenido landing
- PUT /api/landing - Actualizar contenido landing

## Rutas Frontend

| Ruta | Componente | Acceso |
|------|------------|--------|
| / | Home | Publico |
| /login | Login | Publico |
| /dashboard | Dashboard | Autenticado |
| /admin | AdminPanel | Solo admin |
| /unauthorized | Unauthorized | Publico |

## Manejo de Errores

- Toasts con sonner para notificaciones
- Error handler centralizado en backend
- Interceptor axios para manejar 401/403

## Seguridad

- Password hasheado con bcrypt (12 rounds)
- JWT con expiracion configurable
- CORS configurado para frontend
- Helmet para headers de seguridad
- Rate limiting en rutas de login

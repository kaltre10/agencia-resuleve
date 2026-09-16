# Especificaciones Tecnicas - Template Login con Auth JWT

> Template reutilizable para proyectos con login, roles y servidor Express + React.

---

## Stack Tecnologico

### Backend
| Paquete | Version | Uso |
|---------|---------|-----|
| express | v4.18+ | Framework HTTP |
| mongoose | v7+ | ODM MongoDB |
| dotenv | v16+ | Variables de entorno |
| cors | v2.8+ | Cross-origin resource sharing |
| helmet | v7+ | Headers de seguridad |
| bcryptjs | v2.4+ | Hashing de passwords |
| jsonwebtoken | v9+ | Autenticacion JWT |
| express-validator | v7+ | Validacion de inputs |

### Frontend
| Paquete | Version | Uso |
|---------|---------|-----|
| react | v18+ | UI library |
| vite | v5+ | Build tool |
| react-router-dom | v6+ | Navegacion |
| zustand | v4+ | State management |
| axios | v1+ | HTTP client |
| sonner | latest | Toast notifications |
| shadcn/ui | latest | Componentes UI |
| tailwindcss | v4+ | CSS utility-first |
| lucide-react | latest | Iconos |
| next-themes | latest | Dark mode |

---

## Estructura del Proyecto

```
project/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Conexion MongoDB
│   │   ├── controllers/
│   │   │   └── authController.js  # Logica de auth
│   │   ├── middlewares/
│   │   │   ├── auth.js            # Verificacion JWT
│   │   │   ├── role.js            # Verificacion de roles
│   │   │   └── errorHandler.js    # Error handler centralizado
│   │   ├── models/
│   │   │   └── User.js            # Modelo de usuario
│   │   ├── routes/
│   │   │   ├── auth.js            # Rutas de autenticacion
│   │   │   └── users.js           # Rutas de usuarios
│   │   ├── services/
│   │   │   └── authService.js     # Logica de negocio auth
│   │   └── app.js                 # Entry point
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── seed.js                    # Script para crear admin
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js           # Instancia axios configurada
│   │   ├── components/
│   │   │   ├── ui/                # Componentes shadcn (NO MODIFICAR)
│   │   │   ├── ProtectedRoute.jsx # Ruta protegida por auth/roles
│   │   │   ├── ThemeProvider.jsx  # Provider de next-themes
│   │   │   └── ThemeToggle.jsx    # Boton toggle dark/light
│   │   ├── lib/
│   │   │   └── utils.js           # cn() para classnames
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   └── Unauthorized.jsx
│   │   ├── store/
│   │   │   └── authStore.js       # Zustand auth store
│   │   ├── routes/
│   │   │   └── AppRouter.jsx      # Configuracion de rutas
│   │   ├── App.jsx                # Root con ThemeProvider
│   │   ├── index.css              # Estilos shadcn + tailwind
│   │   └── main.jsx               # Entry point React
│   ├── .env
│   ├── .gitignore
│   ├── jsconfig.json              # Alias @/ para imports
│   ├── package.json
│   └── vite.config.js             # Vite + proxy + tailwind
│
├── PLAN.md
├── TASKS.md
└── SPECS.md
```

---

## Variables de Entorno

### CRITICO: El .env del client se carga SOLO al iniciar Vite

Si creas o modificas el `.env` del client, DEBES reiniciar `npm run dev`.

### Server (.env)
```env
PORT=4000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority
JWT_SECRET=secreto_super_seguro_aqui
JWT_EXPIRES=7d
CLIENT_URL=http://localhost:5173
```

### Client (.env)
```env
VITE_API_URL=http://localhost:4000/api
```

---

## Configuracion Critica

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})
```

### jsconfig.json (REQUERIDO para shadcn)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### axios.js - SIEMPRE con fallback del baseURL
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  // ...
});
```

**POR QUE**: Si VITE_API_URL no se carga (problema comun), el fallback evita que las peticiones vayan a Vite (puerto 5173) en vez del server (puerto 4000).

### db.js - Conexion MongoDB
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexion a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

**NOTA**: No usar `family: 4` a menos que tengas problemas especificos de IPv6 con MongoDB Atlas.

---

## Modelo de Datos

### User Schema
```javascript
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalido'],
    },
    password: {
      type: String,
      required: [true, 'La contrasena es requerida'],
      minlength: 6,
      select: false,  // Nunca retornar password por defecto
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
```

---

## Endpoints API

### Auth (Publico)
| Metodo | Ruta | Body | Response |
|--------|------|------|----------|
| POST | /api/auth/login | `{ email, password }` | `{ token, user }` |

### Auth (Protegido)
| Metodo | Ruta | Auth | Response |
|--------|------|------|----------|
| GET | /api/auth/me | JWT | `{ user }` |

### Users (Admin only)
| Metodo | Ruta | Auth | Rol | Response |
|--------|------|------|-----|----------|
| GET | /api/users | JWT | admin | `{ users }` |

---

## Autenticacion JWT

### Flujo Completo
```
1. Frontend POST /api/auth/login { email, password }
2. Backend busca user, compara password con bcrypt
3. Backend genera JWT: jwt.sign({ id, role }, SECRET, { expiresIn })
4. Backend retorna { token, user }
5. Frontend guarda token en localStorage
6. Frontend envia Authorization: Bearer <token> en cada request
7. Backend authMiddleware verifica token en cada ruta protegida
```

### Estructura del Token
```javascript
{
  id: user._id,
  role: user.role,
  iat: timestamp,
  exp: timestamp + 7d
}
```

### authMiddleware
```javascript
// Extrae y verifica token
// Adjunta req.user = { id, name, email, role }
// Retorna 401 si token invalido/expirado
```

### roleMiddleware(roles)
```javascript
// Factory: roleMiddleware(['admin'])
// Verifica req.user.role contra roles permitidos
// Retorna 403 si no tiene permiso
```

---

## Auth Store (Zustand)

```javascript
{
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  login: async (email, password) => { /* POST /api/auth/login */ },
  logout: () => { /* limpia localStorage + state */ },
  checkAuth: async () => { /* GET /api/auth/me */ }
}
```

---

## ProtectedRoute

```javascript
<ProtectedRoute>              // Solo requiere login
<ProtectedRoute roles={['admin']}>  // Requiere rol admin
```

- Sin auth → redirect `/login`
- Sin rol adecuado → redirect `/unauthorized`

---

## Errores Comunes y Soluciones

### 1. "Error del servidor" en login sin logs en el server
**Causa**: El request no llega al server.
**Causa comun**: `VITE_API_URL` no se cargo → axios usa baseURL vacio → request a Vite (5173) en vez de server (4000).
**Solucion**: Siempre usar fallback: `baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'`

### 2. "querySRV ECONNREFUSED" con MongoDB Atlas
**Causa**: Node.js no puede resolver registros SRV (DNS local no lo soporta).
**Solucion**: Usar `mongodb://` (sin +srv) con hosts directos de los shards.

### 3. "Could not connect to any servers" en Atlas
**Causa**: IP no whitelisteada en MongoDB Atlas.
**Solucion**: Agregar IP en Atlas → Network Access. Si tu IP es IPv6, Atlas puede no soportarla.

### 4. CORS error en browser
**Causa**: Helmet bloquea headers o CORS no configurado.
**Solucion**:
```javascript
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
```

### 5. Template literal roto en interceptor
**Error comun**: `config.headers.Authorization = Bearer ;` (faltan backticks)
**Correcto**: `` config.headers.Authorization = `Bearer ${token}`; ``

### 6. shadcn init falla "Could not find valid path aliases"
**Causa**: Falta `jsconfig.json` con paths.
**Solucion**: Crear `jsconfig.json` con `"@/*": ["./src/*"]` ANTES de `npx shadcn init`.

---

## Convenciones de UI

### Cursor Pointer
Todos los elementos interactivos DEBEN tener `cursor-pointer`:
- Botones, Inputs, Labels, Selects, Links
- Agregar en clases base de los componentes shadcn

### Iconos
- SIEMPRE usar **lucide-react**, NUNCA SVG inline
- Import: `import { IconName } from 'lucide-react'`
- Tamano: clases `size-4`, `size-5`, `size-6`

### Dark Mode
- Provider: `next-themes` con `attribute="class"` y `defaultTheme="system"`
- Toggle: componente `ThemeToggle` con Sun/Moon de lucide-react
- Disponible en todas las paginas

---

## Checklist Setup Nuevo Proyecto

### Backend
- [ ] `npm init` + instalar dependencias
- [ ] Crear estructura de carpetas
- [ ] Configurar `.env` con MONGODB_URI, JWT_SECRET, JWT_EXPIRES, CLIENT_URL
- [ ] Crear `config/db.js` con mongoose.connect
- [ ] Crear modelo User con select: false en password
- [ ] Crear authService con login (bcrypt.compare + jwt.sign)
- [ ] Crear middlewares: auth.js, role.js, errorHandler.js
- [ ] Crear rutas con express-validator
- [ ] Configurar CORS con CLIENT_URL
- [ ] Configurar Helmet
- [ ] Crear seed.js para usuario admin

### Frontend
- [ ] `npm create vite@latest client -- --template react`
- [ ] Instalar: react-router-dom, axios, zustand, sonner
- [ ] Instalar shadcn: `npx shadcn init -d`
- [ ] Agregar componentes: `npx shadcn add input label card button sonner`
- [ ] Crear `jsconfig.json` con paths `@/*`
- [ ] Configurar `vite.config.js` con alias `@` y proxy `/api`
- [ ] Crear `.env` con `VITE_API_URL=http://localhost:4000/api`
- [ ] Crear axios.js con **SIEMPRE** fallback en baseURL
- [ ] Crear authStore con Zustand (login, logout, checkAuth)
- [ ] Crear ProtectedRoute con soporte de roles
- [ ] Crear ThemeProvider + ThemeToggle
- [ ] Crear paginas: Login, Dashboard, Home, AdminPanel, Unauthorized
- [ ] Configurar rutas con React Router
- [ ] Agregar cursor-pointer a componentes shadcn
- [ ] Agregar lucide-react icons (nunca SVG inline)
- [ ] Verificar build: `npm run build`

### Pruebas
- [ ] Server: `npm run start` → debe conectar a MongoDB
- [ ] Client: `npm run dev` → debe cargar en browser
- [ ] Login: POST /api/auth/login → retorna token
- [ ] Dashboard: ruta protegida → redirige a /login si no auth
- [ ] Admin: ruta solo admin → redirige a /unauthorized si no admin
- [ ] Dark mode: toggle funciona en todas las paginas
- [ ] Toasts: errores y exito se muestran correctamente

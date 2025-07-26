# Sistema de Gestión con Roles - React Admin

Una aplicación React moderna con sistema de autenticación y roles diferenciados (Admin/Usuario).

## 🚀 Características

- **Autenticación con roles** (Admin/Usuario)
- **UI moderna** con Tailwind CSS y Radix UI
- **Diseño responsive** para móvil y desktop
- **Sistema de métricas** con gráficos
- **Gestión de usuarios** mockeada
- **Navegación protegida** por roles

## 🔐 Usuarios de Prueba

### Acceso Rápido

- **Admin:** `admin@test.com` / `admin123`
- **Usuario:** `user@test.com` / `user123`

### Botones de Acceso Rápido

En la página de login encontrarás botones para llenar automáticamente las credenciales.

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📱 Uso

1. **Acceder al login** en `/login`
2. **Usar botones de acceso rápido** o ingresar credenciales manualmente
3. **Sistema redirige automáticamente** según el rol:
   - Admin → `/admin/dashboard`
   - Usuario → `/user`

## 🏗️ Estructura del Proyecto

```
src/
├── api/           # Servicios de API
├── auth/          # Contexto de autenticación
├── components/    # Componentes reutilizables
├── hooks/         # Custom hooks
├── layouts/       # Layouts por rol
├── routes/        # Configuración de rutas
├── screens/       # Páginas de la aplicación
├── store/         # Estado global (Zustand)
└── types/         # Tipos TypeScript
```

## 🎨 Tecnologías

- **React 18** + **TypeScript**
- **Vite** (Bundler)
- **Tailwind CSS** (Estilos)
- **Radix UI** (Componentes)
- **Zustand** (Estado)
- **React Router** (Navegación)
- **Recharts** (Gráficos)

## 📋 Funcionalidades por Rol

### 👑 Administrador

- Dashboard con métricas
- Gestión de usuarios
- Configuración del sistema
- Soporte técnico

### 👤 Usuario

- Landing page personal
- Dashboard con métricas
- Gestión de servidores
- Panel de alertas
- Soporte técnico

## 🔧 Configuración

El proyecto incluye:

- **Usuarios mockeados** para desarrollo
- **API externa** configurada
- **Sistema de persistencia** de sesión
- **Validación de formularios** con Zod

## 📖 Documentación

Para más detalles sobre los usuarios de prueba, consulta [USUARIOS_DEMO.md](./USUARIOS_DEMO.md)

## 🚀 Desarrollo

```bash
# Ejecutar en modo desarrollo
npm run dev

# Linting
npm run lint

# Preview de producción
npm run preview
```

## 📝 Notas

- Los usuarios mockeados son solo para desarrollo
- El sistema mantiene compatibilidad con usuarios locales y API externa
- Diseño responsive optimizado para móvil y desktop

export const paths = {
  // Ruta pública para landing page
  root: "/",
  landingPage: "/",

  auth: {
    root: "/auth",
    login: "/auth/login",
    register: "/auth/register",
  },
  admin: {
    root: "/admin",
    dashboard: "/admin/dashboard",
    users: "/admin/users",
    config: "/admin/config",
    support: "/admin/support",
  },
  user: {
    root: "/user",
    // Ruta de inicio por defecto después del login
    dashboard: "/user/dashboard",
    misServidores: "/user/misServidores", // Componente separado para otro uso
    servidores: "/user/servidores",
    servidoresProcesando: "/user/servidores/procesando",
    servidoresRecomendaciones: "/user/servidores/recomendaciones",
    perfil: "/user/perfil",
    panelDeAlertas: "/user/panel-de-alertas",
    rendimiento: "/user/rendimiento",
    configuracion: "/user/configuracion",
    alertas: "/user/alertas",
    support: "/user/support",
  },
} as const;

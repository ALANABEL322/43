export const paths = {
  // Auth routes
  auth: {
    login: "/login",
    register: "/register",
  },
  // Admin routes
  admin: {
    root: "/admin",
    dashboard: "/admin/dashboard",
    users: "/admin/users",
    config: "/admin/config",
    support: "/admin/support",
  },
  // User routes
  user: {
    root: "/user",
    landingPage: "/user",
    inicio: "/user/inicio",
    servidores: "/user/servidores",
    servidoresProcesando: "/user/servidores/procesando",
    servidoresRecomendaciones: "/user/servidores/recomendaciones",
    perfil: "/user/perfil",
    panelDeAlertas: "/user/panel-de-alertas",
    dashboard: "/user/dashboard",
    alertas: "/user/alertas",
    support: "/user/support",
  },
  // Root route
  root: "/",
} as const;

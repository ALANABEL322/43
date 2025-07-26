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
    dashboard: "/user/dashboard",
    servidores: "/user/servidores",
    alertas: "/user/alertas",
    support: "/user/support",
  },
  // Root route
  root: "/",
} as const;

export const paths = {
  // Auth routes
  auth: {
    login: '/login',
    register: '/register',
  },
  // Admin routes
  admin: {
    root: '/admin',
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    reports: '/admin/reports',
    support: '/admin/support',
  },
  // User routes
  user: {
    root: '/user',
    landingPage: '/user/landingPage',
    createProject: '/user/createProject',
    projects: '/user/projects',
    support: '/user/support',
  },
  // Root route
  root: '/',
} as const;

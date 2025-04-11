import { useRoutes, Navigate } from 'react-router-dom'
import { publicRoutes, adminRoutes, userRoutes } from './routes'
import { paths } from './paths'

export default function Router() {
  return useRoutes([
    // Public routes (login, register)
    ...publicRoutes,

    // Admin routes
    ...adminRoutes,

    // User routes
    ...userRoutes,

    // Default redirect
    {
      path: '*',
      element: <Navigate to={paths.root} replace />
    }
  ])
}
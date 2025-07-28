import { useRoutes, Navigate } from 'react-router-dom'
import { publicRoutes, adminRoutes, userRoutes } from './routes'
import { paths } from './paths'

export default function Router() {
  return useRoutes([
   
    ...publicRoutes,

    ...adminRoutes,

    ...userRoutes,

    {
      path: '*',
      element: <Navigate to={paths.root} replace />
    }
  ])
}
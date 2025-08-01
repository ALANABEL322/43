import { Outlet, RouteObject } from "react-router-dom";
import { paths } from "./paths";

// Layouts
import Layout from "@/components/layout/Layout";
import AuthLayout from "@/screens/authScreens/authLayout";

// Auth pages
import LoginForm from "@/screens/authScreens/loginForm";
import RegisterForm from "@/screens/authScreens/registerForm";

// Admin pages
import UsersPage from "@/screens/(admin)/users";
import Config from "@/screens/(admin)/config";
import AdminSupportPage from "@/screens/(admin)/support";
import DashboardAdmin from "@/screens/(admin)/dashboard";

// User pages
import LandingPage from "@/screens/(user)/landingpage/landingPage";
import { UserDashboard } from "@/screens/(user)/dashboard";
import { UserSupportPage } from "@/screens/(user)/support";
import ProtectedRoute from "./ProtectedRoute";
import { Inicio } from "@/screens/(user)/inicio";
import Perfil from "@/screens/(user)/perfil";
import Servidores from "@/screens/(user)/servidores";
import ServidoresProcesando from "@/screens/(user)/servidoresProcesando";
import ServidoresRecomendaciones from "@/screens/(user)/servidoresRecomendaciones";
import PanelDeAlertas from "@/screens/(user)/panelDeAlertas";
import Rendimiento from "@/screens/(user)/rendimiento";
import Configuracion from "@/screens/(user)/configuracion";

export const publicRoutes: RouteObject[] = [
  {
    path: paths.auth.root,
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
    ],
  },
  {
    path: paths.root,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginForm />,
      },
    ],
  },
];

export const adminRoutes: RouteObject[] = [
  {
    path: paths.admin.root,
    element: (
      <ProtectedRoute>
        <Layout>
          <Outlet />
        </Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: paths.admin.dashboard,
        element: <DashboardAdmin />,
      },
      {
        path: paths.admin.users,
        element: <UsersPage />,
      },
      {
        path: paths.admin.config,
        element: <Config />,
      },
      {
        path: paths.admin.support,
        element: <AdminSupportPage />,
      },
    ],
  },
];

export const userRoutes: RouteObject[] = [
  {
    path: paths.user.root,
    element: (
      <ProtectedRoute>
        <Layout>
          <Outlet />
        </Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: paths.user.inicio,
        element: <Inicio />,
      },
      {
        path: paths.user.perfil,
        element: <Perfil />,
      },
      {
        path: paths.user.landingPage,
        element: <LandingPage />,
      },
      {
        path: paths.user.dashboard,
        element: <UserDashboard />,
      },
      {
        path: paths.user.support,
        element: <UserSupportPage />,
      },
      {
        path: paths.user.panelDeAlertas,
        element: <PanelDeAlertas />,
      },
      {
        path: paths.user.rendimiento,
        element: <Rendimiento />,
      },
      {
        path: paths.user.configuracion,
        element: <Configuracion />,
      },
      {
        path: paths.user.servidores,
        element: <Servidores />,
      },
      {
        path: paths.user.servidoresProcesando,
        element: <ServidoresProcesando />,
      },
      {
        path: paths.user.servidoresRecomendaciones,
        element: <ServidoresRecomendaciones />,
      },
    ],
  },
];

export const routes: RouteObject[] = [
  ...publicRoutes,
  ...adminRoutes,
  ...userRoutes,
];

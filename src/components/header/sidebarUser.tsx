import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Home,
<<<<<<< HEAD
  Handshake,
  Database,
  LogOut,
  LayoutDashboard,
  CircleAlert,
  User,
=======
  Users,
  Server,
  AlertTriangle,
  LogOut,
  BarChart3,
>>>>>>> main
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/paths";

export default function SidebarUser() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(paths.auth.login);
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarHeader>
            <div className="flex items-center gap-2 mt-20">
              <Home className="h-5 w-5 text-white" />
              <span className="text-lg font-semibold text-white">
                Mi Cuenta
              </span>
            </div>
          </SidebarHeader>

          <SidebarGroup>
            <SidebarGroupLabel className="text-white">
              Mi Espacio
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
<<<<<<< HEAD
                    onClick={() => navigate(paths.user.inicio)}
=======
                    onClick={() => navigate(paths.user.landingPage)}
>>>>>>> main
                    className="w-full"
                  >
                    <LayoutDashboard className="h-4 w-4 text-white" />
                    <span className="text-white">Inicio</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
<<<<<<< HEAD
                    onClick={() => navigate(paths.user.perfil)}
                    className="w-full"
                  >
                    <User className="h-4 w-4 text-white" />
                    <span className="text-white">Perfil</span>
=======
                    onClick={() => navigate(paths.user.dashboard)}
                    className="w-full"
                  >
                    <BarChart3 className="h-4 w-4 text-white" />
                    <span className="text-white">Dashboard</span>
>>>>>>> main
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate(paths.user.servidores)}
                    className="w-full"
                  >
<<<<<<< HEAD
                    <Database className="h-4 w-4 text-white" />
=======
                    <Server className="h-4 w-4 text-white" />
>>>>>>> main
                    <span className="text-white">Servidores</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
<<<<<<< HEAD
                    onClick={() => navigate(paths.user.panelDeAlertas)}
                    className="w-full"
                  >
                    <CircleAlert className="h-4 w-4 text-white" />
                    <span className="text-white">Panel de alertas</span>
=======
                    onClick={() => navigate(paths.user.alertas)}
                    className="w-full"
                  >
                    <AlertTriangle className="h-4 w-4 text-white" />
                    <span className="text-white">Panel de Alertas</span>
>>>>>>> main
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate(paths.user.support)}
                    className="w-full"
                  >
                    <Handshake className="h-4 w-4 text-white" />
                    <span className="text-white">Soporte</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="w-full text-white"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-white">Cerrar sesión</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

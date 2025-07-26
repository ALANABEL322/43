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
  Users,
  Server,
  AlertTriangle,
  LogOut,
  BarChart3,
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
                    onClick={() => navigate(paths.user.landingPage)}
                    className="w-full"
                  >
                    <Home className="h-4 w-4 text-white" />
                    <span className="text-white">Inicio</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate(paths.user.dashboard)}
                    className="w-full"
                  >
                    <BarChart3 className="h-4 w-4 text-white" />
                    <span className="text-white">Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate(paths.user.servidores)}
                    className="w-full"
                  >
                    <Server className="h-4 w-4 text-white" />
                    <span className="text-white">Servidores</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate(paths.user.alertas)}
                    className="w-full"
                  >
                    <AlertTriangle className="h-4 w-4 text-white" />
                    <span className="text-white">Panel de Alertas</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate(paths.user.support)}
                    className="w-full"
                  >
                    <Users className="h-4 w-4 text-white" />
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

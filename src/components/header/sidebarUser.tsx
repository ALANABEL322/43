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
  Handshake,
  Database,
  LogOut,
  LayoutDashboard,
  CircleAlert,
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
                    onClick={() => navigate(paths.user.inicio)}
                    className="w-full"
                  >
                    <LayoutDashboard className="h-4 w-4 text-white" />
                    <span className="text-white">Inicio</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate(paths.user.servidores)}
                    className="w-full"
                  >
                    <Database className="h-4 w-4 text-white" />
                    <span className="text-white">Servidores</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate(paths.user.panelDeAlertas)}
                    className="w-full"
                  >
                    <CircleAlert className="h-4 w-4 text-white" />
                    <span className="text-white">Panel de alertas</span>
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

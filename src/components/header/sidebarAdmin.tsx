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
  BarChart3,
  MonitorCog,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/paths";

export default function SidebarAdmin() {
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
                Dashboard
              </span>
            </div>
          </SidebarHeader>

          <SidebarGroup>
            <SidebarGroupLabel className="text-white">
              Menú Principal
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate(paths.admin.dashboard)}
                    className="w-full"
                  >
                    <BarChart3 className="h-4 w-4 text-white" />
                    <span className="text-white">Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate(paths.admin.users)}
                    className="w-full"
                  >
                    <Users className="h-4 w-4 text-white" />
                    <span className="text-white">Usuarios</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate(paths.admin.config)}
                    className="w-full"
                  >
                    <MonitorCog className="h-4 w-4 text-white" />
                    <span className="text-white">Configuración</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate(paths.admin.support)}
                    className="w-full"
                  >
                    <Settings className="h-4 w-4 text-white" />
                    <span className="text-white">Soporte</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="w-full">
                  <LogOut className="h-4 w-4 text-white" />
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

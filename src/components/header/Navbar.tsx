import { useAuthStore } from "@/store/authStore";
import { useAlertsStore } from "@/store/alertsStore";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logoApp.png";
import { paths } from "@/routes/paths";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { alerts } = useAlertsStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(paths.auth.login);
  };

  // Contar alertas activas y no leídas
  const activeAlerts = alerts.filter((alert) => alert.isActive);
  const unreadAlerts = alerts.filter(
    (alert) => !alert.isRead && alert.isActive
  );
  const criticalAlerts = alerts.filter(
    (alert) => alert.type === "critical" && alert.isActive
  );

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center">
            <img
              src={logo}
              className="h-6 w-8 mr-3 sm:h-14 sm:w-28"
              alt="Leadty Logo"
            />
          </div>
        </div>

        <div className="pr-4">
          {user ? (
            <div className="flex items-center gap-4">
              {/* Icono de Campana con Contador */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(paths.user.panelDeAlertas)}
                className="relative p-2 hover:bg-gray-100 rounded-full"
                title="Panel de Alertas"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadAlerts.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
                  >
                    {unreadAlerts.length > 9 ? "9+" : unreadAlerts.length}
                  </Badge>
                )}
                {criticalAlerts.length > 0 && unreadAlerts.length === 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
                  >
                    {criticalAlerts.length > 9 ? "9+" : criticalAlerts.length}
                  </Badge>
                )}
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {user.username}
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full">
                  {user.role === "admin" ? "Admin" : "Usuario"}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

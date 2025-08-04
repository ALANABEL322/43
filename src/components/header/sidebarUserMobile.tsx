import { useNavigate } from "react-router-dom";
import {
  LifeBuoy,
  LogOut,
  Server,
  AlertTriangle,
  BarChart3,
  LayoutDashboard,
} from "lucide-react";
import { motion } from "framer-motion";
import { paths } from "@/routes/paths";
import { useAuthStore } from "@/store/authStore";

interface SidebarUserMobileProps {
  visible?: boolean;
}

export default function SidebarUserMobile({
  visible = true,
}: SidebarUserMobileProps) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.clear();

    // Limpiar sessionStorage
    sessionStorage.clear();

    // Limpiar cache del navegador (si es posible)
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }

    // Ejecutar logout del store
    logout();

    // Navegar al login
    navigate(paths.auth.login);
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      path: paths.user.misServidores,
      tooltip: "Mis Servidores",
      color: "#3B82F6",
    },
    {
      icon: BarChart3,
      path: paths.user.dashboard,
      tooltip: "Dashboard",
      color: "#8B5CF6",
    },
    {
      icon: Server,
      path: paths.user.servidores,
      tooltip: "Servidores",
      color: "#E65100",
    },
    {
      icon: AlertTriangle,
      path: paths.user.panelDeAlertas,
      tooltip: "Panel de Alertas",
      color: "#26C6DA",
    },
    {
      icon: LifeBuoy,
      path: paths.user.support,
      tooltip: "Soporte",
      color: "#66BB6A",
    },
    {
      icon: LogOut,
      action: handleLogout,
      tooltip: "Cerrar sesión",
      color: "#EF5350",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 20,
      }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed bottom-0 left-0 right-0 h-16 bg-[#F6EEEE] border-t border-gray-200 flex justify-around items-center shadow-md z-40"
    >
      {menuItems.map((item, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (item.action ? item.action() : navigate(item.path!))}
          className="relative p-4 group"
          title={item.tooltip}
        >
          <motion.div
            className="relative z-10"
            initial={{ color: "#9CA3AF" }}
            whileHover={{ color: item.color }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <item.icon className="h-6 w-6" />
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-full opacity-0"
            style={{ backgroundColor: item.color }}
            initial={{ scale: 0.8 }}
            whileHover={{
              opacity: 0.2,
              scale: 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.button>
      ))}
    </motion.div>
  );
}

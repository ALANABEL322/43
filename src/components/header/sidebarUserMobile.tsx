import { useNavigate } from "react-router-dom";
import {
<<<<<<< HEAD
  Home,
  Handshake,
  Database,
  LogOut,
  LayoutDashboard,
  CircleAlert,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
=======
  LifeBuoy,
  LogOut,
  Server,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import { paths } from "@/routes/paths";
import { useAuthStore } from "@/store/authStore";
>>>>>>> main

interface SidebarUserMobileProps {
  visible?: boolean;
}

export default function SidebarUserMobile({
  visible = true,
}: SidebarUserMobileProps) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate(paths.auth.login);
  };

  const menuItems = [
    {
<<<<<<< HEAD
      icon: LayoutDashboard,
      path: "/dashboard/inicio",
      tooltip: "inicio",
      color: "#ebcbae",
    },
    {
      icon: User,
      path: "/dashboard/perfil",
      tooltip: "perfil",
      color: "#e8c102",
    },
    {
      icon: Database,
      path: "/dashboard/servidores",
      tooltip: "servidores",
      color: "#26C6DA",
    },
    {
      icon: CircleAlert,
      path: "/dashboard/panel-de-alertas",
      tooltip: "panel de alertas",
      color: "#e77927",
    },
    {
      icon: Handshake,
      path: "/dashboard/soporte",
      tooltip: "soporte",
=======
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
      path: paths.user.alertas,
      tooltip: "Panel de Alertas",
      color: "#26C6DA",
    },
    {
      icon: LifeBuoy,
      path: paths.user.support,
      tooltip: "Soporte",
>>>>>>> main
      color: "#66BB6A",
    },
    {
      icon: LogOut,
<<<<<<< HEAD
      path: "/login",
=======
      action: handleLogout,
>>>>>>> main
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

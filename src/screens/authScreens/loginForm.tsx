import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { paths } from "@/routes/paths";
import { api } from "@/api/auth";
import { toast } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.login(email, password);
      if (response.success) {
        const userRole = useAuthStore.getState().user?.role;

        if (userRole === "admin") {
          navigate(paths.admin.dashboard);
        } else {
          navigate(paths.user.landingPage);
        }

        toast.success("Inicio de sesión exitoso");
      } else {
        toast.error(response.error || "Error al iniciar sesión");
      }
    } catch (err) {
      toast.error("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu email"
            className="w-full"
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="w-full pr-10"
              disabled={isLoading}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#2da19f] hover:bg-[#328d8d]"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <p>
          ¿No tienes cuenta?{" "}
          <Link
            to={paths.auth.register}
            className="text-[#2da19f] hover:text-[#328d8d] font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

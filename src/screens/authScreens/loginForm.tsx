import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Crown, User } from "lucide-react";
import { paths } from "@/routes/paths";
import { api, MOCK_USERS } from "@/api/auth";
import { toast } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.login(email, password);
      if (response.success) {
        const userRole = useAuthStore.getState().user?.role;
        if (userRole === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user");
        }

        toast.success("Inicio de sesión exitoso");
      } else {
        toast.error(response.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (userType: "admin" | "user") => {
    const user = MOCK_USERS[userType];
    setEmail(user.email);
    setPassword(user.password);
    setError("");
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

      {/* Botones de acceso rápido */}
      <div className="mb-6 space-y-3">
        <p className="text-sm text-gray-600 text-center mb-3">
          Acceso rápido para pruebas:
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleQuickLogin("admin")}
            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border-blue-200"
          >
            <Crown className="h-4 w-4 text-blue-600" />
            <span className="text-sm">Administrador</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleQuickLogin("user")}
            className="flex items-center gap-2 bg-green-50 hover:bg-green-100 border-green-200"
          >
            <User className="h-4 w-4 text-green-600" />
            <span className="text-sm">Usuario</span>
          </Button>
        </div>
      </div>

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
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

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

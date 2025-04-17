import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "@/auth/schemas";
import { api } from "@/api/auth";
import { paths } from "@/routes/paths";
import { toast } from "sonner";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const initialValues: RegisterFormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleRegister = async (
    values: RegisterFormValues,
    { resetForm, setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    console.log("Register button clicked");
    console.log("Values:", { ...values, password: "***" });

    try {
      const { username, email, password } = values;

      if (!username || !email || !password) {
        toast.error("Por favor complete todos los campos");
        return;
      }

      const response = await api.registerLocal({
        username,
        email,
        password,
        role: "user",
      });

      console.log("Registration response:", response);

      if (response.success) {
        toast.success("Registro exitoso. Por favor, inicia sesión.");
        resetForm();
        navigate(paths.auth.login);
      } else {
        toast.error(response.error || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Error al procesar el registro");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="username" className="text-sm font-medium">
                Nombre
              </Label>
              <div className="relative">
                <Field
                  as={Input}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Ingresa tu nombre"
                  className="pl-10"
                />
              </div>
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium">
                Correo electrónico
              </Label>
              <div className="relative">
                <Field
                  as={Input}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Ingresa tu correo electrónico"
                  className="pl-10"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Field
                  as={Input}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  className="pl-10 pr-10"
                />
                <Button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-white" />
                  ) : (
                    <Eye className="h-5 w-5 text-white" />
                  )}
                </Button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Field
                  as={Input}
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirma tu contraseña"
                  className="pl-10 pr-10"
                />
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2da19f] hover:bg-[#328d8d]"
            >
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </Button>

            <div className="mt-6 text-center text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="font-medium text-[#2da19f] hover:underline"
              >
                Inicia sesión
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

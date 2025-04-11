import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { registerSchema } from '@/auth/schemas';

export default function RegisterForm() {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const success = await register(values.username, values.email, values.password);
          if (!success) {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            <div className="space-y-1">
              <Label htmlFor="username" className="text-sm font-medium">
                Nombre
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
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
              <p className="text-xs text-gray-500">Ingresa tu nombre</p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium">
                Correo electrónico
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
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
              <p className="text-xs text-gray-500">Ingresa tu correo electrónico</p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <Field
                  as={Input}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  className="pl-10 pr-10"
                />
                <Button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <p className="text-xs text-gray-500">Ingresa tu contraseña</p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <Field
                  as={Input}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirma tu contraseña"
                  className="pl-10"
                />
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <p className="text-xs text-gray-500">Confirma tu contraseña</p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1a3c5b] hover:bg-[#15324c]"
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </Button>

            <div className="mt-6 text-center text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="font-medium text-[#1a3c5b] hover:underline">
                Inicia sesión
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function DashboardAdmin() {
  const [profileData, setProfileData] = useState({
    name: "Juana dominguez",
    email: "ejemplo@gmail.com",
    country: "",
    city: "",
    password: "**********",
    newPassword: "**********",
    confirmPassword: "**********",
  });

  const [_isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile data submitted:", profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: "Juana dominguez",
      email: "ejemplo@gmail.com",
      country: "",
      city: "",
      password: "**********",
      newPassword: "**********",
      confirmPassword: "**********",
    });
    setIsEditing(false);
  };

  return (
    <div className="w-full rounded-lg mx-auto p-6 bg-white my-20">
      <form onSubmit={handleSubmit} className="space-y-8  ">
        <h1 className="text-4xl font-bold">Tu Perfil</h1>
        <p className="text-gray-600">aqui puedes visualizar tus datos</p>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dn5ltihzv/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1743794213/imagen-perfil-admin_iaba6n.jpg"
                alt="Foto de perfil"
                className="h-10 w-10 rounded-full"
              />
              <button
                type="button"
                className="absolute bottom-1 right-1 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsEditing(true)}
                aria-label="Edit profile picture"
              >
                <Pencil className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Escribe algo"
                  value={profileData.country}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Escribe algo"
                  value={profileData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={profileData.password}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">Cambiar contraseña</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={profileData.newPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Repetir contraseña</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={profileData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#2c4c6b] hover:bg-[#243e59]">
                Guardar cambios
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

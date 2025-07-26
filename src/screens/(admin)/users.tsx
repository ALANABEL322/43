import type React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trash2, ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  avatar?: string;
}

// Usuarios mockeados
const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "María González",
    email: "maria.gonzalez@empresa.com",
    role: "Usuario",
    phone: "+34 612 345 678",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@empresa.com",
    role: "Usuario",
    phone: "+34 623 456 789",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Ana Martínez",
    email: "ana.martinez@empresa.com",
    role: "Usuario",
    phone: "+34 634 567 890",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Luis Fernández",
    email: "luis.fernandez@empresa.com",
    role: "Usuario",
    phone: "+34 645 678 901",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Sofia López",
    email: "sofia.lopez@empresa.com",
    role: "Usuario",
    phone: "+34 656 789 012",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simular carga inicial
    setLoading(true);
    setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 500);
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      // Simular delay de carga
      await new Promise((resolve) => setTimeout(resolve, 300));
      setUsers(MOCK_USERS);
      toast.success("Lista de usuarios actualizada");
    } catch (error) {
      toast.error("Error al cargar la lista de usuarios");
    } finally {
      setLoading(false);
    }
  };

  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
    toast.success("Usuario eliminado correctamente");
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="w-full mx-auto p-4 space-y-6">
      <div className="space-y-1 my-16">
        <h1 className="text-2xl font-bold text-gray-900">
          Gestión de usuarios
        </h1>
        <p className="text-sm text-gray-600">
          Aquí se pueden visualizar los usuarios del sistema
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar usuario"
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 w-full"
            />
          </div>
          <Button className="h-10 px-4" onClick={loadUsers}>
            Actualizar
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-10">Cargando usuarios...</div>
        ) : (
          <>
            <div className="truncate grid grid-cols-5 gap-4 border-b p-5 bg-emerald-100 font-medium text-md shadow-lg pb-2 h-20 items-center">
              <div>Nombre</div>
              <div>Email</div>
              <div>Rol</div>
              <div>Teléfono</div>
              <div className="text-center">Opciones</div>
            </div>

            <div className="divide-y">
              {paginatedUsers.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-5 gap-4 p-4 text-sm items-center"
                >
                  <div className="truncate">{user.name}</div>
                  <div className="truncate">{user.email}</div>
                  <div className="truncate">{user.role}</div>
                  <div className="truncate">{user.phone}</div>
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => console.log(`Editar usuario ${user.id}`)}
                      aria-label={`Edit ${user.name}`}
                    >
                      <Edit className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteUser(user.id)}
                      aria-label={`Delete ${user.name}`}
                    >
                      <Trash2 className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                </div>
              ))}

              {paginatedUsers.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  No se encontraron usuarios
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {!loading && filteredUsers.length > 0 && (
        <div className="items-center justify-center flex text-sm">
          <div className="flex items-center space-x-1 border p-1 border-gray-300 rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {[...Array(Math.min(5, totalPages))].map((_, index) => {
              let pageNumber: number;

              if (totalPages <= 5) {
                pageNumber = index + 1;
              } else if (currentPage <= 3) {
                pageNumber = index + 1;
                if (index === 4) pageNumber = totalPages;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + index;
              } else {
                pageNumber = currentPage - 2 + index;
                if (index === 4) pageNumber = totalPages;
              }

              return (
                <Button
                  key={index}
                  variant={currentPage === pageNumber ? "default" : "ghost"}
                  size="icon"
                  className={`w-8 h-8 ${
                    currentPage === pageNumber
                      ? "bg-gray-900 hover:bg-slate-800"
                      : ""
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                  aria-label={`Page ${pageNumber}`}
                  aria-current={currentPage === pageNumber ? "page" : undefined}
                >
                  {pageNumber}
                </Button>
              );
            })}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

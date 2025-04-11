import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Pedro González",
      email: "pedrogonzalez@gmail.com",
      role: "colaborador",
      phone: "000000000",
    },
    {
      id: 2,
      name: "Pedro González",
      email: "pedrogonzalez@gmail.com",
      role: "colaborador",
      phone: "000000000",
    },
    {
      id: 3,
      name: "Pedro González",
      email: "pedrogonzalez@gmail.com",
      role: "colaborador",
      phone: "000000000",
    },
    {
      id: 4,
      name: "Pedro González",
      email: "pedrogonzalez@gmail.com",
      role: "colaborador",
      phone: "000000000",
    },
    {
      id: 5,
      name: "Pedro González",
      email: "pedrogonzalez@gmail.com",
      role: "colaborador",
      phone: "000000000",
    },
    {
      id: 6,
      name: "Pedro González",
      email: "pedrogonzalez@gmail.com",
      role: "colaborador",
      phone: "000000000",
    },
    {
      id: 7,
      name: "Pedro González",
      email: "pedrogonzalez@gmail.com",
      role: "colaborador",
      phone: "000000000",
    },
    {
      id: 8,
      name: "Pedro González",
      email: "pedrogonzalez@gmail.com",
      role: "colaborador",
      phone: "000000000",
    },
    {
      id: 9,
      name: "Pedro González",
      email: "pedrogonzalez@gmail.com",
      role: "colaborador",
      phone: "000000000",
    },
    {
      id: 10,
      name: "Pedro González",
      email: "pedrogonzalez@gmail.com",
      role: "colaborador",
      phone: "000000000",
    },
  ]);

  const totalUsers = 100;
  const usersPerPage = 10;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
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

  return (
    <div className="w-full mx-auto p-4 space-y-6">
      <div className="space-y-1 my-16">
        <h1 className="text-2xl font-bold text-gray-900">
          Gestión de usuarios
        </h1>
        <p className="text-sm text-gray-600">
          Aquí se pueden visualizar tus datos
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar usuario"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 w-full"
          />
        </div>
        <div className="truncate grid grid-cols-5 gap-4 border-b p-5  bg-gray-50 font-medium text-md shadow-lg pb-2 h-20 items-center">
          <div>Nombre</div>
          <div>Email</div>
          <div>Rol</div>
          <div>Teléfono</div>
          <div className="text-center ">Opciones</div>
        </div>

        {/* Table Body */}
        <div className="divide-y">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-5 gap-4 p-4 text-sm items-center"
            >
              <div className="truncate">{user.name}</div>
              <div className="truncate">{user.email}</div>
              <div className="truncate">{user.role}</div>
              <div className="truncate">{user.phone}</div>
              <div className="flex justify-center">
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
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-500">
          Mostrando {usersPerPage} de {totalUsers}
        </div>
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
                    ? "bg-red-500 hover:bg-red-600"
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

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span className="px-2">...</span>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                onClick={() => handlePageChange(totalPages)}
                aria-label={`Page ${totalPages}`}
              >
                {totalPages}
              </Button>
            </>
          )}

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
    </div>
  );
}

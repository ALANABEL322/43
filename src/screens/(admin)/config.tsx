"use client";

import { useState } from "react";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Config() {
  const [diskSize, setDiskSize] = useState<string>("");
  const [memory, setMemory] = useState<string>("");
  const [storage, setStorage] = useState<string>("");
  const [isResizeDialogOpen, setIsResizeDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentAction, setCurrentAction] = useState<{
    type: string;
    field: string;
  } | null>(null);

  const handleResize = (field: string) => {
    setCurrentAction({ type: "resize", field });
    setIsResizeDialogOpen(true);
  };

  const handleDelete = (field: string) => {
    setCurrentAction({ type: "delete", field });
    setIsDeleteDialogOpen(true);
  };

  const confirmAction = () => {
    if (!currentAction) return;

    if (currentAction.type === "resize") {
      // Handle resize logic
      console.log(`Resizing ${currentAction.field}`);
    } else if (currentAction.type === "delete") {
      // Handle delete logic
      console.log(`Deleting ${currentAction.field}`);

      // Clear the field value
      if (currentAction.field === "disk") setDiskSize("");
      if (currentAction.field === "memory") setMemory("");
      if (currentAction.field === "storage") setStorage("");
    }

    // Close dialogs
    setIsResizeDialogOpen(false);
    setIsDeleteDialogOpen(false);
  };

  // Sample firewall rules data
  const firewallRules = Array(6).fill({
    title: "Lorem ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur. Gravida commodo cras enim iaculis suscipit convallis augue eget dictumst. Integer nulla sem massa sed eleifend ultricies vitae at. Pulvinar duis malesuada commodo condimentum felis. Morbi hendrerit sociales aliquam a diam viverra nunc.",
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Configuraciones pre establecidas a los usuarios
      </h1>

      {/* Server Size Section */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-700">
            Tamaño de los servidores
          </h2>

          {/* Disk Size */}
          <div className="space-y-2">
            <label
              htmlFor="disk-size"
              className="text-sm font-medium text-gray-700"
            >
              Tamaño del disco
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="disk-size"
                value={diskSize}
                onChange={(e) => setDiskSize(e.target.value)}
                className="flex-1"
                placeholder="Input"
              />
              <Button
                onClick={() => handleResize("disk")}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                Redimensionar
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete("disk")}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Delete disk size</span>
              </Button>
            </div>
          </div>

          {/* Memory */}
          <div className="space-y-2">
            <label
              htmlFor="memory"
              className="text-sm font-medium text-gray-700"
            >
              Memoria
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="memory"
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
                className="flex-1"
                placeholder="Input"
              />
              <Button
                onClick={() => handleResize("memory")}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                Redimensionar
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete("memory")}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Delete memory</span>
              </Button>
            </div>
          </div>

          {/* Storage */}
          <div className="space-y-2">
            <label
              htmlFor="storage"
              className="text-sm font-medium text-gray-700"
            >
              Almacenamiento
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="storage"
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
                className="flex-1"
                placeholder="Input"
              />
              <Button
                onClick={() => handleResize("storage")}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                Redimensionar
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete("storage")}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Delete storage</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Firewall Rules */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-700">
            Reglas del Firewall
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {firewallRules.map((rule, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">{rule.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {rule.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add More Button */}
        <Button
          className="w-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center gap-2 py-6"
          onClick={() => console.log("Add more configurations")}
        >
          <Plus className="h-5 w-5" />
          Agregar más configuraciones
        </Button>
      </div>

      {/* Resize Dialog */}
      <Dialog open={isResizeDialogOpen} onOpenChange={setIsResizeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tamaño Nuevo</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="flex flex-row gap-2 sm:justify-center">
            <Button
              className="bg-emerald-500 hover:bg-emerald-600"
              onClick={confirmAction}
            >
              Aceptar
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsResizeDialogOpen(false)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 rounded-full bg-red-50 p-3">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <DialogDescription className="text-lg font-medium mb-6">
              Esta acción no se puede deshacer
            </DialogDescription>
            <div className="flex flex-row gap-2 w-full justify-center">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="min-w-24"
              >
                Cancelar
              </Button>
              <Button
                className="bg-emerald-500 hover:bg-emerald-600 min-w-24"
                onClick={confirmAction}
              >
                Aceptar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

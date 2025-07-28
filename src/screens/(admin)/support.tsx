import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FAQManagement from "@/components/predefinedAnswers";
import { useSupportStore } from "@/store/support/supportStore";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { createRoot } from "react-dom/client";

const MOCK_ADMIN = {
  id: "admin123",
  email: "admin@example.com",
  name: "Admin User",
};

export default function AdminSupportPage() {
  const {
    getOpenTickets,
    respondToTicket,
    predefinedAnswers,
    sendAutomaticResponse,
    deleteTicket,
  } = useSupportStore();
  const tickets = getOpenTickets();
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [showPredefinedAnswers, setShowPredefinedAnswers] = useState<
    Record<string, boolean>
  >({});
  const { toast } = useToast();

  const handleRespond = (ticketId: string) => {
    const response = responses[ticketId];
    if (!response?.trim()) {
      toast({
        title: "Error",
        description: "Please write a response",
        variant: "destructive",
      });
      return;
    }

    respondToTicket(
      ticketId,
      response.trim(),
      MOCK_ADMIN.id,
      MOCK_ADMIN.name,
      MOCK_ADMIN.email
    );

    setResponses((prev) => {
      const newResponses = { ...prev };
      delete newResponses[ticketId];
      return newResponses;
    });

    toast({
      title: "Response sent",
      description: "Your response has been sent successfully",
    });
  };

  const handleAutomaticResponse = (
    ticketId: string,
    predefinedAnswerId: string
  ) => {
    sendAutomaticResponse(ticketId, predefinedAnswerId);
    setShowPredefinedAnswers((prev) => ({
      ...prev,
      [ticketId]: false,
    }));
    toast({
      title: "Automatic response sent",
      description: "The predefined response has been sent successfully",
    });
  };

  const handleDeleteTicket = (ticketId: string) => {
    const dialog = document.createElement("div");
    document.body.appendChild(dialog);

    const showConfirmDialog = () => {
      return new Promise<boolean>((resolve) => {
        const cleanup = () => {
          document.body.removeChild(dialog);
        };

        const onConfirm = () => {
          resolve(true);
          cleanup();
        };

        const onCancel = () => {
          resolve(false);
          cleanup();
        };

        const dialogContent = (
          <AlertDialog defaultOpen>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. El ticket será eliminado
                  permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={onCancel}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onConfirm}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );

        createRoot(dialog).render(dialogContent);
      });
    };

    showConfirmDialog().then((confirmed) => {
      if (confirmed) {
        deleteTicket(ticketId);
        toast({
          title: "Ticket eliminado",
          description: "El ticket ha sido eliminado correctamente",
        });
      }
    });
  };

  const getUrgencyLevelStyle = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Support Panel</h1>
      <FAQManagement />
      <div className="grid gap-6 mt-8">
        <h2 className="text-xl font-semibold">Pending Tickets</h2>
        {tickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Server: {ticket.serverName}</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTicket(ticket.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${getUrgencyLevelStyle(
                      ticket.urgencyLevel
                    )}`}
                  >
                    {ticket.urgencyLevel}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Email: {ticket.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Problem Type: {ticket.problemType}
                    </p>
                    <p className="text-sm text-gray-500">
                      Problem Date:{" "}
                      {format(new Date(ticket.problemDate), "PPP")}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm font-medium">Details:</p>
                  <p className="text-sm text-gray-600">{ticket.details}</p>
                </div>

                <Textarea
                  placeholder="Escribe una respuesta..."
                  value={responses[ticket.id] || ""}
                  onChange={(e) =>
                    setResponses((prev) => ({
                      ...prev,
                      [ticket.id]: e.target.value,
                    }))
                  }
                  className="min-h-[100px]"
                />

                <div className="flex justify-end space-x-2">
                  <Dialog
                    open={showPredefinedAnswers[ticket.id]}
                    onOpenChange={(open) =>
                      setShowPredefinedAnswers((prev) => ({
                        ...prev,
                        [ticket.id]: open,
                      }))
                    }
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline">Use predefined response</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Select predefined response</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4">
                          {predefinedAnswers.map((pa) => (
                            <Card
                              key={pa.id}
                              className="cursor-pointer hover:border-emerald-300"
                              onClick={() =>
                                handleAutomaticResponse(ticket.id, pa.id)
                              }
                            >
                              <CardContent className="p-4">
                                <h3 className="font-medium mb-2">
                                  {pa.question}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {pa.answer}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  <Button
                    className="bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => handleRespond(ticket.id)}
                  >
                    Send response
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {tickets.length === 0 && (
          <p className="text-center text-gray-500 py-8">No pending tickets</p>
        )}
      </div>
    </div>
  );
}

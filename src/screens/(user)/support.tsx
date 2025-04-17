import type React from "react";

import { useState } from "react";
import { CalendarIcon, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";
import { useSupportStore } from "@/store/support/supportStore";
import PredefinedAnswerUser from "@/components/predefinedAnswerUser";
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
import { createRoot } from "react-dom/client";

interface SupportTicketFormProps {
  className?: string;
}

export interface SupportTicketData {
  serverName: string;
  email: string;
  problemType: string;
  problemDate: Date | undefined;
  urgencyLevel: string;
  details: string;
}

export function UserSupportPage({ className }: SupportTicketFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SupportTicketData>({
    serverName: "",
    email: "",
    problemType: "",
    problemDate: undefined,
    urgencyLevel: "",
    details: "",
  });

  const { toast } = useToast();
  const isMobile = useMobile();
  const { addTicket, tickets, deleteTicket } = useSupportStore();

  const sortedTickets = [...tickets].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleChange = (field: keyof SupportTicketData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.serverName ||
      !formData.email ||
      !formData.problemType ||
      !formData.problemDate ||
      !formData.urgencyLevel
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      addTicket({
        serverName: formData.serverName,
        email: formData.email,
        problemType: formData.problemType as any,
        problemDate:
          formData.problemDate?.toISOString() || new Date().toISOString(),
        urgencyLevel: formData.urgencyLevel as any,
        details: formData.details,
      });

      toast({
        title: "Support ticket submitted",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        serverName: "",
        email: "",
        problemType: "",
        problemDate: undefined,
        urgencyLevel: "",
        details: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem submitting your ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <PredefinedAnswerUser
        email={formData.email}
        serverName={formData.serverName}
      />

      <Card className={cn("w-full max-w-2xl", className)}>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Support Ticket
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="serverName">Server Name (or ID)</Label>
                <Input
                  id="serverName"
                  placeholder="Enter server name or ID"
                  value={formData.serverName}
                  onChange={(e) => handleChange("serverName", e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="problemType">Problem Type</Label>
                <Select
                  value={formData.problemType}
                  onValueChange={(value) => handleChange("problemType", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="problemType" className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="configuration">
                        Configuration
                      </SelectItem>
                      <SelectItem value="deployment">Deployment</SelectItem>
                      <SelectItem value="monitoring">Monitoring</SelectItem>
                      <SelectItem value="optimization">Optimization</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="problemDate">Problem Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="problemDate"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.problemDate && "text-muted-foreground"
                      )}
                      disabled={isSubmitting}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.problemDate ? (
                        format(formData.problemDate, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.problemDate}
                      onSelect={(date) => handleChange("problemDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgencyLevel">Urgency Level</Label>
              <Select
                value={formData.urgencyLevel}
                onValueChange={(value) => handleChange("urgencyLevel", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger id="urgencyLevel" className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                id="details"
                placeholder="Describe the issue in detail..."
                className="min-h-[120px]"
                value={formData.details}
                onChange={(e) => handleChange("details", e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              disabled={isSubmitting}
              onClick={() => {
                setFormData({
                  serverName: "",
                  email: "",
                  problemType: "",
                  problemDate: undefined,
                  urgencyLevel: "",
                  details: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Tickets History Section - Always visible */}
      <Card className={cn("w-full max-w-2xl", className)}>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Support History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sortedTickets.length > 0 ? (
            <div className="space-y-4">
              {sortedTickets.map((ticket) => (
                <Card key={ticket.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">
                          Server: {ticket.serverName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Email: {ticket.email}
                        </p>
                        <p className="text-sm text-gray-500">
                          Created: {format(new Date(ticket.createdAt), "PPP")}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTicket(ticket.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={cn(
                              "px-2 py-1 text-xs rounded-full",
                              ticket.status === "open"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-gray-100 text-gray-800"
                            )}
                          >
                            {ticket.status === "open" ? "Active" : "Resolved"}
                          </span>
                          <span
                            className={cn(
                              "px-2 py-1 text-xs rounded-full",
                              ticket.urgencyLevel === "critical"
                                ? "bg-red-100 text-red-800"
                                : ticket.urgencyLevel === "high"
                                ? "bg-orange-100 text-orange-800"
                                : ticket.urgencyLevel === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            )}
                          >
                            {ticket.urgencyLevel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-gray-700">
                          Issue:
                        </p>
                        <p className="text-sm text-gray-600">
                          {ticket.details}
                        </p>
                        <div className="mt-2 text-xs text-gray-500">
                          <p>Type: {ticket.problemType}</p>
                          <p>
                            Date: {format(new Date(ticket.problemDate), "PPP")}
                          </p>
                        </div>
                      </div>

                      {ticket.response && (
                        <div className="bg-emerald-50 p-3 rounded-md">
                          <div className="flex items-start justify-between">
                            <p className="text-sm font-medium text-emerald-900">
                              Support Response:
                            </p>
                            <p className="text-xs text-emerald-700">
                              {format(new Date(ticket.updatedAt), "PPP")}
                            </p>
                          </div>
                          <p className="text-sm text-emerald-800 mt-1">
                            {ticket.response}
                          </p>
                          {ticket.adminName && (
                            <p className="text-xs text-emerald-600 mt-2">
                              Responded by: {ticket.adminName}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No support tickets yet.</p>
              <p className="text-sm mt-1">
                Submit a ticket above or use one of the predefined questions.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

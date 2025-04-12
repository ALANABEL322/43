// stores/supportStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

type TicketStatus = "open" | "closed";
type Priority = "baja" | "medio" | "alto";

interface Ticket {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  subject: string;
  description: string;
  priority: Priority;
  status: TicketStatus;
  response?: string;
  adminId?: string;
  adminName?: string;
  adminEmail?: string;
  createdAt: string;
  updatedAt: string;
}

interface SupportStore {
  tickets: Ticket[];
  addTicket: (
    ticket: Omit<Ticket, "id" | "status" | "createdAt" | "updatedAt">
  ) => void;
  respondToTicket: (
    ticketId: string,
    response: string,
    adminId: string,
    adminName: string,
    adminEmail: string
  ) => void;
  closeTicket: (ticketId: string) => void;
  deleteTicket: (ticketId: string) => void;
  clearClosedTickets: () => void;
}

export const useSupportStore = create<SupportStore>()(
  persist(
    (set) => ({
      tickets: [],
      addTicket: (ticket) =>
        set((state) => ({
          tickets: [
            ...state.tickets,
            {
              ...ticket,
              id: uuidv4(),
              status: "open",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),
      respondToTicket: (ticketId, response, adminId, adminName, adminEmail) =>
        set((state) => ({
          tickets: state.tickets.map((ticket) =>
            ticket.id === ticketId
              ? {
                  ...ticket,
                  response,
                  adminId,
                  adminName,
                  adminEmail,
                  status: "closed",
                  updatedAt: new Date().toISOString(),
                }
              : ticket
          ),
        })),
      closeTicket: (ticketId) =>
        set((state) => ({
          tickets: state.tickets.map((ticket) =>
            ticket.id === ticketId
              ? {
                  ...ticket,
                  status: "closed",
                  updatedAt: new Date().toISOString(),
                }
              : ticket
          ),
        })),
      deleteTicket: (ticketId) =>
        set((state) => ({
          tickets: state.tickets.filter((ticket) => ticket.id !== ticketId),
        })),
      clearClosedTickets: () =>
        set((state) => ({
          tickets: state.tickets.filter((ticket) => ticket.status !== "closed"),
        })),
    }),
    {
      name: "support-tickets-storage", // Nombre para el localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

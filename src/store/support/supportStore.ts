import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

type TicketStatus = "open" | "closed";
type UrgencyLevel = "low" | "medium" | "high" | "critical";
type ProblemType =
  | "login"
  | "configuration"
  | "deployment"
  | "monitoring"
  | "optimization"
  | "security"
  | "other";

interface PredefinedAnswer {
  id: string;
  question: string;
  answer: string;
}

interface PredefinedQuestion {
  id: string;
  title: string;
  description: string;
  urgencyLevel: UrgencyLevel;
  problemType: ProblemType;
}

interface Ticket {
  id: string;
  serverName: string;
  email: string;
  problemType: ProblemType;
  problemDate: string;
  urgencyLevel: UrgencyLevel;
  details: string;
  status: TicketStatus;
  response?: string;
  adminId?: string;
  adminName?: string;
  adminEmail?: string;
  createdAt: string;
  updatedAt: string;
  isAutomaticQuestion?: boolean;
}

interface SupportStore {
  tickets: Ticket[];
  predefinedAnswers: PredefinedAnswer[];
  predefinedQuestions: PredefinedQuestion[];

  // Ticket management
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

  // Predefined answers management
  addPredefinedAnswer: (question: string, answer: string) => void;
  deletePredefinedAnswer: (id: string) => void;
  getPredefinedAnswers: () => PredefinedAnswer[];

  // Automatic responses
  sendAutomaticResponse: (ticketId: string, predefinedAnswerId: string) => void;
  sendAutomaticQuestion: (
    predefinedQuestion: PredefinedAnswer,
    email: string,
    serverName: string
  ) => void;

  // Predefined questions management
  getPredefinedQuestions: () => PredefinedQuestion[];

  // Getters
  getTicketsByEmail: (email: string) => Ticket[];
  getOpenTickets: () => Ticket[];
}

const initialPredefinedQuestions: PredefinedQuestion[] = [
  {
    id: "pq1",
    title: "Problemas de acceso al servidor",
    description:
      "No puedo acceder al servidor después de actualizar las credenciales. ¿Qué debo hacer?",
    urgencyLevel: "high",
    problemType: "login",
  },
  {
    id: "pq2",
    title: "Error en el despliegue automático",
    description:
      "El pipeline de CI/CD está fallando en la etapa de despliegue. Necesito ayuda para identificar el problema.",
    urgencyLevel: "high",
    problemType: "deployment",
  },
  {
    id: "pq3",
    title: "Alertas de monitoreo frecuentes",
    description:
      "Estoy recibiendo alertas constantes sobre el uso de CPU. ¿Cómo puedo ajustar los umbrales de monitoreo?",
    urgencyLevel: "medium",
    problemType: "monitoring",
  },
  {
    id: "pq4",
    title: "Optimización de rendimiento",
    description:
      "El servidor está experimentando tiempos de respuesta lentos. ¿Pueden ayudarme a optimizar la configuración?",
    urgencyLevel: "medium",
    problemType: "optimization",
  },
  {
    id: "pq5",
    title: "Configuración de seguridad",
    description:
      "Necesito ayuda para configurar correctamente el firewall y las políticas de seguridad del servidor.",
    urgencyLevel: "critical",
    problemType: "security",
  },
];

const initialPredefinedAnswers: PredefinedAnswer[] = [
  {
    id: "pa1",
    question: "Problemas de acceso al servidor",
    answer:
      "Para resolver problemas de acceso:\n1. Verifique que sus credenciales estén actualizadas\n2. Intente limpiar la caché del navegador\n3. Asegúrese de estar conectado a la VPN si es necesario\n4. Si el problema persiste, proporcione el mensaje de error exacto que recibe.",
  },
  {
    id: "pa2",
    question: "Error en el despliegue automático",
    answer:
      "Para solucionar errores de despliegue:\n1. Revise los logs del pipeline en detalle\n2. Verifique que todas las variables de entorno estén configuradas\n3. Asegúrese de que los tests estén pasando localmente\n4. Confirme que tiene los permisos necesarios en el repositorio.",
  },
  {
    id: "pa3",
    question: "Alertas de monitoreo frecuentes",
    answer:
      "Para ajustar las alertas de monitoreo:\n1. Acceda al panel de configuración de alertas\n2. Revise los umbrales actuales y ajústelos según sus necesidades\n3. Configure periodos de gracia para evitar falsos positivos\n4. Considere implementar alertas escalonadas.",
  },
  {
    id: "pa4",
    question: "Optimización de rendimiento",
    answer:
      "Para mejorar el rendimiento:\n1. Analice los logs de rendimiento\n2. Identifique cuellos de botella en la base de datos\n3. Revise la configuración de caché\n4. Considere escalar recursos si es necesario\n5. Implemente monitoreo detallado para identificar puntos de mejora.",
  },
  {
    id: "pa5",
    question: "Configuración de seguridad",
    answer:
      "Para configurar la seguridad:\n1. Revise y actualice las reglas del firewall\n2. Implemente autenticación de dos factores\n3. Configure los grupos de seguridad correctamente\n4. Asegúrese de que todos los puertos innecesarios estén cerrados\n5. Mantenga actualizados todos los paquetes de seguridad.",
  },
];

export const useSupportStore = create<SupportStore>()(
  persist(
    (set, get) => ({
      tickets: [],
      predefinedAnswers: initialPredefinedAnswers,
      predefinedQuestions: initialPredefinedQuestions,

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

      addPredefinedAnswer: (question, answer) =>
        set((state) => ({
          predefinedAnswers: [
            ...state.predefinedAnswers,
            {
              id: uuidv4(),
              question,
              answer,
            },
          ],
        })),

      deletePredefinedAnswer: (id) =>
        set((state) => ({
          predefinedAnswers: state.predefinedAnswers.filter(
            (answer) => answer.id !== id
          ),
        })),

      getPredefinedAnswers: () => get().predefinedAnswers,

      sendAutomaticResponse: (ticketId, predefinedAnswerId) =>
        set((state) => {
          const predefinedAnswer = state.predefinedAnswers.find(
            (pa) => pa.id === predefinedAnswerId
          );
          if (!predefinedAnswer) return state;

          return {
            tickets: state.tickets.map((ticket) =>
              ticket.id === ticketId
                ? {
                    ...ticket,
                    response: predefinedAnswer.answer,
                    status: "closed",
                    updatedAt: new Date().toISOString(),
                  }
                : ticket
            ),
          };
        }),

      sendAutomaticQuestion: (predefinedQuestion, email, serverName) =>
        set((state) => ({
          tickets: [
            ...state.tickets,
            {
              id: uuidv4(),
              serverName,
              email,
              problemType: "other" as ProblemType,
              problemDate: new Date().toISOString(),
              urgencyLevel: "medium" as UrgencyLevel,
              details: predefinedQuestion.question,
              status: "open",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isAutomaticQuestion: true,
            },
          ],
        })),

      getTicketsByEmail: (email) =>
        get().tickets.filter((ticket) => ticket.email === email),

      getOpenTickets: () =>
        get().tickets.filter((ticket) => ticket.status === "open"),

      getPredefinedQuestions: () => get().predefinedQuestions,
    }),
    {
      name: "support-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

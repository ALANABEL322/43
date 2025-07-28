import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Alert {
  id: string;
  type: "critical" | "warning" | "info" | "success";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isActive: boolean;
  category: "performance" | "cost" | "security" | "maintenance" | "resource";
  severity: number; // 1-5, donde 5 es más crítico
  actionRequired?: boolean;
  actionTaken?: boolean;
}

export interface AlertSettings {
  cpuThreshold: number;
  memoryThreshold: number;
  storageThreshold: number;
  costThreshold: number;
  networkThreshold: number;
  enableEmailNotifications: boolean;
  enablePushNotifications: boolean;
  criticalAlertsOnly: boolean;
}

export interface AlertMetrics {
  totalAlerts: number;
  criticalAlerts: number;
  warningAlerts: number;
  resolvedAlerts: number;
  averageResponseTime: number;
  uptimePercentage: number;
  costOverrun: number;
  resourceUtilization: number;
}

interface AlertsState {
  alerts: Alert[];
  alertSettings: AlertSettings;
  metrics: AlertMetrics;

  // Actions
  addAlert: (
    alert: Omit<Alert, "id" | "timestamp" | "isRead" | "isActive">
  ) => void;
  markAsRead: (alertId: string) => void;
  markAsResolved: (alertId: string) => void;
  deleteAlert: (alertId: string) => void;
  updateAlertSettings: (settings: Partial<AlertSettings>) => void;
  clearAllAlerts: () => void;
  generateMockAlerts: () => void;
  updateMetrics: (metrics: Partial<AlertMetrics>) => void;
  toggleRead: (alertId: string) => void;
  resetStore: () => void;
}

export const useAlertsStore = create<AlertsState>()(
  persist(
    (set, get) => {
      const generateUniqueId = () => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        const performanceNow = performance.now();
        return `alert_${timestamp}_${performanceNow}_${random}`;
      };

      return {
        alerts: [],
        alertSettings: {
          cpuThreshold: 80,
          memoryThreshold: 85,
          storageThreshold: 90,
          costThreshold: 100,
          networkThreshold: 75,
          enableEmailNotifications: true,
          enablePushNotifications: true,
          criticalAlertsOnly: false,
        },
        metrics: {
          totalAlerts: 0,
          criticalAlerts: 0,
          warningAlerts: 0,
          resolvedAlerts: 0,
          averageResponseTime: 0,
          uptimePercentage: 0,
          costOverrun: 0,
          resourceUtilization: 0,
        },

        addAlert: (alert) => {
          const newAlert: Alert = {
            ...alert,
            id: generateUniqueId(),
            timestamp: new Date().toISOString(),
            isRead: false,
            isActive: true,
          };
          set((state) => ({
            alerts: [newAlert, ...state.alerts],
            metrics: {
              ...state.metrics,
              totalAlerts: state.metrics.totalAlerts + 1,
              [alert.type === "critical" ? "criticalAlerts" : "warningAlerts"]:
                state.metrics[
                  alert.type === "critical" ? "criticalAlerts" : "warningAlerts"
                ] + 1,
            },
          }));
        },

        markAsRead: (alertId) => {
          set((state) => ({
            alerts: state.alerts.map((alert) =>
              alert.id === alertId ? { ...alert, isRead: !alert.isRead } : alert
            ),
          }));
        },

        toggleRead: (alertId) => {
          set((state) => ({
            alerts: state.alerts.map((alert) =>
              alert.id === alertId ? { ...alert, isRead: !alert.isRead } : alert
            ),
          }));
        },

        markAsResolved: (alertId) => {
          set((state) => ({
            alerts: state.alerts.map((alert) =>
              alert.id === alertId
                ? { ...alert, isActive: false, actionTaken: true }
                : alert
            ),
            metrics: {
              ...state.metrics,
              resolvedAlerts: state.metrics.resolvedAlerts + 1,
            },
          }));
        },

        deleteAlert: (alertId) => {
          set((state) => ({
            alerts: state.alerts.filter((alert) => alert.id !== alertId),
          }));
        },

        updateAlertSettings: (settings) => {
          set((state) => ({
            alertSettings: { ...state.alertSettings, ...settings },
          }));
        },

        clearAllAlerts: () => {
          set({ alerts: [] });
        },

        resetStore: () => {
          set({
            alerts: [],
            metrics: {
              totalAlerts: 0,
              criticalAlerts: 0,
              warningAlerts: 0,
              resolvedAlerts: 0,
              averageResponseTime: 0,
              uptimePercentage: 0,
              costOverrun: 0,
              resourceUtilization: 0,
            },
          });
        },

        generateMockAlerts: () => {
          // Limpiar alertas existentes para evitar duplicados
          set({ alerts: [] });

          const mockAlerts: Omit<
            Alert,
            "id" | "timestamp" | "isRead" | "isActive"
          >[] = [
            {
              type: "critical",
              title: "Uso de CPU Crítico",
              message:
                "El uso de CPU ha superado el 95% durante los últimos 10 minutos",
              category: "performance",
              severity: 5,
              actionRequired: true,
            },
            {
              type: "warning",
              title: "Almacenamiento Casi Lleno",
              message: "El disco duro está al 87% de su capacidad",
              category: "resource",
              severity: 3,
              actionRequired: false,
            },
            {
              type: "info",
              title: "Mantenimiento Programado",
              message:
                "Se realizará mantenimiento del sistema mañana a las 2:00 AM",
              category: "maintenance",
              severity: 2,
              actionRequired: false,
            },
            {
              type: "success",
              title: "Backup Completado",
              message: "El backup automático se completó exitosamente",
              category: "security",
              severity: 1,
              actionRequired: false,
            },
            {
              type: "critical",
              title: "Costo Excedido",
              message:
                "El consumo de recursos ha superado el presupuesto mensual",
              category: "cost",
              severity: 4,
              actionRequired: true,
            },
            {
              type: "warning",
              title: "Latencia de Red Alta",
              message: "La latencia de red ha aumentado significativamente",
              category: "performance",
              severity: 3,
              actionRequired: false,
            },
          ];

          // Agregar alertas de forma síncrona con IDs únicos garantizados
          mockAlerts.forEach((alert) => {
            const newAlert: Alert = {
              ...alert,
              id: generateUniqueId(),
              timestamp: new Date().toISOString(),
              isRead: false,
              isActive: true,
            };

            set((state) => ({
              alerts: [...state.alerts, newAlert],
              metrics: {
                ...state.metrics,
                totalAlerts: state.metrics.totalAlerts + 1,
                [alert.type === "critical"
                  ? "criticalAlerts"
                  : "warningAlerts"]:
                  state.metrics[
                    alert.type === "critical"
                      ? "criticalAlerts"
                      : "warningAlerts"
                  ] + 1,
              },
            }));
          });
        },

        updateMetrics: (metrics) => {
          set((state) => ({
            metrics: { ...state.metrics, ...metrics },
          }));
        },
      };
    },
    {
      name: "alerts-storage",
    }
  )
);

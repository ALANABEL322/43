import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ServerSpecification {
  id: string;
  name: string;
  category: string;
  subOptions?: {
    id: string;
    name: string;
    description?: string;
  }[];
}

export interface PredefinedServer {
  id: string;
  name: string;
  description: string;
  specifications: string[];
  price: number;
  features: string[];
  recommendedFor: string[];
  matchPercentage?: number;
}

export interface UserServerRequirements {
  selectedSpecs: string[];
  selectedSubSpecs: string[];
  additionalNotes: string;
}

export interface ServerEvent {
  id: string;
  type: "update" | "restart" | "start" | "stop" | "maintenance";
  description: string;
  timestamp: string;
  status: "success" | "warning" | "error";
}

export interface ServerMetrics {
  cpu: {
    current: number;
    average: number;
    critical: number;
    history: number[];
  };
  memory: {
    current: number;
    average: number;
    total: number;
    history: number[];
  };
  network: {
    current: number;
    total: number;
    bandwidth: number;
    history: number[];
  };
  storage: {
    used: number;
    total: number;
    available: number;
    history: number[];
  };
  status: "online" | "offline" | "warning" | "critical";
  uptime: number;
  lastUpdate: string;
}

export interface UserCreatedServer {
  id: string;
  name: string;
  description: string;
  createdFromSpecs: string[];
  createdFromSubSpecs: string[];
  additionalNotes: string;
  baseServer: PredefinedServer;
  metrics: ServerMetrics;
  isActive: boolean;
  isRunning: boolean;
  createdDate: string;
  events: ServerEvent[];
  ipAddress: string; // Nueva propiedad para IP única
}

export interface SelectedServer {
  server: PredefinedServer;
  metrics: ServerMetrics;
  isActive: boolean;
  deploymentDate: string;
  events: ServerEvent[];
  ipAddress?: string; // IP del servidor creado por el usuario
}

interface ServersState {
  specifications: ServerSpecification[];
  predefinedServers: PredefinedServer[];
  userRequirements: UserServerRequirements | null;
  selectedServer: SelectedServer | null;
  userCreatedServers: UserCreatedServer[];
  setUserRequirements: (requirements: UserServerRequirements) => void;
  getRecommendedServers: (
    selectedSpecs: string[],
    selectedSubSpecs: string[]
  ) => PredefinedServer[];
  clearUserRequirements: () => void;
  selectServer: (server: PredefinedServer) => void;
  selectUserCreatedServer: (serverId: string) => void;
  createUserServer: (serverConfig: {
    name: string;
    description: string;
    baseServer: PredefinedServer;
    selectedSpecs: string[];
    selectedSubSpecs: string[];
    additionalNotes: string;
  }) => void;
  updateServerMetrics: (metrics: Partial<ServerMetrics>) => void;
  updateServerMetricsSmooth: () => void;
  updateUserServerStatus: (serverId: string, isRunning: boolean) => void;
  clearSelectedServer: () => void;
  generateMockMetrics: (serverId: string) => ServerMetrics;
  addServerEvent: (event: Omit<ServerEvent, "id" | "timestamp">) => void;
  getServerEvents: () => ServerEvent[];
  resetServerEvents: () => void;
  deleteServerEvent: (eventId: string) => void;
  deleteUserCreatedServer: (serverId: string) => void;
  restartUserServer: (serverId: string) => void;
}

export const useServersStore = create<ServersState>()(
  persist(
    (set, get) => ({
      specifications: [
        {
          id: "admin-gestion",
          name: "Administración y Gestión",
          category: "management",
          subOptions: [
            {
              id: "panel-control",
              name: "Panel de Control",
              description: "Interfaz web para gestión completa",
            },
            {
              id: "monitoreo",
              name: "Monitoreo en Tiempo Real",
              description: "Seguimiento de rendimiento y recursos",
            },
            {
              id: "gestion-usuarios",
              name: "Gestión de Usuarios",
              description: "Control de acceso y permisos",
            },
            {
              id: "automatizacion",
              name: "Automatización",
              description: "Scripts y tareas programadas",
            },
            {
              id: "backup-gestion",
              name: "Gestión de Backups",
              description: "Configuración y monitoreo de respaldos",
            },
          ],
        },
        {
          id: "almacenamiento",
          name: "Almacenamiento",
          category: "storage",
          subOptions: [
            {
              id: "ssd",
              name: "SSD (Solid State Drive)",
              description: "Almacenamiento de alta velocidad",
            },
            {
              id: "hdd",
              name: "HDD (Hard Disk Drive)",
              description: "Almacenamiento de gran capacidad",
            },
            {
              id: "cloud-storage",
              name: "Almacenamiento en la Nube",
              description: "Backup y sincronización en la nube",
            },
            {
              id: "raid",
              name: "Configuración RAID",
              description: "Redundancia y rendimiento mejorado",
            },
            {
              id: "nas",
              name: "NAS (Network Attached Storage)",
              description: "Almacenamiento en red dedicado",
            },
          ],
        },
        {
          id: "ancho-banda",
          name: "Ancho de Banda",
          category: "network",
          subOptions: [
            {
              id: "1gbps",
              name: "1 Gbps",
              description: "Velocidad estándar para aplicaciones básicas",
            },
            {
              id: "10gbps",
              name: "10 Gbps",
              description: "Alta velocidad para aplicaciones empresariales",
            },
            {
              id: "100gbps",
              name: "100 Gbps",
              description: "Velocidad ultra alta para centros de datos",
            },
            {
              id: "ilimitado",
              name: "Ancho de Banda Ilimitado",
              description: "Sin restricciones de transferencia",
            },
            {
              id: "dedicado",
              name: "Conexión Dedicada",
              description: "Línea exclusiva para tu servidor",
            },
          ],
        },
        {
          id: "aplicaciones-herramientas",
          name: "Aplicaciones y Herramientas",
          category: "applications",
          subOptions: [
            {
              id: "cms",
              name: "CMS (Content Management)",
              description: "WordPress, Drupal, Joomla",
            },
            {
              id: "ecommerce",
              name: "E-commerce",
              description: "Magento, WooCommerce, Shopify",
            },
            {
              id: "crm",
              name: "CRM (Customer Relationship)",
              description: "Salesforce, HubSpot, Zoho",
            },
            {
              id: "herramientas-desarrollo",
              name: "Herramientas de Desarrollo",
              description: "Git, Docker, CI/CD",
            },
            {
              id: "software-empresarial",
              name: "Software Empresarial",
              description: "ERP, BPM, Business Intelligence",
            },
            {
              id: "analytics",
              name: "Analytics y Reporting",
              description: "Google Analytics, Tableau, Power BI",
            },
          ],
        },
        {
          id: "backups",
          name: "Backups y Recuperación",
          category: "backup",
          subOptions: [
            {
              id: "backup-automatico",
              name: "Backup Automático",
              description: "Respaldo programado automáticamente",
            },
            {
              id: "backup-manual",
              name: "Backup Manual",
              description: "Control total sobre los respaldos",
            },
            {
              id: "backup-cloud",
              name: "Backup en la Nube",
              description: "Respaldo seguro en la nube",
            },
            {
              id: "recuperacion-desastres",
              name: "Recuperación de Desastres",
              description: "Plan completo de recuperación",
            },
            {
              id: "backup-incremental",
              name: "Backup Incremental",
              description: "Solo cambios desde el último backup",
            },
            {
              id: "backup-completo",
              name: "Backup Completo",
              description: "Respaldo completo del sistema",
            },
          ],
        },
        {
          id: "base-datos",
          name: "Base de Datos",
          category: "database",
          subOptions: [
            {
              id: "mysql",
              name: "MySQL",
              description: "Base de datos relacional open source",
            },
            {
              id: "postgresql",
              name: "PostgreSQL",
              description: "Base de datos avanzada y escalable",
            },
            {
              id: "mongodb",
              name: "MongoDB",
              description: "Base de datos NoSQL documental",
            },
            {
              id: "sql-server",
              name: "SQL Server",
              description: "Base de datos empresarial de Microsoft",
            },
            {
              id: "oracle",
              name: "Oracle Database",
              description: "Base de datos empresarial robusta",
            },
            {
              id: "redis",
              name: "Redis",
              description: "Base de datos en memoria para caché",
            },
          ],
        },
        {
          id: "cpu",
          name: "CPU (Procesador)",
          category: "hardware",
          subOptions: [
            {
              id: "2-nucleos",
              name: "2 Núcleos",
              description: "Ideal para aplicaciones básicas",
            },
            {
              id: "4-nucleos",
              name: "4 Núcleos",
              description: "Balance entre rendimiento y costo",
            },
            {
              id: "8-nucleos",
              name: "8 Núcleos",
              description: "Alto rendimiento para aplicaciones medianas",
            },
            {
              id: "16-nucleos",
              name: "16 Núcleos",
              description: "Procesamiento intensivo y multitarea",
            },
            {
              id: "32-nucleos",
              name: "32 Núcleos",
              description: "Máximo rendimiento para cargas críticas",
            },
            {
              id: "gpu",
              name: "GPU (Procesamiento Gráfico)",
              description: "Aceleración para IA y machine learning",
            },
          ],
        },
        {
          id: "memoria",
          name: "Memoria (RAM)",
          category: "hardware",
          subOptions: [
            {
              id: "4gb",
              name: "4 GB",
              description: "Mínimo para aplicaciones básicas",
            },
            {
              id: "8gb",
              name: "8 GB",
              description: "Estándar para la mayoría de aplicaciones",
            },
            {
              id: "16gb",
              name: "16 GB",
              description: "Alto rendimiento para aplicaciones complejas",
            },
            {
              id: "32gb",
              name: "32 GB",
              description:
                "Ideal para bases de datos y aplicaciones empresariales",
            },
            {
              id: "64gb",
              name: "64 GB",
              description: "Máximo rendimiento para cargas intensivas",
            },
            {
              id: "128gb",
              name: "128 GB",
              description: "Para aplicaciones críticas y alto tráfico",
            },
          ],
        },
        {
          id: "redes",
          name: "Redes y Seguridad",
          category: "network",
          subOptions: [
            {
              id: "vpn",
              name: "VPN (Virtual Private Network)",
              description: "Conexión segura y privada",
            },
            {
              id: "firewall",
              name: "Firewall",
              description: "Protección contra amenazas externas",
            },
            {
              id: "load-balancer",
              name: "Load Balancer",
              description: "Distribución de carga entre servidores",
            },
            {
              id: "cdn",
              name: "CDN (Content Delivery Network)",
              description: "Entrega rápida de contenido global",
            },
            {
              id: "dns",
              name: "DNS (Domain Name System)",
              description: "Gestión de dominios y resolución",
            },
            {
              id: "ssl-certificate",
              name: "Certificado SSL",
              description: "Conexión segura HTTPS",
            },
          ],
        },
      ],

      predefinedServers: [
        {
          id: "basic-web",
          name: "Servidor Web Básico",
          description: "Ideal para sitios web pequeños y medianos",
          specifications: [
            "aplicaciones-herramientas",
            "cpu",
            "memoria",
            "almacenamiento",
          ],
          price: 29.99,
          features: [
            "2 núcleos CPU",
            "4 GB RAM",
            "50 GB SSD",
            "Panel de control incluido",
            "Backup semanal",
          ],
          recommendedFor: ["Sitios web personales", "Blogs", "Portafolios"],
        },
        {
          id: "business-server",
          name: "Servidor Empresarial",
          description:
            "Para aplicaciones empresariales y sitios web de alto tráfico",
          specifications: [
            "admin-gestion",
            "aplicaciones-herramientas",
            "base-datos",
            "cpu",
            "memoria",
            "almacenamiento",
            "backups",
          ],
          price: 89.99,
          features: [
            "8 núcleos CPU",
            "16 GB RAM",
            "200 GB SSD",
            "Base de datos incluida",
            "Backup diario",
            "Monitoreo 24/7",
            "Soporte técnico",
          ],
          recommendedFor: [
            "E-commerce",
            "Aplicaciones empresariales",
            "Sitios web de alto tráfico",
          ],
        },
        {
          id: "enterprise-server",
          name: "Servidor Enterprise",
          description: "Para aplicaciones críticas y alto rendimiento",
          specifications: [
            "admin-gestion",
            "almacenamiento",
            "ancho-banda",
            "aplicaciones-herramientas",
            "backups",
            "base-datos",
            "cpu",
            "memoria",
            "redes",
          ],
          price: 199.99,
          features: [
            "16 núcleos CPU",
            "32 GB RAM",
            "500 GB SSD",
            "Ancho de banda 10 Gbps",
            "Backup en tiempo real",
            "Redes avanzadas",
            "Soporte premium 24/7",
          ],
          recommendedFor: [
            "Aplicaciones críticas",
            "Alto rendimiento",
            "Empresas grandes",
          ],
        },
        {
          id: "database-server",
          name: "Servidor de Base de Datos",
          description: "Optimizado para bases de datos y aplicaciones de datos",
          specifications: [
            "base-datos",
            "cpu",
            "memoria",
            "almacenamiento",
            "backups",
          ],
          price: 149.99,
          features: [
            "8 núcleos CPU",
            "32 GB RAM",
            "1 TB SSD",
            "Base de datos optimizada",
            "Backup automático",
            "Monitoreo de rendimiento",
          ],
          recommendedFor: [
            "Bases de datos grandes",
            "Aplicaciones de datos",
            "Analytics",
          ],
        },
        {
          id: "storage-server",
          name: "Servidor de Almacenamiento",
          description: "Especializado en almacenamiento y backup",
          specifications: ["almacenamiento", "backups", "redes"],
          price: 119.99,
          features: [
            "4 núcleos CPU",
            "16 GB RAM",
            "2 TB SSD",
            "RAID configurado",
            "Backup automático",
            "Acceso rápido a datos",
          ],
          recommendedFor: [
            "Almacenamiento masivo",
            "Backup empresarial",
            "Archivos grandes",
          ],
        },
        {
          id: "development-server",
          name: "Servidor de Desarrollo",
          description: "Para equipos de desarrollo y testing",
          specifications: [
            "aplicaciones-herramientas",
            "cpu",
            "memoria",
            "almacenamiento",
            "redes",
          ],
          price: 69.99,
          features: [
            "4 núcleos CPU",
            "8 GB RAM",
            "100 GB SSD",
            "Herramientas de desarrollo",
            "Entornos de testing",
            "Control de versiones",
          ],
          recommendedFor: [
            "Desarrollo de software",
            "Testing",
            "Equipos de desarrollo",
          ],
        },
      ],

      userRequirements: null,
      selectedServer: null,
      userCreatedServers: [],

      setUserRequirements: (requirements: UserServerRequirements) => {
        set({ userRequirements: requirements });
      },

      getRecommendedServers: (
        selectedSpecs: string[],
        selectedSubSpecs: string[]
      ) => {
        const { predefinedServers } = get();

        return predefinedServers
          .map((server) => {
            const matchingSpecs = server.specifications.filter((spec) =>
              selectedSpecs.includes(spec)
            );
            const matchPercentage =
              (matchingSpecs.length / selectedSpecs.length) * 100;

            return {
              ...server,
              matchPercentage,
            };
          })
          .filter((server) => server.matchPercentage > 0)
          .sort((a, b) => b.matchPercentage - a.matchPercentage)
          .slice(0, 3);
      },

      clearUserRequirements: () => {
        set({ userRequirements: null });
      },

      createUserServer: (serverConfig: {
        name: string;
        description: string;
        baseServer: PredefinedServer;
        selectedSpecs: string[];
        selectedSubSpecs: string[];
        additionalNotes: string;
      }) => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        const newServerId = `user-server-${timestamp}-${random}`;

        // Generar IP única: 192.168.1.XXX (donde XXX son los últimos 3 números aleatorios)
        const generateUniqueIP = () => {
          const { userCreatedServers } = get();
          let newIP: string;
          let attempts = 0;

          do {
            const lastThreeNumbers = Math.floor(Math.random() * 254) + 1; // 1-254 para evitar .0 y .255
            newIP = `192.168.1.${lastThreeNumbers}`;
            attempts++;
          } while (
            userCreatedServers.some((server) => server.ipAddress === newIP) &&
            attempts < 100
          );

          return newIP;
        };

        const serverIP = generateUniqueIP();

        const initialEvents: ServerEvent[] = [
          {
            id: `event-${timestamp}-1`,
            type: "start",
            description: "Servidor creado y configurado correctamente",
            timestamp: new Date().toISOString(),
            status: "success",
          },
        ];

        const newUserServer: UserCreatedServer = {
          id: newServerId,
          name: serverConfig.name,
          description: serverConfig.description,
          createdFromSpecs: serverConfig.selectedSpecs,
          createdFromSubSpecs: serverConfig.selectedSubSpecs,
          additionalNotes: serverConfig.additionalNotes,
          baseServer: serverConfig.baseServer,
          metrics: get().generateMockMetrics(serverConfig.baseServer.id),
          isActive: true,
          isRunning: false, // Por defecto los servidores inician apagados
          createdDate: new Date().toISOString(),
          events: initialEvents,
          ipAddress: serverIP, // Asignar IP única
        };

        set((state) => ({
          userCreatedServers: [...state.userCreatedServers, newUserServer],
        }));

        console.log(
          `Servidor creado con ID único: ${newServerId} y IP: ${serverIP}`
        );
        return newServerId;
      },

      selectUserCreatedServer: (serverId: string) => {
        const { userCreatedServers } = get();
        const userServer = userCreatedServers.find((s) => s.id === serverId);

        if (userServer) {
          console.log(
            `Servidor seleccionado: ${serverId} - ${userServer.name} - IP: ${userServer.ipAddress}`
          );
          set({
            selectedServer: {
              server: {
                ...userServer.baseServer,
                // Agregar el ID del servidor creado por el usuario para tracking
                id: `${userServer.baseServer.id}-${serverId}`,
              },
              metrics: {
                ...userServer.metrics,
                // Actualizar estado basado en si está corriendo o no
                status: userServer.isRunning
                  ? userServer.metrics.status
                  : "offline",
              },
              isActive: userServer.isActive,
              deploymentDate: userServer.createdDate,
              events: userServer.events,
              ipAddress: userServer.ipAddress, // Incluir la IP del servidor
            },
          });
        } else {
          console.warn(`Servidor con ID ${serverId} no encontrado`);
        }
      },

      updateUserServerStatus: (serverId: string, isRunning: boolean) => {
        console.log(
          `Actualizando estado del servidor ${serverId}: ${
            isRunning ? "INICIANDO" : "DETENIENDO"
          }`
        );

        set((state) => ({
          userCreatedServers: state.userCreatedServers.map((server) =>
            server.id === serverId
              ? {
                  ...server,
                  isRunning,
                  metrics: {
                    ...server.metrics,
                    status: isRunning ? "online" : "offline",
                    lastUpdate: new Date().toISOString(),
                  },
                }
              : server
          ),
        }));

        // Si este servidor está actualmente seleccionado, actualizar también selectedServer
        const { selectedServer, userCreatedServers } = get();
        const updatedServer = userCreatedServers.find((s) => s.id === serverId);
        if (
          selectedServer &&
          updatedServer &&
          selectedServer.server.id.includes(serverId)
        ) {
          console.log(
            `Actualizando servidor seleccionado en dashboard: ${serverId}`
          );
          set({
            selectedServer: {
              ...selectedServer,
              metrics: {
                ...selectedServer.metrics,
                status: isRunning ? "online" : "offline",
                lastUpdate: new Date().toISOString(),
              },
            },
          });
        }
      },

      restartUserServer: (serverId: string) => {
        console.log(`Reiniciando servidor ${serverId}`);

        // Primero detener el servidor
        get().updateUserServerStatus(serverId, false);

        // Después de 2.5 segundos, volver a iniciarlo (simulación de reinicio)
        setTimeout(() => {
          get().updateUserServerStatus(serverId, true);

          // Agregar evento de reinicio
          const timestamp = Date.now();
          const restartEvent: ServerEvent = {
            id: `event-${timestamp}-restart`,
            type: "restart",
            description: "Servidor reiniciado correctamente",
            timestamp: new Date().toISOString(),
            status: "success",
          };

          set((state) => ({
            userCreatedServers: state.userCreatedServers.map((server) =>
              server.id === serverId
                ? {
                    ...server,
                    events: [...server.events, restartEvent],
                  }
                : server
            ),
          }));
        }, 2500);
      },

      deleteUserCreatedServer: (serverId: string) => {
        set((state) => ({
          userCreatedServers: state.userCreatedServers.filter(
            (server) => server.id !== serverId
          ),
        }));

        // Si el servidor eliminado está seleccionado, limpiar selección
        const { selectedServer, userCreatedServers } = get();
        const deletedServer = userCreatedServers.find((s) => s.id === serverId);
        if (selectedServer && deletedServer) {
          set({ selectedServer: null });
        }
      },

      selectServer: (server: PredefinedServer) => {
        const initialEvents: ServerEvent[] = [
          {
            id: `event-${Date.now()}-1`,
            type: "start",
            description: "Servidor iniciado y funcionando correctamente",
            timestamp: new Date().toISOString(),
            status: "success",
          },
          {
            id: `event-${Date.now()}-2`,
            type: "update",
            description: "Actualización de seguridad aplicada",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            status: "success",
          },
          {
            id: `event-${Date.now()}-3`,
            type: "maintenance",
            description: "Mantenimiento preventivo realizado",
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            status: "success",
          },
        ];

        set({
          selectedServer: {
            server,
            metrics: get().generateMockMetrics(server.id),
            isActive: true,
            deploymentDate: new Date().toISOString(),
            events: initialEvents,
          },
        });
      },

      updateServerMetrics: (metrics: Partial<ServerMetrics>) => {
        const currentState = get();
        if (currentState.selectedServer) {
          set({
            selectedServer: {
              ...currentState.selectedServer,
              metrics: {
                ...currentState.selectedServer.metrics,
                ...metrics,
              },
            },
          });
        }
      },

      clearSelectedServer: () => {
        set({ selectedServer: null });
      },

      generateMockMetrics: (serverId: string) => {
        const server = get().predefinedServers.find((s) => s.id === serverId);
        if (!server) {
          return {
            cpu: { current: 0, average: 0, critical: 0, history: [] },
            memory: { current: 0, average: 0, total: 0, history: [] },
            network: { current: 0, total: 0, bandwidth: 0, history: [] },
            storage: { used: 0, total: 0, available: 0, history: [] },
            status: "offline",
            uptime: 0,
            lastUpdate: new Date().toISOString(),
          };
        }

        let cpuBase, memoryBase, storageBase, networkBase;

        switch (serverId) {
          case "basic-web":
            cpuBase = { current: 45, average: 35, critical: 5 };
            memoryBase = { current: 60, average: 50, total: 8 };
            storageBase = { used: 50, total: 100, available: 50 };
            networkBase = { current: 40, total: 500, bandwidth: 100 };
            break;
          case "business-server":
            cpuBase = { current: 65, average: 55, critical: 8 };
            memoryBase = { current: 75, average: 65, total: 16 };
            storageBase = { used: 300, total: 500, available: 200 };
            networkBase = { current: 60, total: 800, bandwidth: 250 };
            break;
          case "enterprise-server":
            cpuBase = { current: 80, average: 70, critical: 12 };
            memoryBase = { current: 85, average: 75, total: 32 };
            storageBase = { used: 800, total: 1000, available: 200 };
            networkBase = { current: 75, total: 1200, bandwidth: 500 };
            break;
          case "database-server":
            cpuBase = { current: 70, average: 60, critical: 10 };
            memoryBase = { current: 90, average: 80, total: 32 };
            storageBase = { used: 600, total: 1000, available: 400 };
            networkBase = { current: 55, total: 900, bandwidth: 300 };
            break;
          case "storage-server":
            cpuBase = { current: 30, average: 25, critical: 3 };
            memoryBase = { current: 40, average: 35, total: 16 };
            storageBase = { used: 1500, total: 2000, available: 500 };
            networkBase = { current: 45, total: 600, bandwidth: 150 };
            break;
          case "development-server":
            cpuBase = { current: 55, average: 45, critical: 6 };
            memoryBase = { current: 70, average: 60, total: 8 };
            storageBase = { used: 80, total: 100, available: 20 };
            networkBase = { current: 50, total: 400, bandwidth: 100 };
            break;
          default:
            cpuBase = { current: 50, average: 40, critical: 7 };
            memoryBase = { current: 65, average: 55, total: 16 };
            storageBase = { used: 400, total: 500, available: 100 };
            networkBase = { current: 55, total: 700, bandwidth: 200 };
        }

        // INTERCAMBIO: Lo que era storage usage % ahora es memory current %
        // Lo que era memory current % ahora es storage usage %
        const storageUsagePercent = Math.floor(
          (storageBase.used / storageBase.total) * 100
        );

        const mockMetrics: ServerMetrics = {
          cpu: {
            // CPU con fluctuación mínima (±2 en lugar de ±10)
            current: Math.max(
              0,
              Math.min(100, cpuBase.current + Math.floor(Math.random() * 4) - 2)
            ),
            average: cpuBase.average,
            critical: cpuBase.critical,
            history: Array.from({ length: 10 }, () =>
              Math.max(
                0,
                Math.min(
                  100,
                  cpuBase.average + Math.floor(Math.random() * 6) - 3
                )
              )
            ),
          },
          memory: {
            // Memory sin fluctuación - usa el % de storage como valor fijo
            current: storageUsagePercent,
            average: storageUsagePercent,
            total: memoryBase.total,
            history: Array.from({ length: 10 }, () => storageUsagePercent),
          },
          network: {
            current: Math.max(
              0,
              Math.min(
                100,
                networkBase.current + Math.floor(Math.random() * 20) - 10
              )
            ),
            total: networkBase.total,
            bandwidth: networkBase.bandwidth,
            history: Array.from({ length: 10 }, () =>
              Math.max(
                0,
                Math.min(
                  100,
                  networkBase.current + Math.floor(Math.random() * 30) - 15
                )
              )
            ),
          },
          storage: {
            // Storage ahora usa el % de memory como base
            used: Math.floor((memoryBase.current / 100) * storageBase.total),
            total: storageBase.total,
            available:
              storageBase.total -
              Math.floor((memoryBase.current / 100) * storageBase.total),
            history: Array.from({ length: 10 }, () => memoryBase.current),
          },
          status: "online",
          uptime: Math.floor(Math.random() * 10000) + 5000,
          lastUpdate: new Date().toISOString(),
        };
        return mockMetrics;
      },

      // Nueva función para actualización suave de métricas
      updateServerMetricsSmooth: () => {
        const currentState = get();
        if (!currentState.selectedServer) return;

        const currentMetrics = currentState.selectedServer.metrics;
        const serverId = currentState.selectedServer.server.id;

        // Generar nuevos valores base según el servidor
        let cpuBase, memoryBase, storageBase, networkBase;

        switch (serverId) {
          case "basic-web":
            cpuBase = { current: 45, average: 35, critical: 5 };
            memoryBase = { current: 60, average: 50, total: 8 };
            storageBase = { used: 50, total: 100, available: 50 };
            networkBase = { current: 40, total: 500, bandwidth: 100 };
            break;
          case "business-server":
            cpuBase = { current: 65, average: 55, critical: 8 };
            memoryBase = { current: 75, average: 65, total: 16 };
            storageBase = { used: 300, total: 500, available: 200 };
            networkBase = { current: 60, total: 800, bandwidth: 250 };
            break;
          case "enterprise-server":
            cpuBase = { current: 80, average: 70, critical: 12 };
            memoryBase = { current: 85, average: 75, total: 32 };
            storageBase = { used: 800, total: 1000, available: 200 };
            networkBase = { current: 75, total: 1200, bandwidth: 500 };
            break;
          case "database-server":
            cpuBase = { current: 70, average: 60, critical: 10 };
            memoryBase = { current: 90, average: 80, total: 32 };
            storageBase = { used: 600, total: 1000, available: 400 };
            networkBase = { current: 55, total: 900, bandwidth: 300 };
            break;
          case "storage-server":
            cpuBase = { current: 30, average: 25, critical: 3 };
            memoryBase = { current: 40, average: 35, total: 16 };
            storageBase = { used: 1500, total: 2000, available: 500 };
            networkBase = { current: 45, total: 600, bandwidth: 150 };
            break;
          case "development-server":
            cpuBase = { current: 55, average: 45, critical: 6 };
            memoryBase = { current: 70, average: 60, total: 8 };
            storageBase = { used: 80, total: 100, available: 20 };
            networkBase = { current: 50, total: 400, bandwidth: 100 };
            break;
          default:
            cpuBase = { current: 50, average: 40, critical: 7 };
            memoryBase = { current: 65, average: 55, total: 16 };
            storageBase = { used: 400, total: 500, available: 100 };
            networkBase = { current: 55, total: 700, bandwidth: 200 };
        }

        // Intercambio: storage % se convierte en memory, memory % se convierte en storage
        const storageUsagePercent = Math.floor(
          (storageBase.used / storageBase.total) * 100
        );

        const updatedMetrics: Partial<ServerMetrics> = {
          cpu: {
            // CPU con fluctuación mínima (±2)
            current: Math.max(
              0,
              Math.min(100, cpuBase.current + Math.floor(Math.random() * 4) - 2)
            ),
            average: cpuBase.average,
            critical: cpuBase.critical,
            history: [
              ...currentMetrics.cpu.history.slice(1),
              Math.max(
                0,
                Math.min(
                  100,
                  cpuBase.current + Math.floor(Math.random() * 4) - 2
                )
              ),
            ],
          },
          memory: {
            // Memory sin fluctuación - valor fijo basado en storage %
            current: storageUsagePercent,
            average: storageUsagePercent,
            total: currentMetrics.memory.total,
            history: [
              ...currentMetrics.memory.history.slice(1),
              storageUsagePercent,
            ],
          },
          network: {
            current: Math.max(
              0,
              Math.min(
                100,
                networkBase.current + Math.floor(Math.random() * 20) - 10
              )
            ),
            total: currentMetrics.network.total,
            bandwidth: currentMetrics.network.bandwidth,
            history: [
              ...currentMetrics.network.history.slice(1),
              Math.max(
                0,
                Math.min(
                  100,
                  networkBase.current + Math.floor(Math.random() * 20) - 10
                )
              ),
            ],
          },
          storage: {
            // Storage usa memory % como base
            used: Math.floor(
              (memoryBase.current / 100) * currentMetrics.storage.total
            ),
            total: currentMetrics.storage.total,
            available:
              currentMetrics.storage.total -
              Math.floor(
                (memoryBase.current / 100) * currentMetrics.storage.total
              ),
            history: [
              ...currentMetrics.storage.history.slice(1),
              memoryBase.current,
            ],
          },
          lastUpdate: new Date().toISOString(),
        };

        get().updateServerMetrics(updatedMetrics);
      },
      addServerEvent: (event: Omit<ServerEvent, "id" | "timestamp">) => {
        const currentState = get();
        if (currentState.selectedServer) {
          const currentEvents = Array.isArray(
            currentState.selectedServer.events
          )
            ? currentState.selectedServer.events
            : [];

          set({
            selectedServer: {
              ...currentState.selectedServer,
              events: [
                ...currentEvents,
                {
                  id: `event-${Date.now()}-${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,
                  timestamp: new Date().toISOString(),
                  ...event,
                },
              ],
            },
          });
        }
      },
      getServerEvents: () => {
        const currentState = get();
        if (
          currentState.selectedServer &&
          Array.isArray(currentState.selectedServer.events)
        ) {
          return currentState.selectedServer.events;
        }
        return [];
      },
      resetServerEvents: () => {
        const currentState = get();
        if (currentState.selectedServer) {
          set({
            selectedServer: {
              ...currentState.selectedServer,
              events: [],
            },
          });
        }
      },
      deleteServerEvent: (eventId: string) => {
        const currentState = get();
        if (currentState.selectedServer) {
          set({
            selectedServer: {
              ...currentState.selectedServer,
              events: currentState.selectedServer.events.filter(
                (event) => event.id !== eventId
              ),
            },
          });
        }
      },
    }),
    {
      name: "servers-storage",
    }
  )
);

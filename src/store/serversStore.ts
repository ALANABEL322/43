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

interface ServersState {
  specifications: ServerSpecification[];
  predefinedServers: PredefinedServer[];
  userRequirements: UserServerRequirements | null;
  setUserRequirements: (requirements: UserServerRequirements) => void;
  getRecommendedServers: (
    selectedSpecs: string[],
    selectedSubSpecs: string[]
  ) => PredefinedServer[];
  clearUserRequirements: () => void;
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
    }),
    {
      name: "servers-storage",
    }
  )
);

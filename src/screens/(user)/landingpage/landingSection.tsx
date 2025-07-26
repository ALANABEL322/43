import { Button } from "@/components/ui/button";
import rectangulo from "../../../assets/Rectangle 2.png";
import rectangulo2 from "../../../assets/Rectangle 3.png";
import rectangulo3 from "../../../assets/Rectangle 4.png";
import rectangulo4 from "../../../assets/Rectangle 5.png";

export default function LandingSection() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 items-center">
        <div className="relative w-full h-[400px]">
          <img
            src={rectangulo}
            alt="Persona trabajando en laptop"
            className="object-cover rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Optimizando recursos: beneficios que no te puedes perder
          </h1>
          <p className="text-gray-700 leading-relaxed">
            Automatiza la gestión de recursos en la nube y gana en eficiencia
            operativa, reduciendo costos y mejorando el rendimiento de tus
            aplicaciones. Adáptate a las demandas del mercado con mayor
            flexibilidad y seguridad, aprovechando las tecnologías de
            inteligencia artificial para mantener una ventaja competitiva.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Automatiza, escala y mejora tu rendimiento
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Disfruta de una interfaz intuitiva que facilita la gestión de tu
            servidor. Automatiza la optimización de recursos con inteligencia
            artificial y mejora la flexibilidad con microservicios. Además,
            cuenta con soporte técnico continuo para garantizar un rendimiento
            óptimo.
          </p>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 rounded-md text-lg font-medium">
            Comenzar
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="relative w-full h-[200px] col-span-2">
            <img
              src={rectangulo2}
              alt="Laptop en mesa"
              className="object-cover rounded-lg"
            />
          </div>
          <div className="relative w-full h-[200px] col-span-2">
            <img
              src={rectangulo3}
              alt="Personas colaborando"
              className="object-cover rounded-lg"
            />
          </div>
          <div className="relative w-full h-[200px] col-span-2 col-start-3">
            <img
              src={rectangulo4}
              alt="Equipo trabajando"
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

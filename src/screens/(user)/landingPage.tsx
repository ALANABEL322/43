import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import imgHeroe from "@/assets/landingHeroe.png";
import img1 from "@/assets/img1.png";
import img2 from "@/assets/img2.png";
import img3 from "@/assets/img3.png";
import img4 from "@/assets/img4.png";
import { Link } from "react-router-dom";
import { paths } from "@/routes/paths";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      <main className="flex-1">
        <div className="container px-4 py-8 mx-auto">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-3xl font-bold tracking-tight text-emerald-500 sm:text-4xl md:text-5xl">
                MEJORA LA EFICIENCIA DE TU NUBE
              </h1>
              <p className="max-w-[42rem] text-muted-foreground">
                Gestiona tu infraestructura en la nube de forma rápida y
                sencilla. Mejora la eficiencia, agiliza la administración de
                servidores y adáptate fácilmente a las necesidades del mercado.
              </p>
              <div>
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  <Link to={paths.user.inicio}>Comenzar</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Recursos consumidos
                    </div>
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 50">
                        <path
                          d="M 10 50 A 40 40 0 1 1 90 50"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 10 50 A 40 40 0 0 1 82 20"
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        <circle cx="82" cy="20" r="5" fill="#6366f1" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                        72%
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      <span className="text-emerald-500">+5.2%</span> vs mes
                      anterior
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Estadísticas
                    </div>
                    <div className="font-medium">Uso de CPU</div>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">32%</span>
                      <span className="ml-2 text-xs font-medium text-emerald-500">
                        +21.01%
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                    </div>
                    <div className="w-full h-12">
                      <svg viewBox="0 0 100 20" className="w-full h-full">
                        <path
                          d="M 0,10 L 5,8 L 10,12 L 15,7 L 20,9 L 25,5 L 30,3 L 35,8 L 40,6 L 45,10 L 50,12 L 55,7 L 60,9 L 65,3 L 70,5 L 75,8 L 80,10 L 85,6 L 90,8 L 95,5 L 100,7"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Recursos por semana
                    </div>
                    <div className="flex items-end justify-between h-32 pt-4">
                      {["Lun", "Mar", "Mié", "Jue", "Vie"].map((day, i) => {
                        const heights = [40, 80, 85, 50, 30];
                        return (
                          <div key={day} className="flex flex-col items-center">
                            <div
                              className="w-8 bg-indigo-500 rounded-t"
                              style={{ height: `${heights[i]}%` }}
                            ></div>
                            <div className="mt-2 text-xs">{day}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Distribución
                    </div>
                    <div className="text-xs">
                      Uso de servicios en nube (porcentaje)
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="relative w-24 h-24">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle cx="50" cy="50" r="40" fill="#e5e7eb" />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="#6366f1"
                            strokeWidth="80"
                            strokeDasharray="188.5 251.3"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 bg-black rounded-full"></div>
                        </div>
                      </div>
                      <div className="ml-4 space-y-1">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                          <span className="ml-2 text-xs">75%</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-black rounded-full"></div>
                          <span className="ml-2 text-xs">25%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid gap-8 mt-16 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                ¿Cómo elevar tu rendimiento en la nube?
              </h2>
              <ul className="space-y-3">
                {[
                  "Optimiza la asignación y el uso de recursos en la nube con algoritmos de IA.",
                  "Escala automáticamente según la demanda, sin intervención manual.",
                  "Gestiona tu plataforma fácilmente con una interfaz intuitiva.",
                  "Recibe soporte técnico y formación continua para aprovechar todas las funciones.",
                  "Previsualiza en tiempo real los cambios en tus desarrollos.",
                  "Mejora la eficiencia y velocidad de tus aplicaciones con Big Data.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-emerald-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-lg h-80">
              <img
                src={imgHeroe}
                alt="Team collaborating on cloud infrastructure"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </main>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 items-center">
          <div className="relative w-full h-full">
            <img
              src={img1}
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
              <Link to={paths.user.inicio}>Comenzar</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <div className="relative w-full h-[200px]">
                <img
                  src={img2}
                  alt="Laptop en mesa"
                  className="object-cover w-full h-[26rem]  rounded-lg"
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="relative w-full h-[200px]">
                <img
                  src={img3}
                  alt="Personas colaborando"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </div>
            <div className="col-start-2 col-span-1">
              <div className="relative w-full h-[200px]">
                <img
                  src={img4}
                  alt="Equipo trabajando"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

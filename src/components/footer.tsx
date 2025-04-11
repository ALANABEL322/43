import { Link } from "react-router-dom"
import logoFooter from "../assets/LeadtyLogo.png"
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-white z-50 py-6 px-4 md:px-8 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center">
              <img
                src={logoFooter}
                alt="Logo"
                className="h-20 w-30 mr-2"
              />
            </div>

            <div className="flex space-x-3">
              <Link
                to="#"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
              >
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                to="#"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
              >
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                to="#"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
              >
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                to="#"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
              >
                <Youtube size={18} />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link
                to="#"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
              >
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Nosotros Column */}
          <div>
            <h3 className="font-medium text-lg mb-4">Nosotros</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-500 hover:text-gray-700">
                  La plataforma
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-500 hover:text-gray-700">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-500 hover:text-gray-700">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-500 hover:text-gray-700">
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-500 hover:text-gray-700">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-500 hover:text-gray-700">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="font-medium text-lg mb-4">Ingresa tu correo para recibir nuestras novedades</h3>
            <div className="mt-2 flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E84C3D] focus:border-transparent"
              />
              <button
                type="button"
                className="px-4 py-2 bg-[#E84C3D] text-white rounded-md hover:bg-[#d44536] transition-colors"
              >
                Suscribirme
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-center text-gray-400 text-sm">©️ Copyright</p>
        </div>
      </div>
    </footer>
  )
}

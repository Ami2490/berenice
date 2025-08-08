import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react'
import logoWhite from '../assets/images/logo_white.png'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 lg:col-span-2">
            <img 
              src={logoWhite} 
              alt="Berenice Importaciones" 
              className="h-12 w-auto mb-4 filter brightness-0 invert"
            />
            <p className="text-gray-300 mb-4 max-w-md">
              Tu tienda de confianza para ropa interior de calidad. Ofrecemos las mejores marcas 
              para toda la familia con la comodidad de comprar desde casa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://wa.me/59899123456" className="text-gray-400 hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-gray-300 hover:text-primary transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-gray-300 hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalogo?categoria=mujeres" className="text-gray-300 hover:text-primary transition-colors">
                  Ropa Interior Femenina
                </Link>
              </li>
              <li>
                <Link to="/catalogo?categoria=hombres" className="text-gray-300 hover:text-primary transition-colors">
                  Ropa Interior Masculina
                </Link>
              </li>
              <li>
                <Link to="/catalogo?categoria=ninos" className="text-gray-300 hover:text-primary transition-colors">
                  Ropa Interior Infantil
                </Link>
              </li>
              <li>
                <Link to="/catalogo?categoria=pijamas" className="text-gray-300 hover:text-primary transition-colors">
                  Pijamas
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-gray-300">Montevideo, Uruguay</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-gray-300">+598 99 123 456</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-gray-300">info@berenice.com.uy</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Berenice Importaciones. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Precios en pesos uruguayos (UYU) - Finaliza tu compra por WhatsApp
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


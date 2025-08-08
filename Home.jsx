import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, ShoppingCart, Heart, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getFeaturedProducts, categories } from '../../data/products'
import { useCart } from '../../context/CartContext'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts())
  }, [])

  const handleAddToCart = (product) => {
    addToCart(product, 'M', 1) // Talla por defecto M
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Bienvenidos a
              <span className="block berenice-gold">Berenice Importaciones</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Tu tienda de confianza para ropa interior de calidad. 
              Descubre nuestra amplia selección para toda la familia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalogo">
                <Button size="lg" className="berenice-bg-gold hover:bg-yellow-600 text-black font-semibold">
                  Ver Catálogo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/nosotros">
                <Button variant="outline" size="lg" className="border-2">
                  Conoce Más
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestras Categorías
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra exactamente lo que buscas en nuestras categorías especializadas
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={category.id} 
                to={`/catalogo?categoria=${category.id}`}
                className={`slide-in-${index % 2 === 0 ? 'left' : 'right'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="product-card text-center p-6 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Los favoritos de nuestros clientes, seleccionados especialmente para ti
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className={`product-card overflow-hidden fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 berenice-bg-gold text-black">
                    Destacado
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold berenice-gold">
                      $UYU {product.price.toLocaleString()}
                    </span>
                    <Button 
                      size="sm" 
                      onClick={() => handleAddToCart(product)}
                      className="berenice-bg-gold hover:bg-yellow-600 text-black"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/catalogo">
              <Button size="lg" variant="outline" className="border-2">
                Ver Todos los Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                comment: "Excelente calidad y muy cómoda. La atención por WhatsApp es súper rápida.",
                rating: 5
              },
              {
                name: "Carlos Rodríguez",
                comment: "Los boxers son de muy buena calidad. Recomiendo totalmente Berenice.",
                rating: 5
              },
              {
                name: "Ana Martínez",
                comment: "Perfecta para toda la familia. Los precios son muy accesibles.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <Card 
                key={index} 
                className={`p-6 fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < testimonial.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <p className="font-semibold text-gray-900">
                    - {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 berenice-bg-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              ¿Listo para comprar?
            </h2>
            <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
              Finaliza tu compra fácilmente por WhatsApp. ¡Te ayudamos en todo el proceso!
            </p>
            <Button 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => {
                const message = "¡Hola! Quiero hacer una compra en Berenice Importaciones."
                const url = `https://wa.me/59899123456?text=${encodeURIComponent(message)}`
                window.open(url, '_blank')
              }}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Comprar por WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home


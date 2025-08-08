import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, MessageCircle, Plus, Minus, Truck, Shield, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { getProductById, getRelatedProducts } from '../../data/products'
import { useCart } from '../../context/CartContext'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const productData = getProductById(parseInt(id))
    if (productData) {
      setProduct(productData)
      setSelectedSize(productData.sizes[0] || '')
      setRelatedProducts(getRelatedProducts(productData.category, productData.id))
    }
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
          <Button onClick={() => navigate('/catalogo')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al catálogo
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla')
      return
    }
    addToCart(product, selectedSize, quantity)
  }

  const handleWhatsAppPurchase = () => {
    const message = `¡Hola! Me interesa comprar:
    
📦 *${product.name}*
💰 Precio: $UYU ${product.price.toLocaleString()}
📏 Talla: ${selectedSize}
🔢 Cantidad: ${quantity}
💵 Total: $UYU ${(product.price * quantity).toLocaleString()}

¿Podrían ayudarme con la compra?`

    const whatsappUrl = `https://wa.me/59899123456?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Mira este producto en Berenice Importaciones: ${product.name}`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Enlace copiado al portapapeles')
    }
  }

  // Simular múltiples imágenes del producto
  const productImages = [
    product.image,
    product.image, // En una implementación real, serían imágenes diferentes
    product.image,
    product.image
  ]

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8 fade-in">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span>/</span>
          <Link to="/catalogo" className="hover:text-primary">Catálogo</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Botón volver */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 fade-in"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Galería de imágenes */}
          <div className="fade-in">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-4">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 berenice-bg-gold text-black">
                  Destacado
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive" className="absolute top-4 left-4">
                  Agotado
                </Badge>
              )}
            </div>
            
            {/* Miniaturas */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>

              {/* Precio */}
              <div className="mb-6">
                <span className="text-3xl font-bold berenice-gold">
                  $UYU {product.price.toLocaleString()}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  Precio en pesos uruguayos
                </p>
              </div>

              {/* Descripción */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || `${product.name} de alta calidad. Confeccionado con los mejores materiales para garantizar comodidad y durabilidad. Ideal para uso diario con un ajuste perfecto.`}
                </p>
              </div>

              <Separator className="my-6" />

              {/* Selección de talla */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Talla</h3>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <div key={size} className="flex items-center">
                        <RadioGroupItem value={size} id={size} className="sr-only" />
                        <Label 
                          htmlFor={size}
                          className={`px-4 py-2 border rounded-md cursor-pointer transition-colors ${
                            selectedSize === size 
                              ? 'border-primary bg-primary text-white' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Cantidad */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Cantidad</h3>
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Botones de acción */}
              <div className="space-y-3">
                <Button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full berenice-bg-gold hover:bg-yellow-600 text-black"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Agregar al Carrito
                </Button>
                
                <Button 
                  onClick={handleWhatsAppPurchase}
                  disabled={!product.inStock}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Comprar por WhatsApp
                </Button>
              </div>

              {/* Información adicional */}
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Envío gratis en compras mayores a $UYU 2,000
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Garantía de calidad
                </div>
                <div className="flex items-center">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Cambios y devoluciones hasta 30 días
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <div className="fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <Card key={relatedProduct.id} className="product-card overflow-hidden">
                  <div className="relative">
                    <Link to={`/producto/${relatedProduct.id}`}>
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    {relatedProduct.featured && (
                      <Badge className="absolute top-2 left-2 berenice-bg-gold text-black">
                        Destacado
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <Link to={`/producto/${relatedProduct.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(relatedProduct.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        ({relatedProduct.reviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold berenice-gold">
                        $UYU {relatedProduct.price.toLocaleString()}
                      </span>
                      <Button 
                        size="sm" 
                        onClick={() => addToCart(relatedProduct, relatedProduct.sizes[0], 1)}
                        className="berenice-bg-gold hover:bg-yellow-600 text-black"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail


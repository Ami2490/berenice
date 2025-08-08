import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, Filter, Star, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { products, categories, getProductsByCategory, searchProducts } from '../../data/products'
import { useCart } from '../../context/CartContext'

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || 'all')
  const [sortBy, setSortBy] = useState('name')
  const [priceRange, setPriceRange] = useState('all')
  const { addToCart } = useCart()

  useEffect(() => {
    let result = products

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      result = getProductsByCategory(selectedCategory)
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      result = searchProducts(searchQuery).filter(product => 
        selectedCategory === 'all' || product.category === selectedCategory
      )
    }

    // Filtrar por rango de precio
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'low':
          result = result.filter(product => product.price < 800)
          break
        case 'medium':
          result = result.filter(product => product.price >= 800 && product.price < 1500)
          break
        case 'high':
          result = result.filter(product => product.price >= 1500)
          break
      }
    }

    // Ordenar productos
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
      default:
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    setFilteredProducts(result)
  }, [selectedCategory, searchQuery, sortBy, priceRange])

  const handleAddToCart = (product) => {
    addToCart(product, 'M', 1)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    if (category === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ categoria: category })
    }
  }

  const getCategoryName = (categoryId) => {
    if (categoryId === 'all') return 'Todos los Productos'
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : 'Categoría'
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {getCategoryName(selectedCategory)}
          </h1>
          <p className="text-lg text-gray-600">
            Descubre nuestra amplia selección de productos de calidad
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categoría */}
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Precio */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Rango de precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los precios</SelectItem>
                <SelectItem value="low">Hasta $UYU 800</SelectItem>
                <SelectItem value="medium">$UYU 800 - $UYU 1,500</SelectItem>
                <SelectItem value="high">Más de $UYU 1,500</SelectItem>
              </SelectContent>
            </Select>

            {/* Ordenar */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre A-Z</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating">Mejor Calificación</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredProducts.length} productos
            {searchQuery && ` para "${searchQuery}"`}
          </p>
        </div>

        {/* Grid de productos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className={`product-card overflow-hidden fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <Link to={`/producto/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  
                  {product.featured && (
                    <Badge className="absolute top-2 left-2 berenice-bg-gold text-black">
                      Destacado
                    </Badge>
                  )}
                  
                  {!product.inStock && (
                    <Badge variant="destructive" className="absolute top-2 left-2">
                      Agotado
                    </Badge>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <Link to={`/producto/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
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
                      disabled={!product.inStock}
                      className="berenice-bg-gold hover:bg-yellow-600 text-black disabled:opacity-50"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Tallas disponibles */}
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">
                      Tallas: {product.sizes.join(', ')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta ajustar los filtros o buscar con otros términos
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setPriceRange('all')
                setSortBy('name')
              }}
              variant="outline"
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Paginación (para futuras implementaciones) */}
        {filteredProducts.length > 12 && (
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              <Button variant="outline" disabled>
                Anterior
              </Button>
              <Button className="berenice-bg-gold text-black">
                1
              </Button>
              <Button variant="outline">
                2
              </Button>
              <Button variant="outline">
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Catalog


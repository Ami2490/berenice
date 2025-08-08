// Base de datos de productos de ejemplo para Berenice Importaciones

export const products = [
  // Productos para Mujeres
  {
    id: 1,
    name: "Conjunto de Brasier y Panty Clásico",
    description: "Conjunto elegante de brasier con copas moldeadas y panty a juego. Confeccionado en algodón suave con detalles de encaje.",
    price: 1250,
    category: "mujeres",
    subcategory: "conjuntos",
    image: "/src/assets/images/mujeres/conjunto_1.jpg",
    images: [
      "/src/assets/images/mujeres/conjunto_1.jpg",
      "/src/assets/images/mujeres/brasieres_1.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Nude"],
    inStock: true,
    featured: true,
    rating: 4.5,
    reviews: 23
  },
  {
    id: 2,
    name: "Brasieres Sin Costuras Pack x3",
    description: "Pack de 3 brasieres sin costuras, perfectos para uso diario. Tecnología seamless para máxima comodidad.",
    price: 890,
    category: "mujeres",
    subcategory: "brasieres",
    image: "/src/assets/images/mujeres/brasieres_1.jpg",
    images: ["/src/assets/images/mujeres/brasieres_1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Multicolor"],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 45
  },
  {
    id: 3,
    name: "Lencería Elegante con Encaje",
    description: "Conjunto de lencería fina con detalles de encaje francés. Ideal para ocasiones especiales.",
    price: 2100,
    category: "mujeres",
    subcategory: "lenceria",
    image: "/src/assets/images/mujeres/lenceria_1.jpg",
    images: ["/src/assets/images/mujeres/lenceria_1.jpg"],
    sizes: ["S", "M", "L"],
    colors: ["Negro", "Rojo", "Blanco"],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: 18
  },
  {
    id: 4,
    name: "Conjunto Deportivo Básico",
    description: "Conjunto básico de ropa interior para uso diario. Cómodo y duradero.",
    price: 750,
    category: "mujeres",
    subcategory: "basicos",
    image: "/src/assets/images/mujeres/conjunto_2.jpg",
    images: ["/src/assets/images/mujeres/conjunto_2.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Gris", "Blanco"],
    inStock: true,
    featured: false,
    rating: 4.3,
    reviews: 31
  },

  // Productos para Hombres
  {
    id: 5,
    name: "Boxers Clásicos Pack x5",
    description: "Pack de 5 boxers de algodón 100%. Diseños variados con excelente ajuste y comodidad.",
    price: 980,
    category: "hombres",
    subcategory: "boxers",
    image: "/src/assets/images/hombres/boxers_1.jpg",
    images: ["/src/assets/images/hombres/boxers_1.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Multicolor"],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 67
  },
  {
    id: 6,
    name: "Calzoncillos Calvin Klein Pack x3",
    description: "Pack de 3 calzoncillos tipo boxer de la reconocida marca Calvin Klein. Calidad premium.",
    price: 1850,
    category: "hombres",
    subcategory: "boxers",
    image: "/src/assets/images/hombres/calvin_klein.jpg",
    images: ["/src/assets/images/hombres/calvin_klein.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Gris", "Azul"],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 7,
    name: "Boxers Deportivos Elásticos",
    description: "Boxers con tecnología de secado rápido, ideales para actividad física y uso deportivo.",
    price: 650,
    category: "hombres",
    subcategory: "deportivos",
    image: "/src/assets/images/hombres/boxers_2.jpg",
    images: ["/src/assets/images/hombres/boxers_2.jpg"],
    sizes: ["M", "L", "XL"],
    colors: ["Negro", "Azul", "Gris"],
    inStock: true,
    featured: false,
    rating: 4.4,
    reviews: 25
  },
  {
    id: 8,
    name: "Slips Clásicos DIM",
    description: "Slips tradicionales de la marca DIM. Confección de alta calidad en algodón suave.",
    price: 420,
    category: "hombres",
    subcategory: "slips",
    image: "/src/assets/images/hombres/slips_1.jpg",
    images: ["/src/assets/images/hombres/slips_1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco", "Negro", "Azul"],
    inStock: true,
    featured: false,
    rating: 4.2,
    reviews: 15
  },

  // Productos para Niños
  {
    id: 9,
    name: "Ropa Interior Infantil Unisex",
    description: "Set de ropa interior para niños, diseño unisex con estampados divertidos y colores alegres.",
    price: 580,
    category: "ninos",
    subcategory: "unisex",
    image: "/src/assets/images/ninos/infantil_1.jpg",
    images: ["/src/assets/images/ninos/infantil_1.jpg"],
    sizes: ["2-3 años", "4-5 años", "6-7 años", "8-9 años"],
    colors: ["Multicolor"],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 42
  },
  {
    id: 10,
    name: "Mi Primera Ropa Interior Set x2",
    description: "Set especial para los más pequeños. Diseño ergonómico y materiales hipoalergénicos.",
    price: 450,
    category: "ninos",
    subcategory: "bebes",
    image: "/src/assets/images/ninos/infantil_2.jpg",
    images: ["/src/assets/images/ninos/infantil_2.jpg"],
    sizes: ["6-12 meses", "12-18 meses", "18-24 meses"],
    colors: ["Blanco", "Celeste", "Rosa"],
    inStock: true,
    featured: false,
    rating: 4.8,
    reviews: 28
  },
  {
    id: 11,
    name: "Calzoncillos para Niños Pack x7",
    description: "Pack semanal de calzoncillos para niños con diseños de días de la semana.",
    price: 720,
    category: "ninos",
    subcategory: "ninos",
    image: "/src/assets/images/ninos/calzoncillos_ninos.jpg",
    images: ["/src/assets/images/ninos/calzoncillos_ninos.jpg"],
    sizes: ["4-5 años", "6-7 años", "8-9 años", "10-11 años"],
    colors: ["Multicolor"],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 35
  },
  {
    id: 12,
    name: "Conjunto para Niña con Estampado",
    description: "Conjunto de top y panty para niñas con estampados florales y diseños tiernos.",
    price: 380,
    category: "ninos",
    subcategory: "ninas",
    image: "/src/assets/images/ninos/conjunto_nina.jpg",
    images: ["/src/assets/images/ninos/conjunto_nina.jpg"],
    sizes: ["4-5 años", "6-7 años", "8-9 años"],
    colors: ["Rosa", "Blanco", "Lila"],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: 22
  },

  // Pijamas y Ropa Casual
  {
    id: 13,
    name: "Pijama de Invierno con Estampado",
    description: "Pijama cálido para invierno con estampado de fresas. Confeccionado en algodón suave.",
    price: 1150,
    category: "pijamas",
    subcategory: "invierno",
    image: "/src/assets/images/pijamas/pijama_1.jpg",
    images: ["/src/assets/images/pijamas/pijama_1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco con Rosa"],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 38
  },
  {
    id: 14,
    name: "Pijama Satinado Elegante",
    description: "Pijama de satén con acabado elegante. Perfecto para descansar con estilo y comodidad.",
    price: 1680,
    category: "pijamas",
    subcategory: "elegante",
    image: "/src/assets/images/pijamas/pijama_2.jpg",
    images: ["/src/assets/images/pijamas/pijama_2.jpg"],
    sizes: ["S", "M", "L"],
    colors: ["Rosa", "Negro", "Champagne"],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 29
  },
  {
    id: 15,
    name: "Pijama de Algodón Verano",
    description: "Pijama ligero para verano en algodón 100%. Diseño fresco y cómodo para noches cálidas.",
    price: 890,
    category: "pijamas",
    subcategory: "verano",
    image: "/src/assets/images/pijamas/pijama_3.jpg",
    images: ["/src/assets/images/pijamas/pijama_3.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco", "Celeste", "Rosa"],
    inStock: true,
    featured: false,
    rating: 4.4,
    reviews: 33
  },
  {
    id: 16,
    name: "Outfit Casual Moderno",
    description: "Conjunto casual moderno para uso diario. Combina comodidad y estilo en una sola prenda.",
    price: 1320,
    category: "casual",
    subcategory: "conjuntos",
    image: "/src/assets/images/pijamas/casual_1.jpg",
    images: ["/src/assets/images/pijamas/casual_1.jpg"],
    sizes: ["S", "M", "L"],
    colors: ["Estampado"],
    inStock: true,
    featured: false,
    rating: 4.3,
    reviews: 19
  }
]

// Función para obtener productos por categoría
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category)
}

// Función para obtener productos destacados
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured)
}

// Función para obtener producto por ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id))
}

// Función para buscar productos
export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  )
}

// Categorías disponibles
export const categories = [
  { id: 'mujeres', name: 'Mujeres', icon: '👩' },
  { id: 'hombres', name: 'Hombres', icon: '👨' },
  { id: 'ninos', name: 'Niños', icon: '👶' },
  { id: 'pijamas', name: 'Pijamas', icon: '🌙' },
  { id: 'casual', name: 'Casual', icon: '👕' }
]


// Función para obtener producto por ID
export const getProductById = (id) => {
  return products.find(product => product.id === id)
}

// Función para obtener productos relacionados
export const getRelatedProducts = (category, excludeId) => {
  return products.filter(product => 
    product.category === category && product.id !== excludeId
  ).slice(0, 4)
}


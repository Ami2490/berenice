// API functions for connecting frontend with backend
const API_BASE = 'http://localhost:5000/api';

// Products API
export async function fetchProducts(filters = {}) {
  try {
    const params = new URLSearchParams();
    
    if (filters.category && filters.category !== 'all') {
      params.append('category', filters.category);
    }
    
    if (filters.featured) {
      params.append('featured', 'true');
    }
    
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    const response = await fetch(`${API_BASE}/products?${params}`);
    if (!response.ok) {
      throw new Error('Error fetching products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchProductById(id) {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

// Orders API
export async function createOrder(orderData) {
  try {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error creating order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// WhatsApp integration
export function generateWhatsAppMessage(cart, customerInfo) {
  const phoneNumber = '59899123456'; // Número de WhatsApp de Berenice Importaciones
  
  let message = `¡Hola! Me interesa realizar un pedido en Berenice Importaciones:\n\n`;
  
  // Customer info
  message += `*Datos del cliente:*\n`;
  message += `Nombre: ${customerInfo.name}\n`;
  message += `Teléfono: ${customerInfo.phone}\n`;
  if (customerInfo.email) {
    message += `Email: ${customerInfo.email}\n`;
  }
  if (customerInfo.address) {
    message += `Dirección: ${customerInfo.address}\n`;
  }
  message += `\n`;
  
  // Cart items
  message += `*Productos:*\n`;
  let total = 0;
  
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    message += `${index + 1}. ${item.name}\n`;
    message += `   Talla: ${item.size}\n`;
    message += `   Cantidad: ${item.quantity}\n`;
    message += `   Precio unitario: $UYU ${item.price.toLocaleString()}\n`;
    message += `   Subtotal: $UYU ${itemTotal.toLocaleString()}\n\n`;
  });
  
  message += `*Total del pedido: $UYU ${total.toLocaleString()}*\n\n`;
  message += `¡Gracias por elegir Berenice Importaciones! 🛍️`;
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function openWhatsAppChat() {
  const phoneNumber = '59899123456'; // Número de WhatsApp de Berenice Importaciones
  const message = '¡Hola! Me gustaría obtener más información sobre sus productos.';
  const encodedMessage = encodeURIComponent(message);
  
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// Utility functions
export function formatPrice(price) {
  return `$UYU ${price.toLocaleString()}`;
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('es-UY');
}

// Error handling
export class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}


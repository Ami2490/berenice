import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ShoppingCart, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import './App.css'

// Componentes
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/pages/Home'
import Catalog from './components/pages/Catalog'
import ProductDetail from './components/pages/ProductDetail'
import Cart from './components/pages/Cart'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import WhatsAppFloat from './components/WhatsAppFloat'

// Context para el carrito
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/contacto" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App


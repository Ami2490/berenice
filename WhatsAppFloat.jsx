import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const WhatsAppFloat = () => {
  const phoneNumber = "59899123456" // Número de WhatsApp de Berenice Importaciones
  
  const handleWhatsAppClick = () => {
    const message = "¡Hola! Me interesa conocer más sobre los productos de Berenice Importaciones."
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="whatsapp-float bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg"
      size="icon"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  )
}

export default WhatsAppFloat


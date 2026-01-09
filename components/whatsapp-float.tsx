"use client"

import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "573001234567"

export function WhatsAppFloat() {
  const handleClick = () => {
    const message = encodeURIComponent("¡Hola! Me interesa conocer más sobre sus productos.")
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-semibold pr-0 group-hover:pr-2">
        ¡Escríbenos!
      </span>
    </button>
  )
}

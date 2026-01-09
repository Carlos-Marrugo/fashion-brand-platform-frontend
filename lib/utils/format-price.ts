// Utilidad para formatear precios en pesos colombianos
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function generateWhatsAppLink(
  phone: string,
  productName: string,
  size: string,
  color: string,
  price: number,
): string {
  const message = encodeURIComponent(
    `¡Hola! Me interesa el producto:\n\n` +
      `*${productName}*\n` +
      `Talla: ${size}\n` +
      `Color: ${color}\n` +
      `Precio: ${formatPrice(price)}\n\n` +
      `¿Está disponible?`,
  )
  return `https://wa.me/${phone}?text=${message}`
}

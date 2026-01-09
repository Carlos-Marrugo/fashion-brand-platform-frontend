"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingBag, Check, Minus, Plus, MessageCircle, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useCart } from "@/lib/cart-context"
import { formatPrice, generateWhatsAppLink } from "@/lib/utils/format-price"
import type { Product } from "@/lib/types"

const WHATSAPP_NUMBER = "573001234567"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return

    addItem(product, selectedSize, selectedColor, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) return

    addItem(product, selectedSize, selectedColor, quantity)
    router.push("/carrito")
  }

  const handleWhatsApp = () => {
    const size = selectedSize || "Por definir"
    const color = selectedColor || "Por definir"
    const link = generateWhatsAppLink(WHATSAPP_NUMBER, product.name, size, color, product.price)
    window.open(link, "_blank")
  }

  const canAddToCart = selectedSize && selectedColor && product.stock > 0

  return (
    <div className="flex flex-col">
      {/* Category */}
      {product.categories && (
        <span className="text-sm font-medium text-accent uppercase tracking-wider">
          {(product.categories as { name: string }).name}
        </span>
      )}

      {/* Title & Price */}
      <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
      <p className="mt-4 text-3xl font-black text-accent">{formatPrice(product.price)}</p>

      {/* Description */}
      <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

      {/* Size Selection */}
      <div className="mt-8">
        <Label className="text-sm font-semibold">Talla</Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSize(size)}
              className={`min-w-[48px] ${selectedSize === size ? "ring-2 ring-accent ring-offset-2" : ""}`}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="mt-6">
        <Label className="text-sm font-semibold">Color: {selectedColor || "Selecciona"}</Label>
        <div className="mt-3 flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`relative h-10 w-10 rounded-full border-2 transition-all ${
                selectedColor === color
                  ? "border-foreground ring-2 ring-foreground ring-offset-2"
                  : "border-border hover:border-foreground/50"
              }`}
              style={{ backgroundColor: getColorHex(color) }}
              title={color}
            >
              {selectedColor === color && <Check className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow" />}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-6">
        <Label className="text-sm font-semibold">Cantidad</Label>
        <div className="mt-3 flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center text-lg font-medium">{quantity}</span>
          <Button variant="outline" size="icon" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stock Status */}
      <div className="mt-6">
        {product.stock > 0 ? (
          <p className="text-sm text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2" />
            {product.stock} unidades disponibles
          </p>
        ) : (
          <p className="text-sm text-destructive font-medium">Agotado</p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3">
        <div className="flex gap-3">
          <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart} disabled={!canAddToCart}>
            {added ? (
              <>
                <Check className="h-5 w-5" />
                Agregado
              </>
            ) : (
              <>
                <ShoppingBag className="h-5 w-5" />
                Agregar al Carrito
              </>
            )}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={handleBuyNow}
            disabled={!canAddToCart}
          >
            Comprar Ahora
          </Button>
        </div>

        <Button
          size="lg"
          onClick={handleWhatsApp}
          className="w-full gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold text-base"
        >
          <MessageCircle className="h-5 w-5" />
          Pedir por WhatsApp
        </Button>
      </div>

      {!selectedSize || !selectedColor ? (
        <p className="mt-4 text-sm text-muted-foreground">Por favor selecciona talla y color para continuar</p>
      ) : null}

      <div className="mt-8 pt-8 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-accent/10">
              <Truck className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold">Envío Gratis</p>
              <p className="text-xs text-muted-foreground">En compras +$150.000</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-accent/10">
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold">Pago Seguro</p>
              <p className="text-xs text-muted-foreground">100% protegido</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-accent/10">
              <RotateCcw className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold">Devoluciones</p>
              <p className="text-xs text-muted-foreground">30 días para cambios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getColorHex(colorName: string): string {
  const colors: Record<string, string> = {
    Negro: "#1a1a1a",
    Blanco: "#ffffff",
    Gris: "#6b7280",
    "Gris Oscuro": "#374151",
    "Gris Perla": "#d1d5db",
    Azul: "#3b82f6",
    "Azul Marino": "#1e3a5f",
    Verde: "#22c55e",
    "Verde Bosque": "#166534",
    Rojo: "#ef4444",
    Rosa: "#ec4899",
    "Rosa Palo": "#f9a8d4",
    Lavanda: "#c4b5fd",
    Beige: "#d4a574",
    Crema: "#fef3c7",
    "Blanco Roto": "#f5f5f4",
    Camel: "#c19a6b",
    Borgoña: "#722f37",
    Celeste: "#7dd3fc",
    Naranja: "#f97316",
    Café: "#8B4513",
    Terracota: "#E2725B",
    Multicolor: "linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)",
    "Arcoíris Pastel": "linear-gradient(90deg, #fca5a5, #fdba74, #fde047, #86efac, #93c5fd, #c4b5fd)",
  }
  return colors[colorName] || "#9ca3af"
}

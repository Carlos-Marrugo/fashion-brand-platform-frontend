"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils/format-price"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/productos/${product.slug}`} className="group block">
      <div className="card-hover overflow-hidden rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary/30">
          <Image
            src={product.image_url || "/placeholder.svg?height=600&width=600&query=fashion sweater hoodie clothing"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {product.featured && (
            <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground font-bold shadow-lg">
              Destacado
            </Badge>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <Badge variant="destructive" className="absolute right-3 top-3 shadow-lg">
              ¡Últimas unidades!
            </Badge>
          )}

          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="block w-full py-2.5 bg-white text-foreground text-center font-semibold rounded-lg shadow-lg">
              Ver Detalles
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1 text-lg">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xl font-black text-accent">{formatPrice(product.price)}</span>
            <div className="flex gap-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <span
                  key={index}
                  className="h-5 w-5 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: getColorHex(color) }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="h-5 w-5 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
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

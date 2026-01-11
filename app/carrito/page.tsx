"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils/format-price"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
            <h1 className="mt-6 text-2xl font-bold">Tu carrito está vacío</h1>
            <p className="mt-2 text-muted-foreground">Agrega algunos productos para comenzar</p>
            <Link href="/productos">
              <Button className="mt-6 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Ver Productos
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Tu Carrito</h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4"
                >
                  {/* Image */}
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-secondary/30">
                    <Image
                      src={item.product.image_url || "/placeholder.svg?height=200&width=200&query=clothing"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Talla: {item.size} | Color: {item.color}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.product.id, item.size, item.color)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold">Resumen del Pedido</h2>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span>{totalPrice >= 100 ? "Gratis" : "$9.99"}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(totalPrice + (totalPrice >= 100 ? 0 : 9.99))}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout" className="block mt-6">
                  <Button className="w-full" size="lg">
                    Proceder al Pago
                  </Button>
                </Link>

                <Link href="/productos" className="block mt-4">
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <ArrowLeft className="h-4 w-4" />
                    Seguir Comprando
                  </Button>
                </Link>

                {totalPrice < 100 && (
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Agrega {formatPrice(100 - totalPrice)} más para envío gratis
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

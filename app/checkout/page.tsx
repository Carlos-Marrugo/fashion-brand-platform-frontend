"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/cart-context"
import { createOrder } from "@/app/actions/orders"
import { Loader2 } from "lucide-react"
import { formatPrice } from "@/lib/utils/format-price"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (items.length === 0) {
      router.push("/carrito")
    }
  }, [items.length, router])

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Redirigiendo al carrito...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const shippingCost = totalPrice >= 100 ? 0 : 9.99
  const total = totalPrice + shippingCost

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await createOrder({
        customerName: formData.get("name") as string,
        customerEmail: formData.get("email") as string,
        customerPhone: formData.get("phone") as string,
        shippingAddress: formData.get("address") as string,
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.product.price,
        })),
        total,
      })

      if (result.success && result.clientSecret) {
        router.push(`/checkout/payment?session=${result.clientSecret}&orderId=${result.orderId}`)
      } else {
        setError(result.error || "Error al crear el pedido")
      }
    } catch (err) {
      setError("Error al procesar el pedido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold mb-4">Información de Contacto</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nombre Completo *</Label>
                      <Input id="name" name="name" required className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" required className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" name="phone" type="tel" className="mt-1.5" />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold mb-4">Dirección de Envío</h2>

                  <div>
                    <Label htmlFor="address">Dirección Completa *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      required
                      className="mt-1.5"
                      placeholder="Calle, número, ciudad, código postal, país"
                      rows={3}
                    />
                  </div>
                </div>

                {error && <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>Pagar {formatPrice(total)}</>
                  )}
                </Button>
              </form>
            </div>

            <div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold mb-4">Tu Pedido</h2>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary/30">
                        <Image
                          src={item.product.image_url || "/placeholder.svg?height=100&width=100&query=clothing"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.product.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {item.size} | {item.color} | Cant: {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium text-sm">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span>{shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
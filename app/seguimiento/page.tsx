"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OrderTracker } from "@/components/order-tracker"
import { Search, Package } from "lucide-react"
import type { Order, OrderItem } from "@/lib/types"

export default function TrackingPage() {
  const [email, setEmail] = useState("")
  const [orderId, setOrderId] = useState("")
  const [orders, setOrders] = useState<(Order & { items: OrderItem[] })[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSearched(true)

    try {
      const params = new URLSearchParams()
      if (email) params.set("email", email)
      if (orderId) params.set("orderId", orderId)

      const response = await fetch(`/api/orders/track?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al buscar pedidos")
      }

      setOrders(data.orders || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al buscar pedidos")
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
              <Package className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Rastrea tu Pedido</h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Ingresa tu email o número de pedido para ver el estado de tu compra en tiempo real
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="orderId">Número de Pedido</Label>
                  <Input
                    id="orderId"
                    placeholder="ej: abc123..."
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Puedes buscar con email, número de pedido, o ambos</p>
              <Button type="submit" className="w-full gap-2" size="lg" disabled={loading || (!email && !orderId)}>
                {loading ? (
                  "Buscando..."
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Buscar Pedido
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Error */}
          {error && (
            <div className="max-w-xl mx-auto mb-8 p-4 rounded-lg bg-destructive/10 text-destructive text-center">
              {error}
            </div>
          )}

          {/* Results */}
          {searched && !error && (
            <div className="max-w-4xl mx-auto">
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-secondary/30 rounded-2xl">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg">No encontramos pedidos</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Verifica que el email o número de pedido sean correctos
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  <h2 className="text-xl font-semibold">
                    {orders.length === 1 ? "Tu Pedido" : `Encontramos ${orders.length} pedidos`}
                  </h2>
                  {orders.map((order) => (
                    <OrderTracker key={order.id} order={order} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ChevronUp, Mail, Phone, MapPin, Truck, Check, X, Edit2 } from "lucide-react"
import type { Order, OrderItem, OrderStatus } from "@/lib/types"
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/types"

interface AdminOrderCardProps {
  order: Order & { items: OrderItem[] }
  onUpdate: (orderId: string, updates: Partial<Order>) => Promise<void>
}

const statusOptions: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "in_transit",
  "out_for_delivery",
  "delivered",
  "cancelled",
]

export function AdminOrderCard({ order, onUpdate }: AdminOrderCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    status: order.status,
    tracking_number: order.tracking_number || "",
    estimated_delivery: order.estimated_delivery?.split("T")[0] || "",
    notes: order.notes || "",
  })

  const handleSave = async () => {
    setLoading(true)
    await onUpdate(order.id, {
      status: formData.status,
      tracking_number: formData.tracking_number || null,
      estimated_delivery: formData.estimated_delivery || null,
      notes: formData.notes || null,
      ...(formData.status === "shipped" && !order.shipped_at ? { shipped_at: new Date().toISOString() } : {}),
      ...(formData.status === "delivered" && !order.delivered_at ? { delivered_at: new Date().toISOString() } : {}),
    })
    setEditing(false)
    setLoading(false)
  }

  const quickStatusUpdate = async (newStatus: OrderStatus) => {
    setLoading(true)
    await onUpdate(order.id, {
      status: newStatus,
      ...(newStatus === "shipped" ? { shipped_at: new Date().toISOString() } : {}),
      ...(newStatus === "delivered" ? { delivered_at: new Date().toISOString() } : {}),
    })
    setFormData((prev) => ({ ...prev, status: newStatus }))
    setLoading(false)
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div
        className="p-4 cursor-pointer hover:bg-secondary/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          {/* Status Badge */}
          <div className={`w-3 h-3 rounded-full ${ORDER_STATUS_COLORS[order.status]}`} />

          {/* Order Info */}
          <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
            <div>
              <p className="font-mono text-sm text-muted-foreground">#{order.id.slice(0, 8)}</p>
              <p className="font-medium truncate">{order.customer_name}</p>
            </div>
            <div className="hidden md:block">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-sm truncate">{order.customer_email}</p>
            </div>
            <div className="hidden md:block">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="font-semibold">${order.total.toFixed(2)}</p>
            </div>
            <div className="hidden md:block">
              <p className="text-sm text-muted-foreground">Fecha</p>
              <p className="text-sm">{new Date(order.created_at).toLocaleDateString("es-ES")}</p>
            </div>
          </div>

          {/* Status */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium text-white ${ORDER_STATUS_COLORS[order.status]}`}
          >
            {ORDER_STATUS_LABELS[order.status]}
          </span>

          {/* Expand Icon */}
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-border">
          {/* Quick Actions */}
          <div className="p-4 bg-secondary/20 flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2">Cambiar estado:</span>
            {statusOptions.slice(0, 4).map((status) => (
              <Button
                key={status}
                variant={order.status === status ? "default" : "outline"}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  quickStatusUpdate(status)
                }}
                disabled={loading}
                className="text-xs"
              >
                {ORDER_STATUS_LABELS[status]}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setEditing(!editing)
              }}
              className="ml-auto gap-1"
            >
              <Edit2 className="h-3 w-3" />
              {editing ? "Cancelar" : "Editar"}
            </Button>
          </div>

          <div className="p-4 grid md:grid-cols-2 gap-6">
            {/* Customer Info */}
            <div>
              <h4 className="font-semibold mb-3">Información del Cliente</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${order.customer_email}`} className="hover:text-accent">
                    {order.customer_email}
                  </a>
                </div>
                {order.customer_phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${order.customer_phone}`} className="hover:text-accent">
                      {order.customer_phone}
                    </a>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{order.shipping_address}</span>
                </div>
              </div>

              {/* Products */}
              <h4 className="font-semibold mt-6 mb-3">Productos ({order.items.length})</h4>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 bg-secondary/30 rounded-lg">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-secondary">
                      <Image
                        src={`/.jpg?height=50&width=50&query=${item.product_name}`}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.size} | {item.color} | x{item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Form / Tracking Info */}
            <div>
              {editing ? (
                <div className="space-y-4">
                  <h4 className="font-semibold">Editar Pedido</h4>

                  <div>
                    <Label htmlFor="status">Estado</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as OrderStatus }))}
                      className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {ORDER_STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="tracking">Número de Guía</Label>
                    <div className="relative mt-1">
                      <Truck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="tracking"
                        value={formData.tracking_number}
                        onChange={(e) => setFormData((prev) => ({ ...prev, tracking_number: e.target.value }))}
                        placeholder="Ej: 1Z999AA10123456784"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="delivery">Fecha Estimada de Entrega</Label>
                    <Input
                      id="delivery"
                      type="date"
                      value={formData.estimated_delivery}
                      onChange={(e) => setFormData((prev) => ({ ...prev, estimated_delivery: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Notas</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder="Notas internas sobre el pedido..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={loading} className="flex-1 gap-2">
                      <Check className="h-4 w-4" />
                      {loading ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                    <Button variant="outline" onClick={() => setEditing(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="font-semibold mb-3">Información de Envío</h4>
                  <div className="space-y-3 text-sm">
                    {order.tracking_number ? (
                      <div className="p-3 bg-secondary/50 rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Número de Guía</p>
                        <p className="font-mono font-medium">{order.tracking_number}</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Sin número de guía asignado</p>
                    )}

                    {order.estimated_delivery && (
                      <div className="p-3 bg-secondary/50 rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Entrega Estimada</p>
                        <p className="font-medium">
                          {new Date(order.estimated_delivery).toLocaleDateString("es-ES", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })}
                        </p>
                      </div>
                    )}

                    {order.shipped_at && (
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Enviado</p>
                        <p className="text-green-600 font-medium">
                          {new Date(order.shipped_at).toLocaleDateString("es-ES")}
                        </p>
                      </div>
                    )}

                    {order.delivered_at && (
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Entregado</p>
                        <p className="text-green-600 font-medium">
                          {new Date(order.delivered_at).toLocaleDateString("es-ES")}
                        </p>
                      </div>
                    )}

                    {order.notes && (
                      <div className="p-3 bg-yellow-500/10 rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Notas</p>
                        <p>{order.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

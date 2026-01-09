"use client"

import type React from "react"

import Image from "next/image"
import { Package, CheckCircle2, Truck, MapPin, Clock, Copy, Check } from "lucide-react"
import { useState } from "react"
import type { Order, OrderItem, OrderStatus } from "@/lib/types"
import { ORDER_STATUS_LABELS } from "@/lib/types"

interface OrderTrackerProps {
  order: Order & { items: OrderItem[] }
}

const statusSteps: { status: OrderStatus; icon: React.ElementType; label: string }[] = [
  { status: "pending", icon: Clock, label: "Pendiente" },
  { status: "confirmed", icon: CheckCircle2, label: "Confirmado" },
  { status: "processing", icon: Package, label: "En Preparación" },
  { status: "shipped", icon: Truck, label: "Enviado" },
  { status: "in_transit", icon: Truck, label: "En Tránsito" },
  { status: "out_for_delivery", icon: MapPin, label: "En Camino" },
  { status: "delivered", icon: CheckCircle2, label: "Entregado" },
]

const getStatusIndex = (status: OrderStatus): number => {
  if (status === "cancelled") return -1
  return statusSteps.findIndex((s) => s.status === status)
}

export function OrderTracker({ order }: OrderTrackerProps) {
  const [copiedId, setCopiedId] = useState(false)
  const currentStatusIndex = getStatusIndex(order.status)
  const isCancelled = order.status === "cancelled"

  const copyOrderId = async () => {
    await navigator.clipboard.writeText(order.id)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border bg-secondary/30">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>Pedido</span>
              <button
                onClick={copyOrderId}
                className="inline-flex items-center gap-1 font-mono text-foreground hover:text-accent transition-colors"
              >
                #{order.id.slice(0, 8)}...
                {copiedId ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date(order.created_at).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="text-right">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                isCancelled ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"
              }`}
            >
              {ORDER_STATUS_LABELS[order.status]}
            </div>
            {order.tracking_number && (
              <p className="text-xs text-muted-foreground mt-2">Guía: {order.tracking_number}</p>
            )}
          </div>
        </div>
      </div>

      {/* Progress Tracker */}
      {!isCancelled && (
        <div className="p-6 border-b border-border">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-border">
              <div
                className="h-full bg-accent transition-all duration-500"
                style={{
                  width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStatusIndex
                const isCurrent = index === currentStatusIndex
                const StepIcon = step.icon

                return (
                  <div key={step.status} className="flex flex-col items-center">
                    <div
                      className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        isCompleted
                          ? "bg-accent border-accent text-accent-foreground"
                          : "bg-background border-border text-muted-foreground"
                      } ${isCurrent ? "ring-4 ring-accent/20" : ""}`}
                    >
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium text-center max-w-[80px] ${
                        isCompleted ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Estimated Delivery */}
          {order.estimated_delivery && (
            <div className="mt-6 p-4 bg-secondary/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Entrega estimada</p>
              <p className="font-semibold text-lg mt-1">
                {new Date(order.estimated_delivery).toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Cancelled Message */}
      {isCancelled && (
        <div className="p-6 border-b border-border bg-destructive/5">
          <div className="text-center">
            <p className="text-destructive font-medium">Este pedido ha sido cancelado</p>
            {order.notes && <p className="text-sm text-muted-foreground mt-2">{order.notes}</p>}
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="p-6">
        <h4 className="font-semibold mb-4">Productos</h4>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary/30">
                <Image
                  src={`/.jpg?height=100&width=100&query=${item.product_name} clothing`}
                  alt={item.product_name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-sm truncate">{item.product_name}</h5>
                <p className="text-xs text-muted-foreground">
                  {item.size && `Talla: ${item.size}`}
                  {item.size && item.color && " | "}
                  {item.color && `Color: ${item.color}`}
                  {" | "}Cant: {item.quantity}
                </p>
              </div>
              <span className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-xl">${order.total.toFixed(2)}</span>
        </div>

        {/* Shipping Address */}
        <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Dirección de envío</p>
          <p className="text-sm">{order.shipping_address}</p>
        </div>
      </div>
    </div>
  )
}

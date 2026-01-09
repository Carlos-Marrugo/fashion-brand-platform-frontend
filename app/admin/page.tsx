"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package, ShoppingBag, Users, DollarSign, Search, Filter, RefreshCw, Plus, Settings } from "lucide-react"
import { AdminOrderCard } from "@/components/admin-order-card"
import { formatPrice } from "@/lib/utils/format-price"
import type { Order, OrderItem, OrderStatus } from "@/lib/types"

const statusFilters: { value: OrderStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "pending", label: "Pendientes" },
  { value: "confirmed", label: "Confirmados" },
  { value: "processing", label: "En Preparación" },
  { value: "shipped", label: "Enviados" },
  { value: "in_transit", label: "En Tránsito" },
  { value: "delivered", label: "Entregados" },
  { value: "cancelled", label: "Cancelados" },
]

export default function AdminPage() {
  const [orders, setOrders] = useState<(Order & { items: OrderItem[] })[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")
  const [stats, setStats] = useState({
    todayOrders: 0,
    monthSales: 0,
    productsSold: 0,
    newCustomers: 0,
  })

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/orders")
      const data = await response.json()
      if (data.orders) {
        setOrders(data.orders)
        calculateStats(data.orders)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (ordersData: (Order & { items: OrderItem[] })[]) => {
    const today = new Date().toDateString()
    const thisMonth = new Date().getMonth()
    const thisYear = new Date().getFullYear()

    const todayOrders = ordersData.filter((o) => new Date(o.created_at).toDateString() === today).length

    const monthOrders = ordersData.filter((o) => {
      const d = new Date(o.created_at)
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear
    })

    const monthSales = monthOrders.reduce((sum, o) => sum + o.total, 0)
    const productsSold = monthOrders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0)
    const uniqueCustomers = new Set(monthOrders.map((o) => o.customer_email)).size

    setStats({
      todayOrders,
      monthSales,
      productsSold,
      newCustomers: uniqueCustomers,
    })
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleUpdateOrder = async (orderId: string, updates: Partial<Order>) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        fetchOrders()
      }
    } catch (error) {
      console.error("Error updating order:", error)
    }
  }

  const statsCards = [
    { label: "Pedidos Hoy", value: stats.todayOrders, icon: Package, color: "bg-blue-500" },
    { label: "Ventas del Mes", value: formatPrice(stats.monthSales), icon: DollarSign, color: "bg-green-500" },
    { label: "Productos Vendidos", value: stats.productsSold, icon: ShoppingBag, color: "bg-purple-500" },
    { label: "Clientes", value: stats.newCustomers, icon: Users, color: "bg-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-secondary/20">
      <Navbar />
      <main className="container mx-auto px-4 py-8 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
            <p className="text-muted-foreground mt-1">Gestiona pedidos y productos</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/productos">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Settings className="h-4 w-4" />
                Gestionar Productos
              </Button>
            </Link>
            <Button onClick={fetchOrders} variant="outline" className="gap-2 bg-transparent">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Actualizar
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${stat.color} text-white`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/admin/productos" className="block">
            <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-accent transition-all group">
              <Plus className="h-8 w-8 text-accent mb-3" />
              <h3 className="font-semibold group-hover:text-accent transition-colors">Agregar Producto</h3>
              <p className="text-sm text-muted-foreground mt-1">Crear nuevo producto</p>
            </div>
          </Link>
          <Link href="/productos" className="block">
            <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-accent transition-all group">
              <ShoppingBag className="h-8 w-8 text-accent mb-3" />
              <h3 className="font-semibold group-hover:text-accent transition-colors">Ver Tienda</h3>
              <p className="text-sm text-muted-foreground mt-1">Vista del cliente</p>
            </div>
          </Link>
          <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-accent transition-all group cursor-pointer">
            <Package className="h-8 w-8 text-accent mb-3" />
            <h3 className="font-semibold group-hover:text-accent transition-colors">Inventario</h3>
            <p className="text-sm text-muted-foreground mt-1">Gestionar stock</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-accent transition-all group cursor-pointer">
            <Users className="h-8 w-8 text-accent mb-3" />
            <h3 className="font-semibold group-hover:text-accent transition-colors">Clientes</h3>
            <p className="text-sm text-muted-foreground mt-1">Ver historial</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="search" className="sr-only">
                Buscar
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Buscar por nombre, email o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "all")}
                className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
              >
                {statusFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Pedidos Recientes</h2>
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">Cargando pedidos...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold">No hay pedidos</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm || statusFilter !== "all" ? "Intenta con otros filtros" : "Los pedidos aparecerán aquí"}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => <AdminOrderCard key={order.id} order={order} onUpdate={handleUpdateOrder} />)
          )}
        </div>
      </main>
    </div>
  )
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  category_id: string | null
  image_url: string | null
  sizes: string[]
  colors: string[]
  stock: number
  featured: boolean
  created_at: string
  updated_at: string
  categories?: Category
}

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"

export interface StatusHistoryEntry {
  status: OrderStatus
  timestamp: string
  note?: string
}

export interface Order {
  id: string
  customer_email: string
  customer_name: string
  customer_phone: string | null
  shipping_address: string
  total: number
  status: OrderStatus
  stripe_session_id: string | null
  tracking_number: string | null
  status_history: StatusHistoryEntry[]
  estimated_delivery: string | null
  shipped_at: string | null
  delivered_at: string | null
  notes: string | null
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  size: string | null
  color: string | null
  price: number
}

export interface Promotion {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  discount_percentage: number | null
  discount_code: string | null
  image_url: string | null
  background_color: string
  text_color: string
  link_url: string | null
  link_text: string
  active: boolean
  priority: number
  starts_at: string
  ends_at: string | null
  created_at: string
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  processing: "En Preparación",
  shipped: "Enviado",
  in_transit: "En Tránsito",
  out_for_delivery: "En Camino",
  delivered: "Entregado",
  cancelled: "Cancelado",
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-500",
  confirmed: "bg-blue-500",
  processing: "bg-purple-500",
  shipped: "bg-indigo-500",
  in_transit: "bg-cyan-500",
  out_for_delivery: "bg-orange-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
}

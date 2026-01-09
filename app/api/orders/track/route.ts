import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get("email")
    const orderId = searchParams.get("orderId")

    if (!email && !orderId) {
      return NextResponse.json({ error: "Debes proporcionar un email o número de pedido" }, { status: 400 })
    }

    const supabase = await createClient()

    let query = supabase
      .from("orders")
      .select(`
        *,
        items:order_items(*)
      `)
      .order("created_at", { ascending: false })

    if (email) {
      query = query.eq("customer_email", email)
    }

    if (orderId) {
      query = query.eq("id", orderId)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching orders:", error)
      return NextResponse.json({ error: "Error al buscar pedidos" }, { status: 500 })
    }

    return NextResponse.json({ orders: data })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

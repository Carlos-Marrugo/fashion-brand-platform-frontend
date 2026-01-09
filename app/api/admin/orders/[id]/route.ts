import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const updates = await request.json()

    const supabase = await createClient()

    // Obtener el pedido actual para el historial
    const { data: currentOrder } = await supabase.from("orders").select("status, status_history").eq("id", id).single()

    // Preparar historial de estados
    let statusHistory = currentOrder?.status_history || []
    if (updates.status && updates.status !== currentOrder?.status) {
      statusHistory = [
        ...statusHistory,
        {
          status: updates.status,
          timestamp: new Date().toISOString(),
          note: updates.notes || undefined,
        },
      ]
    }

    const { data, error } = await supabase
      .from("orders")
      .update({
        ...updates,
        status_history: statusHistory,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating order:", error)
      return NextResponse.json({ error: "Error al actualizar pedido" }, { status: 500 })
    }

    return NextResponse.json({ order: data })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

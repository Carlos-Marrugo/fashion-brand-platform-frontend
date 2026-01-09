"use server"

import { createClient } from "@/lib/supabase/server"
import { stripe } from "@/lib/stripe"

interface OrderItem {
  productId: string
  productName: string
  quantity: number
  size: string
  color: string
  price: number
}

interface CreateOrderInput {
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  items: OrderItem[]
  total: number
}

export async function createOrder(input: CreateOrderInput) {
  const supabase = await createClient()

  try {
    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: input.customerName,
        customer_email: input.customerEmail,
        customer_phone: input.customerPhone,
        shipping_address: input.shippingAddress,
        total: input.total,
        status: "pending",
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = input.items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      price: item.price,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) throw itemsError

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      redirect_on_completion: "never",
      customer_email: input.customerEmail,
      line_items: input.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.productName,
            description: `Talla: ${item.size} | Color: ${item.color}`,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      metadata: {
        order_id: order.id,
      },
    })

    // Update order with Stripe session ID
    await supabase.from("orders").update({ stripe_session_id: session.id }).eq("id", order.id)

    return {
      success: true,
      clientSecret: session.client_secret,
      orderId: order.id,
    }
  } catch (error) {
    console.error("Error creating order:", error)
    return {
      success: false,
      error: "Error al crear el pedido",
    }
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("orders").update({ status }).eq("id", orderId)

  if (error) {
    console.error("Error updating order status:", error)
    return { success: false, error: "Error al actualizar el pedido" }
  }

  return { success: true }
}

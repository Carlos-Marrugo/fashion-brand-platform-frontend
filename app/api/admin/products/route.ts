import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { data: product, error } = await supabase
      .from("products")
      .insert([
        {
          name: body.name,
          slug: body.slug,
          description: body.description,
          price: body.price,
          category_id: body.category_id || null,
          image_url: body.image_url || null,
          sizes: body.sizes || [],
          colors: body.colors || [],
          stock: body.stock || 0,
          featured: body.featured || false,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ product })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Error creating product" }, { status: 500 })
  }
}

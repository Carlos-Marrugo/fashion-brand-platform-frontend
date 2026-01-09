import { createClient } from "@/lib/supabase/server"
import { ProductCard } from "./product-card"
import type { Product } from "@/lib/types"

export async function FeaturedProducts() {
  const supabase = await createClient()

  const { data: products } = await supabase.from("products").select("*").eq("featured", true).limit(4)

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Productos Destacados</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Los favoritos de nuestros clientes. Diseños exclusivos con la mejor calidad.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

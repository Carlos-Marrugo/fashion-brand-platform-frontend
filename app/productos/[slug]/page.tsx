import { notFound } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = await supabase.from("products").select("*, categories(*)").eq("slug", slug).single()

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary/30">
              <Image
                src={product.image_url || "/selkyn_6_a1e2c755-dba1-45cc-be23-db67fb1b0cfc.webp?height=800&width=800&query=clothing sweater"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.featured && (
                <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">Destacado</Badge>
              )}
            </div>

            {/* Details */}
            <ProductDetails product={product as Product} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

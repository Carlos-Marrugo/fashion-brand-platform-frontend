import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Skeleton } from "@/components/ui/skeleton"
import type { Product, Category } from "@/lib/types"

interface ProductsPageProps {
  searchParams: Promise<{ categoria?: string; featured?: string }>
}

async function ProductsGrid({ searchParams }: { searchParams: { categoria?: string; featured?: string } }) {
  const supabase = await createClient()

  let query = supabase.from("products").select("*, categories(*)")

  if (searchParams.categoria) {
    const { data: category } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", searchParams.categoria)
      .single()

    if (category) {
      query = query.eq("category_id", category.id)
    }
  }

  if (searchParams.featured === "true") {
    query = query.eq("featured", true)
  }

  const { data: products } = await query.order("created_at", { ascending: false })

  if (!products || products.length === 0) {
    return (
      <div className="col-span-full py-20 text-center">
        <p className="text-muted-foreground">No se encontraron productos.</p>
      </div>
    )
  }

  return (
    <>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  )
}

function ProductsGridSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-border/50">
          <Skeleton className="aspect-square w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        </div>
      ))}
    </>
  )
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  const { data: categories } = await supabase.from("categories").select("*")

  const categoryName = params.categoria ? categories?.find((c: Category) => c.slug === params.categoria)?.name : null

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {categoryName || (params.featured ? "Productos Destacados" : "Todos los Productos")}
            </h1>
            <p className="mt-2 text-muted-foreground">Descubre nuestra colección de suéteres y sudaderas premium</p>
          </div>

          {/* Filters */}
          <ProductFilters categories={categories || []} />

          {/* Products Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid searchParams={params} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

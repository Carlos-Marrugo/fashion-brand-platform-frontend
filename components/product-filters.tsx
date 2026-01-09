"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { Category } from "@/lib/types"

interface ProductFiltersProps {
  categories: Category[]
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("categoria")

  const handleCategoryChange = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set("categoria", slug)
    } else {
      params.delete("categoria")
    }
    params.delete("featured")
    router.push(`/productos?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant={!currentCategory ? "default" : "outline"} size="sm" onClick={() => handleCategoryChange(null)}>
        Todos
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={currentCategory === category.slug ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange(category.slug)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}

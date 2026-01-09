import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Hombres",
    slug: "hombres",
    description: "Estilo urbano y sofisticado",
    image: "/mens-fashion-hoodie-streetwear.jpg",
  },
  {
    name: "Mujeres",
    slug: "mujeres",
    description: "Elegancia y comodidad",
    image: "/womens-fashion-sweater-elegant.jpg",
  },
  {
    name: "Niños",
    slug: "ninos",
    description: "Diversión y color",
    image: "/kids-colorful-hoodie-playful.jpg",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Explora por Categoría</h2>
          <p className="mt-4 text-muted-foreground">Encuentra el estilo perfecto para cada miembro de la familia</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/productos?categoria=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4]"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                <h3 className="text-2xl font-bold">{category.name}</h3>
                <p className="mt-1 text-primary-foreground/80">{category.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                  <span>Ver productos</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/fashion-clothing-store-modern-minimalist-sweaters-.jpg" alt="Hero background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block mb-4 text-sm font-medium tracking-wider text-accent uppercase">
            Nueva Colección 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Estilo que
            <span className="block text-accent">define tu esencia</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Descubre nuestra colección exclusiva de suéteres y sudaderas con diseños únicos. Calidad premium para
            hombres, mujeres y niños.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/productos">
              <Button size="lg" className="gap-2 text-base">
                Ver Colección
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/productos?featured=true">
              <Button size="lg" variant="outline" className="text-base bg-transparent">
                Productos Destacados
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Copy, Check } from "lucide-react"
import type { Promotion } from "@/lib/types"

interface PromotionsSliderProps {
  promotions: Promotion[]
}

export function PromotionsSlider({ promotions }: PromotionsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % promotions.length)
  }, [promotions.length])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length)
  }

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  useEffect(() => {
    if (!isAutoPlaying || promotions.length <= 1) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, promotions.length])

  if (promotions.length === 0) return null

  const currentPromo = promotions[currentIndex]

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative min-h-[400px] md:min-h-[500px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={currentPromo.image_url || "/placeholder.svg?height=600&width=1200&query=fashion promotion"}
            alt={currentPromo.title}
            fill
            className="object-cover transition-opacity duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="max-w-xl">
            {currentPromo.subtitle && (
              <span className="inline-block mb-3 text-sm font-medium tracking-wider text-accent uppercase animate-in fade-in slide-in-from-bottom-4 duration-500">
                {currentPromo.subtitle}
              </span>
            )}

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white text-balance animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              {currentPromo.title}
            </h2>

            {currentPromo.description && (
              <p className="mt-4 text-lg text-white/80 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                {currentPromo.description}
              </p>
            )}

            {/* Discount Code */}
            {currentPromo.discount_code && (
              <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                  <span className="text-sm text-white/70">Código:</span>
                  <span className="font-mono font-bold text-lg text-accent">{currentPromo.discount_code}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyCode(currentPromo.discount_code!)}
                    className="h-8 w-8 p-0 text-white hover:text-accent hover:bg-white/10"
                  >
                    {copiedCode === currentPromo.discount_code ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* CTA Button */}
            {currentPromo.link_url && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[400ms]">
                <Link href={currentPromo.link_url}>
                  <Button size="lg" className="text-base gap-2">
                    {currentPromo.link_text}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        {promotions.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Promoción anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Siguiente promoción"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {promotions.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {promotions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-accent" : "w-2 bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Ir a promoción ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

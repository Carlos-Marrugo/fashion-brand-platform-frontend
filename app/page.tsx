import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoriesSection } from "@/components/categories-section"
import { FeaturesSection } from "@/components/features-section"
import { PromotionsSlider } from "@/components/promotions-slider"
import { SocialSection } from "@/components/social-section"
import { createClient } from "@/lib/supabase/server"
import type { Promotion } from "@/lib/types"

async function getPromotions(): Promise<Promotion[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("promotions")
      .select("*")
      .eq("active", true)
      .order("priority", { ascending: true })

    if (error) throw error
    return data || []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const promotions = await getPromotions()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        {promotions.length > 0 && <PromotionsSlider promotions={promotions} />}
        <FeaturesSection />
        <FeaturedProducts />
        <CategoriesSection />
        <SocialSection />
      </main>
      <Footer />
    </div>
  )
}

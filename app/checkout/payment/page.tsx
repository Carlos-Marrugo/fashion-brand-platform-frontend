"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Loader2 } from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function PaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    const session = searchParams.get("session")
    if (session) {
      setClientSecret(session)
    } else {
      router.push("/carrito")
    }
  }, [searchParams, router])

  const handleComplete = useCallback(() => {
    clearCart()
    const orderId = searchParams.get("orderId")
    router.push(`/checkout/success?orderId=${orderId}`)
  }, [clearCart, router, searchParams])

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{
        clientSecret,
        onComplete: handleComplete,
      }}
    >
      <EmbeddedCheckout className="max-w-2xl mx-auto" />
    </EmbeddedCheckoutProvider>
  )
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-center mb-8">Completa tu Pago</h1>
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            }
          >
            <PaymentContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}

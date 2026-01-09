import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

interface SuccessPageProps {
  searchParams: Promise<{ orderId?: string }>
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="mt-6 text-3xl font-bold">¡Pedido Confirmado!</h1>

          <p className="mt-4 text-muted-foreground">
            Gracias por tu compra. Hemos recibido tu pedido y te enviaremos un correo con los detalles de envío.
          </p>

          {params.orderId && (
            <p className="mt-4 text-sm text-muted-foreground">
              ID del pedido: <span className="font-mono">{params.orderId}</span>
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/productos">
              <Button size="lg">Seguir Comprando</Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

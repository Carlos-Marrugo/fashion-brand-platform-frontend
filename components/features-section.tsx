import { Truck, Shield, RefreshCw, CreditCard } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "En pedidos mayores a $100",
  },
  {
    icon: Shield,
    title: "Calidad Garantizada",
    description: "Materiales premium certificados",
  },
  {
    icon: RefreshCw,
    title: "Devoluciones Fáciles",
    description: "30 días para cambios",
  },
  {
    icon: CreditCard,
    title: "Pago Seguro",
    description: "Transacciones protegidas",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 border-y border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <feature.icon className="h-6 w-6 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

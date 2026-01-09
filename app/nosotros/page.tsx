import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, Users, Leaf, ArrowRight, Instagram, MessageCircle } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Pasión por el Diseño",
    description: "Cada prenda nace del amor por la moda y el deseo de crear algo único que te haga sentir especial.",
  },
  {
    icon: Sparkles,
    title: "Calidad Premium",
    description: "Usamos los mejores materiales para garantizar durabilidad, comodidad y un acabado impecable.",
  },
  {
    icon: Users,
    title: "Para Toda la Familia",
    description: "Creemos que el estilo no tiene edad. Diseñamos para hombres, mujeres y niños con el mismo amor.",
  },
  {
    icon: Leaf,
    title: "Compromiso Sostenible",
    description: "Trabajamos con proveedores responsables y buscamos reducir nuestro impacto ambiental cada día.",
  },
]

const timeline = [
  {
    year: "2023",
    title: "El Sueño Comienza",
    description:
      "Lo que empezó como una idea durante una noche de lluvia se convirtió en nuestro primer boceto de diseño.",
  },
  {
    year: "2024",
    title: "Primeras Creaciones",
    description: "Lanzamos nuestra primera colección limitada, vendiendo a amigos y familia que creyeron en nosotros.",
  },
  {
    year: "2025",
    title: "THREAD Nace Oficialmente",
    description: "Abrimos nuestra tienda online y empezamos a llevar nuestros diseños a todo Colombia.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-secondary/30" />
          <div className="container relative mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block mb-4 text-sm font-medium tracking-wider text-accent uppercase">
                Nuestra Historia
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
                Dos soñadores, una pasión:
                <span className="block text-accent mt-2">vestirte con estilo</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                THREAD nació del amor de dos personas que creen que la ropa es más que tela: es una forma de expresar
                quién eres y cómo te sientes.
              </p>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Photo */}
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <Image src="/young-couple-entrepreneurs-fashion-designers-smili.jpg" alt="Fundadores de THREAD" fill className="object-cover" />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/30 rounded-full blur-2xl" />

                {/* Badge */}
                <div className="absolute bottom-6 left-6 bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border">
                  <p className="text-sm font-medium text-muted-foreground">Fundadores</p>
                  <p className="text-lg font-bold">Desde 2023</p>
                </div>
              </div>

              {/* Story */}
              <div>
                <span className="inline-block mb-4 text-sm font-medium tracking-wider text-accent uppercase">
                  Los Creadores
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Un amor, una marca, mil diseños</h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Somos una pareja colombiana que decidió convertir su pasión por la moda en algo real. Todo comenzó
                    en nuestro pequeño apartamento, con una máquina de coser prestada y muchos sueños.
                  </p>
                  <p>
                    Ella aporta el ojo creativo, los colores atrevidos y los diseños que enamoran. Él se encarga de que
                    cada prenda tenga la calidad que mereces y llegue a tus manos perfecta.
                  </p>
                  <p>
                    Juntos, hemos creado THREAD: una marca que representa lo que amamos hacer. Cada suéter, cada
                    sudadera, lleva un pedacito de nuestra historia y todo nuestro cariño.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/productos">
                    <Button size="lg" className="gap-2">
                      Ver Colección
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://instagram.com/thread_oficial" target="_blank">
                    <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                      <Instagram className="h-4 w-4" />
                      Síguenos
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block mb-3 text-sm font-medium tracking-wider text-accent uppercase">
                Nuestros Valores
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Lo que nos mueve cada día</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block mb-3 text-sm font-medium tracking-wider text-accent uppercase">
                Nuestra Trayectoria
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">De sueño a realidad</h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

                {/* Timeline items */}
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div key={item.year} className="relative flex gap-6">
                      {/* Dot */}
                      <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground font-bold text-lg shadow-lg">
                        {item.year}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-3">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-foreground text-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">¿Listo para vestir con estilo?</h2>
            <p className="mt-4 text-lg text-background/70 max-w-2xl mx-auto">
              Explora nuestra colección y encuentra la prenda perfecta para ti y tu familia. Envíos a toda Colombia.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/productos">
                <Button size="lg" variant="secondary" className="gap-2">
                  Ver Productos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://wa.me/573001234567" target="_blank">
                <Button size="lg" className="gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white border-0">
                  <MessageCircle className="h-4 w-4" />
                  Escríbenos
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

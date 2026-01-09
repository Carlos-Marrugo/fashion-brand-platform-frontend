import Link from "next/link"
import { Instagram, Facebook, MessageCircle, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold tracking-tight">THREAD</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Suéteres y sudaderas con diseño único y calidad premium para toda la familia. Hecho con amor en Colombia.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="https://instagram.com/thread_oficial"
                target="_blank"
                className="p-2 rounded-full bg-secondary hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:text-white transition-all"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="https://facebook.com/thread"
                target="_blank"
                className="p-2 rounded-full bg-secondary hover:bg-blue-600 hover:text-white transition-all"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://wa.me/573001234567"
                target="_blank"
                className="p-2 rounded-full bg-secondary hover:bg-[#25D366] hover:text-white transition-all"
              >
                <MessageCircle className="h-4 w-4" />
              </Link>
              <Link
                href="https://tiktok.com/@thread"
                target="_blank"
                className="p-2 rounded-full bg-secondary hover:bg-black hover:text-white transition-all"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </Link>
              <Link
                href="https://youtube.com/thread"
                target="_blank"
                className="p-2 rounded-full bg-secondary hover:bg-red-600 hover:text-white transition-all"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Tienda</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/productos?categoria=hombres"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Hombres
                </Link>
              </li>
              <li>
                <Link
                  href="/productos?categoria=mujeres"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mujeres
                </Link>
              </li>
              <li>
                <Link
                  href="/productos?categoria=ninos"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Niños
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Todos los productos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ayuda</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/nosotros" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Guía de tallas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Envíos y entregas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/seguimiento" className="text-muted-foreground hover:text-foreground transition-colors">
                  Rastrear Pedido
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                hola@thread.com.co
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                +57 300 123 4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                Bogotá, Colombia
              </li>
              <li className="pt-2">Lun - Vie: 9am - 6pm</li>
              <li>Sáb: 10am - 2pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} THREAD. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Términos y condiciones
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

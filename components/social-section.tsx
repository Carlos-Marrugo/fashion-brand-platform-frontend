import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter, Youtube, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/thread",
    handle: "@thread_oficial",
    color: "hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-500",
    followers: "125K",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/thread",
    handle: "THREAD Oficial",
    color: "hover:bg-blue-600",
    followers: "89K",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/thread",
    handle: "@thread",
    color: "hover:bg-sky-500",
    followers: "45K",
  },
  {
    name: "TikTok",
    icon: MessageCircle,
    url: "https://tiktok.com/@thread",
    handle: "@thread",
    color: "hover:bg-black",
    followers: "200K",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/thread",
    handle: "THREAD",
    color: "hover:bg-red-600",
    followers: "67K",
  },
]

const instagramPosts = [
  { id: 1, query: "fashion sweater outfit style" },
  { id: 2, query: "hoodie streetwear urban fashion" },
  { id: 3, query: "cozy winter fashion clothing" },
  { id: 4, query: "family matching outfits fashion" },
  { id: 5, query: "fashion photoshoot model sweater" },
  { id: 6, query: "casual fashion lifestyle clothing" },
]

export function SocialSection() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block mb-3 text-sm font-medium tracking-wider text-accent uppercase">Síguenos</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">Únete a nuestra comunidad</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Sé parte de la familia THREAD. Comparte tu estilo, descubre nuevas tendencias y mantente al día con nuestras
            novedades.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {socialLinks.map((social) => (
            <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className={`h-auto py-3 px-5 gap-3 group transition-all duration-300 hover:text-white hover:border-transparent ${social.color}`}
              >
                <social.icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold text-sm">{social.name}</div>
                  <div className="text-xs text-muted-foreground group-hover:text-white/80">
                    {social.followers} seguidores
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>

        {/* Instagram Grid */}
        <div className="mt-12">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Instagram className="h-5 w-5 text-accent" />
            <span className="font-semibold">@thread_oficial</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {instagramPosts.map((post) => (
              <Link
                key={post.id}
                href="https://instagram.com/thread"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden rounded-lg group"
              >
                <Image
                  src={`/.jpg?height=300&width=300&query=${post.query}`}
                  alt="Instagram post"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 text-center">
          <div className="max-w-md mx-auto bg-card rounded-2xl p-8 border border-border shadow-lg">
            <h3 className="text-xl font-bold mb-2">Suscríbete a nuestro newsletter</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Recibe ofertas exclusivas y novedades directamente en tu correo
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button type="submit">Suscribir</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

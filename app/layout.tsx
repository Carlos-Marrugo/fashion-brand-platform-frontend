import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SARLOS CLOTHES | Suéteres y Sudaderas Premium",
  description:
    "Descubre nuestra colección exclusiva de suéteres y sudaderas con diseños únicos para hombres, mujeres y niños. Calidad premium, estilo inigualable. Envíos a toda Colombia.",
  keywords: ["suéteres", "sudaderas", "ropa", "moda", "hombres", "mujeres", "niños", "premium", "Colombia", "Bogotá"],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <CartProvider>
          {children}
          <WhatsAppFloat />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}

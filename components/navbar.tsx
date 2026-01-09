"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingBag, Menu, Search, Package, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/productos?categoria=hombres", label: "Hombres" },
  { href: "/productos?categoria=mujeres", label: "Mujeres" },
  { href: "/productos?categoria=ninos", label: "Niños" },
  { href: "/nosotros", label: "Nosotros" },
]

export function Navbar() {
  const { totalItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">SARLOS CLOTHES</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>

          <Link href="/seguimiento">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Package className="h-5 w-5" />
              <span className="sr-only">Rastrear Pedido</span>
            </Button>
          </Link>

          <Link href="/admin">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
              <span className="sr-only">Admin</span>
            </Button>
          </Link>

          <Link href="/carrito">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Carrito</span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-left text-2xl font-bold">THREAD</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-2 border-border" />
                <Link
                  href="/seguimiento"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground transition-colors hover:text-accent flex items-center gap-2"
                >
                  <Package className="h-5 w-5" />
                  Rastrear Pedido
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground transition-colors hover:text-accent flex items-center gap-2"
                >
                  <User className="h-5 w-5" />
                  Administración
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

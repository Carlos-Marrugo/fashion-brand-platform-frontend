"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Package, RefreshCw, ArrowLeft, Pencil, Trash2, X, Upload, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/utils/format-price"
import type { Product, Category } from "@/lib/types"

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "2", "4", "6", "8", "10", "12", "14"]
const availableColors = [
  "Negro",
  "Blanco",
  "Gris",
  "Gris Oscuro",
  "Gris Perla",
  "Azul",
  "Azul Marino",
  "Verde",
  "Verde Bosque",
  "Rojo",
  "Rosa",
  "Rosa Palo",
  "Lavanda",
  "Beige",
  "Crema",
  "Blanco Roto",
  "Camel",
  "Borgoña",
  "Celeste",
  "Naranja",
  "Café",
  "Terracota",
]

interface ProductFormData {
  name: string
  slug: string
  description: string
  price: number
  category_id: string
  image_url: string
  sizes: string[]
  colors: string[]
  stock: number
  featured: boolean
}

const initialFormData: ProductFormData = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  category_id: "",
  image_url: "",
  sizes: [],
  colors: [],
  stock: 0,
  featured: false,
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<ProductFormData>(initialFormData)
  const [saving, setSaving] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [productsRes, categoriesRes] = await Promise.all([fetch("/api/products"), fetch("/api/categories")])
      const productsData = await productsRes.json()
      const categoriesData = await categoriesRes.json()

      if (productsData.products) setProducts(productsData.products)
      if (categoriesData.categories) setCategories(categoriesData.categories)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }))
  }

  const toggleSize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }))
  }

  const toggleColor = (color: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color) ? prev.colors.filter((c) => c !== color) : [...prev.colors, color],
    }))
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      price: product.price,
      category_id: product.category_id || "",
      image_url: product.image_url || "",
      sizes: product.sizes || [],
      colors: product.colors || [],
      stock: product.stock,
      featured: product.featured,
    })
    setShowForm(true)
  }

  const handleDelete = async (productId: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      })
      if (response.ok) {
        fetchData()
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : "/api/admin/products"
      const method = editingProduct ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowForm(false)
        setEditingProduct(null)
        setFormData(initialFormData)
        fetchData()
      }
    } catch (error) {
      console.error("Error saving product:", error)
    } finally {
      setSaving(false)
    }
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingProduct(null)
    setFormData(initialFormData)
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <Navbar />
      <main className="container mx-auto px-4 py-8 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gestión de Productos</h1>
              <p className="text-muted-foreground mt-1">Agrega, edita o elimina productos</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchData} variant="outline" className="gap-2 bg-transparent">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Actualizar
            </Button>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Producto
            </Button>
          </div>
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-card rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold">{editingProduct ? "Editar Producto" : "Nuevo Producto"}</h2>
                <Button variant="ghost" size="icon" onClick={closeForm}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre del Producto *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="Ej: Sudadera Premium"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                      placeholder="sudadera-premium"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Describe el producto..."
                    rows={3}
                    className="mt-1.5"
                  />
                </div>

                {/* Price, Stock, Category */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Precio (COP) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData((p) => ({ ...p, price: Number(e.target.value) }))}
                      placeholder="189900"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData((p) => ({ ...p, stock: Number(e.target.value) }))}
                      placeholder="50"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Categoría *</Label>
                    <select
                      id="category"
                      value={formData.category_id}
                      onChange={(e) => setFormData((p) => ({ ...p, category_id: e.target.value }))}
                      className="mt-1.5 w-full px-3 py-2 rounded-lg border border-border bg-background"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <Label htmlFor="image_url">URL de Imagen</Label>
                  <div className="mt-1.5 flex gap-3">
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData((p) => ({ ...p, image_url: e.target.value }))}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" className="gap-2 bg-transparent">
                      <Upload className="h-4 w-4" />
                      Subir
                    </Button>
                  </div>
                  {formData.image_url && (
                    <div className="mt-3 relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                      <Image
                        src={formData.image_url || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Sizes */}
                <div>
                  <Label>Tallas Disponibles *</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <Button
                        key={size}
                        type="button"
                        variant={formData.sizes.includes(size) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleSize(size)}
                        className="min-w-[44px]"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <Label>Colores Disponibles *</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {availableColors.map((color) => (
                      <Button
                        key={color}
                        type="button"
                        variant={formData.colors.includes(color) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Featured */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
                    className="h-4 w-4 rounded border-border"
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Producto destacado (aparecerá en la página principal)
                  </Label>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button type="button" variant="outline" onClick={closeForm} className="flex-1 bg-transparent">
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={saving} className="flex-1">
                    {saving ? "Guardando..." : editingProduct ? "Actualizar Producto" : "Crear Producto"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Cargando productos...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold">No hay productos</h3>
            <p className="text-sm text-muted-foreground mt-1">Agrega tu primer producto</p>
            <Button onClick={() => setShowForm(true)} className="mt-4 gap-2">
              <Plus className="h-4 w-4" />
              Agregar Producto
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-xl border border-border overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square bg-secondary/30">
                  {product.image_url ? (
                    <Image
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  {product.featured && (
                    <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
                      Destacado
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                  <p className="text-lg font-bold text-accent mt-1">{formatPrice(product.price)}</p>
                  <p className="text-sm text-muted-foreground mt-1">Stock: {product.stock}</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(product)} className="flex-1 gap-1">
                      <Pencil className="h-3.5 w-3.5" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

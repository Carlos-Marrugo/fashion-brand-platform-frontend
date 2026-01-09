-- Insertar promociones de ejemplo
INSERT INTO promotions (title, subtitle, description, discount_percentage, discount_code, image_url, background_color, text_color, link_url, link_text, priority) VALUES
(
  '¡NUEVA COLECCIÓN!',
  'Primavera 2025',
  'Descubre los nuevos diseños exclusivos de esta temporada',
  NULL,
  NULL,
  '/placeholder.svg?height=600&width=1200',
  '#1a1a2e',
  '#ffffff',
  '/productos',
  'Explorar Colección',
  1
),
(
  '30% DE DESCUENTO',
  'Solo por tiempo limitado',
  'En toda la colección de invierno. Usa el código al finalizar tu compra.',
  30,
  'WINTER30',
  '/placeholder.svg?height=600&width=1200',
  '#2d3436',
  '#ffffff',
  '/productos?categoria=hombres',
  'Comprar Ahora',
  2
),
(
  'ENVÍO GRATIS',
  'En compras mayores a $100',
  'Aprovecha el envío gratuito en todos tus pedidos este mes',
  NULL,
  NULL,
  '/placeholder.svg?height=600&width=1200',
  '#0f0f0f',
  '#ffffff',
  '/productos',
  'Ver Productos',
  3
),
(
  'COLECCIÓN KIDS',
  '¡Llegaron nuevos estilos!',
  'Ropa cómoda y divertida para los más pequeños de la casa',
  15,
  'KIDS15',
  '/placeholder.svg?height=600&width=1200',
  '#2c3e50',
  '#ffffff',
  '/productos?categoria=ninos',
  'Ver Colección Niños',
  4
);

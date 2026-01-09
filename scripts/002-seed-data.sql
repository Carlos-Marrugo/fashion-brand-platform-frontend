-- Insertar categorías
INSERT INTO categories (name, slug, description) VALUES
('Hombres', 'hombres', 'Suéteres y sudaderas para hombres'),
('Mujeres', 'mujeres', 'Suéteres y sudaderas para mujeres'),
('Niños', 'ninos', 'Suéteres y sudaderas para niños');

-- Insertar productos de ejemplo
INSERT INTO products (name, slug, description, price, category_id, image_url, sizes, colors, stock, featured) VALUES
-- Hombres
('Sudadera Urban Classic', 'sudadera-urban-classic', 'Sudadera con capucha de algodón premium, perfecta para el día a día. Diseño minimalista con detalles bordados.', 89.99, (SELECT id FROM categories WHERE slug = 'hombres'), '/placeholder.svg?height=600&width=600', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Negro', 'Gris', 'Azul Marino'], 50, true),
('Suéter Premium Knit', 'sueter-premium-knit', 'Suéter tejido de lana merino con patrón exclusivo. Calidad excepcional y confort superior.', 129.99, (SELECT id FROM categories WHERE slug = 'hombres'), '/placeholder.svg?height=600&width=600', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Beige', 'Verde Bosque', 'Borgoña'], 35, true),
('Hoodie Street Edition', 'hoodie-street-edition', 'Sudadera oversized con estampado exclusivo. Algodón orgánico y corte moderno.', 109.99, (SELECT id FROM categories WHERE slug = 'hombres'), '/placeholder.svg?height=600&width=600', ARRAY['M', 'L', 'XL', 'XXL'], ARRAY['Blanco', 'Negro', 'Gris Oscuro'], 40, false),
('Suéter Essential Crew', 'sueter-essential-crew', 'El básico perfecto. Cuello redondo clásico en algodón suave con ajuste perfecto.', 69.99, (SELECT id FROM categories WHERE slug = 'hombres'), '/placeholder.svg?height=600&width=600', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Negro', 'Blanco', 'Azul', 'Gris'], 60, false),

-- Mujeres
('Sudadera Cozy Vibes', 'sudadera-cozy-vibes', 'Sudadera ultra suave con interior afelpado. Corte cropped moderno y cómodo.', 79.99, (SELECT id FROM categories WHERE slug = 'mujeres'), '/placeholder.svg?height=600&width=600', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Rosa Palo', 'Lavanda', 'Crema'], 45, true),
('Suéter Elegant Touch', 'sueter-elegant-touch', 'Suéter fino de cachemira con escote V. Elegancia y comodidad en una prenda.', 149.99, (SELECT id FROM categories WHERE slug = 'mujeres'), '/placeholder.svg?height=600&width=600', ARRAY['XS', 'S', 'M', 'L'], ARRAY['Camel', 'Negro', 'Gris Perla'], 25, true),
('Hoodie Oversized Chic', 'hoodie-oversized-chic', 'Sudadera oversized con diseño minimalista. Perfecta para looks casuales con estilo.', 94.99, (SELECT id FROM categories WHERE slug = 'mujeres'), '/placeholder.svg?height=600&width=600', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Beige', 'Negro', 'Blanco Roto'], 55, false),
('Suéter Soft Dream', 'sueter-soft-dream', 'Suéter de punto suave con mangas abullonadas. Diseño femenino y romántico.', 84.99, (SELECT id FROM categories WHERE slug = 'mujeres'), '/placeholder.svg?height=600&width=600', ARRAY['XS', 'S', 'M', 'L'], ARRAY['Rosa', 'Celeste', 'Blanco'], 40, false),

-- Niños
('Sudadera Mini Explorer', 'sudadera-mini-explorer', 'Sudadera colorida y resistente para pequeños aventureros. 100% algodón orgánico.', 49.99, (SELECT id FROM categories WHERE slug = 'ninos'), '/placeholder.svg?height=600&width=600', ARRAY['4', '6', '8', '10', '12'], ARRAY['Azul', 'Rojo', 'Verde'], 70, true),
('Suéter Rainbow Kids', 'sueter-rainbow-kids', 'Suéter alegre con diseño multicolor. Suave y fácil de lavar.', 44.99, (SELECT id FROM categories WHERE slug = 'ninos'), '/placeholder.svg?height=600&width=600', ARRAY['4', '6', '8', '10', '12'], ARRAY['Multicolor', 'Arcoíris Pastel'], 50, true),
('Hoodie Dino Fun', 'hoodie-dino-fun', 'Sudadera con diseño de dinosaurios. Con capucha con orejas divertidas.', 54.99, (SELECT id FROM categories WHERE slug = 'ninos'), '/placeholder.svg?height=600&width=600', ARRAY['4', '6', '8', '10'], ARRAY['Verde', 'Azul', 'Naranja'], 45, false),
('Suéter Starry Night', 'sueter-starry-night', 'Suéter con estampado de estrellas que brilla en la oscuridad. Mágico y divertido.', 59.99, (SELECT id FROM categories WHERE slug = 'ninos'), '/placeholder.svg?height=600&width=600', ARRAY['4', '6', '8', '10', '12'], ARRAY['Azul Marino', 'Negro'], 35, false);

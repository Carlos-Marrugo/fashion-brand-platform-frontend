-- Actualizar precios a pesos colombianos y agregar más productos

-- Primero actualizamos los productos existentes con precios en COP
UPDATE products SET price = 189900 WHERE slug = 'sudadera-urban-classic';
UPDATE products SET price = 259900 WHERE slug = 'sueter-premium-knit';
UPDATE products SET price = 219900 WHERE slug = 'hoodie-street-edition';
UPDATE products SET price = 149900 WHERE slug = 'sueter-essential-crew';
UPDATE products SET price = 169900 WHERE slug = 'sudadera-cozy-vibes';
UPDATE products SET price = 299900 WHERE slug = 'sueter-elegant-touch';
UPDATE products SET price = 199900 WHERE slug = 'hoodie-oversized-chic';
UPDATE products SET price = 179900 WHERE slug = 'sueter-soft-dream';
UPDATE products SET price = 99900 WHERE slug = 'sudadera-mini-explorer';
UPDATE products SET price = 89900 WHERE slug = 'sueter-rainbow-kids';
UPDATE products SET price = 109900 WHERE slug = 'hoodie-dino-fun';
UPDATE products SET price = 119900 WHERE slug = 'sueter-starry-night';

-- Agregar más productos para HOMBRES
INSERT INTO products (name, slug, description, price, category_id, image_url, sizes, colors, stock, featured) VALUES
('Sudadera Midnight Black', 'sudadera-midnight-black', 'Sudadera premium con capucha doble capa, bolsillo canguro y acabado premium. El negro más elegante para tu estilo urbano.', 209900, (SELECT id FROM categories WHERE slug = 'hombres'), '/placeholder.svg?height=600&width=600', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Negro', 'Gris Oscuro'], 45, true),
('Suéter Nordic Winter', 'sueter-nordic-winter', 'Suéter de lana gruesa con patrón nórdico tradicional. Perfecto para las noches frías con estilo auténtico.', 279900, (SELECT id FROM categories WHERE slug = 'hombres'), '/placeholder.svg?height=600&width=600', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Crema', 'Azul Marino', 'Gris'], 30, false),
('Hoodie Tech Sport', 'hoodie-tech-sport', 'Sudadera deportiva con tecnología de secado rápido y diseño ergonómico. Para el hombre activo que no sacrifica el estilo.', 239900, (SELECT id FROM categories WHERE slug = 'hombres'), '/placeholder.svg?height=600&width=600', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Gris', 'Negro', 'Azul'], 55, true),
('Suéter Classic V-Neck', 'sueter-classic-vneck', 'El clásico suéter con cuello en V, perfecto sobre camisa para un look ejecutivo casual.', 199900, (SELECT id FROM categories WHERE slug = 'hombres'), '/placeholder.svg?height=600&width=600', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Camel', 'Borgoña', 'Azul Marino'], 40, false),
('Sudadera Vintage Wash', 'sudadera-vintage-wash', 'Sudadera con acabado vintage desgastado, súper suave al tacto. El look retro que nunca pasa de moda.', 189900, (SELECT id FROM categories WHERE slug = 'hombres'), '/placeholder.svg?height=600&width=600', ARRAY['M', 'L', 'XL', 'XXL'], ARRAY['Gris', 'Azul', 'Verde'], 35, false),
('Hoodie Mountain Explorer', 'hoodie-mountain-explorer', 'Sudadera resistente con forro térmico, ideal para aventuras al aire libre. Estilo outdoor premium.', 269900, (SELECT id FROM categories WHERE slug = 'hombres'), '/placeholder.svg?height=600&width=600', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Verde Bosque', 'Negro', 'Gris Oscuro'], 25, true),

-- Agregar más productos para MUJERES
('Sudadera Blush Dreams', 'sudadera-blush-dreams', 'Sudadera ultra suave en tonos pastel con detalles bordados. Feminidad y comodidad en una prenda perfecta.', 179900, (SELECT id FROM categories WHERE slug = 'mujeres'), '/placeholder.svg?height=600&width=600', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Rosa Palo', 'Lavanda', 'Celeste'], 50, true),
('Suéter Bohemian Chic', 'sueter-bohemian-chic', 'Suéter oversized con patrones bohemios tejidos a mano. Arte que puedes vestir todos los días.', 249900, (SELECT id FROM categories WHERE slug = 'mujeres'), '/placeholder.svg?height=600&width=600', ARRAY['XS', 'S', 'M', 'L'], ARRAY['Crema', 'Terracota', 'Beige'], 28, false),
('Hoodie Cropped Trendy', 'hoodie-cropped-trendy', 'Sudadera cropped con cintura elástica, perfecta para combinar con jeans de tiro alto. El must de la temporada.', 169900, (SELECT id FROM categories WHERE slug = 'mujeres'), '/placeholder.svg?height=600&width=600', ARRAY['XS', 'S', 'M', 'L'], ARRAY['Blanco', 'Negro', 'Rosa'], 60, true),
('Suéter Cloud Nine', 'sueter-cloud-nine', 'Suéter de angora ultra esponjoso como una nube. Calidez y elegancia para los días fríos.', 289900, (SELECT id FROM categories WHERE slug = 'mujeres'), '/placeholder.svg?height=600&width=600', ARRAY['XS', 'S', 'M', 'L'], ARRAY['Crema', 'Rosa Palo', 'Gris Perla'], 22, false),
('Sudadera Athleisure Queen', 'sudadera-athleisure-queen', 'Del gym a la calle sin cambio de outfit. Sudadera deportiva con corte favorecedor y estilo premium.', 199900, (SELECT id FROM categories WHERE slug = 'mujeres'), '/placeholder.svg?height=600&width=600', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Negro', 'Gris', 'Azul Marino'], 45, false),
('Suéter Romantic Lace', 'sueter-romantic-lace', 'Suéter con detalles de encaje en los puños y cuello. Para la mujer que ama los detalles delicados.', 229900, (SELECT id FROM categories WHERE slug = 'mujeres'), '/placeholder.svg?height=600&width=600', ARRAY['XS', 'S', 'M', 'L'], ARRAY['Blanco', 'Negro', 'Rosa'], 32, true),

-- Agregar más productos para NIÑOS
('Sudadera Space Adventure', 'sudadera-space-adventure', 'Sudadera con estampado de planetas y cohetes que brillan en la oscuridad. Para pequeños astronautas.', 89900, (SELECT id FROM categories WHERE slug = 'ninos'), '/placeholder.svg?height=600&width=600', ARRAY['4', '6', '8', '10', '12'], ARRAY['Azul Marino', 'Negro'], 65, true),
('Suéter Animal Friends', 'sueter-animal-friends', 'Suéter adorable con caras de animalitos tejidos. Los más tiernos diseños para los más pequeños.', 79900, (SELECT id FROM categories WHERE slug = 'ninos'), '/placeholder.svg?height=600&width=600', ARRAY['2', '4', '6', '8', '10'], ARRAY['Crema', 'Celeste', 'Rosa'], 70, false),
('Hoodie Gaming Pro', 'hoodie-gaming-pro', 'Sudadera con diseños de videojuegos retro. Para los pequeños gamers con mucho estilo.', 99900, (SELECT id FROM categories WHERE slug = 'ninos'), '/placeholder.svg?height=600&width=600', ARRAY['6', '8', '10', '12', '14'], ARRAY['Negro', 'Azul', 'Rojo'], 50, true),
('Suéter Princess Dream', 'sueter-princess-dream', 'Suéter con detalles de brillantina y corona bordada. Para las princesas de la casa.', 84900, (SELECT id FROM categories WHERE slug = 'ninos'), '/placeholder.svg?height=600&width=600', ARRAY['2', '4', '6', '8', '10'], ARRAY['Rosa', 'Lavanda', 'Celeste'], 45, false),
('Sudadera Super Hero', 'sudadera-super-hero', 'Sudadera con capa desmontable para convertirse en superhéroe. ¡Diversión garantizada!', 109900, (SELECT id FROM categories WHERE slug = 'ninos'), '/placeholder.svg?height=600&width=600', ARRAY['4', '6', '8', '10'], ARRAY['Rojo', 'Azul', 'Negro'], 55, true),
('Suéter Cozy Bear', 'sueter-cozy-bear', 'Suéter con capucha de oso con orejas. Súper suave y abrigador para los más pequeños.', 94900, (SELECT id FROM categories WHERE slug = 'ninos'), '/placeholder.svg?height=600&width=600', ARRAY['2', '4', '6', '8'], ARRAY['Café', 'Gris', 'Crema'], 40, false);

-- Actualizar promociones con precios en COP
UPDATE promotions SET 
  title = '¡GRAN APERTURA!',
  subtitle = 'Hasta 40% OFF en toda la colección',
  description = 'Celebra con nosotros el lanzamiento de THREAD'
WHERE discount_code = 'THREAD40';

UPDATE promotions SET 
  title = 'ENVÍO GRATIS',
  subtitle = 'En compras mayores a $150.000 COP',
  description = 'A toda Colombia sin costo adicional'
WHERE discount_code = 'FREESHIP';

UPDATE promotions SET
  title = '2x1 EN NIÑOS',
  subtitle = 'Lleva 2 y paga 1',
  description = 'En toda la colección infantil'
WHERE discount_code = 'KIDS2X1';

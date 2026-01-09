-- Políticas adicionales para administración de productos

-- Permitir inserción de productos (admin)
CREATE POLICY "Allow product insertion" ON products
FOR INSERT WITH CHECK (true);

-- Permitir actualización de productos (admin)
CREATE POLICY "Allow product updates" ON products
FOR UPDATE USING (true) WITH CHECK (true);

-- Permitir eliminación de productos (admin)
CREATE POLICY "Allow product deletion" ON products
FOR DELETE USING (true);

-- Permitir todas las operaciones en orders para admin
CREATE POLICY "Allow order updates" ON orders
FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow reading all orders" ON orders
FOR SELECT USING (true);

-- Permitir lectura de order_items
CREATE POLICY "Allow reading order items" ON order_items
FOR SELECT USING (true);

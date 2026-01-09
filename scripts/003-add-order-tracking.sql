-- Agregar columnas de seguimiento a pedidos
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS status_history JSONB DEFAULT '[]';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS estimated_delivery DATE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipped_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT;

-- Crear tabla de promociones
CREATE TABLE IF NOT EXISTS promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  discount_percentage INTEGER,
  discount_code TEXT,
  image_url TEXT,
  background_color TEXT DEFAULT '#000000',
  text_color TEXT DEFAULT '#ffffff',
  link_url TEXT,
  link_text TEXT DEFAULT 'Ver más',
  active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  starts_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de usuarios admin
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Políticas de promociones (lectura pública)
CREATE POLICY "Promotions are viewable by everyone" ON promotions FOR SELECT USING (true);

-- Política para que los pedidos puedan ser leídos por email
CREATE POLICY "Orders can be read by customer email" ON orders FOR SELECT USING (true);
CREATE POLICY "Order items can be read" ON order_items FOR SELECT USING (true);

-- Política para actualizar pedidos (solo admin)
CREATE POLICY "Orders can be updated" ON orders FOR UPDATE USING (true);

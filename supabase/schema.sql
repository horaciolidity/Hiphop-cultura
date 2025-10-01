
-- Tabla de Perfiles de Usuario
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  handle TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  role TEXT DEFAULT 'user',
  subscription_tier TEXT DEFAULT 'free',
  location TEXT,
  website TEXT,
  instagram TEXT,
  twitter TEXT,
  youtube TEXT,
  spotify TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Tracks (Música)
CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  album_id UUID,
  duration INTEGER, -- en segundos
  file_url TEXT,
  cover_url TEXT,
  genre TEXT,
  mood TEXT,
  bpm INTEGER,
  key TEXT,
  lyrics TEXT,
  description TEXT,
  tags TEXT[],
  is_explicit BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT TRUE,
  price NUMERIC(10, 2),
  currency TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Videos
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  track_id UUID REFERENCES tracks(id),
  duration INTEGER, -- en segundos
  file_url TEXT,
  thumbnail_url TEXT,
  description TEXT,
  tags TEXT[],
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Álbumes
CREATE TABLE albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  cover_url TEXT,
  release_date DATE,
  description TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de unión Álbum-Track
CREATE TABLE album_tracks (
  album_id UUID REFERENCES albums(id),
  track_id UUID REFERENCES tracks(id),
  track_order INTEGER,
  PRIMARY KEY (album_id, track_id)
);
ALTER TABLE tracks ADD CONSTRAINT fk_album_id FOREIGN KEY (album_id) REFERENCES albums(id);

-- Tabla de Playlists
CREATE TABLE playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  cover_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de unión Playlist-Item
CREATE TABLE playlist_items (
  playlist_id UUID REFERENCES playlists(id),
  content_id UUID NOT NULL, -- Puede ser track_id o video_id
  content_type TEXT NOT NULL, -- 'track' o 'video'
  item_order INTEGER,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (playlist_id, content_id, content_type)
);

-- Tabla de Publicaciones (Feed Social)
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  media_urls TEXT[],
  tags TEXT[],
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Seguidores
CREATE TABLE follows (
  follower_id UUID REFERENCES profiles(id),
  following_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

-- Tabla de Reacciones
CREATE TABLE reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  content_id UUID NOT NULL,
  content_type TEXT NOT NULL, -- 'track', 'video', 'post', 'comment'
  reaction_type TEXT NOT NULL, -- 'like', 'fire', etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, content_id, content_type)
);

-- Tabla de Comentarios
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  content_id UUID NOT NULL,
  content_type TEXT NOT NULL, -- 'track', 'video', 'post'
  parent_id UUID REFERENCES comments(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Órdenes (Marketplace)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  total_amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL, -- 'pending', 'paid', 'failed'
  payment_method TEXT,
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Items de Órdenes
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  item_id UUID NOT NULL,
  item_type TEXT NOT NULL, -- 'track', 'album', 'merch'
  title TEXT,
  price NUMERIC(10, 2),
  quantity INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Suscripciones (VIP)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  artist_id UUID REFERENCES profiles(id),
  tier TEXT NOT NULL,
  status TEXT NOT NULL, -- 'active', 'cancelled', 'past_due'
  amount NUMERIC(10, 2),
  currency TEXT,
  payment_provider TEXT,
  provider_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Campañas de Crowdfunding
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  goal_amount NUMERIC(12, 2) NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL, -- 'draft', 'active', 'funded', 'cancelled'
  category TEXT,
  image_url TEXT,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Apoyos a Campañas
CREATE TABLE campaign_backers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id),
  user_id UUID REFERENCES profiles(id),
  amount NUMERIC(10, 2) NOT NULL,
  reward_id UUID,
  status TEXT, -- 'pledged', 'collected', 'failed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Contrataciones (Bookings)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES profiles(id),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  event_date TIMESTAMPTZ,
  event_type TEXT,
  venue_name TEXT,
  venue_address TEXT,
  status TEXT NOT NULL, -- 'pending', 'confirmed', 'cancelled', 'completed'
  agreed_fee NUMERIC(10, 2),
  currency TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Registro de Puntos
CREATE TABLE points_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  points INTEGER NOT NULL,
  action TEXT NOT NULL,
  description TEXT,
  entity_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Recompensas
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  cost INTEGER NOT NULL,
  type TEXT NOT NULL, -- 'discount', 'merchandise', etc.
  value TEXT,
  stock INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Canjes de Recompensas
CREATE TABLE redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  reward_id UUID REFERENCES rewards(id),
  points_spent INTEGER NOT NULL,
  status TEXT, -- 'completed', 'pending'
  code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Notificaciones
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Reportes (Moderación)
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES profiles(id),
  content_id UUID NOT NULL,
  content_type TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewed'
  reviewer_id UUID REFERENCES profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Webhooks (para Mercado Pago, etc.)
CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  payload JSONB NOT NULL,
  headers JSONB,
  status TEXT DEFAULT 'received',
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

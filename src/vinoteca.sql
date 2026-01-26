DROP TABLE IF EXISTS lineas_reserva CASCADE;
DROP TABLE IF EXISTS reservas CASCADE;
DROP TABLE IF EXISTS discos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- 1. ROLES
CREATE TABLE roles (
  id_rol       SERIAL PRIMARY KEY,
  nombre       VARCHAR(50) NOT NULL UNIQUE -- 'ADMIN', 'CLIENTE'
);

-- 2. USUARIOS (Admin y Clientes juntos)
CREATE TABLE usuarios (
  id_usuario      SERIAL PRIMARY KEY,
  id_rol          INT NOT NULL,
  nombre          VARCHAR(100) NOT NULL,
  email           VARCHAR(150) NOT NULL UNIQUE,
  password_hash   VARCHAR(255) NOT NULL, -- En producción usar bcrypt
  activo          BOOLEAN DEFAULT TRUE,
  fecha_creacion  TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT fk_usuarios_rol FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- 3. DISCOS (Tu catálogo local)
CREATE TABLE discos (
  id_disco      SERIAL PRIMARY KEY,
  discogs_id    INT NOT NULL UNIQUE, -- ID real de Discogs
  titulo        VARCHAR(255) NOT NULL,
  artista       VARCHAR(255) NOT NULL,
  imagen_url    TEXT,
  precio_dia    NUMERIC(10,2) NOT NULL DEFAULT 5.00,
  fecha_alta    TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RESERVAS (Pedidos)
CREATE TABLE reservas (
  id_reserva     SERIAL PRIMARY KEY,
  codigo         VARCHAR(50) UNIQUE, -- Ej: 'RES-2024-001'
  id_usuario     INT NOT NULL,       -- EL CLIENTE (Dueño de la reserva)
  creado_por     INT NOT NULL,       -- QUIEN LA HIZO (Puede ser Admin o el mismo Cliente)
  fecha_inicio   DATE NOT NULL,
  fecha_fin      DATE NOT NULL,
  estado         VARCHAR(20) NOT NULL DEFAULT 'ACTIVA', -- 'ACTIVA', 'FINALIZADA', 'CANCELADA'
  total          NUMERIC(10,2) DEFAULT 0,
  fecha_creacion TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT fk_reserva_dueno FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  CONSTRAINT fk_reserva_creador FOREIGN KEY (creado_por) REFERENCES usuarios(id_usuario),
  CONSTRAINT chk_fechas CHECK (fecha_fin >= fecha_inicio)
);

-- 5. LÍNEAS DE RESERVA (Qué discos pidió)
CREATE TABLE lineas_reserva (
  id_linea       SERIAL PRIMARY KEY,
  id_reserva     INT NOT NULL,
  id_disco       INT NOT NULL,
  precio_dia     NUMERIC(10,2) NOT NULL,

  CONSTRAINT fk_linea_reserva FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva) ON DELETE CASCADE,
  CONSTRAINT fk_linea_disco FOREIGN KEY (id_disco) REFERENCES discos(id_disco)
);
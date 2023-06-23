-- Active: 1687536755475@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

INSERT INTO users (id, name, email, password, created_at)
VALUES ('u001', 'Fulano', 'fulano@email.com', 'fulano123', 'new Date().toISOString()'),
('u002', 'Beltrana', 'beltrana@email.com', 'beltrana000', 'new Date().toISOString()'),
('u003', 'Gabriel', 'gabriel@email.com', 'gabri', 'new Date().toISOString()');

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url)
VALUES ('prod001', 'Mouse Gamer', '250', 'Melhor mouse do mercado!', 'https://picsum.photos/seed/Mouse%20gamer/400'),
('prod002', 'Monitor', '900', 'Monitor LED Full HD 24 polegadas', 'https://picsum.photos/seed/Monitor/400'),
('prod003', 'SSD', '150', 'SSD 512 Gb', 'https://picsum.photos/seed/Monitor/400'),
('prod004', 'Processador', '1150', 'AMD Ryzen 5', 'https://picsum.photos/seed/Monitor/400'),
('prod005', 'Placa-mãe', '600', 'Aorus B450M', 'https://picsum.photos/seed/Monitor/400');
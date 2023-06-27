-- Active: 1687536755475@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

INSERT INTO users (id, name, email, password, created_at)
VALUES ('u001', 'Fulano', 'fulano@email.com', 'fulano123', CURRENT_TIMESTAMP),
('u002', 'Beltrana', 'beltrana@email.com', 'beltrana000', CURRENT_TIMESTAMP),
('u003', 'Gabriel', 'gabriel@email.com', 'gabri', CURRENT_TIMESTAMP);

DROP TABLE users;

SELECT * FROM users;

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

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products
WHERE name LIKE '%gamer%';

INSERT INTO users (id, name, email, password, created_at)
VALUES ('u004', 'Vince', 'vin@email.com', 'vin123', CURRENT_TIMESTAMP);

INSERT INTO products (id, name, price, description, image_url)
VALUES ('prod006', 'Cooler', '100', 'Coolermaster Typhoon 3', 'https://picsum.photos/seed/Monitor/400');

DELETE FROM users
WHERE id='u001';

DELETE FROM products
WHERE id='prod003';

UPDATE products
SET 
id ='prod007',
name ='CoolerMaster',
price ='120',
description ='Coolermaster Typhoon 3 New Edition',
image_url='https://picsum.photos/seed/Mouse%20gamer/400'
WHERE id='prod006';

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
);

INSERT INTO purchases (id, buyer, total_price, created_at)
VALUES('pur001','u001','1250', CURRENT_TIMESTAMP),
('pur002','u002', '1000', CURRENT_TIMESTAMP),
('pur003', 'u003', '500', CURRENT_TIMESTAMP),
('pur004','u004', '27', CURRENT_TIMESTAMP);

DROP TABLE purchases;

SELECT * FROM purchases;

UPDATE purchases
SET total_price = '28'
WHERE id = 'b004';

SELECT purchases.id AS purchase_id, purchases.buyer AS buyer_id, users.name AS buyer_name, users.email, purchases.total_price, purchases.created_at
FROM users
JOIN purchases ON users.id = purchases.buyer
WHERE users.id = 'u004'; 

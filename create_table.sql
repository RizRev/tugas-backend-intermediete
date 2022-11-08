CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    stock INT NOT NULL,
    price INT NOT NULL,
    category_id INT REFERENCES category(id)
);

CREATE TABLE transactions(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    products_id INT REFERENCES products(id),
    amount INT NOT NULL,
    total INT NOT NULL
);

INSERT INTO category(id,name) VALUES(1,'sepatu'),(2,'baju'),(3,'celana'),(4,'topi');

INSERT INTO products(id,name,stock,price,category_id) VALUES(1,'Nike',10,500000,1);
INSERT INTO products(id,name,stock,price,category_id) VALUES(2,'Erigo',10,65000,2);
INSERT INTO products(id,name,stock,price,category_id) VALUES(3,'Levis',10,300000,3);
INSERT INTO products(id,name,stock,price,category_id) VALUES(4,'Eiger',10,75000,4);

INSERT INTO payment_status(id,name) VALUES(1,'unpaid');
INSERT INTO payment_status(id,name) VALUES(2,'paid');

INSERT INTO transactions(id,email,products_id,amount,total,status) VALUES(1,'wow@pijar.id',1,2,30000,1);


SELECT products.name,products.stock,products.price,category.name as category FROM products INNER JOIN category ON products.category_id = category.id;

SELECT transactions.email, products.name as products_name, transactions.amount, products.price, transactions.total, payment_status.name as status FROM transactions JOIN products ON transactions.products_id = products.id JOIN payment_status ON transactions.status = payment_status.id;

UPDATE transactions SET status=2 WHERE id=1;

ALTER TABLE transactions ADD username VARCHAR(255) AFTER id;














-- many to many --

CREATE TABLE tag (
  id SERIAL PRIMARY KEY,
  tag_value TEXT
)

CREATE TABLE products_tag (
  products_id INT
  tag_id INT
  PRIMARY KEY (products_id, tag_id)
  CONSTRAINT fk_products FOREIGN KEY(products_id) REFERENCES products(id)
  CONSTRAINT fk_tag FOREIGN KEY(tag_id) REFERENCES tag(id)
)
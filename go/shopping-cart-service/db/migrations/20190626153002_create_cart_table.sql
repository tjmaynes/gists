-- migrate:up
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255) NOT NULL,
  price BIGINT NOT NULL,
  manufacturer VARCHAR (255) NOT NULL
);

-- migrate:down
DROP TABLE IF EXISTS cart;

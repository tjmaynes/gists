-- migrate:up
CREATE TABLE product (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR (255) NOT NULL,
  price BIGINT NOT NULL,
  manufacturer VARCHAR (255) NOT NULL,
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE IF EXISTS product;
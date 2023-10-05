CREATE TABLE users(
  user_id INT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(150),
  password VARCHAR(50),
  user_type VARCHAR(100));

CREATE TABLE broker(
  broker_id INT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  user_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(user_id));

CREATE TABLE property(
  property_id INT PRIMARY KEY,
  property_name VARCHAR(100),
  address_line VARCHAR(150),
  city VARCHAR(100),
  region VARCHAR(100),
  description VARCHAR(250),
  num_of_bedrooms INT,
  num_of_bathrooms INT,
  num_of_cars INT);



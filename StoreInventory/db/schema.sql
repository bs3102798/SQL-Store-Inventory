DROP DATABASE IF EXISTS storeInventoryTracker_db;
CREATE DATABASE storeInventoryTracker_db;
USE storeInventoryTracker_db

CREATE TABLE Stores(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
store_name VARCHAR(255) NOT NULL

);

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
price DECIMAL(10,2),
store_id INT,
FOREIGN KEY (department_id)
REFERENCES departments(id)
ON DELETE SET NULL

);

CREATE TABLE employess(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    marnager_id INT NOT NULL

);

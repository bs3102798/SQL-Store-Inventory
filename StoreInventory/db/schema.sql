DROP DATABASE IF EXISTS storeInventoryTracker_db;
CREATE DATABASE storeInventoryTracker_db;
USE storeInventoryTracker_db;

CREATE TABLE stores(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
store_name VARCHAR(255) NOT NULL

);
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL
);

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
price DECIMAL(10,2),
store_id INT,
FOREIGN KEY (store_id) 
REFERENCES stores(id) ON DELETE SET NULL

);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT NULL

);

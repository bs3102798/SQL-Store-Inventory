INSERT INTO stores(store_name) VALUES
('Walmart'),
('Target'),
('Amazon'),
('Best Buy'),
('Costco'),
('Apple Store'),
('Home Depot'),
('Nike'),
('IKEA'),
('Sams Club');

INSERT INTO profits(stores, store_profits, store_income, store_expenses) VALUES
('Walmart', 215000.00, 420000.00, 205000.00),
('Target', 198500.00, 390000.00, 191500.00),
('Amazon', 310000.00, 580000.00, 270000.00),
('Best Buy', 175000.00, 350000.00, 175000.00),
('Costco', 222000.00, 410000.00, 228000.00),
('Apple Store', 280000.00, 550000.00, 270000.00),
('Home Depot', 200500.00, 410000.00, 209500.00),
('Nike', 190000.00, 370000.00, 180000.00),
('IKEA', 250000.00, 500000.00, 250000.00),
('Sams Club', 195000.00, 385000.00, 190000.00);



INSERT INTO products(title, price, store_id) VALUES
('FreshBite Apples', 4.99 ,1),
('UltraClean Laundry Pods',12.99, 1),
('GlowMax LED Bulbs',9.99 ,1),

('CozyNest Blanket',24.99 ,2),
('SnapFit Blender',39.99,2),
('SwiftStirde Sneakers', 49.99,2),

('TechNova Smartwatch',59.99 ,3),
('EternaCharge Power Bank', 29.99, 3),
('Brew Coffee Maker', 79.99, 3),

('SoundSphere Earbuds', 99.99, 4),
('HyperView 4k Monitor',249.99, 4),
('GameRush Controller',59.99, 4),

('MegaBites Trail Mix',14.99, 5),
('PureFlow Water Filter',49.99, 5),
('PlushRest Mattress',399.99, 5),

('VisionAir Pro',1299.99, 6),
('SonicPod Mini',99.99, 6),
('AirTouch Stylus',129.99, 6),

('PowerThrive Drill',89.99, 7),
('GreenGlow LED Strip',29.99, 7),
('FortiLock Padlock',19.99, 7),

('AeroDash Running Shoes',129.99, 8),
('FlexEdge Training Shorts',39.99, 8),
('EnduraFit Yofa Mat',49.99, 8),

('LumiDesk Workstation',199.99, 9),
('ComfiNest Pillow', 24.99, 9),
('StackEase Shelving',89.99, 9),

('GlowMist Setting Spray',19.99, 10),
('VelvetKiss Lipstick', 24.99, 10),
('LUshLocks Hair Serum',34.99, 10);






INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
('tom', 'brady', 1, NULL),
('michael', 'jordan', 2, 1),
('serena', 'williams', 3, 2),
('lebron', 'james', 1, 3),
('tiger', 'woods', 2, 4),
('elon', 'musk', 3, 5),
('bill', 'gates', 1, 6),
('jeff', 'bezos', 2, 7),
('steve', 'jobs', 3, 8),
('mark', 'zuckerberg', 1, 9);


INSERT INTO departments (department_name) VALUES
('Management'),
('Sales'),
('Finance');

INSERT INTO roles (title, salary, department_id) VALUES
('Auditor', 80000, 1 ),
('Quality control', 70000, 2),
('Stocker', 60000, 3);
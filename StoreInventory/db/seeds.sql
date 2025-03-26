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

INSERT INTO profits(stores, store_profits, store_income, store_expense) VALUES
('Walmart', 200,000.00, 400,000.00, 200,000.00),
('Target', 200,000.00, 400,000.00, 200,000.00),
('Amazon', 200,000.00, 400,000.00, 200,000.00),
('Best Buy', 200,000.00, 400,000.00, 200,000.00),
('Costco', 200,000.00, 400,000.00, 200,000.00),
('Apple Store', 200,000.00, 400,000.00, 200,000.00),
('Home Depot', 200,000.00, 400,000.00, 200,000.00),
('Nike', 200,000.00, 400,000.00, 200,000.00),
('IKEA', 200,000.00, 400,000.00, 200,000.00),
('Sams Club', 200,000.00, 400,000.00, 200,000.00);



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
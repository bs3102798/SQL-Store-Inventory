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




INSERT INTO roles (title, salary, department_id) VALUES
('Manager', 50000, 1),
('Engineer', 70000, 2),
('HR', 40000, 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
('tom', 'brady', 1, 1),
('michael', 'jordan', 2, 2),
('serena', 'williams', 3, 3),
('lebron', 'james', 4, 4),
('tiger', 'woods', 5, 5),
('elon', 'musk', 6, 6),
('bill', 'gates', 7, 7),
('jeff', 'bezos', 8, 8),
('steve', 'jobs', 9, 9),
('mark', 'zuckerberg', 10, 10);

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
('UltraClean Laundry Pods',12.99, 2),
('GlowMax LED Bulbs',9.99 ,3),

('CozyNest Blanket',24.99 ,4),
('SnapFit Blender',39.99,5),
('SwiftStirde Sneakers', 49.99,6),

('TechNova Smartwatch',59.99 ,7),
('EternaCharge Power Bank', 29.99, 8),
('Brew Coffee Maker', 79.99, 9),

('SoundSphere Earbuds', 99.99, 10),
('HyperView 4k Monitor',249.99, 11),
('GameRush Controller',59.99, 12),

('MegaBites Trail Mix',14.99, 13),
('PureFlow Water Filter',49.99, 14),
('PlushRest Mattress',399.99, 15),

('VisionAir Pro',1299.99, 16),
('SonicPod Mini',99.99, 17),
('AirTouch Stylus',129.99, 18),

('PowerThrive Drill',89.99, 19),
('GreenGlow LED Strip',29.99, 20),
('FortiLock Padlock',19.99, 21),

('AeroDash Running Shoes',129.99, 22),
('FlexEdge Training Shorts',39.99, 23),
('EnduraFit Yofa Mat',49.99, 24),

('LumiDesk Workstation',199.99, 25),
('ComfiNest Pillow', 24.99, 26),
('StackEase Shelving',89.99, 27),

('GlowMist Setting Spray',19.99, 28),
('VelvetKiss Lipstick', 24.99, 29),
('LUshLocks Hair Serum',34.99, 30);






INSERT INTO employess(first_name, last_name, role_id, manager_id)
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

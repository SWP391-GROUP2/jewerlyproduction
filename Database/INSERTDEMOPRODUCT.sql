use JewelryProduction


INSERT INTO Gold (goldID, goldType, pricePerGram) VALUES
('G001', '9999', 2022973),
('G002', '999.9', 1979730),
('G003', '24k', 1977027),
('G004', '99', 1964865),
('G005', '18k', 1107568),
('G006', '16k', 1080541),
('G007', '15k', 1055676),
('G008', '10k', 725946);

Insert into PaymentMethod (paymentMethodID, paymentMethodName) values
('P001', 'Cash'),
('P002', 'VnPay')

INSERT INTO ProductSample (productSampleID, productName, description, type, style, size, price, goldID)
VALUES
    ('PS001', 'Golden Necklace', 'A beautiful 18k gold necklace with a pendant', 'Necklace', 'Chain', 18.0, 500000000.00, 'G001'),
    ('PS002', 'Silver Earrings', 'Stylish sterling silver earrings with a modern design', 'Earrings', 'Stud', NULL, 300000000.00, 'G001'),
    ('PS003', 'Diamond Ring', 'A luxurious 14k gold ring with a 1-carat diamond', 'Ring', 'Solitaire', 9.5, 50000000.00, 'G003'),
    ('PS004', 'Platinum Watch', 'A high-end platinum watch with a leather strap', 'Ring', 'Pave', 42.0, 10000000.00, 'G003'),
    ('PS005', 'Gold Bracelet', 'A elegant 10k gold bracelet with a charm', 'Bracelet', 'Pearl', 7.5, 20000000.00, 'G005'),
    ('PS006', 'Pearl Necklace', 'A classic freshwater pearl necklace with a clasp', 'Necklace', 'Station', 18.0, 150000000.00, 'G008'),
    ('PS007', 'Silver Pendant', 'A modern sterling silver pendant with a geometric design', 'Earrings', 'Ear Spike', NULL, 4000000.00, 'G003'),
    ('PS008', 'Rose Gold Earrings', 'Trendy rose gold earrings with a drop design', 'Earrings', 'Jacket', NULL, 60000000.00, 'G008'),
    ('PS009', 'White Gold Ring', 'A sophisticated 14k white gold ring with a diamond accent', 'Ring',  'Three Stone', 9.0, 30000000.00, 'G006')

INSERT INTO Gemstone (gemstoneID, name, color, caratWeight, cut, clarity, pricePerCarat, image, productSampleID, customizeRequestID, categoryID) 
VALUES 
	('GS001', 'Ruby Bright', 'Red', 1.5, 'Round', 'VVS1', 1500000, NULL, 'PS001', NULL, 2), 
    ('GS002', 'Emerald Glow', 'Green', 2.0, 'Emerald', 'VS2', 2500000, NULL, 'PS002', NULL, 2), 
    ('GS003', 'Sapphire Sky', 'Blue', 1.2, 'Oval', 'SI1', 2000000, NULL, 'PS003', NULL, 2), 
    ('GS004', 'Diamond Shine', 'White', 1.8, 'Princess', 'IF', 5000000, NULL, 'PS004', NULL, 2), 
    ('GS005', 'Topaz Spark', 'Yellow', 1.3, 'Cushion', 'VVS2', 1300000, NULL, 'PS005', NULL, 2), 
    ('GS006', 'Amethyst Dusk', 'Purple', 2.1, 'Marquise', 'VS1', 1100000, NULL, 'PS006', NULL, 2), 
    ('GS007', 'Garnet Flame', 'Dark Red', 1.4, 'Heart', 'SI2', 950000, NULL, 'PS007', NULL, 2), 
    ('GS008', 'Opal Dream', 'Multicolor', 1.7, 'Pear', 'VVS1', 1800000, NULL, 'PS008', NULL, 2), 
    ('GS009', 'Aquamarine Wave', 'Light Blue', 2.3, 'Asscher', 'VS2', 2100000, NULL, 'PS009', NULL, 2), 
    ('GS010', 'Peridot Glow', 'Olive Green', 1.6, 'Radiant', 'SI1', 1200000, NULL, 'PS009', NULL, 2);

INSERT INTO [3DDesign] ([3dDesignID], designName, Image, customizeRequestID, productSampleID, designStaffID)
VALUES 
    ('D3D001', 'Rotating White Gold Ring', 'FullRotatingWhiteGoldRingUnisexKimNM89', NULL, N'PS001', 'd8c53e64-75d4-4d53-b98c-92575ae9c4b9'),
    ('D3D002', 'Garnet Jewelry', 'GarnetJewelrySeMDG9', NULL, N'PS002', 'd8c53e64-75d4-4d53-b98c-92575ae9c4b9'),
    ('D3D003', 'Opal Pendant Necklace', 'OpalPendantNecklaceDC10', NULL, N'PS003', 'd8c53e64-75d4-4d53-b98c-92575ae9c4b9'),
    ('D3D004', 'Changing Blue Sapphire', 'PendantwithColor-ChangingBlueSapphireMDS23', NULL, N'PS004', 'd8c53e64-75d4-4d53-b98c-92575ae9c4b9'),
    ('D3D005', 'Rose Gold Diamond Necklace', 'RoseGoldDiamondNecklaceDC09', NULL, N'PS005', 'd8c53e64-75d4-4d53-b98c-92575ae9c4b9'),
    ('D3D006', 'Ruby Butterfly Wing Earrings', 'RubyButterflyWingEarringsNaturalGemstoneBTR4', NULL, 'PS006', 'd8c53e64-75d4-4d53-b98c-92575ae9c4b9'),
    ('D3D007', 'Translucent Sapphire Pendant', 'TranslucentSapphirePendantMDS18', NULL, 'PS007', 'd8c53e64-75d4-4d53-b98c-92575ae9c4b9'),
    ('D3D008', 'Unisex Emerald Ring', 'UnisexEmeraldRingNWE7', NULL, 'PS008', 'd8c53e64-75d4-4d53-b98c-92575ae9c4b9'),
    ('D3D009', 'Yellow Gold Sapphire Earrings', 'YellowGoldSapphireEarringsBTS18', NULL, 'PS009', 'd8c53e64-75d4-4d53-b98c-92575ae9c4b9')


SELECT * FROM Gemstone

INSERT INTO Category (categoryID,categoryName,description)
VALUES
('2','Ruby','Ruby 100% natural')

SELECT Gold.GoldType
FROM Gold
INNER JOIN ProductSample ON Gold.goldid = ProductSample .goldid
WHERE ProductSample .goldid = 'G001';

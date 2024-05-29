use JewelryProduction

-- Chèn dữ liệu vào bảng Role
INSERT INTO Role (RoleID, RoleName) VALUES 
('1', N'Customer'),
('2', N'Sale Staff'),
('3', N'Design Staff'),
('4', N'Production Staff'),
('5', N'Manager'),
('6', N'Admin');

-- Chèn dữ liệu vào bảng User với các mật khẩu khác nhau
INSERT INTO [User] (UserID, Name, DateOfBirth, PhoneNumber, Email, Password, RoleID) VALUES 
('U001', N'Nguyễn Văn A', '1990-01-01', 1234567890, 'nguyenvana@gmail.com', 'passwordA123', '1'),
('U002', N'Trần Thị B', '1992-02-02', 2345678901, 'tranthib@gmail.com', 'passwordB234', '2'),
('U003', N'Lê Văn C', '1993-03-03', 3456789012, 'levanc@gmail.com', 'passwordC345', '3'),
('U004', N'Phạm Thị D', '1994-04-04', 4567890123, 'phamthid@gmail.com', 'passwordD456', '4'),
('U005', N'Hoàng Văn E', '1995-05-05', 5678901234, 'hoangvane@gmail.com', 'passwordE567', '5'),
('U006', N'Vũ Thị F', '1996-06-06', 6789012345, 'vuthif@gmail.com', 'passwordF678', '6');

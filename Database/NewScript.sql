USE [JewelryProduction]
GO
/****** Object:  Table [dbo].[3DDesign]    Script Date: 5/29/2024 6:30:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[3DDesign](
	[3dDesignID] [nvarchar](50) NOT NULL,
	[designName] [nvarchar](50) NOT NULL,
	[description] [image] NOT NULL,
	[customizeRequestID] [nvarchar](50) NULL,
	[productSampleID] [nvarchar](50) NULL,
	[designStaffID] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_3DDesign] PRIMARY KEY CLUSTERED 
(
	[3dDesignID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 5/29/2024 6:30:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[categoryID] [nvarchar](50) NOT NULL,
	[categoryName] [nvarchar](50) NOT NULL,
	[description] [nvarchar](50) NOT NULL,
	[gemstoneID] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[categoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Collection]    Script Date: 5/29/2024 6:30:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Collection](
	[collectionID] [nvarchar](50) NOT NULL,
	[collectionName] [nvarchar](50) NOT NULL,
	[description] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Collection] PRIMARY KEY CLUSTERED 
(
	[collectionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CollectionProduct]    Script Date: 5/29/2024 6:30:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CollectionProduct](
	[collectionID] [nvarchar](50) NOT NULL,
	[productSampleID] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[collectionID] ASC,
	[productSampleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CustomerRequest]    Script Date: 5/29/2024 6:30:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomerRequest](
	[customizeRequestID] [nvarchar](50) NOT NULL,
	[goldID] [nvarchar](50) NOT NULL,
	[customerID] [nvarchar](50) NOT NULL,
	[type] [nvarchar](50) NOT NULL,
	[style] [nvarchar](50) NOT NULL,
	[size] [float] NULL,
	[quantity] [decimal](18, 0) NOT NULL,
 CONSTRAINT [PK_CustomerRequest] PRIMARY KEY CLUSTERED 
(
	[customizeRequestID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_CustomerRequest] UNIQUE NONCLUSTERED 
(
	[goldID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Gemstone]    Script Date: 5/29/2024 6:30:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Gemstone](
	[gemstoneID] [nvarchar](50) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[color] [nvarchar](50) NOT NULL,
	[caratWeight] [float] NOT NULL,
	[cut] [nvarchar](50) NOT NULL,
	[clarity] [nvarchar](50) NOT NULL,
	[pricePerCarat] [money] NOT NULL,
	[productSampleID] [nvarchar](50) NOT NULL,
	[customizeRequestD] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Gemstone] PRIMARY KEY CLUSTERED 
(
	[gemstoneID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Gold]    Script Date: 5/29/2024 6:30:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Gold](
	[goldID] [nvarchar](50) NOT NULL,
	[goldType] [nvarchar](50) NOT NULL,
	[weight] [float] NOT NULL,
	[pricePerGram] [money] NOT NULL,
 CONSTRAINT [PK_Gold] PRIMARY KEY CLUSTERED 
(
	[goldID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Insurance]    Script Date: 5/29/2024 6:30:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Insurance](
	[insuranceID] [nvarchar](50) NOT NULL,
	[startDate] [date] NOT NULL,
	[endDate] [date] NOT NULL,
	[orderID] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Insurance] PRIMARY KEY CLUSTERED 
(
	[insuranceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_Insurance] UNIQUE NONCLUSTERED 
(
	[orderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Message]    Script Date: 5/29/2024 6:30:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Message](
	[messageID] [nvarchar](50) NOT NULL,
	[messageText] [nvarchar](200) NOT NULL,
	[timestamp] [datetime] NOT NULL,
	[saleStaffID] [nvarchar](50) NOT NULL,
	[customerID] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Message] PRIMARY KEY CLUSTERED 
(
	[messageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 5/29/2024 6:30:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[orderID] [nvarchar](50) NOT NULL,
	[customerID] [nvarchar](50) NOT NULL,
	[saleStaffID] [nvarchar](50) NOT NULL,
	[managerID] [nvarchar](50) NOT NULL,
	[productionStaffID] [nvarchar](50) NOT NULL,
	[orderDate] [datetime] NOT NULL,
	[depositAmount] [money] NULL,
	[status] [nvarchar](50) NOT NULL,
	[productSampleID] [nvarchar](50) NULL,
	[customizeRequestID] [nvarchar](50) NULL,
	[paymentMethodID] [nvarchar](50) NOT NULL,
	[totalPrice] [money] NOT NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[orderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_Order] UNIQUE NONCLUSTERED 
(
	[customizeRequestID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PaymentMethod]    Script Date: 5/29/2024 6:30:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentMethod](
	[paymentMethodID] [nvarchar](50) NOT NULL,
	[paymentMethodName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_PaymentMethod] PRIMARY KEY CLUSTERED 
(
	[paymentMethodID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductSample]    Script Date: 5/29/2024 6:30:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductSample](
	[productSampleID] [nvarchar](50) NOT NULL,
	[productName] [nvarchar](50) NOT NULL,
	[description] [nvarchar](100) NOT NULL,
	[type] [nvarchar](50) NOT NULL,
	[style] [nvarchar](50) NOT NULL,
	[size] [float] NULL,
	[price] [money] NOT NULL,
	[goldID] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_ProductSample] PRIMARY KEY CLUSTERED 
(
	[productSampleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_ProductSample] UNIQUE NONCLUSTERED 
(
	[goldID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 5/29/2024 6:30:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[roleID] [nvarchar](50) NOT NULL,
	[roleName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[roleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 5/29/2024 6:30:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[userID] [nvarchar](50) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[dateOfBirth] [date],
	[phoneNumber] [nvarchar](50) NOT NULL,
	[email] [nvarchar](50) NOT NULL,
	[password] [nvarchar](200) NOT NULL,
	[roleID] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[userID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[3DDesign]  WITH CHECK ADD  CONSTRAINT [FK_3DDesign_CustomerRequest] FOREIGN KEY([customizeRequestID])
REFERENCES [dbo].[CustomerRequest] ([customizeRequestID])
GO
ALTER TABLE [dbo].[3DDesign] CHECK CONSTRAINT [FK_3DDesign_CustomerRequest]
GO
ALTER TABLE [dbo].[3DDesign]  WITH CHECK ADD  CONSTRAINT [FK_3DDesign_ProductSample] FOREIGN KEY([productSampleID])
REFERENCES [dbo].[ProductSample] ([productSampleID])
GO
ALTER TABLE [dbo].[3DDesign] CHECK CONSTRAINT [FK_3DDesign_ProductSample]
GO
ALTER TABLE [dbo].[3DDesign]  WITH CHECK ADD  CONSTRAINT [FK_3DDesign_User] FOREIGN KEY([designStaffID])
REFERENCES [dbo].[User] ([userID])
GO
ALTER TABLE [dbo].[3DDesign] CHECK CONSTRAINT [FK_3DDesign_User]
GO
ALTER TABLE [dbo].[Category]  WITH CHECK ADD  CONSTRAINT [FK_Category_Gemstone] FOREIGN KEY([gemstoneID])
REFERENCES [dbo].[Gemstone] ([gemstoneID])
GO
ALTER TABLE [dbo].[Category] CHECK CONSTRAINT [FK_Category_Gemstone]
GO
ALTER TABLE [dbo].[CollectionProduct]  WITH CHECK ADD FOREIGN KEY([collectionID])
REFERENCES [dbo].[Collection] ([collectionID])
GO
ALTER TABLE [dbo].[CollectionProduct]  WITH CHECK ADD FOREIGN KEY([productSampleID])
REFERENCES [dbo].[ProductSample] ([productSampleID])
GO
ALTER TABLE [dbo].[CustomerRequest]  WITH CHECK ADD  CONSTRAINT [FK_CustomerRequest_Gold] FOREIGN KEY([goldID])
REFERENCES [dbo].[Gold] ([goldID])
GO
ALTER TABLE [dbo].[CustomerRequest] CHECK CONSTRAINT [FK_CustomerRequest_Gold]
GO
ALTER TABLE [dbo].[CustomerRequest]  WITH CHECK ADD  CONSTRAINT [FK_CustomerRequest_User] FOREIGN KEY([customerID])
REFERENCES [dbo].[User] ([userID])
GO
ALTER TABLE [dbo].[CustomerRequest] CHECK CONSTRAINT [FK_CustomerRequest_User]
GO
ALTER TABLE [dbo].[Gemstone]  WITH CHECK ADD  CONSTRAINT [FK_Gemstone_CustomerRequest] FOREIGN KEY([customizeRequestD])
REFERENCES [dbo].[CustomerRequest] ([customizeRequestID])
GO
ALTER TABLE [dbo].[Gemstone] CHECK CONSTRAINT [FK_Gemstone_CustomerRequest]
GO
ALTER TABLE [dbo].[Gemstone]  WITH CHECK ADD  CONSTRAINT [FK_Gemstone_ProductSample] FOREIGN KEY([productSampleID])
REFERENCES [dbo].[ProductSample] ([productSampleID])
GO
ALTER TABLE [dbo].[Gemstone] CHECK CONSTRAINT [FK_Gemstone_ProductSample]
GO
ALTER TABLE [dbo].[Insurance]  WITH CHECK ADD  CONSTRAINT [FK_Insurance_Order] FOREIGN KEY([orderID])
REFERENCES [dbo].[Order] ([orderID])
GO
ALTER TABLE [dbo].[Insurance] CHECK CONSTRAINT [FK_Insurance_Order]
GO
ALTER TABLE [dbo].[Message]  WITH CHECK ADD  CONSTRAINT [FK_Message_User] FOREIGN KEY([saleStaffID])
REFERENCES [dbo].[User] ([userID])
GO
ALTER TABLE [dbo].[Message] CHECK CONSTRAINT [FK_Message_User]
GO
ALTER TABLE [dbo].[Message]  WITH CHECK ADD  CONSTRAINT [FK_Message_User1] FOREIGN KEY([customerID])
REFERENCES [dbo].[User] ([userID])
GO
ALTER TABLE [dbo].[Message] CHECK CONSTRAINT [FK_Message_User1]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_CustomerRequest] FOREIGN KEY([customizeRequestID])
REFERENCES [dbo].[CustomerRequest] ([customizeRequestID])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_CustomerRequest]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_PaymentMethod] FOREIGN KEY([paymentMethodID])
REFERENCES [dbo].[PaymentMethod] ([paymentMethodID])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_PaymentMethod]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_ProductSample] FOREIGN KEY([productSampleID])
REFERENCES [dbo].[ProductSample] ([productSampleID])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_ProductSample]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_User] FOREIGN KEY([customerID])
REFERENCES [dbo].[User] ([userID])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_User]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_User1] FOREIGN KEY([saleStaffID])
REFERENCES [dbo].[User] ([userID])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_User1]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_User2] FOREIGN KEY([managerID])
REFERENCES [dbo].[User] ([userID])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_User2]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_User3] FOREIGN KEY([productionStaffID])
REFERENCES [dbo].[User] ([userID])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_User3]
GO
ALTER TABLE [dbo].[ProductSample]  WITH CHECK ADD  CONSTRAINT [FK_ProductSample_Gold] FOREIGN KEY([goldID])
REFERENCES [dbo].[Gold] ([goldID])
GO
ALTER TABLE [dbo].[ProductSample] CHECK CONSTRAINT [FK_ProductSample_Gold]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Role] FOREIGN KEY([roleID])
REFERENCES [dbo].[Role] ([roleID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Role]
GO

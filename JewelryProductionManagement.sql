USE [master]
GO
/****** Object:  Database [JewelryProductionManagement]    Script Date: 5/21/2024 12:05:57 AM ******/
CREATE DATABASE [JewelryProductionManagement]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'JewelryProductionManagement', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\JewelryProductionManagement.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'JewelryProductionManagement_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\JewelryProductionManagement_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [JewelryProductionManagement] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [JewelryProductionManagement].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [JewelryProductionManagement] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET ARITHABORT OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [JewelryProductionManagement] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [JewelryProductionManagement] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [JewelryProductionManagement] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET  ENABLE_BROKER 
GO
ALTER DATABASE [JewelryProductionManagement] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [JewelryProductionManagement] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [JewelryProductionManagement] SET  MULTI_USER 
GO
ALTER DATABASE [JewelryProductionManagement] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [JewelryProductionManagement] SET DB_CHAINING OFF 
GO
ALTER DATABASE [JewelryProductionManagement] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [JewelryProductionManagement] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [JewelryProductionManagement] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [JewelryProductionManagement] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [JewelryProductionManagement] SET QUERY_STORE = ON
GO
ALTER DATABASE [JewelryProductionManagement] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [JewelryProductionManagement]
GO
/****** Object:  Table [dbo].[3DDesign]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[3DDesign](
	[3DDesignID] [nvarchar](100) NOT NULL,
	[DesignName] [nvarchar](100) NOT NULL,
	[Description] [image] NOT NULL,
	[CustomizeProductID] [nvarchar](100) NULL,
	[ProductSampleID] [nvarchar](100) NULL,
	[StaffID] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_3DDesign] PRIMARY KEY CLUSTERED 
(
	[3DDesignID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[AccountID] [nvarchar](100) NOT NULL,
	[Username] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](100) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[AccountID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryID] [nvarchar](100) NOT NULL,
	[CategoryName] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[GemstoneID] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[CategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Chat]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Chat](
	[ChatID] [nvarchar](100) NOT NULL,
	[StaffID] [nvarchar](100) NOT NULL,
	[CustomerID] [nvarchar](100) NOT NULL,
	[StartTime] [datetime] NOT NULL,
	[EndTime] [datetime] NOT NULL,
 CONSTRAINT [PK_Chat] PRIMARY KEY CLUSTERED 
(
	[ChatID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Collection]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Collection](
	[CollectionID] [nvarchar](100) NOT NULL,
	[CollectionName] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](100) NULL,
 CONSTRAINT [PK_Collection] PRIMARY KEY CLUSTERED 
(
	[CollectionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CollectionProduct]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CollectionProduct](
	[CollectionID] [nvarchar](100) NOT NULL,
	[ProductSampleID] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CollectionID] ASC,
	[ProductSampleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[CustomerID] [nvarchar](100) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[DateOfBirth] [date] NOT NULL,
	[PhoneNumber] [decimal](18, 0) NOT NULL,
	[AccountID] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[CustomerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CustomizeProduct]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomizeProduct](
	[CustomizeProductID] [nvarchar](100) NOT NULL,
	[CustomizeListID] [nvarchar](100) NOT NULL,
	[GoldID] [nvarchar](100) NOT NULL,
	[CustomerID] [nvarchar](100) NOT NULL,
	[Type] [nvarchar](100) NOT NULL,
	[Style] [nvarchar](100) NOT NULL,
	[Size] [decimal](18, 0) NULL,
	[Quality] [decimal](18, 0) NOT NULL,
 CONSTRAINT [PK_CustomizeProduct] PRIMARY KEY CLUSTERED 
(
	[CustomizeProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Gemstone]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Gemstone](
	[GemstoneID] [nvarchar](100) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Color] [nvarchar](100) NOT NULL,
	[Cut] [nvarchar](100) NOT NULL,
	[Clarity] [nvarchar](100) NOT NULL,
	[CaratWeight] [decimal](18, 0) NOT NULL,
	[ProductSampleID] [nvarchar](100) NULL,
	[CustomizeProductID] [nvarchar](100) NULL,
	[Price] [money] NULL,
 CONSTRAINT [PK_Gemstone] PRIMARY KEY CLUSTERED 
(
	[GemstoneID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Gold]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Gold](
	[GoldID] [nvarchar](100) NOT NULL,
	[GoldType] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[PricePerType] [money] NOT NULL,
	[Weight] [float] NOT NULL,
 CONSTRAINT [PK_Gold] PRIMARY KEY CLUSTERED 
(
	[GoldID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Insurance]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Insurance](
	[InsuranceID] [nvarchar](100) NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NOT NULL,
	[OrderID] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Insurance] PRIMARY KEY CLUSTERED 
(
	[InsuranceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Manager]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Manager](
	[ManagerID] [nvarchar](100) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[DataOfBirth] [date] NOT NULL,
	[PhoneNumber] [decimal](18, 0) NOT NULL,
	[AccountID] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Manager] PRIMARY KEY CLUSTERED 
(
	[ManagerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Message]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Message](
	[MessageID] [nvarchar](100) NOT NULL,
	[ChatID] [nvarchar](100) NOT NULL,
	[MessageText] [nvarchar](max) NOT NULL,
	[Timestamp] [datetime] NOT NULL,
 CONSTRAINT [PK_Message] PRIMARY KEY CLUSTERED 
(
	[MessageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[OrderID] [nvarchar](100) NOT NULL,
	[CustomerID] [nvarchar](100) NOT NULL,
	[OrderDate] [date] NOT NULL,
	[DepositAmount] [money] NOT NULL,
	[Status] [nvarchar](100) NOT NULL,
	[ProductSampleID] [nvarchar](100) NULL,
	[PaymentID] [nvarchar](100) NOT NULL,
	[CustomizeProductID] [nvarchar](100) NULL,
	[TotalPrice] [money] NOT NULL,
	[StaffID] [nvarchar](100) NOT NULL,
	[ManagerID] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment Method]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment Method](
	[PaymentID] [nvarchar](100) NOT NULL,
	[PaymentMethod] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Payment Method] PRIMARY KEY CLUSTERED 
(
	[PaymentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductSample]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductSample](
	[ProductSampleID] [nvarchar](100) NOT NULL,
	[ProductName] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[Price] [money] NOT NULL,
	[Size] [decimal](18, 0) NOT NULL,
	[Type] [nvarchar](100) NOT NULL,
	[Style] [nvarchar](100) NOT NULL,
	[GoldID] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_ProductSample] PRIMARY KEY CLUSTERED 
(
	[ProductSampleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Staff]    Script Date: 5/21/2024 12:05:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Staff](
	[StaffID] [nvarchar](100) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[DateOfBirth] [date] NOT NULL,
	[PhoneNumber] [decimal](18, 0) NOT NULL,
	[AccountID] [nvarchar](100) NOT NULL,
	[role] [nvarchar](100) NULL,
 CONSTRAINT [PK_Staff] PRIMARY KEY CLUSTERED 
(
	[StaffID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[3DDesign]  WITH CHECK ADD  CONSTRAINT [FK_3DDesign_CustomizeProduct] FOREIGN KEY([CustomizeProductID])
REFERENCES [dbo].[CustomizeProduct] ([CustomizeProductID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[3DDesign] CHECK CONSTRAINT [FK_3DDesign_CustomizeProduct]
GO
ALTER TABLE [dbo].[3DDesign]  WITH CHECK ADD  CONSTRAINT [FK_3DDesign_ProductSample] FOREIGN KEY([ProductSampleID])
REFERENCES [dbo].[ProductSample] ([ProductSampleID])
GO
ALTER TABLE [dbo].[3DDesign] CHECK CONSTRAINT [FK_3DDesign_ProductSample]
GO
ALTER TABLE [dbo].[3DDesign]  WITH CHECK ADD  CONSTRAINT [FK_3DDesign_Staff] FOREIGN KEY([StaffID])
REFERENCES [dbo].[Staff] ([StaffID])
GO
ALTER TABLE [dbo].[3DDesign] CHECK CONSTRAINT [FK_3DDesign_Staff]
GO
ALTER TABLE [dbo].[Category]  WITH CHECK ADD  CONSTRAINT [FK_Category_Gemstone] FOREIGN KEY([GemstoneID])
REFERENCES [dbo].[Gemstone] ([GemstoneID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Category] CHECK CONSTRAINT [FK_Category_Gemstone]
GO
ALTER TABLE [dbo].[Chat]  WITH CHECK ADD  CONSTRAINT [FK_Chat_Customer] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[Customer] ([CustomerID])
GO
ALTER TABLE [dbo].[Chat] CHECK CONSTRAINT [FK_Chat_Customer]
GO
ALTER TABLE [dbo].[Chat]  WITH CHECK ADD  CONSTRAINT [FK_Chat_Staff] FOREIGN KEY([StaffID])
REFERENCES [dbo].[Staff] ([StaffID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Chat] CHECK CONSTRAINT [FK_Chat_Staff]
GO
ALTER TABLE [dbo].[CollectionProduct]  WITH CHECK ADD FOREIGN KEY([CollectionID])
REFERENCES [dbo].[Collection] ([CollectionID])
GO
ALTER TABLE [dbo].[CollectionProduct]  WITH CHECK ADD FOREIGN KEY([ProductSampleID])
REFERENCES [dbo].[ProductSample] ([ProductSampleID])
GO
ALTER TABLE [dbo].[Customer]  WITH CHECK ADD  CONSTRAINT [FK_Customer_Account] FOREIGN KEY([AccountID])
REFERENCES [dbo].[Account] ([AccountID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Customer] CHECK CONSTRAINT [FK_Customer_Account]
GO
ALTER TABLE [dbo].[CustomizeProduct]  WITH CHECK ADD  CONSTRAINT [FK_CustomizeProduct_Customer] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[Customer] ([CustomerID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CustomizeProduct] CHECK CONSTRAINT [FK_CustomizeProduct_Customer]
GO
ALTER TABLE [dbo].[CustomizeProduct]  WITH CHECK ADD  CONSTRAINT [FK_CustomizeProduct_Gold] FOREIGN KEY([GoldID])
REFERENCES [dbo].[Gold] ([GoldID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CustomizeProduct] CHECK CONSTRAINT [FK_CustomizeProduct_Gold]
GO
ALTER TABLE [dbo].[Gemstone]  WITH CHECK ADD  CONSTRAINT [FK_Gemstone_CustomizeProduct] FOREIGN KEY([CustomizeProductID])
REFERENCES [dbo].[CustomizeProduct] ([CustomizeProductID])
GO
ALTER TABLE [dbo].[Gemstone] CHECK CONSTRAINT [FK_Gemstone_CustomizeProduct]
GO
ALTER TABLE [dbo].[Gemstone]  WITH CHECK ADD  CONSTRAINT [FK_Gemstone_ProductSample] FOREIGN KEY([ProductSampleID])
REFERENCES [dbo].[ProductSample] ([ProductSampleID])
GO
ALTER TABLE [dbo].[Gemstone] CHECK CONSTRAINT [FK_Gemstone_ProductSample]
GO
ALTER TABLE [dbo].[Insurance]  WITH CHECK ADD  CONSTRAINT [FK_Insurance_Order] FOREIGN KEY([OrderID])
REFERENCES [dbo].[Order] ([OrderID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Insurance] CHECK CONSTRAINT [FK_Insurance_Order]
GO
ALTER TABLE [dbo].[Manager]  WITH CHECK ADD  CONSTRAINT [FK_Manager_Account] FOREIGN KEY([AccountID])
REFERENCES [dbo].[Account] ([AccountID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Manager] CHECK CONSTRAINT [FK_Manager_Account]
GO
ALTER TABLE [dbo].[Message]  WITH CHECK ADD  CONSTRAINT [FK_Message_Chat] FOREIGN KEY([ChatID])
REFERENCES [dbo].[Chat] ([ChatID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Message] CHECK CONSTRAINT [FK_Message_Chat]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Customer] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[Customer] ([CustomerID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Customer]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_CustomizeProduct] FOREIGN KEY([CustomizeProductID])
REFERENCES [dbo].[CustomizeProduct] ([CustomizeProductID])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_CustomizeProduct]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Manager] FOREIGN KEY([ManagerID])
REFERENCES [dbo].[Manager] ([ManagerID])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Manager]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Payment Method] FOREIGN KEY([PaymentID])
REFERENCES [dbo].[Payment Method] ([PaymentID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Payment Method]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_ProductSample] FOREIGN KEY([ProductSampleID])
REFERENCES [dbo].[ProductSample] ([ProductSampleID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_ProductSample]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Staff] FOREIGN KEY([StaffID])
REFERENCES [dbo].[Staff] ([StaffID])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Staff]
GO
ALTER TABLE [dbo].[ProductSample]  WITH CHECK ADD  CONSTRAINT [FK_ProductSample_Gold] FOREIGN KEY([GoldID])
REFERENCES [dbo].[Gold] ([GoldID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ProductSample] CHECK CONSTRAINT [FK_ProductSample_Gold]
GO
ALTER TABLE [dbo].[Staff]  WITH CHECK ADD  CONSTRAINT [FK_Staff_Account] FOREIGN KEY([AccountID])
REFERENCES [dbo].[Account] ([AccountID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Staff] CHECK CONSTRAINT [FK_Staff_Account]
GO
USE [master]
GO
ALTER DATABASE [JewelryProductionManagement] SET  READ_WRITE 
GO

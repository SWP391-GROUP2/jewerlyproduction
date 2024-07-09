using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace JewelryProduction.Migrations
{
    /// <inheritdoc />
    public partial class Identity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    categoryID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    categoryName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    description = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.categoryID);
                });

            migrationBuilder.CreateTable(
                name: "Collection",
                columns: table => new
                {
                    collectionID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    collectionName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    description = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Collection", x => x.collectionID);
                });

            migrationBuilder.CreateTable(
                name: "Gold",
                columns: table => new
                {
                    goldID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    goldType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    pricePerGram = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gold", x => x.goldID);
                });

            migrationBuilder.CreateTable(
                name: "PaymentMethod",
                columns: table => new
                {
                    paymentMethodID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    paymentMethodName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentMethod", x => x.paymentMethodID);
                });

            migrationBuilder.CreateTable(
                name: "QualityCheckList",
                columns: table => new
                {
                    checklistID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    stage = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    checklistItem = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QualityCheckList", x => x.checklistID);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DateOfBirth = table.Column<DateOnly>(type: "date", nullable: true),
                    Avatar = table.Column<string>(type: "nvarchar(350)", maxLength: 350, nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductSample",
                columns: table => new
                {
                    productSampleID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    productName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    style = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    size = table.Column<double>(type: "float", nullable: true),
                    price = table.Column<decimal>(type: "money", nullable: false),
                    goldID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    goldWeight = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSample", x => x.productSampleID);
                    table.ForeignKey(
                        name: "FK_ProductSample_Gold1",
                        column: x => x.goldID,
                        principalTable: "Gold",
                        principalColumn: "goldID");
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CustomerRequest",
                columns: table => new
                {
                    customizeRequestID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    goldID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    goldWeight = table.Column<double>(type: "float", nullable: true),
                    customerID = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    SaleStaffID = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: true),
                    ManagerID = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: true),
                    type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    style = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    size = table.Column<double>(type: "float", nullable: true),
                    quotation = table.Column<decimal>(type: "money", nullable: true),
                    quotationDes = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: true),
                    quantity = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerRequest", x => x.customizeRequestID);
                    table.ForeignKey(
                        name: "FK_CustomerRequest_Customer",
                        column: x => x.customerID,
                        principalTable: "User",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CustomerRequest_Gold",
                        column: x => x.goldID,
                        principalTable: "Gold",
                        principalColumn: "goldID");
                    table.ForeignKey(
                        name: "FK_CustomerRequest_Manager",
                        column: x => x.ManagerID,
                        principalTable: "User",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CustomerRequest_SaleStaff",
                        column: x => x.SaleStaffID,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    messageID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    messageText = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    timestamp = table.Column<DateTime>(type: "datetime", nullable: false),
                    saleStaffID = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    customerID = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.messageID);
                    table.ForeignKey(
                        name: "FK_Message_User",
                        column: x => x.saleStaffID,
                        principalTable: "User",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Message_User1",
                        column: x => x.customerID,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Notification",
                columns: table => new
                {
                    notificationId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    userId = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    senderId = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: true),
                    message = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    isRead = table.Column<bool>(type: "bit", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notification", x => x.notificationId);
                    table.ForeignKey(
                        name: "FK_Notification_Sender",
                        column: x => x.senderId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Notification_User",
                        column: x => x.userId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CollectionProduct",
                columns: table => new
                {
                    collectionID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    productSampleID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Collecti__15A109788FBE69CC", x => new { x.collectionID, x.productSampleID });
                    table.ForeignKey(
                        name: "FK__Collectio__colle__4222D4EF",
                        column: x => x.collectionID,
                        principalTable: "Collection",
                        principalColumn: "collectionID");
                    table.ForeignKey(
                        name: "FK__Collectio__produ__4316F928",
                        column: x => x.productSampleID,
                        principalTable: "ProductSample",
                        principalColumn: "productSampleID");
                });

            migrationBuilder.CreateTable(
                name: "Gemstone",
                columns: table => new
                {
                    gemstoneID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    shape = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    size = table.Column<double>(type: "float", nullable: true),
                    color = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    caratWeight = table.Column<double>(type: "float", nullable: false),
                    cut = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    clarity = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    price = table.Column<decimal>(type: "money", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(350)", maxLength: 350, nullable: false),
                    productSampleID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    customizeRequestID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    categoryID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gemstone", x => x.gemstoneID);
                    table.ForeignKey(
                        name: "FK_Gemstone_Category",
                        column: x => x.categoryID,
                        principalTable: "Category",
                        principalColumn: "categoryID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Gemstone_CustomerRequest",
                        column: x => x.customizeRequestID,
                        principalTable: "CustomerRequest",
                        principalColumn: "customizeRequestID");
                    table.ForeignKey(
                        name: "FK_Gemstone_ProductSample",
                        column: x => x.productSampleID,
                        principalTable: "ProductSample",
                        principalColumn: "productSampleID");
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    orderID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    productionStaffID = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: true),
                    designStaffID = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: true),
                    orderDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    depositAmount = table.Column<decimal>(type: "money", nullable: true),
                    status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    address = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    customizeRequestID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    paymentMethodID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    totalPrice = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.orderID);
                    table.ForeignKey(
                        name: "FK_Order_CustomerRequest",
                        column: x => x.customizeRequestID,
                        principalTable: "CustomerRequest",
                        principalColumn: "customizeRequestID");
                    table.ForeignKey(
                        name: "FK_Order_DesignStaff",
                        column: x => x.designStaffID,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Order_PaymentMethod",
                        column: x => x.paymentMethodID,
                        principalTable: "PaymentMethod",
                        principalColumn: "paymentMethodID");
                    table.ForeignKey(
                        name: "FK_Order_ProductionStaff",
                        column: x => x.productionStaffID,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "3DDesign",
                columns: table => new
                {
                    _3dDesignID = table.Column<string>(name: "3dDesignID", type: "nvarchar(50)", maxLength: 50, nullable: false),
                    designName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Image = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    orderId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    productSampleID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    designStaffID = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_3DDesign", x => x._3dDesignID);
                    table.ForeignKey(
                        name: "FK_3DDesign_Order",
                        column: x => x.orderId,
                        principalTable: "Order",
                        principalColumn: "orderID");
                    table.ForeignKey(
                        name: "FK_3DDesign_ProductSample",
                        column: x => x.productSampleID,
                        principalTable: "ProductSample",
                        principalColumn: "productSampleID");
                    table.ForeignKey(
                        name: "FK_3DDesign_User",
                        column: x => x.designStaffID,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Inspection",
                columns: table => new
                {
                    inspectionID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    productStaffID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    stage = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    inspectionDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    result = table.Column<bool>(type: "bit", maxLength: 50, nullable: true),
                    comment = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    orderID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inspection", x => x.inspectionID);
                    table.ForeignKey(
                        name: "FK_Inspection_Order",
                        column: x => x.orderID,
                        principalTable: "Order",
                        principalColumn: "orderID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Insurance",
                columns: table => new
                {
                    insuranceID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    startDate = table.Column<DateOnly>(type: "date", nullable: false),
                    endDate = table.Column<DateOnly>(type: "date", nullable: false),
                    orderID = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Insurance", x => x.insuranceID);
                    table.ForeignKey(
                        name: "FK_Insurance_Order",
                        column: x => x.orderID,
                        principalTable: "Order",
                        principalColumn: "orderID");
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3bb80749-ec64-401e-a5e6-abb4e1a4e233", null, "Customer", "CUSTOMER" },
                    { "40460f06-0fa7-485f-8c63-6f69821af57e", null, "ProductionStaff", "PRODUCTIONSTAFF" },
                    { "4e1fb2c4-58ca-49b4-a7e5-595ed1c4fb34", null, "Manager", "MANAGER" },
                    { "a2a3d3cd-3ca4-4b48-9c47-2b1b1ff9d667", null, "SaleStaff", "SALESTAFF" },
                    { "bac0b18d-3bd2-4cab-ba57-12fcff9c9926", null, "Admin", "ADMIN" },
                    { "c9e09b6e-ab94-452f-8963-6923957153f6", null, "DesignStaff", "DESIGNSTAFF" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_3DDesign_designStaffID",
                table: "3DDesign",
                column: "designStaffID");

            migrationBuilder.CreateIndex(
                name: "IX_3DDesign_orderId",
                table: "3DDesign",
                column: "orderId");

            migrationBuilder.CreateIndex(
                name: "IX_3DDesign_productSampleID",
                table: "3DDesign",
                column: "productSampleID");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_CollectionProduct_productSampleID",
                table: "CollectionProduct",
                column: "productSampleID");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerRequest_customerID",
                table: "CustomerRequest",
                column: "customerID");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerRequest_goldID",
                table: "CustomerRequest",
                column: "goldID");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerRequest_ManagerID",
                table: "CustomerRequest",
                column: "ManagerID");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerRequest_SaleStaffID",
                table: "CustomerRequest",
                column: "SaleStaffID");

            migrationBuilder.CreateIndex(
                name: "IX_Gemstone_categoryID",
                table: "Gemstone",
                column: "categoryID");

            migrationBuilder.CreateIndex(
                name: "IX_Gemstone_customizeRequestID",
                table: "Gemstone",
                column: "customizeRequestID");

            migrationBuilder.CreateIndex(
                name: "IX_Gemstone_productSampleID",
                table: "Gemstone",
                column: "productSampleID");

            migrationBuilder.CreateIndex(
                name: "IX_Inspection_orderID",
                table: "Inspection",
                column: "orderID");

            migrationBuilder.CreateIndex(
                name: "IX_Insurance",
                table: "Insurance",
                column: "orderID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Message_customerID",
                table: "Message",
                column: "customerID");

            migrationBuilder.CreateIndex(
                name: "IX_Message_saleStaffID",
                table: "Message",
                column: "saleStaffID");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_senderId",
                table: "Notification",
                column: "senderId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_userId",
                table: "Notification",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_Order",
                table: "Order",
                column: "customizeRequestID",
                unique: true,
                filter: "[customizeRequestID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Order_designStaffID",
                table: "Order",
                column: "designStaffID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_paymentMethodID",
                table: "Order",
                column: "paymentMethodID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_productionStaffID",
                table: "Order",
                column: "productionStaffID");

            migrationBuilder.CreateIndex(
                name: "IX_ProductSample_goldID",
                table: "ProductSample",
                column: "goldID");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "User",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "User",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "3DDesign");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "CollectionProduct");

            migrationBuilder.DropTable(
                name: "Gemstone");

            migrationBuilder.DropTable(
                name: "Inspection");

            migrationBuilder.DropTable(
                name: "Insurance");

            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropTable(
                name: "Notification");

            migrationBuilder.DropTable(
                name: "QualityCheckList");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Collection");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "ProductSample");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "CustomerRequest");

            migrationBuilder.DropTable(
                name: "PaymentMethod");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Gold");
        }
    }
}

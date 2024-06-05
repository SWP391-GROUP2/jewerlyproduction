using System;
using System.Collections.Generic;
using JewelryProduction.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.Core;

public partial class JewelryProductionContext : DbContext
{
    public JewelryProductionContext()
    {
    }

    public JewelryProductionContext(DbContextOptions<JewelryProductionContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Collection> Collections { get; set; }

    public virtual DbSet<CustomerRequest> CustomerRequest { get; set; }

    public virtual DbSet<Gemstone> Gemstones { get; set; }

    public virtual DbSet<Gold> Golds { get; set; }

    public virtual DbSet<Insurance> Insurances { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<PaymentMethod> PaymentMethods { get; set; }

    public virtual DbSet<ProductSample> ProductSamples { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<_3ddesign> _3ddesigns { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;uid=sa;pwd=12345;database=JewelryProduction;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("Category");

            entity.Property(e => e.CategoryId)
                .HasMaxLength(50)
                .HasColumnName("categoryID");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(50)
                .HasColumnName("categoryName");
            entity.Property(e => e.Description)
                .HasMaxLength(50)
                .HasColumnName("description");
            entity.Property(e => e.GemstoneId)
                .HasMaxLength(50)
                .HasColumnName("gemstoneID");

            entity.HasOne(d => d.Gemstone).WithMany(p => p.Categories)
                .HasForeignKey(d => d.GemstoneId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Category_Gemstone");
        });

        modelBuilder.Entity<Collection>(entity =>
        {
            entity.ToTable("Collection");

            entity.Property(e => e.CollectionId)
                .HasMaxLength(50)
                .HasColumnName("collectionID");
            entity.Property(e => e.CollectionName)
                .HasMaxLength(50)
                .HasColumnName("collectionName");
            entity.Property(e => e.Description)
                .HasMaxLength(50)
                .HasColumnName("description");

            entity.HasMany(d => d.ProductSamples).WithMany(p => p.Collections)
                .UsingEntity<Dictionary<string, object>>(
                    "CollectionProduct",
                    r => r.HasOne<ProductSample>().WithMany()
                        .HasForeignKey("ProductSampleId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Collectio__produ__45F365D3"),
                    l => l.HasOne<Collection>().WithMany()
                        .HasForeignKey("CollectionId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Collectio__colle__44FF419A"),
                    j =>
                    {
                        j.HasKey("CollectionId", "ProductSampleId").HasName("PK__Collecti__15A109786CB241BB");
                        j.ToTable("CollectionProduct");
                        j.IndexerProperty<string>("CollectionId")
                            .HasMaxLength(50)
                            .HasColumnName("collectionID");
                        j.IndexerProperty<string>("ProductSampleId")
                            .HasMaxLength(50)
                            .HasColumnName("productSampleID");
                    });
        });

        modelBuilder.Entity<CustomerRequest>(entity =>
        {
            entity.HasKey(e => e.CustomizeRequestId);

            entity.ToTable("CustomerRequest");

            entity.HasIndex(e => e.GoldId, "IX_CustomerRequest").IsUnique();

            entity.Property(e => e.CustomizeRequestId)
                .HasMaxLength(50)
                .HasColumnName("customizeRequestID");
            entity.Property(e => e.CustomerId)
                .HasMaxLength(50)
                .HasColumnName("customerID");
            entity.Property(e => e.GoldId)
                .HasMaxLength(50)
                .HasColumnName("goldID");
            entity.Property(e => e.Quantity)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("quantity");
            entity.Property(e => e.Size).HasColumnName("size");
            entity.Property(e => e.Style)
                .HasMaxLength(50)
                .HasColumnName("style");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .HasColumnName("type");

            entity.HasOne(d => d.Customer).WithMany(p => p.CustomerRequests)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomerRequest_User");

            entity.HasOne(d => d.Gold).WithOne(p => p.CustomerRequest)
                .HasForeignKey<CustomerRequest>(d => d.GoldId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomerRequest_Gold");
        });

        modelBuilder.Entity<Gemstone>(entity =>
        {
            entity.ToTable("Gemstone");

            entity.Property(e => e.GemstoneId)
                .HasMaxLength(50)
                .HasColumnName("gemstoneID");
            entity.Property(e => e.CaratWeight).HasColumnName("caratWeight");
            entity.Property(e => e.Clarity)
                .HasMaxLength(50)
                .HasColumnName("clarity");
            entity.Property(e => e.Color)
                .HasMaxLength(50)
                .HasColumnName("color");
            entity.Property(e => e.CustomizeRequestD)
                .HasMaxLength(50)
                .HasColumnName("customizeRequestD");
            entity.Property(e => e.Cut)
                .HasMaxLength(50)
                .HasColumnName("cut");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.PricePerCarat)
                .HasColumnType("money")
                .HasColumnName("pricePerCarat");
            entity.Property(e => e.ProductSampleId)
                .HasMaxLength(50)
                .HasColumnName("productSampleID");

            entity.HasOne(d => d.CustomizeRequestDNavigation).WithMany(p => p.Gemstones)
                .HasForeignKey(d => d.CustomizeRequestD)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Gemstone_CustomerRequest");

            entity.HasOne(d => d.ProductSample).WithMany(p => p.Gemstones)
                .HasForeignKey(d => d.ProductSampleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Gemstone_ProductSample");
        });

        modelBuilder.Entity<Gold>(entity =>
        {
            entity.ToTable("Gold");

            entity.Property(e => e.GoldId)
                .HasMaxLength(50)
                .HasColumnName("goldID");
            entity.Property(e => e.GoldType)
                .HasMaxLength(50)
                .HasColumnName("goldType");
            entity.Property(e => e.PricePerGram)
                .HasColumnType("money")
                .HasColumnName("pricePerGram");
            entity.Property(e => e.Weight).HasColumnName("weight");
        });

        modelBuilder.Entity<Insurance>(entity =>
        {
            entity.ToTable("Insurance");

            entity.HasIndex(e => e.OrderId, "IX_Insurance").IsUnique();

            entity.Property(e => e.InsuranceId)
                .HasMaxLength(50)
                .HasColumnName("insuranceID");
            entity.Property(e => e.EndDate).HasColumnName("endDate");
            entity.Property(e => e.OrderId)
                .HasMaxLength(50)
                .HasColumnName("orderID");
            entity.Property(e => e.StartDate).HasColumnName("startDate");

            entity.HasOne(d => d.Order).WithOne(p => p.Insurance)
                .HasForeignKey<Insurance>(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Insurance_Order");
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.ToTable("Message");

            entity.Property(e => e.MessageId)
                .HasMaxLength(50)
                .HasColumnName("messageID");
            entity.Property(e => e.CustomerId)
                .HasMaxLength(50)
                .HasColumnName("customerID");
            entity.Property(e => e.MessageText)
                .HasMaxLength(200)
                .HasColumnName("messageText");
            entity.Property(e => e.SaleStaffId)
                .HasMaxLength(50)
                .HasColumnName("saleStaffID");
            entity.Property(e => e.Timestamp)
                .HasColumnType("datetime")
                .HasColumnName("timestamp");

            entity.HasOne(d => d.Customer).WithMany(p => p.MessageCustomers)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Message_User1");

            entity.HasOne(d => d.SaleStaff).WithMany(p => p.MessageSaleStaffs)
                .HasForeignKey(d => d.SaleStaffId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Message_User");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("Order");

            entity.HasIndex(e => e.CustomizeRequestId, "IX_Order").IsUnique();

            entity.Property(e => e.OrderId)
                .HasMaxLength(50)
                .HasColumnName("orderID");
            entity.Property(e => e.CustomerId)
                .HasMaxLength(50)
                .HasColumnName("customerID");
            entity.Property(e => e.CustomizeRequestId)
                .HasMaxLength(50)
                .HasColumnName("customizeRequestID");
            entity.Property(e => e.DepositAmount)
                .HasColumnType("money")
                .HasColumnName("depositAmount");
            entity.Property(e => e.ManagerId)
                .HasMaxLength(50)
                .HasColumnName("managerID");
            entity.Property(e => e.OrderDate)
                .HasColumnType("datetime")
                .HasColumnName("orderDate");
            entity.Property(e => e.PaymentMethodId)
                .HasMaxLength(50)
                .HasColumnName("paymentMethodID");
            entity.Property(e => e.ProductSampleId)
                .HasMaxLength(50)
                .HasColumnName("productSampleID");
            entity.Property(e => e.ProductionStaffId)
                .HasMaxLength(50)
                .HasColumnName("productionStaffID");
            entity.Property(e => e.SaleStaffId)
                .HasMaxLength(50)
                .HasColumnName("saleStaffID");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasColumnName("status");
            entity.Property(e => e.TotalPrice)
                .HasColumnType("money")
                .HasColumnName("totalPrice");

            entity.HasOne(d => d.Customer).WithMany(p => p.OrderCustomers)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Order_User");

            entity.HasOne(d => d.CustomizeRequest).WithOne(p => p.Order)
                .HasForeignKey<Order>(d => d.CustomizeRequestId)
                .HasConstraintName("FK_Order_CustomerRequest");

            entity.HasOne(d => d.Manager).WithMany(p => p.OrderManagers)
                .HasForeignKey(d => d.ManagerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Order_User2");

            entity.HasOne(d => d.PaymentMethod).WithMany(p => p.Orders)
                .HasForeignKey(d => d.PaymentMethodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Order_PaymentMethod");

            entity.HasOne(d => d.ProductSample).WithMany(p => p.Orders)
                .HasForeignKey(d => d.ProductSampleId)
                .HasConstraintName("FK_Order_ProductSample");

            entity.HasOne(d => d.ProductionStaff).WithMany(p => p.OrderProductionStaffs)
                .HasForeignKey(d => d.ProductionStaffId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Order_User3");

            entity.HasOne(d => d.SaleStaff).WithMany(p => p.OrderSaleStaffs)
                .HasForeignKey(d => d.SaleStaffId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Order_User1");
        });

        modelBuilder.Entity<PaymentMethod>(entity =>
        {
            entity.ToTable("PaymentMethod");

            entity.Property(e => e.PaymentMethodId)
                .HasMaxLength(50)
                .HasColumnName("paymentMethodID");
            entity.Property(e => e.PaymentMethodName)
                .HasMaxLength(50)
                .HasColumnName("paymentMethodName");
        });

        modelBuilder.Entity<ProductSample>(entity =>
        {
            entity.ToTable("ProductSample");

            entity.HasIndex(e => e.GoldId, "IX_ProductSample").IsUnique();

            entity.Property(e => e.ProductSampleId)
                .HasMaxLength(50)
                .HasColumnName("productSampleID");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .HasColumnName("description");
            entity.Property(e => e.GoldId)
                .HasMaxLength(50)
                .HasColumnName("goldID");
            entity.Property(e => e.Price)
                .HasColumnType("money")
                .HasColumnName("price");
            entity.Property(e => e.ProductName)
                .HasMaxLength(50)
                .HasColumnName("productName");
            entity.Property(e => e.Size).HasColumnName("size");
            entity.Property(e => e.Style)
                .HasMaxLength(50)
                .HasColumnName("style");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .HasColumnName("type");

            entity.HasOne(d => d.Gold).WithOne(p => p.ProductSample)
                .HasForeignKey<ProductSample>(d => d.GoldId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductSample_Gold");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Role");

            entity.Property(e => e.RoleId)
                .HasMaxLength(50)
                .HasColumnName("roleID");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .HasColumnName("roleName");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.Property(e => e.UserId)
                .HasMaxLength(50)
                .HasColumnName("userID");
            entity.Property(e => e.DateOfBirth).HasColumnName("dateOfBirth");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .HasColumnName("password");
            entity.Property(e => e.PhoneNumber)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("phoneNumber");
            entity.Property(e => e.RoleId)
                .HasMaxLength(50)
                .HasColumnName("roleID");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK_User_Role");
        });

        modelBuilder.Entity<_3ddesign>(entity =>
        {
            entity.ToTable("3DDesign");

            entity.Property(e => e._3dDesignId)
                .HasMaxLength(50)
                .HasColumnName("3dDesignID");
            entity.Property(e => e.CustomizeRequestId)
                .HasMaxLength(50)
                .HasColumnName("customizeRequestID");
            entity.Property(e => e.Description)
                .HasColumnType("image")
                .HasColumnName("description");
            entity.Property(e => e.DesignName)
                .HasMaxLength(50)
                .HasColumnName("designName");
            entity.Property(e => e.DesignStaffId)
                .HasMaxLength(50)
                .HasColumnName("designStaffID");
            entity.Property(e => e.ProductSampleId)
                .HasMaxLength(50)
                .HasColumnName("productSampleID");

            entity.HasOne(d => d.CustomizeRequest).WithMany(p => p._3ddesigns)
                .HasForeignKey(d => d.CustomizeRequestId)
                .HasConstraintName("FK_3DDesign_CustomerRequest");

            entity.HasOne(d => d.DesignStaff).WithMany(p => p._3ddesigns)
                .HasForeignKey(d => d.DesignStaffId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_3DDesign_User");

            entity.HasOne(d => d.ProductSample).WithMany(p => p._3ddesigns)
                .HasForeignKey(d => d.ProductSampleId)
                .HasConstraintName("FK_3DDesign_ProductSample");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

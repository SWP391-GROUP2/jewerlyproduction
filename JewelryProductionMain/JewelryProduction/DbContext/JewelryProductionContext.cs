using JewelryProduction.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace JewelryProduction.DbContext;

public partial class JewelryProductionContext : IdentityDbContext<AppUser>
{
    public JewelryProductionContext()
    {
    }

    public JewelryProductionContext(DbContextOptions<JewelryProductionContext> options)
        : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; }

    public DbSet<CustomerRequest> CustomerRequests { get; set; }

    public DbSet<Gemstone> Gemstones { get; set; }

    public DbSet<Gold> Golds { get; set; }

    public DbSet<Insurance> Insurances { get; set; }

    public DbSet<Message> Messages { get; set; }

    public DbSet<Order> Orders { get; set; }

    public DbSet<PaymentMethod> PaymentMethods { get; set; }

    public DbSet<ProductSample> ProductSamples { get; set; }

    public DbSet<Notification> Notifications { get; set; }
    public DbSet<AppUser> Users { get; set; }

    public DbSet<_3ddesign> _3ddesigns { get; set; }
    public DbSet<Inspection> Inspections { get; set; }
    public DbSet<QualityCheckList> QualityCheckLists { get; set; }


    private string? GetConnectionString()
    {
        IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true, true).Build();
        return configuration["ConnectionStrings:DefaultConnection"];
        //ConnectionStrings:DefaultConnectionStringDB
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(GetConnectionString());

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        List<IdentityRole> roles = new List<IdentityRole>
        {
            new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
            new IdentityRole { Name = "SaleStaff", NormalizedName = "SALESTAFF" },
            new IdentityRole { Name = "ProductionStaff", NormalizedName = "PRODUCTIONSTAFF" },
            new IdentityRole { Name = "Manager", NormalizedName = "MANAGER" },
            new IdentityRole { Name = "Customer", NormalizedName = "CUSTOMER" },
            new IdentityRole { Name = "DesignStaff", NormalizedName = "DESIGNSTAFF" },
        };
        modelBuilder.Entity<IdentityRole>().HasData(roles);

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
        });

        modelBuilder.Entity<CustomerRequest>(entity =>
        {
            entity.HasKey(e => e.CustomizeRequestId);

            entity.ToTable("CustomerRequest");

            entity.Property(e => e.CustomizeRequestId)
                .HasMaxLength(50)
                .HasColumnName("customizeRequestID");
            entity.Property(e => e.CustomerId)
                .HasMaxLength(450)
                .HasColumnName("customerID");
            entity.Property(e => e.SaleStaffId)
                .HasMaxLength(450)
                .HasColumnName("SaleStaffID");
            entity.Property(e => e.ManagerId)
                .HasMaxLength(450)
                .HasColumnName("ManagerID");
            entity.Property(e => e.GoldId)
                .HasMaxLength(50)
                .HasColumnName("goldID");
            entity.Property(e => e.GoldWeight).HasColumnName("goldWeight");
            entity.Property(e => e.Quantity)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("quantity");
            entity.Property(e => e.Size).HasColumnName("size");
            entity.Property(e => e.quotation)
                .HasColumnType("money")
                .HasColumnName("quotation");
            entity.Property(e => e.quotationDes)
                .HasMaxLength(450)
                .HasColumnName("quotationDes");
            entity.Property(e => e.Style)
                .HasMaxLength(50)
                .HasColumnName("style");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .HasColumnName("type");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasColumnName("status");

            entity.HasOne(d => d.Customer).WithMany(p => p.CustomerRequests)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomerRequest_Customer");

            entity.HasOne(d => d.SaleStaff).WithMany(p => p.SaleStaffRequests)
                .HasForeignKey(d => d.SaleStaffId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomerRequest_SaleStaff");

            entity.HasOne(d => d.Manager).WithMany(p => p.ManagerRequests)
                .HasForeignKey(d => d.ManagerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomerRequest_Manager");

            entity.HasOne(d => d.Gold).WithMany(p => p.CustomerRequests)
                .HasForeignKey(d => d.GoldId)
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
            entity.Property(e => e.CategoryId)
                .HasMaxLength(50)
                .HasColumnName("categoryID");
            entity.Property(e => e.Clarity)
                .HasMaxLength(50)
                .HasColumnName("clarity");
            entity.Property(e => e.Color)
                .HasMaxLength(50)
                .HasColumnName("color");
            entity.Property(e => e.CustomizeRequestId)
                .HasMaxLength(50)
                .HasColumnName("customizeRequestID");
            entity.Property(e => e.Cut)
                .HasMaxLength(50)
                .HasColumnName("cut");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Price)
                .HasColumnType("money")
                .HasColumnName("price");
            entity.Property(e => e.Image)
                .HasMaxLength(350)
                .HasColumnName("Image");
            entity.Property(e => e.ProductSampleId)
                .HasMaxLength(50)
                .HasColumnName("productSampleID");
            entity.Property(e => e.Shape)
                .HasMaxLength(50)
                .HasColumnName("shape");
            entity.Property(e => e.Size)
                .HasColumnName("size");

            entity.HasOne(d => d.Category).WithMany(p => p.Gemstones)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Gemstone_Category");

            entity.HasOne(d => d.CustomizeRequestIdNavigation).WithMany(p => p.Gemstones)
                .HasForeignKey(d => d.CustomizeRequestId)
                .HasConstraintName("FK_Gemstone_CustomerRequest");

            entity.HasOne(d => d.ProductSample).WithMany(p => p.Gemstones)
                .HasForeignKey(d => d.ProductSampleId)
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
                .HasMaxLength(450)
                .HasColumnName("customerID");
            entity.Property(e => e.MessageText)
                .HasMaxLength(200)
                .HasColumnName("messageText");
            entity.Property(e => e.SaleStaffId)
                .HasMaxLength(450)
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
            entity.Property(e => e.CustomizeRequestId)
                .HasMaxLength(50)
                .HasColumnName("customizeRequestID");
            entity.Property(e => e.DepositAmount)
                .HasColumnType("money")
                .HasColumnName("depositAmount");
            entity.Property(e => e.OrderDate)
                .HasColumnType("datetime")
                .HasColumnName("orderDate");
            entity.Property(e => e.PaymentMethodId)
                .HasMaxLength(50)
                .HasColumnName("paymentMethodID");
            entity.Property(e => e.ProductionStaffId)
                .HasMaxLength(450)
                .HasColumnName("productionStaffID");
            entity.Property(e => e.DesignStaffId)
                .HasMaxLength(450)
                .HasColumnName("designStaffID");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasColumnName("status");
            entity.Property(e => e.Address)
                .HasMaxLength(50)
                .HasColumnName("address");
            entity.Property(e => e.TotalPrice)
                .HasColumnType("money")
                .HasColumnName("totalPrice");

            entity.HasOne(d => d.CustomizeRequest).WithOne(p => p.Order)
                .HasForeignKey<Order>(d => d.CustomizeRequestId)
                .HasConstraintName("FK_Order_CustomerRequest");

            entity.HasOne(d => d.PaymentMethod).WithMany(p => p.Orders)
                .HasForeignKey(d => d.PaymentMethodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Order_PaymentMethod");

            entity.HasOne(e => e.ProductionStaff)
                .WithMany(u => u.OrderProductionStaffs)
                .HasForeignKey(e => e.ProductionStaffId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Order_ProductionStaff");

            entity.HasOne(e => e.DesignStaff)
                .WithMany(u => u.OrderDesignStaffs)
                .HasForeignKey(e => e.DesignStaffId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Order_DesignStaff");
        });
        modelBuilder.Entity<Inspection>(entity =>
        {
            entity.ToTable("Inspection");

            entity.Property(e => e.InspectionId)
                .HasMaxLength(50)
                .HasColumnName("inspectionID");
            entity.Property(e => e.ProductStaffId)
                .HasMaxLength(50)
                .HasColumnName("productStaffID");
            entity.Property(e => e.Stage)
                .HasMaxLength(100)
                .HasColumnName("stage");
            entity.Property(e => e.InspectionDate)
                .HasColumnType("datetime")
                .HasColumnName("inspectionDate");
            entity.Property(e => e.Result)
                .HasMaxLength(50)
                .HasColumnName("result");
            entity.Property(e => e.Comment)
                .HasMaxLength(500)
                .HasColumnName("comment");
            entity.Property(e => e.OrderId)
                .HasMaxLength(50)
                .HasColumnName("orderID");

            entity.HasOne(d => d.Order)
                .WithMany(p => p.Inspections)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_Inspection_Order");
        });

        // Configure QualityCheckList
        modelBuilder.Entity<QualityCheckList>(entity =>
        {
            entity.ToTable("QualityCheckList");
            entity.HasKey(e => e.ChecklistId);
            entity.Property(e => e.ChecklistId)
                .HasMaxLength(50)
                .HasColumnName("checklistID");
            entity.Property(e => e.Stage)
                .HasMaxLength(100)
                .HasColumnName("stage");
            entity.Property(e => e.ChecklistItem)
                .HasMaxLength(255)
                .HasColumnName("checklistItem");
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

            entity.Property(e => e.ProductSampleId)
                .HasMaxLength(50)
                .HasColumnName("productSampleID");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .HasColumnName("Description");
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
            entity.Property(e => e.GoldWeight).HasColumnName("goldWeight");

            entity.HasOne(d => d.Gold).WithMany(p => p.ProductSamples)
                .HasForeignKey(d => d.GoldId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductSample_Gold1");
        });
        modelBuilder.Entity<Notification>(entity =>
        {
            entity.ToTable("Notification");
            entity.Property(e => e.NotificationId)
                .HasMaxLength(50)
                .HasColumnName("notificationId");
            entity.Property(e => e.Message)
                .HasMaxLength(200)
                .HasColumnName("message");
            entity.Property(e => e.UserId)
                .HasMaxLength(450)
                .HasColumnName("userId");
            entity.Property(e => e.SenderId)
                .HasMaxLength(450)
                .HasColumnName("senderId");
            entity.Property(e => e.IsRead)
                .IsRequired()
                .HasColumnName("isRead");
            entity.Property(e => e.CreatedAt).HasColumnName("createdAt");

            entity.HasOne(n => n.User)
                 .WithMany(u => u.ReceivedNotifications)
                 .HasForeignKey(n => n.UserId)
                 .OnDelete(DeleteBehavior.Restrict)
                 .HasConstraintName("FK_Notification_User");

            entity.HasOne(n => n.Sender)
                  .WithMany(u => u.SentNotifications)
                  .HasForeignKey(n => n.SenderId)
                  .OnDelete(DeleteBehavior.Restrict)
                  .HasConstraintName("FK_Notification_Sender");
        });

        modelBuilder.Entity<AppUser>(entity =>
        {
            entity.ToTable("User");

            entity.Property(e => e.DateOfBirth).HasColumnName("DateOfBirth");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("Name");
            entity.Property(e => e.Avatar)
                .HasMaxLength(350)
                .HasColumnName("Avatar");
        });

        modelBuilder.Entity<_3ddesign>(entity =>
        {
            entity.ToTable("3DDesign");

            entity.Property(e => e._3dDesignId)
                .HasMaxLength(50)
                .HasColumnName("3dDesignID");
            entity.Property(e => e.OrderId)
                .HasMaxLength(50)
                .HasColumnName("orderId");
            entity.Property(e => e.Image)
                .HasMaxLength(200)
                .HasColumnName("Image");
            entity.Property(e => e.DesignName)
                .HasMaxLength(50)
                .HasColumnName("designName");
            entity.Property(e => e.DesignStaffId)
                .HasMaxLength(450)
                .HasColumnName("designStaffID");
            entity.Property(e => e.ProductSampleId)
                .HasMaxLength(50)
                .HasColumnName("productSampleID");

            entity.HasOne(d => d.Order).WithMany(p => p._3ddesigns)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK_3DDesign_Order");

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

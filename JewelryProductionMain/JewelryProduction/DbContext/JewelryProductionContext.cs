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

    public DbSet<Collection> Collections { get; set; }

    public DbSet<CustomerRequest> CustomerRequests { get; set; }

    public DbSet<Gemstone> Gemstones { get; set; }

    public DbSet<Gold> Golds { get; set; }

    public DbSet<Insurance> Insurances { get; set; }

    public DbSet<Message> Messages { get; set; }

    public DbSet<Order> Orders { get; set; }

    public DbSet<PaymentMethod> PaymentMethods { get; set; }

    public DbSet<ProductSample> ProductSamples { get; set; }


    public DbSet<AppUser> Users { get; set; }

    public DbSet<_3ddesign> _3ddesigns { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=LAPTOP-4EB8UC8S\\SQLEXPRESS;Initial Catalog=JewelryProduction;Persist Security Info=True;User ID=sa;Password=12345;Trust Server Certificate=True");

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
                        .HasConstraintName("FK__Collectio__produ__4316F928"),
                    l => l.HasOne<Collection>().WithMany()
                        .HasForeignKey("CollectionId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Collectio__colle__4222D4EF"),
                    j =>
                    {
                        j.HasKey("CollectionId", "ProductSampleId").HasName("PK__Collecti__15A109788FBE69CC");
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

            entity.Property(e => e.CustomizeRequestId)
                .HasMaxLength(50)
                .HasColumnName("customizeRequestID");
            entity.Property(e => e.CustomerId)
                .HasMaxLength(450)
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
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasColumnName("status");

            entity.HasOne(d => d.Customer).WithMany(p => p.CustomerRequests)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CustomerRequest_User");

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
            entity.Property(e => e.CustomerId)
                .HasMaxLength(450)
                .HasColumnName("customerID");
            entity.Property(e => e.CustomizeRequestId)
                .HasMaxLength(50)
                .HasColumnName("customizeRequestID");
            entity.Property(e => e.DepositAmount)
                .HasColumnType("money")
                .HasColumnName("depositAmount");
            entity.Property(e => e.ManagerId)
                .HasMaxLength(450)
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
                .HasMaxLength(450)
                .HasColumnName("productionStaffID");
            entity.Property(e => e.SaleStaffId)
                .HasMaxLength(450)
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

            entity.HasOne(d => d.Gold).WithMany(p => p.ProductSamples)
                .HasForeignKey(d => d.GoldId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProductSample_Gold1");
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
            entity.Property(e => e.CustomizeRequestId)
                .HasMaxLength(50)
                .HasColumnName("customizeRequestID");
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

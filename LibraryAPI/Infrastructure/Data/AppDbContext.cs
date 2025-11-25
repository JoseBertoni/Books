using LibraryAPI.Domain;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }
        
        public DbSet<Libro> Libros { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Libro>(entity =>
            {
                entity.HasKey(b => b.Id);

                entity.Property(b => b.Id)
                    .ValueGeneratedOnAdd(); // AutoIncrement

                entity.Property(b => b.Titulo)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(b => b.Autor)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(b => b.Genero)
                    .HasMaxLength(100);
            });
        }
    }
}

using LibraryAPI.Domain;
using LibraryAPI.Infrastructure.Data;
using LibraryAPI.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using FluentAssertions;

namespace LibraryAPI.Tests.Repositories
{
    public class LibroRepositoryTests : IDisposable
    {
        private readonly AppDbContext _context;
        private readonly LibroRepository _repository;

        public LibroRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);
            _repository = new LibroRepository(_context);
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnPaginatedResults()
        {
            // Arrange
            var libros = new List<Libro>
            {
                new Libro { Titulo = "Libro 1", Autor = "Autor 1", Descripcion = "Desc 1", Genero = "Ficción", FechaPublicacion = new DateOnly(2020, 1, 1) },
                new Libro { Titulo = "Libro 2", Autor = "Autor 2", Descripcion = "Desc 2", Genero = "Horror", FechaPublicacion = new DateOnly(2021, 1, 1) },
                new Libro { Titulo = "Libro 3", Autor = "Autor 3", Descripcion = "Desc 3", Genero = "Ficción", FechaPublicacion = new DateOnly(2022, 1, 1) }
            };
            await _context.Libros.AddRangeAsync(libros);
            await _context.SaveChangesAsync();

            // Act
            var (items, totalCount) = await _repository.GetAllAsync(1, 2);

            // Assert
            items.Should().HaveCount(2);
            totalCount.Should().Be(3);
        }

        [Fact]
        public async Task GetAllAsync_WithSearchTerm_ShouldFilterByTitle()
        {
            // Arrange
            var libros = new List<Libro>
            {
                new Libro { Titulo = "El Resplandor", Autor = "Stephen King", Descripcion = "Horror", Genero = "Horror", FechaPublicacion = new DateOnly(1977, 1, 1) },
                new Libro { Titulo = "It", Autor = "Stephen King", Descripcion = "Horror", Genero = "Horror", FechaPublicacion = new DateOnly(1986, 1, 1) },
                new Libro { Titulo = "1984", Autor = "George Orwell", Descripcion = "Distopia", Genero = "Ficción", FechaPublicacion = new DateOnly(1949, 1, 1) }
            };
            await _context.Libros.AddRangeAsync(libros);
            await _context.SaveChangesAsync();

            // Act
            var (items, totalCount) = await _repository.GetAllAsync(1, 10, "Resplandor");

            // Assert
            items.Should().HaveCount(1);
            items.First().Titulo.Should().Be("El Resplandor");
            totalCount.Should().Be(1);
        }

        [Fact]
        public async Task GetAllAsync_WithGeneroFilter_ShouldFilterByGenero()
        {
            // Arrange
            var libros = new List<Libro>
            {
                new Libro { Titulo = "Libro 1", Autor = "Autor 1", Descripcion = "Desc 1", Genero = "Horror", FechaPublicacion = new DateOnly(2020, 1, 1) },
                new Libro { Titulo = "Libro 2", Autor = "Autor 2", Descripcion = "Desc 2", Genero = "Horror", FechaPublicacion = new DateOnly(2021, 1, 1) },
                new Libro { Titulo = "Libro 3", Autor = "Autor 3", Descripcion = "Desc 3", Genero = "Ficción", FechaPublicacion = new DateOnly(2022, 1, 1) }
            };
            await _context.Libros.AddRangeAsync(libros);
            await _context.SaveChangesAsync();

            // Act
            var (items, totalCount) = await _repository.GetAllAsync(1, 10, null, "Horror");

            // Assert
            items.Should().HaveCount(2);
            items.All(l => l.Genero == "Horror").Should().BeTrue();
            totalCount.Should().Be(2);
        }

        [Fact]
        public async Task AddAsync_ShouldAddLibroToDatabase()
        {
            // Arrange
            var libro = new Libro
            {
                Titulo = "Nuevo Libro",
                Autor = "Nuevo Autor",
                Descripcion = "Nueva Descripción",
                Genero = "Ficción",
                FechaPublicacion = new DateOnly(2023, 1, 1)
            };

            // Act
            var result = await _repository.AddAsync(libro);

            // Assert
            result.Id.Should().BeGreaterThan(0);
            var savedLibro = await _context.Libros.FindAsync(result.Id);
            savedLibro.Should().NotBeNull();
            savedLibro!.Titulo.Should().Be("Nuevo Libro");
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnLibro_WhenExists()
        {
            // Arrange
            var libro = new Libro
            {
                Titulo = "Test Libro",
                Autor = "Test Autor",
                Descripcion = "Test Desc",
                Genero = "Test",
                FechaPublicacion = new DateOnly(2020, 1, 1)
            };
            await _context.Libros.AddAsync(libro);
            await _context.SaveChangesAsync();

            // Act
            var result = await _repository.GetByIdAsync(libro.Id);

            // Assert
            result.Should().NotBeNull();
            result!.Titulo.Should().Be("Test Libro");
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnNull_WhenNotExists()
        {
            // Act
            var result = await _repository.GetByIdAsync(999);

            // Assert
            result.Should().BeNull();
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}

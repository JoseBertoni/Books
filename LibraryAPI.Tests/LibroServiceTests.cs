using LibraryAPI.Domain;
using LibraryAPI.Domain.DTOs;
using LibraryAPI.Infrastructure.Repositories;
using LibraryAPI.Infrastructure.Services;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Moq;
using FluentAssertions;

namespace LibraryAPI.Tests.Services
{
    public class LibroServiceTests
    {
        private readonly Mock<ILibroRepository> _mockRepository;
        private readonly Mock<ILogger<LibroService>> _mockLogger;
        private readonly IMemoryCache _cache;
        private readonly LibroService _service;

        public LibroServiceTests()
        {
            _mockRepository = new Mock<ILibroRepository>();
            _mockLogger = new Mock<ILogger<LibroService>>();
            _cache = new MemoryCache(new MemoryCacheOptions());
            _service = new LibroService(_mockRepository.Object, _mockLogger.Object, _cache);
        }

        [Fact]
        public async Task GetAllLibrosAsync_ShouldReturnPaginatedResult()
        {
            // Arrange
            var libros = new List<Libro>
            {
                new Libro { Id = 1, Titulo = "Libro 1", Autor = "Autor 1", Descripcion = "Desc 1", Genero = "Ficción", FechaPublicacion = new DateOnly(2020, 1, 1) },
                new Libro { Id = 2, Titulo = "Libro 2", Autor = "Autor 2", Descripcion = "Desc 2", Genero = "Horror", FechaPublicacion = new DateOnly(2021, 1, 1) }
            };

            _mockRepository
                .Setup(r => r.GetAllAsync(1, 10, null, null))
                .ReturnsAsync((libros, 2));

            // Act
            var result = await _service.GetAllLibrosAsync(1, 10);

            // Assert
            result.Should().NotBeNull();
            _mockRepository.Verify(r => r.GetAllAsync(1, 10, null, null), Times.Once);
        }

        [Fact]
        public async Task GetAllLibrosAsync_ShouldUseCache_OnSecondCall()
        {
            // Arrange
            var libros = new List<Libro>
            {
                new Libro { Id = 1, Titulo = "Libro 1", Autor = "Autor 1", Descripcion = "Desc 1", Genero = "Ficción", FechaPublicacion = new DateOnly(2020, 1, 1) }
            };

            _mockRepository
                .Setup(r => r.GetAllAsync(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync((libros, 1));

            // Act
            await _service.GetAllLibrosAsync(1, 10);
            await _service.GetAllLibrosAsync(1, 10);

            // Assert
            _mockRepository.Verify(r => r.GetAllAsync(1, 10, null, null), Times.Once);
        }

        [Fact]
        public async Task CreateLibroAsync_ShouldCreateLibro()
        {
            // Arrange
            var dto = new CreateLibroDto
            {
                Titulo = "Nuevo Libro",
                Autor = "Nuevo Autor",
                Descripcion = "Nueva Descripción",
                Genero = "Ficción",
                FechaPublicacion = new DateOnly(2023, 1, 1)
            };

            var expectedLibro = new Libro
            {
                Id = 1,
                Titulo = dto.Titulo,
                Autor = dto.Autor,
                Descripcion = dto.Descripcion,
                Genero = dto.Genero,
                FechaPublicacion = dto.FechaPublicacion
            };

            _mockRepository
                .Setup(r => r.AddAsync(It.IsAny<Libro>()))
                .ReturnsAsync(expectedLibro);

            // Para evitar error en fetchLibros después de crear
            _mockRepository
                .Setup(r => r.GetAllAsync(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync((new List<Libro> { expectedLibro }, 1));

            // Act
            var result = await _service.CreateLibroAsync(dto);

            // Assert
            result.Should().NotBeNull();
            result.Titulo.Should().Be(dto.Titulo);
            result.Autor.Should().Be(dto.Autor);
            _mockRepository.Verify(r => r.AddAsync(It.IsAny<Libro>()), Times.Once);
        }

        [Fact]
        public async Task GetAllLibrosAsync_WithSearchAndFilter_ShouldPassParametersToRepository()
        {
            // Arrange
            var libros = new List<Libro>
            {
                new Libro { Id = 1, Titulo = "El Resplandor", Autor = "Stephen King", Descripcion = "Horror", Genero = "Horror", FechaPublicacion = new DateOnly(1977, 1, 1) }
            };

            _mockRepository
                .Setup(r => r.GetAllAsync(1, 10, "Resplandor", "Horror"))
                .ReturnsAsync((libros, 1));

            // Act
            await _service.GetAllLibrosAsync(1, 10, "Resplandor", "Horror");

            // Assert
            _mockRepository.Verify(r => r.GetAllAsync(1, 10, "Resplandor", "Horror"), Times.Once);
        }
    }
}

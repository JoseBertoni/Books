using LibraryAPI.Domain;
using LibraryAPI.Domain.DTOs;
using LibraryAPI.Infrastructure.Repositories;
using Microsoft.Extensions.Caching.Memory;

namespace LibraryAPI.Infrastructure.Services
{
    public class LibroService : ILibroService
    {
        private readonly ILibroRepository _repository;
        private readonly ILogger<LibroService> _logger;
        private readonly IMemoryCache _cache;
        private const string CacheKeyPrefix = "libros_page_";
        private static readonly TimeSpan CacheExpiration = TimeSpan.FromMinutes(5);

        public LibroService(ILibroRepository repository, ILogger<LibroService> logger, IMemoryCache cache)
        {
            _repository = repository;
            _logger = logger;
            _cache = cache;
        }

        public async Task<object> GetAllLibrosAsync(int pageNumber, int pageSize, string? searchTerm = null, string? genero = null)
        {
            try
            {
                // Crear una clave de caché que incluya los parámetros de búsqueda
                var cacheKey = $"{CacheKeyPrefix}{pageNumber}_{pageSize}_{searchTerm ?? "all"}_{genero ?? "all"}";
                
                // Intentar obtener del caché
                if (_cache.TryGetValue(cacheKey, out object cachedResult))
                {
                    _logger.LogInformation("Obteniendo libros desde caché para página {PageNumber}", pageNumber);
                    return cachedResult;
                }
                
                // Si no está en caché, obtener de la base de datos
                _logger.LogInformation("Obteniendo libros desde la base de datos para página {PageNumber}", pageNumber);
                var (items, totalCount) = await _repository.GetAllAsync(pageNumber, pageSize, searchTerm, genero);
                
                var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
                
                var result = new
                {
                    items,
                    pageNumber,
                    pageSize,
                    totalCount,
                    totalPages,
                    hasPreviousPage = pageNumber > 1,
                    hasNextPage = pageNumber < totalPages
                };
                
                // Guardar en caché
                var cacheOptions = new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = CacheExpiration
                };
                _cache.Set(cacheKey, result, cacheOptions);
                
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener la lista de libros desde el servicio");
                throw;
            }
        }

        public async Task<Libro> CreateLibroAsync(CreateLibroDto createLibroDto)
        {
            try
            {
                // Las validaciones son manejadas por FluentValidation automáticamente
                
                // Mapear DTO a entidad
                var libro = new Libro
                {
                    Titulo = createLibroDto.Titulo,
                    Autor = createLibroDto.Autor,
                    Descripcion = createLibroDto.Descripcion,
                    Genero = createLibroDto.Genero,
                    FechaPublicacion = createLibroDto.FechaPublicacion
                };

                var resultado = await _repository.AddAsync(libro);
                
                // El caché se invalidará automáticamente después de 5 minutos
                // No hacemos invalidación manual porque IMemoryCache no soporta limpiar por patrón
                _logger.LogInformation("Libro creado. El caché se actualizará automáticamente al expirar");
                
                return resultado;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear el libro desde el servicio");
                throw;
            }
        }
    }
}

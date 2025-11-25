using LibraryAPI.Domain;
using LibraryAPI.Domain.DTOs;

namespace LibraryAPI.Infrastructure.Services
{
    public interface ILibroService
    {
        Task<object> GetAllLibrosAsync(int pageNumber, int pageSize, string? searchTerm = null, string? genero = null);
        Task<Libro> CreateLibroAsync(CreateLibroDto createLibroDto);
    }
}

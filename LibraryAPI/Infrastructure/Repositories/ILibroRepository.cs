using LibraryAPI.Domain;

namespace LibraryAPI.Infrastructure.Repositories
{
    public interface ILibroRepository
    {
        Task<(IEnumerable<Libro> items, int totalCount)> GetAllAsync(int pageNumber, int pageSize, string? searchTerm = null, string? genero = null);
        Task<Libro?> GetByIdAsync(int id);
        Task<Libro> AddAsync(Libro libro);
        Task<Libro> UpdateAsync(Libro libro);
        Task DeleteAsync(int id);
    }
}

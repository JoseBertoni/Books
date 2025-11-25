using LibraryAPI.Domain;
using LibraryAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Infrastructure.Repositories
{
    public class LibroRepository : ILibroRepository
    {
        private readonly AppDbContext _context;

        public LibroRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<(IEnumerable<Libro> items, int totalCount)> GetAllAsync(int pageNumber, int pageSize, string? searchTerm = null, string? genero = null)
        {
            var query = _context.Libros.AsQueryable();

            // Filtrar por título (búsqueda)
            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(l => l.Titulo.Contains(searchTerm));
            }

            // Filtrar por género
            if (!string.IsNullOrWhiteSpace(genero))
            {
                query = query.Where(l => l.Genero == genero);
            }

            var totalCount = await query.CountAsync();
            
            var items = await query
                .OrderByDescending(l => l.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            
            return (items, totalCount);
        }

        public async Task<Libro?> GetByIdAsync(int id)
        {
            return await _context.Libros.FindAsync(id);
        }

        public async Task<Libro> AddAsync(Libro libro)
        {
            _context.Libros.Add(libro);
            await _context.SaveChangesAsync();
            return libro;
        }

        public async Task<Libro> UpdateAsync(Libro libro)
        {
            _context.Libros.Update(libro);
            await _context.SaveChangesAsync();
            return libro;
        }

        public async Task DeleteAsync(int id)
        {
            var libro = await _context.Libros.FindAsync(id);
            if (libro != null)
            {
                _context.Libros.Remove(libro);
                await _context.SaveChangesAsync();
            }
        }
    }
}

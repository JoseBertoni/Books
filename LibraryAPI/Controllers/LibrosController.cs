using LibraryAPI.Domain;
using LibraryAPI.Domain.DTOs;
using LibraryAPI.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LibrosController : ControllerBase
    {
        private readonly ILibroService _libroService;
        private readonly ILogger<LibrosController> _logger;

        public LibrosController(ILibroService libroService, ILogger<LibrosController> logger)
        {
            _libroService = libroService;
            _logger = logger;
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> GetLibros(
            [FromQuery] int pageNumber = 1, 
            [FromQuery] int pageSize = 10,
            [FromQuery] string? searchTerm = null,
            [FromQuery] string? genero = null)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;
            if (pageSize > 100) pageSize = 100; // Límite máximo
            
            var result = await _libroService.GetAllLibrosAsync(pageNumber, pageSize, searchTerm, genero);
            return Ok(result);
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Libro>> CreateLibro([FromBody] CreateLibroDto createLibroDto)
        {

            var libro = await _libroService.CreateLibroAsync(createLibroDto);
            return CreatedAtAction(nameof(GetLibros), new { id = libro.Id }, libro);
        }
    }
}

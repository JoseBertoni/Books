namespace LibraryAPI.Domain.DTOs
{
    public class CreateLibroDto
    {
        public string Titulo { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string Genero { get; set; } = string.Empty;
        public DateOnly FechaPublicacion { get; set; }
    }
}

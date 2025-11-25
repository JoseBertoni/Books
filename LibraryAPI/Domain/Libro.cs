namespace LibraryAPI.Domain
{
    public class Libro
    {
        public int Id { get; set; }   
        public string Titulo { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string Genero { get; set; } = string.Empty;
        public DateOnly FechaPublicacion { get; set; }
    }
}

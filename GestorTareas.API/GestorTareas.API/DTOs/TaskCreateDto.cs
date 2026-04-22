namespace GestorTareas.API.DTOs
{
    public class TaskCreateDto
    {
        public string Titulo { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public string Estado { get; set; } = "pendiente";
        public int idUsuario { get; set; }
    }
}
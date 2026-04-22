namespace GestorTareas.API.DTOs
{
    public class TaskUpdateDto
    {
        public string Titulo { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public string Estado { get; set; } = string.Empty;
        public int idUsuario { get; set; }
    }
}
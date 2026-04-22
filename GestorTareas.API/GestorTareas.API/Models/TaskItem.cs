namespace GestorTareas.API.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public string Estado { get; set; } = "pendiente";
        public int idUsuario { get; set; }
        public DateTime fechaCreacion { get; set; } = DateTime.Now;

        // Relación: cada tarea pertenece a un usuario
        public User? User { get; set; }
    }
}
namespace GestorTareas.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime fechaCreacion { get; set; } = DateTime.Now;

        // Relación: un usuario puede tener muchas tareas
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
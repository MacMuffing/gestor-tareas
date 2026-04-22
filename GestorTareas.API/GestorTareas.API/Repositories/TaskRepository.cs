using GestorTareas.API.Data;
using GestorTareas.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GestorTareas.API.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _context;

        public TaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync(string? status)
        {
            var query = _context.Tasks.Include(t => t.User).AsQueryable();

            if (!string.IsNullOrEmpty(status))
                query = query.Where(t => t.Estado == status);

            return await query.ToListAsync();
        }

        public async Task<TaskItem?> GetByIdAsync(int id)
        {
            return await _context.Tasks
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<TaskItem> CreateAsync(TaskItem task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<TaskItem?> UpdateAsync(int id, TaskItem updated)
        {
            var existing = await _context.Tasks.FindAsync(id);
            if (existing == null) return null;

            existing.Titulo = updated.Titulo;
            existing.Descripcion = updated.Descripcion;
            existing.Estado = updated.Estado;
            existing.idUsuario = updated.idUsuario;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
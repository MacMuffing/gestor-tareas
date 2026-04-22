using GestorTareas.API.DTOs;
using GestorTareas.API.Models;

namespace GestorTareas.API.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllAsync(string? status);
        Task<TaskItem?> GetByIdAsync(int id);
        Task<TaskItem> CreateAsync(TaskCreateDto dto);
        Task<TaskItem?> UpdateAsync(int id, TaskUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
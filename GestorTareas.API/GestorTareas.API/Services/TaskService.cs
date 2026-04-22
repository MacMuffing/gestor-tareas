using GestorTareas.API.DTOs;
using GestorTareas.API.Models;
using GestorTareas.API.Repositories;

namespace GestorTareas.API.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repository;

        public TaskService(ITaskRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync(string? status)
        {
            return await _repository.GetAllAsync(status);
        }

        public async Task<TaskItem?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<TaskItem> CreateAsync(TaskCreateDto dto)
        {
            var task = new TaskItem
            {
                Titulo = dto.Titulo,
                Descripcion = dto.Descripcion,
                Estado = dto.Estado,
                idUsuario = dto.idUsuario
            };

            return await _repository.CreateAsync(task);
        }

        public async Task<TaskItem?> UpdateAsync(int id, TaskUpdateDto dto)
        {
            var task = new TaskItem
            {
                Titulo = dto.Titulo,
                Descripcion = dto.Descripcion,
                Estado = dto.Estado,
                idUsuario = dto.idUsuario
            };

            return await _repository.UpdateAsync(id, task);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}
using GestorTareas.API.DTOs;
using GestorTareas.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace GestorTareas.API.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _service;

        public TasksController(ITaskService service)
        {
            _service = service;
        }

        // GET /api/tasks
        // GET /api/tasks?status=pendiente
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? status)
        {
            var tasks = await _service.GetAllAsync(status);
            return Ok(tasks);
        }

        // GET /api/tasks/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var task = await _service.GetByIdAsync(id);
            if (task == null)
                return NotFound(new { message = $"Tarea con id {id} no encontrada." });

            return Ok(task);
        }

        // POST /api/tasks
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT /api/tasks/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TaskUpdateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _service.UpdateAsync(id, dto);
            if (updated == null)
                return NotFound(new { message = $"Tarea con id {id} no encontrada." });

            return Ok(updated);
        }

        // DELETE /api/tasks/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted)
                return NotFound(new { message = $"Tarea con id {id} no encontrada." });

            return Ok(new { message = $"Tarea con id {id} eliminada correctamente." });
        }
    }
}
export function TaskList({ tasks, onEdit, onDelete }) {
    if (tasks.length === 0) {
        return <p className="empty-msg">No hay tareas para mostrar.</p>;
    }

    const estadoClass = {
        pendiente: "badge badge-pendiente",
        "en progreso": "badge badge-progreso",
        completada: "badge badge-completada",
    };

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <li key={task.id} className="task-card">
                    <div className="task-info">
                        <h3>{task.titulo}</h3>
                        {task.descripcion && <p>{task.descripcion}</p>}
                        <span className={estadoClass[task.estado] || "badge"}>
                            {task.estado}
                        </span>
                        <small>Usuario ID: {task.idUsuario}</small>
                    </div>
                    <div className="task-actions">
                        <button className="btn-edit" onClick={() => onEdit(task)}>
                            Editar
                        </button>
                        <button className="btn-delete" onClick={() => onDelete(task.id)}>
                            Eliminar
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
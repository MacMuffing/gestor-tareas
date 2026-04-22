import { useState, useEffect } from "react";

const EMPTY_FORM = {
    titulo: "",
    descripcion: "",
    estado: "pendiente",
    idUsuario: 1,
};

export function TaskForm({ onSubmit, editingTask, onCancel }) {
    const [form, setForm] = useState(EMPTY_FORM);

    // Si viene una tarea para editar, cargamos sus datos en el formulario
    useEffect(() => {
        if (editingTask) {
            setForm({
                titulo: editingTask.titulo,
                descripcion: editingTask.descripcion || "",
                estado: editingTask.estado,
                idUsuario: editingTask.idUsuario,
            });
        } else {
            setForm(EMPTY_FORM);
        }
    }, [editingTask]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.titulo.trim()) return;
        onSubmit(form);
        setForm(EMPTY_FORM);
    };

    return (
        <div className="task-form">
            <h2>{editingTask ? "Editar tarea" : "Nueva tarea"}</h2>

            <div className="form-group">
                <label>Título *</label>
                <input
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    placeholder="Título de la tarea"
                />
            </div>

            <div className="form-group">
                <label>Descripción</label>
                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción opcional"
                    rows={3}
                />
            </div>

            <div className="form-group">
                <label>Estado</label>
                <select name="estado" value={form.estado} onChange={handleChange}>
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En progreso</option>
                    <option value="completada">Completada</option>
                </select>
            </div>

            <div className="form-group">
                <label>ID de usuario</label>
                <input
                    name="idUsuario"
                    type="number"
                    value={form.idUsuario}
                    onChange={handleChange}
                    min={1}
                />
            </div>

            <div className="form-actions">
                <button className="btn-primary" onClick={handleSubmit}>
                    {editingTask ? "Guardar cambios" : "Crear tarea"}
                </button>
                {editingTask && (
                    <button className="btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
            </div>
        </div>
    );
}
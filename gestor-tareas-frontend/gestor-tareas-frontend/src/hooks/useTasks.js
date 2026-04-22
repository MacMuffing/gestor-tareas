import { useState, useEffect, useCallback } from "react";

const API_URL = "http://localhost:5234/api/tasks";

export function useTasks(statusFilter) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Obtener tareas (con filtro opcional por estado)
    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const url = statusFilter ? `${API_URL}?status=${statusFilter}` : API_URL;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Error al obtener las tareas");
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [statusFilter]);

    // Crear tarea
    const createTask = async (taskData) => {
        setError(null);
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });
            if (!res.ok) throw new Error("Error al crear la tarea");
            await fetchTasks();
        } catch (err) {
            setError(err.message);
        }
    };

    // Actualizar tarea
    const updateTask = async (id, taskData) => {
        setError(null);
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });
            if (!res.ok) throw new Error("Error al actualizar la tarea");
            await fetchTasks();
        } catch (err) {
            setError(err.message);
        }
    };

    // Eliminar tarea
    const deleteTask = async (id) => {
        setError(null);
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Error al eliminar la tarea");
            await fetchTasks();
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return { tasks, loading, error, createTask, updateTask, deleteTask };
}
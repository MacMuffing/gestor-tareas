import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import { TaskFilter } from "./components/TaskFilter";
import "./App.css";

function App() {
    const [statusFilter, setStatusFilter] = useState("");
    const [editingTask, setEditingTask] = useState(null);

    const { tasks, loading, error, createTask, updateTask, deleteTask } =
        useTasks(statusFilter);

    const handleSubmit = async (formData) => {
        if (editingTask) {
            await updateTask(editingTask.id, formData);
            setEditingTask(null);
        } else {
            await createTask(formData);
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>📋 Gestor de Tareas</h1>
            </header>

            <main className="app-main">
                <section className="sidebar">
                    <TaskForm
                        onSubmit={handleSubmit}
                        editingTask={editingTask}
                        onCancel={() => setEditingTask(null)}
                    />
                </section>

                <section className="content">
                    <TaskFilter current={statusFilter} onChange={setStatusFilter} />

                    {loading && <p className="status-msg">Cargando tareas...</p>}
                    {error && <p className="status-msg error">Error: {error}</p>}
                    {!loading && !error && (
                        <TaskList
                            tasks={tasks}
                            onEdit={setEditingTask}
                            onDelete={deleteTask}
                        />
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;

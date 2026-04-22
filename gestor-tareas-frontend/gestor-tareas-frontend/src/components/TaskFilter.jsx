export function TaskFilter({ current, onChange }) {
    const estados = [
        { value: "", label: "Todas" },
        { value: "pendiente", label: "Pendiente" },
        { value: "en progreso", label: "En progreso" },
        { value: "completada", label: "Completada" },
    ];

    return (
        <div className="filter-bar">
            <span>Filtrar por estado:</span>
            {estados.map((e) => (
                <button
                    key={e.value}
                    className={`filter-btn ${current === e.value ? "active" : ""}`}
                    onClick={() => onChange(e.value)}
                >
                    {e.label}
                </button>
            ))}
        </div>
    );
}
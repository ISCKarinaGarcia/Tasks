"use client";
import { useEffect, useState } from "react";
import TaskCard from "../(components)/TaskCard";

async function fetchTasks() {
  try {
    const res = await fetch("http://localhost:3000/api/tasks");

    if (!res.ok) {
      throw new Error(`Error al obtener las tareas: ${res.statusText}`);
    }

    const tasks = await res.json();
    return tasks;
  } catch (error) {
    console.error("Error en fetchTasks:", error.message);
    return [];
  }
}

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reloadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadTasks();
  }, []);

  return (
    <div className="w-full h-screen p-2">
      {/* HEADER */}
      <section className="w-full h-24 flex justify-center items-center p-2">
        <h1 className="
        text-3xl font-bold italic
        text-gray-400">
          Tareas
          </h1>
      </section>

      {/* CONTENT */}
      <section className="
      w-full h-[550px] border-2 shadow-lg rounded-lg flex flex-col p-2
      text-gray-500 text-xl">
        {loading && <p>Cargando tareas...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && tasks.length === 0 && (
          <p>No hay tareas disponibles</p>
        )}
        {!loading && !error && tasks.length > 0 && (
          <div className="flex flex-col gap-2 items-center">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onTaskDeleted={reloadTasks} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Tasks;

"use client"; // Marca este archivo como componente cliente
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation"; // Usa la API moderna de Next.js
import { useRef, useState, useEffect } from "react";
import axios from "axios";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    createdAt: "",
    expeditionDate: "",
  });

  const [errors, setErrors] = useState({});
  const form = useRef(null);
  const router = useRouter();
  const params = useParams(); // Obtén los parámetros dinámicos de la URL
  const id = params?.id; // Accede al parámetro `id`, si existe

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(`/api/tasks/${id}`);
  

          response.data.createdAt = format((new Date(response.data.createdAt)),'yyyy-MM-dd')
          response.data.expeditionDate = format((new Date(response.data.expeditionDate)),'yyyy-MM-dd')

          setTask(response.data);

        } catch (error) {
          console.error("Error fetching task:", error);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    console.log('valitaions task',task);
    
    if (!task.title.trim()) newErrors.title = "El título de la tarea es requerido.";
    if (!task.description.trim()) newErrors.description = "La información de la tarea es requerida.";
    if (!task.priority) newErrors.priority = "La prioridad es obligatoria.";
    if (!task.createdAt) newErrors.createdAt = "La fecha de creación es requerida.";
    if (!task.expeditionDate) newErrors.expeditionDate = "La fecha de conclusión es requerida.";
    else if (new Date(task.expeditionDate) < new Date(task.createdAt)) {
      newErrors.expeditionDate = "La fecha de conclusión no puede ser anterior a la fecha de creación.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    task.priority = parseInt(task.priority);

    if (!validateForm()) return;

    try {
      if (!id) {
        await axios.post("http://localhost:3000/api/tasks", task);
      } else {
        await axios.put(`http://localhost:3000/api/tasks/${id}`, task);
      }

      form.current.reset();
      router.push("/admin/tasks");
    } catch (error) {
      console.log('error submitting task',error); 
          }
  };

  return (
    <div className="flex w-full p-2 h-auto md:w-[600px]">
      <form
        className="bg-blue-50 bg-opacity-40 shadow-md rounded-md p-2 
        border-4 flex-col items-center gap-2 border-blue-100 border-dashed w-full h-full overflow-auto"
        onSubmit={handleSubmit}
        ref={form}
      >
        {/* Título de la tarea */}
        <label htmlFor="title" className="block text-gray-400 text-md font-bold mb-2 mt-2">
          Título de la Tarea
        </label>
        <input
          type="text"
          name="title"
          placeholder="Título de la tarea"
          onChange={handleChange}
          value={task.title || ""}
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-3"
        />
        {errors.title && <p className="text-pink-700 text-sm mt-1">{errors.title}</p>}

        {/* Descripción de la tarea */}
        <label htmlFor="description" className="block text-gray-400 text-md font-bold mb-2 mt-2">
          Descripción de la Tarea
        </label>
        <textarea
          name="description"
          placeholder="Detalles de la tarea"
          onChange={handleChange}
          value={task.description || ""}
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-3"
        />
        {errors.description && <p className="text-pink-700 text-sm mt-1">{errors.description}</p>}

        {/* Fecha de creación */}
        <label htmlFor="createdAt" className="block text-gray-400 text-md font-bold mb-2 mt-2">
          Fecha de Creación
        </label>
        <input
          type="date"
          name="createdAt"
          value={task.createdAt || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-3"
        />
        {errors.createdAt && <p className="text-pink-700 text-sm mt-1">{errors.createdAt}</p>}

        {/* Fecha de conclusión */}
        <label htmlFor="expeditionDate" className="block text-gray-400 text-md font-bold mb-2 mt-2">
          Fecha de Conclusión
        </label>
        <input
          type="date"
          name="expeditionDate"
          value={task.expeditionDate || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-3"
        />
        {errors.expeditionDate && <p className="text-pink-700 text-sm mt-1">{errors.expeditionDate}</p>}

        {/* Prioridad */}
        <label htmlFor="priority" className="block text-gray-400 text-md font-bold mb-2 mt-2">
          Prioridad
        </label>
        <select
          name="priority"
          value={task.priority || ""}
          onChange={handleChange}
          className="shadow border rounded-lg w-full py-2 px-3 mb-3"
        >
          <option value="">Selecciona la prioridad</option>
          <option value="1">Alta</option>
          <option value="2">Media</option>
          <option value="3">Baja</option>
        </select>
        {errors.priority && <p className="text-pink-700 text-sm mt-1">{errors.priority}</p>}

        {/* Botón de enviar */}
        <button
          className="my-6 bg-purple-400 bg-opacity-60 hover:bg-purple-500 
          text-white font-bold py-2 px-4 rounded w-full"
        >
          {id ? "Actualizar Tarea" : "Crear Tarea"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;

import TaskForm from "../../(components)/TaskForm";

function NewTask() {
  return (
    <div className="w-full h-screen p-2">
      {/* HEADER */}
      <section className="w-full h-24 flex justify-center items-center p-2">
        <h1 className="text-3xl font-bold text-gray-400 italic">Nueva Tarea</h1>
      </section>

      {/* CONTENT */}
      <section className="w-full h-[550px]  border-2 shadow-lg rounded-lg flex justify-center p-2">
        <TaskForm></TaskForm>
      </section>
    </div>
  );
}

export default NewTask;
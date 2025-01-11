"use client";

import { format } from "date-fns";
import { Trash, User, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

function UserCard({ user, onUserDeleted }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/users/${user.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al eliminar usuario");
      }

      alert("Usuario eliminado exitosamente.");
      onUserDeleted(); // Llama a la función para recargar usuarios
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message);
      alert("No se pudo eliminar el usuario.");
    }
  };

  const handleEdit = () => {
    router.push(`/admin/users/edit/${user.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border-gray-800 mb-3 hover:bg-gray-100 hover:cursor-pointer w-full mt-9">
      <section className="user-profile w-full h-[350px] flex justify-center items-center border-2 rounded-lg shadow">
        <User className="w-[250px] rounded-lg h-[200px]" />
      </section>
      <div className="p-4">
        <h2 className="text-xl text-slate-600 font-bold my-2">{user.username}</h2>
        <p>Teléfono: {user.phone}</p>
        <p>Fecha de creación: {format(new Date(user.createdAt), "dd/MM/yyyy")}</p>
        <div className="w-full h-[45px] flex justify-end items-center mt-3">
          <button
            className="w-16 h-10 text-white bg-purple-400 bg-opacity-50 flex items-center justify-center rounded-lg shadow-md hover:bg-opacity-80"
            onClick={handleDelete}
          >
            <Trash size={20} />
          </button>
          <button
            className="w-16 h-10 text-white bg-purple-400 bg-opacity-50 flex items-center justify-center rounded-lg shadow-md hover:bg-opacity-80 ml-3"
            onClick={handleEdit}
          >
            <Edit size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;

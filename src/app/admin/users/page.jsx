"use client";

import { useState, useEffect } from "react";
import UserCard from "../(components)/UserCard";
import Link from "next/link";

export const dynamic = "force-dynamic"; // Forzar comportamiento dinámico

async function fetchUsers() {
  const res = await fetch("http://localhost:3000/api/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reloadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadUsers();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* HEADER */}
      <section className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 h-9 p-2 flex items-center justify-center my-2">
        <h1 className="text-3xl font-bold text-gray-400 italic">Usuarios</h1>
      </section>

      {/* BOTÓN CREAR USUARIO */}
      <section className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 h-9 flex justify-end items-center mt-[30px]">
        <Link href="/admin/users/new">
          <button className="w-[200px] font-bold h-16 bg-blue-50 border-2 border-blue-400
          hover:bg-opacity-70 text-gray-400 rounded-lg shadow-md p-2 flex items-center justify-center">
            Crear Usuario
          </button>
        </Link>
      </section>

      {/* CONTENIDO */}
      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && users.length === 0 && <p>No hay usuarios disponibles.</p>}
      {!loading &&
        !error &&
        users.map((user) => (
          <UserCard key={user.id} user={user} onUserDeleted={reloadUsers} />
        ))}
    </div>
  );
}

export default Users;

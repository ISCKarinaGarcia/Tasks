import { NextResponse } from "next/server";
import prisma from "../../../../libs/prisma"; // Asegúrate de tener la conexión correcta a Prisma

// Método GET para obtener una tarea por ID
export async function GET(request, { params }) {
  const { id } = params;

  try {
    if (!id) {
      return NextResponse.json({ message: "ID no proporcionado" }, { status: 400 });
    }

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id, 10) }, // Convertir el id a número
    });

    if (!task) {
      return NextResponse.json({ message: "Tarea no encontrada" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
    return NextResponse.json({ message: "Error al obtener la tarea" }, { status: 500 });
  }
}

// Método PUT para actualizar una tarea por ID
export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ message: "ID no proporcionado" }, { status: 400 });
    }

    // Asegúrate de que las fechas sean válidas
    if (body.createdAt) {
      body.createdAt = new Date(body.createdAt).toISOString(); // Formato ISO-8601
    }

    if (body.expeditionDate) {
      body.expeditionDate = new Date(body.expeditionDate).toISOString(); // Formato ISO-8601
    }

    console.log('update task body',body); 
    
    // Actualizar la tarea en la base de datos
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id, 10) },
      data: body,
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    return NextResponse.json({ message: "Error al actualizar la tarea" }, { status: 500 });
  }
}


// Método DELETE para eliminar una tarea por ID
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    // Verificar si el ID fue proporcionado
    if (!id) {
      return NextResponse.json({ message: "ID no proporcionado" }, { status: 400 });
    }

    // Eliminar la tarea de la base de datos
    const deletedTask = await prisma.task.delete({
      where: { id: parseInt(id, 10) }, // Usamos el ID convertido a número
    });

    // Devolver la respuesta con la tarea eliminada
    return NextResponse.json(deletedTask, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    return NextResponse.json({ message: "Error al eliminar la tarea" }, { status: 500 });
  }
}

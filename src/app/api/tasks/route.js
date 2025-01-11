import { NextResponse } from 'next/server';
import prisma from "../../../libs/prisma"
import  cloudinary from "../../../libs/cloudinary"
import {processImage} from "../../../libs/processImage"
import {format} from  "date-fns"

export async function GET() {
  try {
    // Obtiene todos los pasteles desde la base de datos
    const tasks = await prisma.task.findMany();
    console.log('api get tasks', tasks);

  tasks.forEach(task => {
    switch (task.priority) {
      case 1:
        task.priority = "Alta";
        break;
      case 2:
        task.priority = "Media";
        break;
    
      default:
        task.priority = "Baja";
        break;
    }
      
    });
    // Devuelve una respuesta JSON válida
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error(error);

    // Devuelve una respuesta de error
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}



export async function POST(request) {
  try {
    const data = await request.json(); // Cambiado de formData a JSON para tareas

    const { description, priority, createdAt, expeditionDate, title } = data;

    // Validar los datos recibidos
    if (!description || !description.trim()) {
      return NextResponse.json(
        { message: "La descripción de la tarea es requerida." },
        { status: 400 }
      );
    }

    if (!priority) {
      return NextResponse.json(
        { message: "La prioridad de la tarea es requerida." },
        { status: 400 }
      );
    }

    if (!createdAt) {
      return NextResponse.json(
        { message: "La fecha de creación es requerida." },
        { status: 400 }
      );
    }

    if (!expeditionDate) {
      return NextResponse.json(
        { message: "La fecha de conclusión es requerida." },
        { status: 400 }
      );
    }

    if (new Date(expeditionDate) < new Date(createdAt)) {
      return NextResponse.json(
        { message: "La fecha de conclusión no puede ser anterior a la fecha de creación." },
        { status: 400 }
      );
    }

    // Formatear la fecha de conclusión al formato ISO-8601 compatible con Prisma
    const formatedExpeditionDate = new Date(expeditionDate).toISOString();

    // Guardar la tarea en la base de datos usando Prisma
    const task = await prisma.task.create({
      data: {
        description,
        title,
        priority,
        expeditionDate: formatedExpeditionDate,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('task error',error);
    return NextResponse.json(
      { message: "Error al crear la tarea: " + error.message },
      { status: 500 }
    );
  }
}
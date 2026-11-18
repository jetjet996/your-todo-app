import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const todos = await prisma.todoItem.findMany({
      include: {
        categories: true,
        assignedTo: true,
      },
      orderBy: { id: 'asc' },
    });

  return NextResponse.json({
    success: true,
    data : todos,
  });
}

export async function submitTOdoForm(formData:FormData) {
  console.log(formData);

  
}
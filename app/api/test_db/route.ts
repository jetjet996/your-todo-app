import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const todos = await prisma.todoItem.findMany({
      // 1. Pick only the exact columns you want from TodoItem
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        dueDate: true,
        
        // 2. Select specific fields from your relations instead of grabbing everything
        categories: {
          select: {
            name: true,
          },
        },
        assignedTo: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
  
}
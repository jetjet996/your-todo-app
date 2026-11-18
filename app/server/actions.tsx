"use server"
import { prisma } from "@/lib/prisma";

export async function getTodolist() {
    try {
        const response = await prisma.todoItem.findMany({
            include: {
                categories: true,
                assignedTo: true,
            },
            orderBy: { id: 'asc' },
        });
        if (response) {
            return JSON.parse(JSON.stringify({
                success: true,
                data: response,
            }));
        }
        return JSON.parse(JSON.stringify({ error: 'Failed to fetch categories', success: false }));
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return JSON.parse(JSON.stringify({ error: 'Failed to fetch categories', success: false }));
    }
}

export async function submitTodoForm(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const dueDateValue = formData.get("dueDate")?.toString();
        let dueDate: Date | null = null;
        if (dueDateValue) {
            const [day, month, year] = dueDateValue.split("/").map(Number);
            dueDate = new Date(year, month - 1, day);
        }
        const status = formData.get("status") != null ? 1 : 0;
        const createdAt = new Date();

        const assignedToValue = formData.get("assignedToID")?.toString();
        const categoriesValue = formData.get("categoriesID")?.toString();

        const assignedToID = formData.get("assignedToID") ? Number(formData.get("assignedToID")) : null;
        const categoriesID = formData.get("categoriesID") ? Number(formData.get("categoriesID")) : null;

        const response = await prisma.todoItem.create({
            data: {
                title: title,
                description: description,
                status: status,
                dueDate: dueDate,
                createdAt: createdAt,
                assignedToID: assignedToID,
                categoriesID: categoriesID,
            },
        });

        return JSON.parse(JSON.stringify({
            success: true,
        }));
    } catch (error) {
        console.log('Failed to fetch categories:', error);
        return JSON.parse(JSON.stringify({ error: 'Failed to add Todo', success: false, error_message: error }));
    }
}

export async function getCategoriesList() {
    try {
        const response = await prisma.categories.findMany();
        if (response) {
            return JSON.parse(JSON.stringify({
                success: true,
                data: response,
            }));
        }
        return JSON.parse(JSON.stringify({ error: 'Failed to fetch user', success: false }));

    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return JSON.parse(JSON.stringify({ error: 'Failed to fetch user', success: false }));
    }

}

export async function getUserList() {
    try {
        const response = await prisma.user.findMany();
        if (response) {
            return JSON.parse(JSON.stringify({
                success: true,
                data: response,
            }));
        }
        return JSON.parse(JSON.stringify({ error: 'Failed to fetch user', success: false }));

    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return JSON.parse(JSON.stringify({ error: 'Failed to fetch user', success: false }));
    }

}

export async function updateTodo(formData: FormData) {
    try {
        const id = Number(formData.get("id"));
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const dueDateValue = formData.get("dueDate")?.toString();
        let dueDate: Date | null = null;
        if (dueDateValue) {
            const [day, month, year] = dueDateValue.split("/").map(Number);
            dueDate = new Date(year, month - 1, day);
        }
        const status = formData.get("status") != null ? 1 : 0;

        const assignedToID = formData.get("assignedToID") ? Number(formData.get("assignedToID")) : null;
        const categoriesID = formData.get("categoriesID") ? Number(formData.get("categoriesID")) : null;
        const response = await prisma.todoItem.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                description: description,
                status: status,
                dueDate: dueDate,
                assignedToID: assignedToID,
                categoriesID: categoriesID,
            },
        });
        return JSON.parse(JSON.stringify({
            success: true,
        }));

    } catch (error) {
         return JSON.parse(JSON.stringify({
            error: 'Failed to update todo',
            success: false,
        }));
    }

}

export async function getUser(id: number) {
    try {
        const response = await prisma.todoItem.findFirstOrThrow({
            where: {
                id: id,
            },
        });

        return JSON.parse(JSON.stringify({
            success: true,
            data: response,
        }));

    } catch (error) {
        console.error('Failed to get todo :', error);
        return JSON.parse(JSON.stringify({ error: 'Failed to get todo', success: false }));
    }
}

export async function deleteTodoItem(id: number) {
    try {
        const response = await prisma.todoItem.delete({
            where: {
                id: id,
            },
        });

        return JSON.parse(JSON.stringify({
            success: true,
            data: response,
        }));

    } catch (error) {
        console.error('Failed to delete todo :', error);
        return JSON.parse(JSON.stringify({ error: 'Failed to delete todo', success: false }));
    }
}
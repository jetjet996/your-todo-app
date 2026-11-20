"use server"
import { prisma } from "@/lib/prisma";

export interface TodoFilter {
    page?: number;
    limit?: number;
    search?: string;
    status?: 1|0;
    categoryId?: number;
    assignedToID?: number;
    duedate?: string;
    sortBy?: "status" | "createdAt";
    sortOrder?: "asc" | "desc";
}
export async function getTodolist(filter: TodoFilter) {
    const {
        page = 1,
        limit = 10,
        search,
        status,
        categoryId,
        assignedToID,
        duedate,
        sortBy,
        sortOrder,
    } = filter;

    const skip = (page - 1) * limit;

    const where: any = {};
    if (search && search.trim() !== "") {
        where.description = {
            contains: search.trim(),
        };
    }
    if (status) {
        where.status = {
            equals: status,
        };
    }
    if (categoryId && categoryId != 0) {
        where.categoryId = {
            equals: categoryId,
        }
    }
    if (assignedToID && assignedToID != 0) {
        where.assignedToID = {
            equals: assignedToID,
        }
    }
    const orderBy = sortBy != null
        ? { [sortBy]: sortOrder }
        : { createdAt: "desc" as const };
    console.log(orderBy);
    try {
        const [response, total] = await Promise.all([prisma.todoItem.findMany({
            where,
            include: {
                categories: true,
                assignedTo: true,
            },
            orderBy: orderBy,
            skip,
            take: limit,
        }),
        prisma.todoItem.count({
            where,
        }),
        ]);
        const totalPages = Math.ceil(total / limit);

        if (response) {
            console.log(response);
            return JSON.parse(JSON.stringify({
                success: true,
                data: response,
                totalPages: totalPages,
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


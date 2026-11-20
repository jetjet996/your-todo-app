import { useTodos } from "@/hooks/useTodos";

interface useTodostype {
    todoData: ReturnType<typeof useTodos>;
}

export function useExport() {

    function export_csv(todos: any[]) {
        const headers = [

            "Title",
            "Description",
            "Status",
            "Categories",
            "Assigned To",
            "Due Date",
            "Created At",
        ];

        const rows = todos.map((todo) => [

            todo.title,
            todo.description ?? "",
            todo.status === 1 ? "Completed" : "Pending",
            todo.categories?.name ?? "",
            todo.assignedTo?.name ?? "",
            todo.dueDate
                ? new Date(todo.dueDate).toLocaleDateString()
                : "",
            new Date(todo.createdAt).toLocaleDateString(),
        ]);

        const csv = [headers, ...rows]
            .map((row) =>
                row
                    .map((value) =>
                        `"${String(value ?? "").replace(/"/g, '""')}"`
                    )
                    .join(",")
            )
            .join("\n");

        const blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "todos.csv";
        link.click();

        URL.revokeObjectURL(url);
    }

    return {
        export_csv,
    };
}
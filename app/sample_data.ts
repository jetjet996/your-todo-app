export type TodoItem = {
  id: number;
  title: string;
  description: string;
  assignee: string;
  createdBy: string;
  createdAt: string;
  dueDate: string;
  category: string;
  completed: boolean;
}

export let  TodoItemList:TodoItem[] = [
  {
    id: 1,
    title: "Design Login Page",
    description: "Create the login page UI with email and password fields.",
    assignee: "John",
    createdBy: "Admin",
    createdAt: "2026-11-10",
    dueDate: "2026-11-18",
    category: "Development",
    completed: false,
  },
  {
    id: 2,
    title: "Fix Navigation Bug",
    description: "Fix the issue where the sidebar does not close on mobile.",
    assignee: "Sarah",
    createdBy: "John",
    createdAt: "2026-11-11",
    dueDate: "2026-11-17",
    category: "Bug Fix",
    completed: false,
  },
  {
    id: 3,
    title: "Prepare Project Documentation",
    description: "Document the project setup, API endpoints, and system architecture.",
    assignee: "Michael",
    createdBy: "Admin",
    createdAt: "2026-11-12",
    dueDate: "2026-11-22",
    category: "Documentation",
    completed: true,
  },
  {
    id: 4,
    title: "Review Database Structure",
    description: "Review database relationships and improve query performance.",
    assignee: "David",
    createdBy: "Sarah",
    createdAt: "2026-11-12",
    dueDate: "2026-11-20",
    category: "Database",
    completed: false,
  },
  {
    id: 5,
    title: "Create Dashboard UI",
    description: "Build dashboard cards showing task statistics and recent activities.",
    assignee: "Emily",
    createdBy: "Admin",
    createdAt: "2026-11-13",
    dueDate: "2026-11-25",
    category: "Design",
    completed: false,
  },
  {
    id: 6,
    title: "Test User Registration",
    description: "Test registration validation, duplicate emails, and error handling.",
    assignee: "John",
    createdBy: "Michael",
    createdAt: "2026-11-14",
    dueDate: "2026-11-19",
    category: "Testing",
    completed: true,
  },
  {
    id: 7,
    title: "Deploy Application",
    description: "Deploy the application to the staging environment and verify functionality.",
    assignee: "Sarah",
    createdBy: "Admin",
    createdAt: "2026-11-15",
    dueDate: "2026-11-28",
    category: "Deployment",
    completed: false,
  },
];

export async function GetTodoItemList(): Promise<TodoItem[]> {
  return TodoItemList;
}
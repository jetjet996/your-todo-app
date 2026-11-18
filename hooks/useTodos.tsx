
"use client";

import { useState, useEffect } from "react";
import * as Actions from "@/app/server/actions";
export interface Todo {
  id: number;
  title: string;
  description: string | null;
  status: number; // 0 for pending, 1 for completed
  dueDate: string | Date | null;
  categories: Category | null;
  assignedTo: AssignedUser | null;
  createdBy?: AssignedUser | null; // Optional if you add it later
}
export interface Category {
  name: string;
}
export interface AssignedUser {
  name: string;
}


export function useTodos() {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [AddModal, setAddModal] = useState(false);
  const [EditModal, setEditModal] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [user, setUser] = useState<any[]>([]);
  const [selectedUserData, setSelectedUserData] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  async function getCategories() {

    try {
      // const response = await fetch("/api/categories");
      const response = await Actions.getCategoriesList();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);

    } finally {

    }
  }
  async function getUser() {
    try {
      //const response = await fetch("/api/categories");
      const response = await Actions.getUserList();
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);

    } finally {

    }
  }
  async function get1User(id: number) {
    try {
      //const response = await fetch("/api/categories");
      const response = await Actions.getUser(id);
      setSelectedUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);

    } finally {

    }
  }
  // Fetch todos
  async function fetchTodosApi() {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      const parsedTodos = data.data.map((todo: any) => ({
        ...todo,
        dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      }));
      setTodos(data.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTodos() {
    try {
      const response = await Actions.getTodolist();
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("re");
    fetchTodos();
  }, []);

  // Add todo
  async function addTodoApi(value: string) {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });

    if (!response.ok) throw new Error("Failed to add todo");

    await fetchTodos();
  }

  async function addTodo(formData: FormData) {
    try {
      console.log("Form Data:", Object.fromEntries(formData.entries()));
      const error = validateForm(formData)
      if (Object.keys(error).length === 0) {
        setErrors(error);

      } else {
        setErrors({});
        const response = await Actions.submitTodoForm(formData);
        if (response.success) {
          alert("Todo added successfully!");
        } else {
          console.log(response)
          alert("Failed to add Todo!");
        }
      }

      await fetchTodos();
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  }

  function validateForm(data: any) {

    const errors: Record<string, string> = {};

    if (!data.title || data.title.trim() === "") {
      errors.title = "Title is required";
    }

    if (!data.description || data.description.trim() === "") {
      errors.description = "Description is required";
    }

    if (!data.dueDate) {
      errors.dueDate = "Due date is required";
    }

    if (data.categoriesID < 1) {
      errors.categoriesID = "category is required";
    }
    return errors;
  }

  //Delete todo
  async function deleteTodo(id: number) {
    const confirmed = window.confirm("Are you sure you want to delete this Todo?");

    if (!confirmed) return;
    const response = await Actions.deleteTodoItem(id);

    if (response.success) {
      alert("Todo deleted successfully!");
    } else {
      alert("Failed to delete Todo!");
    }

    await fetchTodos();
  }

  // Toggle completion
  async function updateTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const error = validateForm(formData);
    if (Object.keys(error).length === 0) {

    } else {
      //const response = await Actions.updateTodo(formData);
    }

    //if (!response.ok) throw new Error("Failed to update todo");

    //await fetchTodos();
  }

  async function showAddModal() {
    await Promise.all([
      getCategories(),
      getUser(),
    ]);
    setAddModal(true);

  }

  async function showEditModal(id: number) {
    await Promise.all([
      getCategories(),
      getUser(),
      get1User(id),

    ]);
    setEditModal(true);
  }

  return {
    todos,
    loading,
    user,
    AddModal,
    EditModal,
    categories,
    selectedUserData,
    errors,
    addTodo,
    updateTodo,
    fetchTodos,
    setAddModal,
    setEditModal,
    getCategories,
    deleteTodo,
    showAddModal,
    showEditModal,
  };
}

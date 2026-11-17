
"use client";

import { useState, useEffect } from "react";

export interface Todo {
  id: number;
  title: string;
  description: string | null;
  status: string;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos
  async function fetchTodos() {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  async function addTodo(value: string) {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });

    if (!response.ok) throw new Error("Failed to add todo");

    await fetchTodos();
  }

  // Delete todo
 /* async function deleteTodo(id: number) {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete todo");

    await fetchTodos();
  }*/

  // Toggle completion
  async function updateTodo(id: number, value: boolean) {
    const response = await fetch(`/api/updatetodos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });

    if (!response.ok) throw new Error("Failed to update todo");

    await fetchTodos();
  }

  return {
    todos,
    loading,
    addTodo,
    //deleteTodo,
    updateTodo,
    fetchTodos,
  };
}

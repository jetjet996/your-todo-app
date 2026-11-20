
"use client";

import { useState, useEffect } from "react";
import * as Actions from "@/app/server/actions";
import { usePagination } from "@/hooks/usePagination";
import { useFilter } from "@/hooks/useFilter";
import { useExport } from "@/hooks/useExport";

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
  const [importModal, setImportModal] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [user, setUser] = useState<any[]>([]);
  const [selectedUserData, setSelectedUserData] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  type SortColumn = "status" | "dueDate" | null;
  const [sortBy, setSortBy] = useState<SortColumn>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("desc");
  //pagination

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pagination = usePagination(10);
  const filter = useFilter();
  const exportCSV = useExport();
  const [refresh, setRefresh] = useState(0);
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
  /* async function fetchTodosApi() {
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
   }*/

  async function fetchTodos() {
  
    const filter_data: any = {};
    filter_data.page = pagination.page;
    filter_data.limit = pagination.limit;
    filter_data.sortBy = sortBy;
    filter_data.sortOrder = sortOrder;
    filter_data.assignedToID = filter.selectedUser;
    filter_data.categoriesID = filter.selectedCategory;
    filter_data.description = filter.searchInput;
    filter_data.status = filter.selectedStatus;
 
    try {
      const response = await Actions.getTodolist(filter_data);
      setTotalPages(response.totalPages);
      setTodos(response.data);

    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
    getCategories();
    fetchTodos();
  }, [pagination.page, pagination.limit, sortBy, sortOrder, refresh]);

  // Add todo
  /* async function addTodoApi(value: string) {
     const response = await fetch("/api/todos", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ value }),
     });
 
     if (!response.ok) throw new Error("Failed to add todo");
 
     await fetchTodos();
   }*/

  async function addTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const check_error = validateForm(Object.fromEntries(formData.entries()));
      if (Object.keys(check_error).length === 0) {
        const response = await Actions.submitTodoForm(formData);
        if (response.success) {
          form.reset();
          alert("Todo added successfully!");
          return response;
        } else {

          alert("Failed to add Todo!");
          return response;
        }
      }
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      await fetchTodos();
      setLoading(false);
    }
    return null;
  }

  function validateForm(data: any) {
    const errors: Record<string, string> = {};
    if (!data.title || data.title.trim() == "") {
      errors.title = "Title is required";
    }

    if (!data.description || data.description.trim() == "") {
      errors.description = "Description is required";
    }

    if (!data.dueDate) {
      errors.dueDate = "Due date is required";
    }

    if (!isValidDate(data.dueDate)) {
      errors.dueDate = "Due date is invalid";
    }

    if (data.categoriesID < 1) {
      errors.categoriesID = "category is required";
    }

    setErrors(errors);
    return (errors);
  }

  //Delete todo
  async function deleteTodo(id: number) {
    const confirmed = window.confirm("Are you sure you want to delete this Todo?");

    if (!confirmed) return;
    const response = await Actions.deleteTodoItem(id);


    if (response.success) {
      alert("Todo deleted successfully!");
      if (EditModal) {
        setEditModal(false);
      }
    } else {
      alert("Failed to delete Todo!");
    }
    await fetchTodos();

  }

  // Toggle completion
  async function updateTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const check_error = validateForm(Object.fromEntries(formData.entries()));
    if (Object.keys(check_error).length == 0) {
      const response = await Actions.updateTodo(formData);
      if (response.success) {
        alert("Todo deleted successfully!");
      } else {
        alert("Failed to delete Todo!");
      }
    }

    //if (!response.ok) throw new Error("Failed to update todo");
    fetchTodos();
  }

  async function showAddModal() {
    await Promise.all([
      getCategories(),
      getUser(),
    ]);
    setAddModal(true);

  }

  async function showImportModal() {
    setImportModal(true);

  }

  async function showEditModal(id: number) {
    await Promise.all([
      getCategories(),
      getUser(),
      get1User(id),

    ]);
    setEditModal(true);
  }

  function isValidDate(dateString: string): boolean {
    const parts = dateString.split("/");

    if (parts.length !== 3) return false;
    const [day, month, year] = parts.map(Number);
    if (!day || !month || !year) return false;
    const date = new Date(year, month - 1, day);

    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    );
  }

  function handleSort(column: Exclude<SortColumn, null>) {
    if (sortBy !== column) {
      setSortBy(column);
      setSortOrder("desc");
    }
    else if (sortOrder === "desc") {
      setSortOrder("asc");
    }
    else {
      setSortBy(null);
      setSortOrder("desc");
    }
    pagination.setPage(1);
  }

  function resetFilter() {

    filter.reset(),
      pagination.setPage(1),
      setRefresh(prev => prev + 1);

  };
  async function ExportToCSV() {
    const filter_data: any = {};
    filter_data.sortBy = sortBy;
    filter_data.sortOrder = sortOrder;
    filter_data.assignedToID = filter.selectedUser;
    filter_data.categoriesID = filter.selectedCategory;
    filter_data.description = filter.searchInput;
    filter_data.status = filter.selectedStatus;
    const response = await Actions.getTodolist(filter_data);
    if(response.success){
      exportCSV.export_csv(response.data);
    }
    else{

    }
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
    importModal,
    addTodo,
    updateTodo,
    fetchTodos,
    setAddModal,
    setEditModal,
    getCategories,
    deleteTodo,
    showAddModal,
    showEditModal,
    //pagination
    total,
    totalPages,
    pagination,
    handleSort,
    sortBy,
    sortOrder,
    filter,
    resetFilter,
    showImportModal,
    setImportModal,
    ExportToCSV,
    setRefresh,
  };
}

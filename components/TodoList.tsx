'use client'
import { useTodos } from "@/hooks/useTodos";
//import { useState } from 'react';
//import TodoItem from '@/components/TodoItem';
import AddTodoItem from '@/components/AddTodoItem';
import EditTodoItem from '@/components/EditTodoItem';
import { SquarePen, Trash } from 'lucide-react';
export default function TodoList() {
  const todoData = useTodos()
  const { todos, showAddModal, AddModal, deleteTodo, EditModal,showEditModal } = todoData
  return (
    <div className="mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-6">
          Todo Management
        </h1>
        <button
          onClick={showAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add New Todo
        </button>
      </div>

      <table className="w-full text-left bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">#</th>
            <th className="p-4">Status</th>
            <th className="p-4">Task</th>
            <th className="p-4">Due Date</th>
            <th className="p-4">Description</th>
            <th className="p-4">Category</th>
            <th className="p-4">Assigneeto</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            todos.map((todo, index) => {
              const dueDate = todo.dueDate != null ? todo.dueDate : "";
              const isOverdue = new Date(todo.dueDate) < new Date() ? true : false;
              return (
                <tr key={index} className="border-t">
                  <td className="p-4">{todo.id}</td>
                  <td className="p-4 ">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold 
                    ${todo.status
                        ? "bg-green-100 text-green-700"
                        : (isOverdue
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700")
                      }`}
                    >
                      {todo.status ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td className="p-4">{todo.title}</td>
                  <td className="p-4">
                    <span className={(isOverdue && !todo.status) ? 'text-red-700' : ''}>
                      {todo.dueDate != null ? new Date(todo.dueDate).toLocaleDateString("en-GB") : ""}
                    </span>
                  </td>
                  <td className="p-4">{todo.description}</td>
                  <td className="p-4">{todo.categories?.name}</td>
                  <td className="p-4">{todo.assignedTo?.name}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md m-1" onClick={()=>showEditModal(todo.id)}> 
                        <SquarePen size={18} />
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md m-1" onClick={()=>deleteTodo(todo.id)}>
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            }
            )}
        </tbody>
      </table>
      {AddModal && <AddTodoItem
        todoData={todoData}
      />
      }
      {EditModal && <EditTodoItem
        todoData={todoData}
      />
      }
    </div>

  );
}
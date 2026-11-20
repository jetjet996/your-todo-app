'use client'
import { useTodos } from "@/hooks/useTodos";
//import { useState } from 'react';
//import TodoItem from '@/components/TodoItem';
import AddTodoItem from '@/components/AddTodoItem';
import Filter from '@/components/filter';
import EditTodoItem from '@/components/EditTodoItem';
import ImportTodo from '@/components/ImportTodo';
import { Import, SquarePen, Trash } from 'lucide-react';
export default function TodoList() {
  const td = useTodos()

  return (
    <div className="mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-6">
          Todo Management
        </h1>
        <div className="gap-3">
          <button
            onClick={td.ExportToCSV}
            className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-4"
          >
            Export Todo
          </button>
          <button
            onClick={td.showImportModal}
            className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-4"
          >
            import Todo
          </button>
          <button
            onClick={td.showAddModal}
            className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 "
          >
            + Add New Todo
          </button>
        </div>
      </div>
      <Filter
        todoData={td}
      />
      <table className="w-full text-left bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">#</th>
            <th className="p-4">Status</th>
            <th className="p-4">Task</th>
            <th className="p-4 cursor-pointer" onClick={() => td.handleSort("dueDate")}>Due Date {td.sortBy !== "dueDate" ? " ↕" : td.sortOrder === "asc" ? " ↓" : " ↑"}</th>
            <th className="p-4">Description</th>
            <th className="p-4">Category</th>
            <th className="p-4">Assigneeto</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            td.todos.map((todo, index) => {
              const dueDate = todo.dueDate != null ? todo.dueDate : "";
              const isOverdue = new Date(todo.dueDate) < new Date() ? true : false;
              return (
                <tr key={index} className="border-t">
                  <td className="p-4">{index + 1}</td>
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
                      <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md m-1" onClick={() => td.showEditModal(todo.id)}>
                        <SquarePen size={18} />
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md m-1" onClick={() => td.deleteTodo(todo.id)}>
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

      <div className="flex items-center justify-between mt-4">

        <div className="flex gap-2">
          <span className="flex justify-center items-center"> showing page by</span>
          <select
            className="rounded-lg border p-2 text-gray-800"
            value={td.pagination.limit}
            onChange={(e) => td.pagination.changeLimit(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

        </div>

        <div className="flex gap-2">

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-600"
            onClick={td.pagination.previousPage}
            disabled={td.pagination.page === 1}
          >
            Previous
          </button>

          <span className="flex justify-center items-center">
            Page {td.pagination.page} of {td.totalPages}
          </span>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-600"
            onClick={td.pagination.nextPage}
            disabled={td.pagination.page >= td.totalPages}
          >
            Next
          </button>

        </div>



      </div>
      {td.AddModal && <AddTodoItem
        todoData={td}
      />
      }
      {td.EditModal && <EditTodoItem
        todoData={td}
      />
      }
      {td.importModal && <ImportTodo
        todoData={td}
      />
      }

    </div>

  );
}
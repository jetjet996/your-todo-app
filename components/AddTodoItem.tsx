'use client'
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTodos } from "@/hooks/useTodos";

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: any[];
}

interface useTodostype {
  todoData: ReturnType<typeof useTodos>;
}

export default function AddTodoItem(
  /*{isOpen,
  onClose,
  categories }: AddTodoModalProps*/
  { todoData }: useTodostype
) {
  const { AddModal, setAddModal, categories, addTodo, user, errors } = todoData;
  if (!AddModal) return null;
  const [dueDate, setDueDate] = useState<Date | null>(null);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            Add New Todo
          </h2>

          <button
            onClick={() => setAddModal(false)}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <form onSubmit={async (event) => {
          const result = await addTodo(event);
          if (result) {
            if(result.success)
              setDueDate(null);
          }
        }} className="space-y-4">

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter todo title"
              className="w-full rounded-lg border p-2 text-gray-800"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              placeholder="Enter description"
              rows={3}
              name="description"
              className="w-full rounded-lg border p-2 text-gray-800"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Due Date *
            </label>
            <DatePicker
              selected={dueDate}
              onChange={(date: Date | null) => setDueDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              wrapperClassName="w-full"
              className="w-full rounded-lg border p-2 text-gray-800"
              name="dueDate"
              autoComplete="off"
            />
            {errors.dueDate && (
              <p className="text-sm text-red-500 mt-1">
                {errors.dueDate}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select className="w-full rounded-lg border p-2 text-gray-800" name="categoriesID">
              <option key={-1} value="0">-</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}

            </select >
            {errors.categoriesID && (
              <p className="text-sm text-red-500 mt-1">
                {errors.categoriesID}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              AssignedTo
            </label>
            <select className="w-full rounded-lg border p-2 text-gray-800" name="assignedToID">
              <option key={-1} value="0">-</option>
              {user.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}

            </select >
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="status"
              value="1"
            />
            <label className="block text-sm font-medium text-gray-700">
              Completed
            </label>

          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setAddModal(false)}
              className="rounded-lg border px-4 py-2 text-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Create Todo
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

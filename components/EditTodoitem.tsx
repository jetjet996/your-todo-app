'use client'
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTodos } from "@/hooks/useTodos";

interface useTodostype {
  todoData: ReturnType<typeof useTodos>;
}
export default function EditTodoItem(

  { todoData }: useTodostype
) {
  const { EditModal, setEditModal, categories, addTodo, user, selectedUserData, updateTodo, errors,deleteTodo } = todoData;

  if (!EditModal) return null;
  const [id_val, setid] = useState<number>(0);
  const [dueDate_val, setDueDate] = useState<Date | null>(null);
  const [title_val, setTitle] = useState<string>("");
  const [description_val, setDescription] = useState<string>("");
  const [status_val, setStatus] = useState<boolean>(false);
  const [category_val, setCategory] = useState<number>(0);
  const [assignedToID_val, setAssignedToID] = useState<number>(0);


  useEffect(() => {

    if (EditModal && selectedUserData) {
      setTitle(selectedUserData.title ?? "");
      setDescription(selectedUserData.description ?? "");
      setStatus(Boolean(selectedUserData.status));
      setCategory(Number(selectedUserData.categoriesID ?? 0));
      setAssignedToID(Number(selectedUserData.assignedToID ?? 0));
      setid(Number(selectedUserData.id ?? 0));

      setDueDate(
        selectedUserData.dueDate
          ? new Date(selectedUserData.dueDate)
          : null
      );
    }
  }, [selectedUserData]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            Edit Todo
          </h2>
          <button
            onClick={() => setEditModal(false)}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <form onSubmit={updateTodo} className="space-y-4">
          <input type="hidden" name="id" value={id_val} onChange={(e) => setid(Number(e.target.value))} />
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter todo title"
              className="w-full rounded-lg border p-2 text-gray-800"
              value={title_val}
              onChange={(e) => setTitle(e.target.value)}
            />
             {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              rows={3}
              name="description"
              className="w-full rounded-lg border p-2 text-gray-800"
              value={description_val}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <DatePicker
              selected={dueDate_val}
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
              Category
            </label>
            <select
              className="w-full rounded-lg border p-2 text-gray-800" name="categoriesID"
              value={category_val}
              onChange={(e) => setCategory(Number(e.target.value))}
            >
              <option key="0" value="0">-</option>
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
            <select className="w-full rounded-lg border p-2 text-gray-800" name="assignedToID"
              value={assignedToID_val}
              onChange={(e) => setAssignedToID(Number(e.target.value))}
            >
              <option key="0" value="0">-</option>
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
              checked={status_val}
              onChange={(e) => setStatus(e.target.checked)}
            />
            <label className="block text-sm font-medium text-gray-700">
              Completed
            </label>

          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => deleteTodo(id_val)}
              className="rounded-lg border px-4 py-2 text-red-700"
            >
              delete
            </button>

            <button
              type="button"
              onClick={() => setEditModal(false)}
              className="rounded-lg border px-4 py-2 text-gray-700"
            >
              Cancel
            </button>


            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Update Todo
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

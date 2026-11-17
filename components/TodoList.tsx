import { GetTodoItemList } from "../app/sample_data";

export default async function TodoList() {
  const todos = await GetTodoItemList();

  return (
    <div className="mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Todo Management
      </h1>

      <table className="w-full text-left bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">#</th>
            <th className="p-4">Task</th>
            <th className="p-4">Assignee</th>
            <th className="p-4">Created By</th>
            <th className="p-4">Due Date</th>
            <th className="p-4">Category</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id} className="border-t">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{todo.title}</td>
              <td className="p-4">{todo.assignee}</td>
              <td className="p-4">{todo.createdBy}</td>
              <td className="p-4">{todo.dueDate}</td>
              <td className="p-4">{todo.category}</td>
              <td className="p-4">
                {todo.completed ? "Completed" : "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import { useTodos } from "@/hooks/useTodos";
interface useTodostype {
  todoData: ReturnType<typeof useTodos>;
}


export default function filter(
  { todoData }: useTodostype
) {
  const td = todoData;

  return (
    <div className="mb-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Filter & Search
      </h3>

      <div className=" grid grid-cols-12 items-end gap-5">
        <div className=" col-span-4">
          {/* User Dropdown */}
          <div className=''>User</div>
          <select
            className="rounded-lg border p-2 w-full"
            value={td.filter.selectedUser}
            onChange={(e) => td.filter.setSelectedUser(Number(e.target.value))}
          >
            <option value={0}>All Users</option>

            {td.user.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        {/* Category Dropdown */}
        <div className=" col-span-4">
          <div className=''>Category</div>
          <select
            className="rounded-lg border p-2 w-full"
            value={td.filter.selectedCategory}
            onChange={(e) => td.filter.setSelectedCategory(Number(e.target.value))}
          >
            <option value={0}>All Categories</option>

            {td.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* status  */}
        <div className=" col-span-4">
          <div className=''>Status</div>
          <select
            className="rounded-lg border p-2 w-full"
            value={td.filter.selectedStatus}
            onChange={(e) => td.filter.setSelectedStatus(Number(e.target.value))}
          >
            <option value={-1}>All Categories</option>
            <option value={0}>Pending</option>
            <option value={1}>Complete</option>

          </select>
        </div>
        {/* Search Bar */}
        <div className=" col-span-10">
          <div className=''>Description</div>
          <input
            type="text"
            placeholder="Search todos..."
            value={td.filter.searchInput}
            onChange={(e) => td.filter.setSearchInput(e.target.value)}
            className="rounded-lg border p-2 w-full"
          />
        </div>
        {/* Search Button */}
        <div className=" col-span-1 items-end">
          <button
            type="button"
            onClick={td.fetchTodos}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 w-full"
          >
            Search
          </button>
        </div>

        <div className=" col-span-1">
          <button
            type="button"
            onClick={td.resetFilter}
            className="rounded-lg border px-5 py-2 text-gray-700 hover:bg-gray-100 w-full"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}



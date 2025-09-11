import type { ChangeEvent } from "react"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

function FilterByCategory() {
  const {dispatch} = useBudget()

  const handelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: 'add-filter-category', payload: {id: e.target.value}})
  }

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category">Filtrar Gastos</label>
          <select
            id="category"
            className="bg-gray-200 p-3 flex-1 rounded-md"
            onChange={handelChange}
          >
            <option value="">-- Seleccionar Categoria --</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}

export default FilterByCategory
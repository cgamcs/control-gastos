import { categories } from "../data/categories"

function ExpenseForm() {
  return (
    <form className="space-y-3">
      <legend
        className="uppercase text-center text-2xl font-black p-2 border-b-2 border-b-gray-400 "
      >
        Nuevo Gasto
      </legend>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="expenseName"
          className="text-xl"
        >
          Nombre:
        </label>

        <input
          id="expenseName"
          type="text"
          name="expenseName"
          className="bg-gray-100 p-2 rounded-md"
          placeholder="Agrega el nombre del gasto. Ej. Netflix"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="amount"
          className="text-xl"
        >
          Cantidad:
        </label>

        <input
          id="amount"
          type="number"
          name="amount"
          className="bg-gray-100 p-2 rounded-md"
          placeholder="Agrega la cantidad del gasto. Ej. 300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="category"
          className="text-xl"
        >
          Categoria:
        </label>

        <select
          id="category"
          name="category"
          className="bg-gray-100 p-2 rounded-md"
        >
          <option value="">-- Seleccione --</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer text-white font-bold rounded-lg w-full p-2 uppercase"
        value="Registrar Gasto"
      />
    </form>
  )
}

export default ExpenseForm
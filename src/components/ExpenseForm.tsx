import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { categories } from "../data/categories"
import type { DraftExpense, Value } from "../types"
import ErrorMessage from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"

function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: '',
    amount: 0,
    category: '',
    date: new Date()
  })
  const [error, setError] = useState('')
  const [previousAmount, setPreviousAmount] = useState(0)
  const {state, dispatch, remainingBudget} = useBudget()

  useEffect(() => {
    if(state.editingId) {
      const expenseEditing = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
      setExpense(expenseEditing)
      setPreviousAmount(expenseEditing.amount)
    }
  }, [state.editingId])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target
    const isAmountField = ['amount'].includes(name)

    setExpense({
      ...expense,
      [name] : isAmountField ? +value : value 
    })
  }

  const handleChangeDate = (value : Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validar
    if(Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios')

      setTimeout(() => {
        setError('')
      }, 3000);
      return
    }
    
    // Validar que no pase del limite
    if((expense.amount - previousAmount) > remainingBudget) {
      setError('Presupuesto revasado')

      setTimeout(() => {
        setError('')
      }, 3000);
      return
    }

    // Agregar o actualizar gasto
    if(state.editingId) {
      dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
    } else {
      dispatch({type: 'add-expense', payload: {expense}})
    }

    // Reiniciar el state
    setExpense({
      expenseName: '',
      amount: 0,
      category: '',
      date: new Date()
    })
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <legend
        className="uppercase text-center text-2xl font-black p-2 border-b-2 border-b-gray-400 "
      >
        {state.editingId ? 'Editar Gasto ' : 'Nuevo Gasto'}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage> }

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
          value={expense.expenseName}
          onChange={handleChange}
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
          value={expense.amount}
          onChange={handleChange}
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
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="amount"
          className="text-xl"
        >
          Fecha:
        </label>

        <DatePicker
          className="bg-gray-100 p-2 border-0 rounded-md"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer text-white font-bold rounded-lg w-full p-2 uppercase"
        value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
      />
    </form>
  )
}

export default ExpenseForm
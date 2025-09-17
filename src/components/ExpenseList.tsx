import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

function ExpenseList() {
  const {state} = useBudget()
  const filterExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
  const isEmpty = useMemo(() => filterExpenses.length === 0, [filterExpenses])

  return (
    <div className="mt-10 bg-zinc-900 p-10 shadow-lg rounded-lg">
      {isEmpty ? 
        <p className="text-2xl text-gray-200 text-center font-bold">No hay gastos</p> 
        :
        <>
          <p className="text-2xl text-gray-200 font-bold mb-5">Listado de Gastos</p>

          {filterExpenses.map(expense => (
            <ExpenseDetail
              key={expense.id}
              expense={expense}
            />
          ))}
        </>
      }
    </div>
  )
}

export default ExpenseList
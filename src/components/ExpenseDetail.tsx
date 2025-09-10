import { useMemo } from "react"
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"

type ExpenseDetailProps = {
  expense: Expense
}

function ExpenseDetail({expense} : ExpenseDetailProps) {
  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

  return (
    <div className="bg-white rounded-lg shadow-lg p-10 w-full flex gap-5 items-center mb-5 last-of-type:mb-0">
      <div>
        <img src={`icono_${categoryInfo.icon}.svg`} alt="Icono gastos" className="h-20 w-20"/>
      </div>

      <div className="flex justify-between items-center w-full">
        <div>
          <p className="text-slate-500 text-sm font-bold uppercase">{categoryInfo.name}</p>
          <p>{expense.expenseName}</p>
          <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
        </div>

        <AmountDisplay amount={expense.amount}/>
      </div>
    </div>
  )
}

export default ExpenseDetail
import { useMemo } from "react"
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from "react-swipeable-list"
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import "react-swipeable-list/dist/styles.css"
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
  expense: Expense
}

function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

  const {dispatch} = useBudget()
  
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => dispatch({type: 'delte-expense', payload: {id: expense.id}})}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="p-5 w-full border-b border-[#18181b] cursor-grab select-none flex gap-5 items-center">
          <div>
            <img src={`icono_${categoryInfo.icon}.svg`} alt="Icono gastos" className="h-20 w-20" />
          </div>

          <div className="flex justify-between items-center w-full">
            <div>
              <p className="text-gray-100 text-sm font-bold uppercase">{categoryInfo.name}</p>
              <p className="text-gray-300">{expense.expenseName}</p>
              <p className="text-gray-300 text-sm">{formatDate(expense.date!.toString())}</p>
            </div>

            <AmountDisplay amount={expense.amount} />
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default ExpenseDetail
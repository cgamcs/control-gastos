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

type ExpenseDetailProps = {
  expense: Expense
}

function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])
  
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => console.info('swipe action triggered')}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => console.info('swipe action triggered')}
        destructive={true}
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
        <div className="bg-white rounded-lg shadow-lg p-10 w-full flex gap-5 items-center mb-5 last-of-type:mb-0">
          <div>
            <img src={`icono_${categoryInfo.icon}.svg`} alt="Icono gastos" className="h-20 w-20" />
          </div>

          <div className="flex justify-between items-center w-full">
            <div>
              <p className="text-slate-500 text-sm font-bold uppercase">{categoryInfo.name}</p>
              <p>{expense.expenseName}</p>
              <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
            </div>

            <AmountDisplay amount={expense.amount} />
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default ExpenseDetail
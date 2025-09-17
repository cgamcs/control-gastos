import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import AmountDisplay from "./AmountDisplay"
import { useBudget } from "../hooks/useBudget"
import "react-circular-progressbar/dist/styles.css"

function BudgetTracker() {
  const { state, dispatch, totalExpenses, remainingBudget } = useBudget()

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage === 100 ? '#DC2626' : '#605EFE',
            trailColor: '#383939',
            textColor: percentage === 100 ? '#DC2626' : '#605EFE',
            textSize: 8
          })}
          text={`${percentage}% Gastado`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-violet-500 w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer"
          onClick={() => dispatch({type: 'reset-budget'})}
        >
          Resetear App
        </button>

        <AmountDisplay
          label="Presupuesto"
          amount={state.budget}
        />

        <AmountDisplay
          label="Ahorro"
          amount={remainingBudget}
        />

        <AmountDisplay
          label="Gastado"
          amount={totalExpenses}
        />
      </div>
    </div>
  )
}

export default BudgetTracker
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { useBudget } from "../hooks/useBudget"

function BudgetForm() {
  const [budget, setBudget] = useState(0)
  const {dispatch} = useBudget()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value)
  }

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <=  0
  }, [budget])

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
     
    dispatch({type: 'add-budget', payload: {budget}})
  }

  return (
    <form
      className="space-y-5"
      onSubmit={handleSumbit}
    >
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-4xl text-indigo-600 font-bold text-center "></label>
        <input
          id="budget"
          type="number"
          className="w-full bg-[#383939] text-white rounded-md p-2"
          placeholder="Define tu presupuesto"
          name="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 rounded-md w-full cursor-pointer p-2 font-bold text-white uppercase disabled:opacity-70 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed"
        value="Definir presupuesto"
        disabled={isValid}
      />
    </form>
  )
}

export default BudgetForm
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
        <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center "></label>
        <input
          id="budget"
          type="number"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="Define tu presupuesto"
          name="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 w-full cursor-pointer p-2 font-bold text-white uppercase disabled:opacity-70"
        value="Definir presupuesto"
        disabled={isValid}
      />
    </form>
  )
}

export default BudgetForm
import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
  label?: string
  amount: number
}
function AmountDisplay({label, amount} : AmountDisplayProps) {
  return (
    <p className="text-2xl text-indigo-500 font-bold  ">
      {label && (`${label}: `)}
      <span className="text-gray-300">{formatCurrency(amount)}</span>
    </p>
  )
}

export default AmountDisplay
import { Fragment } from 'react'
import { Plus } from 'lucide-react'
import { Dialog, Transition } from '@headlessui/react'
import { useBudget } from '../hooks/useBudget'
import ExpenseForm from './ExpenseForm'

export default function ExpenseModal() {
  const {state, dispatch} = useBudget()

  return (
    <>
      <div className="fixed right-5 bottom-5 flex items-center justify-center">
        <button
          type="button"
          onClick={() =>  dispatch({type: 'show-modal'})}
        >
          <Plus className='w-14 h-14 bg-indigo-600 text-white p-2 rounded-full cursor-pointer' />
        </button>
      </div>

      <Transition appear show={state.modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => dispatch({type: 'hidde-modal'})}>
          <Transition.Child
            as={Fragment} 
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-75"
            leave="ease-in duration-200"
            leaveFrom="opacity-75"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform rounded-2xl bg-zinc-900 p-6 text-white text-left align-middle shadow-xl transition-all">
    
                  <ExpenseForm/>
    
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
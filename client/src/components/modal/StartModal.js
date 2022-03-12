import { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'

const StartModal = ({
  show,
  start,
  loaded
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(show)
  }, [show])

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="p-3 w-72 border rounded-lg shadow-2xl bg-white flex flex-col items-center">
        <div className="flex h-36 items-center">
          <p>Logo</p>
        </div>
        { loaded ?
          <button onClick={start} className="w-full h-10 bg-black text-white p-2 rounded hover:bg-gray-200 hover:text-black transition duration-300">Start game</button>
          :
          <button className={`w-full h-10 bg-black text-white hover:bg-gray-600 transition duration-250 rounded p-2 flex justify-center items-center cursor-not-allowed`} disabled>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        }
      </div>
    </Transition>
  )
}

export default StartModal;

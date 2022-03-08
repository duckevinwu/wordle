import { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'

const StartModal = ({
  show,
  start
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
        <button onClick={start} className="w-full bg-black text-white p-2 rounded hover:bg-blue-400 hover:text-black transition duration-300">Start game</button>
      </div>
    </Transition>
  )
}

export default StartModal;

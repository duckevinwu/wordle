import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react'

const LoseModal = ({
  show
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
      <div className="p-3 w-64 h-96 border rounded shadow-lg bg-white">
        <p>Lose</p>
      </div>
    </Transition>
  )
}

export default LoseModal;

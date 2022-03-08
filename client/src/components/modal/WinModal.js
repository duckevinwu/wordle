import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react'

import WordStats from './WordStats';
import GenerateChallenge from './GenerateChallenge';

const WinModal = ({
  show,
  time
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
        <div className="w-full mb-10">
          <div className="w-full flex justify-end">
            <h1 className="mb-2 uppercase text-sm tracking-widest text-gray-500">Your score</h1>
          </div>
          <div className="w-full flex items-center">
            <div className="w-1/2 flex justify-center">
              <p className="text-6xl">&#127881;</p>
            </div>
            <div className="w-1/2 flex justify-end">
              <div className="flex">
                <div className="flex flex-col items-center mr-2">
                  <p className="text-2xl">4</p>
                  <p className="text-xs text-gray-500">guesses</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-2xl">2:45</p>
                  <p className="text-xs text-gray-500">time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WordStats className="w-full mb-10" />
        <GenerateChallenge className="mb-2" />
        <a href="/" className="w-full">
          <button className="w-full bg-black text-white p-2 rounded hover:bg-blue-400 hover:text-black transition duration-300">Play again</button>
        </a>
      </div>
    </Transition>
  )
}

export default WinModal;

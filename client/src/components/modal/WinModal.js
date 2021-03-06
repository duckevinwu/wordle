import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react'
import { formatTime } from '../../utils/utils.js';

import WordStats from './WordStats';
import GenerateChallenge from './GenerateChallenge';

const WinModal = ({
  show,
  time,
  answer,
  guesses
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setIsOpen(show)
  }, [show])

  useEffect(() => {
    if (isOpen) {
      const data = {
        word: answer,
        dateSolved: Date.now(),
        attempts: guesses.length,
        solved: true,
        startWord: guesses[0],
        solveTime: time
      };

      fetch('http://localhost:8080/api/v1/game/solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        setLoaded(true);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, [isOpen, answer, guesses, time])

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
      <div className="w-72 border rounded-lg shadow-2xl bg-white flex flex-col items-center relative">
        {loaded ?
          <></>
          :
          <div className="absolute w-full h-full border rounded-lg bg-white flex justify-center items-center">
            <svg className="animate-spin h-12 w-12 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        }
        <div className="w-full p-3">
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
                    <p className="text-2xl">{guesses.length}</p>
                    <p className="text-xs text-gray-500">guesses</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-2xl">{formatTime(time)}</p>
                    <p className="text-xs text-gray-500">time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <WordStats className="w-full mb-10" startLoad={loaded} answer={answer} />
          <GenerateChallenge className="mb-2" answer={answer} />
          <a href="/" className="w-full">
            <button className="w-full bg-black text-white p-2 rounded hover:bg-gray-200 hover:text-black transition duration-300">Play again</button>
          </a>
        </div>
      </div>
    </Transition>
  )
}

export default WinModal;

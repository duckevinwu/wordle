import { useState, useEffect } from 'react';

const WordStats = ({
  className
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000)
  }, [])

  return (
    <div className={`${className}`}>
      <h1 className="mb-2 uppercase text-sm tracking-widest text-gray-500">Word stats</h1>
      <div className="flex items-center">
        <div className="flex w-1/3 justify-center">
          <div className=" border border-2 shadow-lg w-16 h-16 flex justify-center items-center rounded-full">
            <p className="tracking-wide">hello</p>
          </div>
        </div>
        <div className="flex ml-auto">
          <div className="flex flex-col items-center mr-3">
            {loaded ? <p className="text-xl h-6">89%</p> : <div className="h-6 w-8 rounded pulse bg-gray-200"></div>}
            <p className="text-xs text-gray-500 mt-1">solve %</p>
          </div>
          <div className="flex flex-col items-center mr-3">
            {loaded ? <p className="text-xl h-6">3.6</p> : <div className="h-6 w-8 rounded pulse bg-gray-200"></div>}
            <p className="text-xs text-gray-500 mt-1">guesses</p>
          </div>
          <div className="flex flex-col items-center">
            {loaded ? <p className="text-xl h-6">3:12</p> : <div className="h-6 w-8 rounded pulse bg-gray-200"></div>}
            <p className="text-xs text-gray-500 mt-1">time</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordStats;

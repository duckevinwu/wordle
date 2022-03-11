import { useState, useEffect } from 'react';
import { formatTime } from '../../utils/utils.js';

const WordStats = ({
  className,
  startLoad,
  answer
}) => {
  const [loaded, setLoaded] = useState(false);
  const [stats, setStats] = useState({
    solvePercent: '-',
    averageGuesses: '-',
    averageTime: '-'
  });

  useEffect(() => {
    if (startLoad) {
      fetch(`http://localhost:8080/api/v1/game/stats?word=${answer}`)
        .then(response => response.json())
        .then(result => {
          setStats({
            solvePercent: `${result.percent}%`,
            averageGuesses: result.attempts,
            averageTime: result.time
          });
          setLoaded(true);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [startLoad, answer])

  return (
    <div className={`${className}`}>
      <h1 className="mb-2 uppercase text-sm tracking-widest text-gray-500">Word stats</h1>
      <div className="flex items-center">
        <div className="flex w-1/3 justify-center">
          <div className=" border border-2 shadow-lg w-16 h-16 flex justify-center items-center rounded-full">
            <p className="tracking-wide">{answer}</p>
          </div>
        </div>
        <div className="flex ml-auto">
          <div className="flex flex-col items-center mr-3">
            {loaded ? <p className="text-xl h-6">{stats.solvePercent}</p> : <div className="h-6 w-8 rounded pulse bg-gray-200"></div>}
            <p className="text-xs text-gray-500 mt-1">solve %</p>
          </div>
          <div className="flex flex-col items-center mr-3">
            {loaded ? <p className="text-xl h-6">{stats.averageGuesses}</p> : <div className="h-6 w-8 rounded pulse bg-gray-200"></div>}
            <p className="text-xs text-gray-500 mt-1">guesses</p>
          </div>
          <div className="flex flex-col items-center">
            {loaded ? <p className="text-xl h-6">{formatTime(stats.averageTime)}</p> : <div className="h-6 w-8 rounded pulse bg-gray-200"></div>}
            <p className="text-xs text-gray-500 mt-1">time</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordStats;

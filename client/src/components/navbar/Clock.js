import { useState, useEffect } from 'react';
import { formatTime } from '../../utils/utils.js';

const Clock = ({
  className,
  finished,
  active,
  setFinalTime
}) => {
  const [time, setTime] = useState(0);

  // handle timer functionality
  useEffect(() => {
    let interval = null;
    if (active && !finished) {
      interval = setInterval(() => {
        setTime(time => time + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // clear interval on dismount
    return () => {
      clearInterval(interval);
    }
  }, [finished, active])

  // fires when game is marked finished
  useEffect(() => {
    if (finished) {
      setFinalTime(time);
    }
  }, [finished, time, setFinalTime])

  return (
    <div className={`${className} flex`}>
      <i className="bi-stopwatch text-xl mr-1"></i>
      <p className="text-xl">{formatTime(time)}</p>
    </div>
  )
}

export default Clock;

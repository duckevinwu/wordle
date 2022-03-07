import { useState, useEffect } from 'react';

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

  const convertTime = (x) => {
    const totalSeconds = x / 1000;
    const mins = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${mins}:${('0' + seconds).slice(-2)}`;
  }

  return (
    <div className={`${className} flex`}>
      <i className="bi-stopwatch text-xl mr-1"></i>
      <p className="text-xl">{convertTime(time)}</p>
    </div>
  )
}

export default Clock;

import { useState, useEffect } from 'react';

import Key from './Key';

const Keyboard = ({
  handleChar,
  handleDelete,
  handleEnter,
  guesses,
  answer
}) => {
  // rows of keys
  const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const thirdRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

  const [charStatus, setCharStatus] = useState({});

  // set char status
  useEffect(() => {
    const status = {};
    guesses.forEach(word => {
      const set = new Set();
      for (let i = 0; i < word.length; i++) {
        set.add(answer.charAt(i));
      }

      for (let i = 0; i < word.length; i++) {
        const c = word.charAt(i);
        const c1 = answer.charAt(i);
        if (c === c1) {
          status[c] = 'match';
        } else if (set.has(c)) {
          if (status[c] !== 'match') status[c] = 'contains';
        } else {
          if (status[c] !== 'match' && status[c] !== 'contains') status[c] = 'no';
        }
      }
    })
    setCharStatus(status);
  }, [guesses, answer])

  useEffect(() => {
    const listener = (e) => {
      const key = e.key;
      if (key === 'Enter') {
        // handle enter
        handleEnter();
      } else if (key === 'Backspace') {
        // handle backspace
        handleDelete();
      } else {
        // key needs to be either lowercase or uppercase alphabet character
        if (key.length === 1 && ((key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z'))) {
          handleChar(key.toLowerCase());
        }
      }
    }
    window.addEventListener('keyup', listener);

    // clean up event listener on dismount
    return () => {
      window.removeEventListener('keyup', listener);
    }
  }, [handleChar, handleDelete, handleEnter])

  // handle button press
  const handleClick = (value) => {
    handleChar(value);
  }

  return (
    <div className="keyboard mt-4">
      <div className="flex justify-center mb-2 keyboard-row">
        {firstRow.map(c => {
          return <Key key={c} value={c} handleClick={handleClick} status={charStatus[c] || ''} />
        })}
      </div>
      <div className="flex justify-center mb-2 keyboard-row">
        {secondRow.map(c => {
          return <Key key={c} value={c} handleClick={handleClick} status={charStatus[c] || ''} />
        })}
      </div>
      <div className="flex justify-center mb-2 keyboard-row">
        <button className="h-12 w-1/6 border rounded mx-0.5" onClick={handleEnter}>Enter</button>
        {thirdRow.map(c => {
          return <Key key={c} value={c} handleClick={handleClick} status={charStatus[c] || ''}/>
        })}
        <button className="h-12 w-1/6 border rounded mx-0.5" onClick={handleDelete}><i className="bi-backspace text-2xl"></i></button>
      </div>
    </div>
  )
}

export default Keyboard;

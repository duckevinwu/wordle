import { useState, useEffect } from 'react';

import FilledRow from './FilledRow';
import CurrentRow from './CurrentRow';
import EmptyRow from './EmptyRow';

const Board = ({
  guesses,
  currGuess,
  answer
}) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const updatedRows = [];
    for (let i = 0; i < 6; i++) {
      if (i < guesses.length) {
        updatedRows.push(<FilledRow key={i} row={i} word={guesses[i]} answer={answer} />);
      } else if (i === guesses.length) {
        updatedRows.push(<CurrentRow key={i} row={i} currGuess={currGuess} />);
      } else {
        updatedRows.push(<EmptyRow key={i} row={i} />);
      }
    }
    setRows(updatedRows);
  }, [guesses, currGuess, answer])

  return (
    <>
      {rows}
    </>
  )
}

export default Board;

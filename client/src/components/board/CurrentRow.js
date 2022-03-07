import Box from './Box';

const CurrentRow = ({
  row,
  currGuess
}) => {
  const boxes = [];

  for (let i = 0; i < 5; i++) {
    const c = (i < currGuess.length) ? currGuess.charAt(i) : '';
    boxes.push(<Box key={`${row}${i}`} value={c} />)
  }

  return (
    <div className="flex">
      {boxes}
    </div>
  )
}

export default CurrentRow;

import Box from './Box';

const FilledRow = ({
  row,
  word,
  answer
}) => {
  const boxes = [];

  (() => {
    // create list of unmatched characters
    const letters = [];
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) !== answer.charAt(i)) {
        letters.push(answer.charAt(i));
      }
    }

    // assign status of each box
    for (let i = 0; i < word.length; i++) {
      const c = word.charAt(i);
      const c1 = answer.charAt(i);
      if (c === c1) {
        boxes.push(<Box key={`${row}${i}`} value={c} status="match" />);
      } else if (letters.includes(c)) {
        boxes.push(<Box key={`${row}${i}`} value={c} status="contains" />);
        const idx = letters.indexOf(c);
        letters.splice(idx, 1);
      } else {
        boxes.push(<Box key={`${row}${i}`} value={c} status="no" />);
      }
    }
  })();

  return (
    <div className="flex">
      {boxes}
    </div>
  )
}

export default FilledRow;

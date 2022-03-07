import Box from './Box';

const FilledRow = ({
  row,
  word,
  answer
}) => {
  const boxes = [];

  (() => {
    const set = new Set();
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) !== answer.charAt(i)) {
        set.add(answer.charAt(i));
      }
    }

    for (let i = 0; i < word.length; i++) {
      const c = word.charAt(i);
      const c1 = answer.charAt(i);
      if (c === c1) {
        boxes.push(<Box key={`${row}${i}`} value={c} status="match" />);
      } else if (set.has(c)) {
        boxes.push(<Box key={`${row}${i}`} value={c} status="contains" />);
        set.delete(c);
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

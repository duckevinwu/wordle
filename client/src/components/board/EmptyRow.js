import Box from './Box';

const EmptyRow = (
  row
) => {
  return (
    <div className="flex">
      {[...Array(5).keys()].map(i => {
        return <Box key={`${row}${i}`} value="" />
      })}
    </div>
  )
}

export default EmptyRow;

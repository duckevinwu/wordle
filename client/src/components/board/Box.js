const Box = ({
  value,
  status
}) => {
  const defaultStyles = "h-16 w-16 m-1 border rounded-lg flex justify-center items-center text-xl uppercase";

  if (status === 'match') {
    return <div className={`${defaultStyles} bg-black text-white`}>{value}</div>
  } else if (status === 'contains') {
    return <div className={`${defaultStyles} border-black`}>{value}</div>
  } else if (status === 'no') {
    return <div className={`${defaultStyles} bg-gray-100`}>{value}</div>
  } else {
    return <div className={defaultStyles}>{value}</div>
  }
}

export default Box;

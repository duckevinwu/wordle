const Box = ({
  value,
  status
}) => {
  const defaultStyles = "h-16 w-16 m-1 border rounded-lg flex justify-center items-center";

  if (status === 'match') {
    return <div className={`${defaultStyles} bg-green-100`}>{value}</div>
  } else if (status === 'contains') {
    return <div className={`${defaultStyles} bg-yellow-100`}>{value}</div>
  } else if (status === 'no') {
    return <div className={`${defaultStyles} bg-gray-100`}>{value}</div>
  } else {
    return <div className={defaultStyles}>{value}</div>
  }
}

export default Box;

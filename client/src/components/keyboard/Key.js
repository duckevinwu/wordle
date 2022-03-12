const Key = ({
  value,
  handleClick,
  status
}) => {
  const defaultStyles = 'h-12 w-1/12 mx-0.5 border rounded uppercase';
  let additionalStyle = '';

  if (status === 'match') {
    additionalStyle = 'bg-black text-white'
  } else if (status === 'contains') {
    additionalStyle = 'border-black'
  } else if (status === 'no') {
    additionalStyle = 'bg-gray-100';
  }

  const onClick = () => {
      handleClick(value);
  }

  return (
    <>
      <button
        value={value}
        className={`${defaultStyles} ${additionalStyle}`}
        onClick={onClick}>
        {value}
      </button>
    </>
  )
}

export default Key;

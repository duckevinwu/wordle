// convert milliseconds to mm:ss format
const formatTime = (x) => {
  if (typeof(x) !== 'number') return x;
  const totalSeconds = x / 1000;
  const mins = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${mins}:${('0' + seconds).slice(-2)}`;
}

// convert number to 1 decimal place
const formatToOneDecimal = (x) => {
  if (typeof(x) !== 'number') return x;
  return Math.round(x * 10) / 10;
}

module.exports = {
  formatTime: formatTime,
  formatToOneDecimal: formatToOneDecimal
}

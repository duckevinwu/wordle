// convert milliseconds to mm:ss format
const formatTime = (x) => {
  const totalSeconds = x / 1000;
  const mins = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${mins}:${('0' + seconds).slice(-2)}`;
}

module.exports = {
  formatTime: formatTime
}

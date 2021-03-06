const gameDataAccess = require('./game.data.js');
const Cache = require('../utils/cache/cache.js');

const cache = new Cache();

const loadWords = async () => {
  if (!cache.has('answerWords') || !cache.has('guessWords')) {
    const wordLists = await gameDataAccess.loadAllWords();
    cache.set('answerWords', wordLists.answerWords);
    cache.set('guessWords', wordLists.guessWords);
  }
}

const getRandomAnswerWord = async () => {
  await loadWords();
  const answerWords = cache.get('answerWords');
  return answerWords[Math.floor(Math.random() * answerWords.length)];
}

const checkValidGuess = async (word) => {
  await loadWords();
  return binarySearch(word, cache.get('answerWords'))
    || binarySearch(word, cache.get('guessWords'));
}

const binarySearch = (word, list) => {
  let lo = 0;
  let hi = list.length - 1;
  while (lo < hi) {
    const mid = Math.floor(lo + ((hi - lo) / 2));
    const midWord = list[mid];
    if (midWord === word) {
      return true;
    } else if (word < midWord) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  return list.length > 0 && list[lo] === word;
}

const insertSolution = (solution, callback) => {
  gameDataAccess.insertSolution(solution, (res) => {
    callback(res);
  });
}

const getStats = (word, callback) => {
  gameDataAccess.getStats(word, (res) => {
    if (res.status === 'error') {
      callback(res);
    } else {
      const result = res.rows[0];
      if (result.attempts === null) result.attempts = '-';
      if (result.time === null) result.time = '-';
      callback(result);
    }
  })
}

module.exports = {
  getRandomAnswerWord: getRandomAnswerWord,
  checkValidGuess: checkValidGuess,
  insertSolution: insertSolution,
  getStats: getStats
}

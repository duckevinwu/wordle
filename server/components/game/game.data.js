const fs = require('fs');

const answerWordsPath = './data/wordle-answers-alphabetical.txt';
const guessWordsPath = './data/wordle-allowed-guesses.txt';

const loadAllWords = async () => {
  const answerWords = await loadWordsTxt(answerWordsPath);
  const guessWords = await loadWordsTxt(guessWordsPath);
  return {
    answerWords: answerWords,
    guessWords: guessWords
  }
}

// read txt file of words and store in array
const loadWordsTxt = async (path) => {
  try {
    const words = await fs.promises.readFile(path, 'utf8');
    const wordList = words.split('\n');
    return wordList;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  loadAllWords: loadAllWords
}

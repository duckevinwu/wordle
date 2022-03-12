const fs = require('fs');
const db = require('../db/db.js');

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

// insert solution data into db
const insertSolution = (solution, callback) => {
  const {word, dateSolved, attempts, solved, startWord, solveTime} = solution;
  const insertQuery = `
    INSERT INTO Solution (Word, DateSolved, Attempts, Solved, StartWord, SolveTime)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [word, dateSolved, attempts, solved, startWord, solveTime];
  db.insert(insertQuery, params, (res) => {
    callback(res);
  });
}

// get stats for word from db
const getStats = (word, callback) => {
  const statsQuery = `
    WITH solvePercent AS (
      SELECT Word, SUM(CASE WHEN Solved = 1 THEN 1 ELSE 0 END) * 100 / COUNT(*) AS percent
      FROM (
        SELECT *
        FROM Solution
        WHERE Word = ?
      ) wordTemp
    ), averages AS (
      SELECT Word, AVG(Attempts) as attempts, AVG(SolveTime) AS time
      FROM Solution
      WHERE Word = ? AND Solved = 1
      GROUP BY Word
    )
    SELECT sp.Word as word, sp.percent, a.attempts, a.time
    FROM solvePercent sp LEFT JOIN averages a ON sp.Word = a.Word
  `;
  const params = [word, word]
  db.select(statsQuery, params, (res) => {
    callback(res);
  })
}

module.exports = {
  loadAllWords: loadAllWords,
  insertSolution: insertSolution,
  getStats: getStats
}

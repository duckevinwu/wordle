const express = require('express');
const gameService = require('./game.service.js');

const router = express.Router();

router.route('/')
  // GET /api/v1/game - get a new game
  .get(async (req, res) => {
    const word = await gameService.getRandomAnswerWord();
    res.status(200).send({answer: word});
  })

router.route('/solution')
  // POST /api/v1/game/solution - submit a solution
  .post((req, res) => {
    const solutionData = req.body;
    gameService.insertSolution(solutionData, (result) => {
      if (result.status === 'error') {
        res.status(500).send({});
      } else {
        res.status(200).send({});
      }
    });
  })

router.route('/valid')
  // POST /api/v1/game/valid - check if word is valid guess
  .get(async (req, res) => {
    const word = req.query.word;
    const isValid = await gameService.checkValidGuess(word);
    res.status(200).send({valid: isValid});
  })

router.route('/stats')
  // GET /api/v1/game/stats - get stats for word
  .get((req, res) => {
    const word = req.query.word;
    gameService.getStats(word, (result) => {
      if (result.status === 'error') {
        res.status(500).send({});
      } else {
        res.status(200).send(result);
      }
    })
  })

module.exports = router;

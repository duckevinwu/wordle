const express = require('express');
const gameService = require('./game.service.js');

const router = express.Router();

router.route('/')
  // GET /api/v1/game - get a new game
  .get(async (req, res) => {
    const word = await gameService.getRandomAnswerWord();
    res.send(word);
  })

  // POST /api/v1/game - submit a solution
  .post(async (req, res) => {
    
  })

router.route('/valid')
  // POST /api/v1/game/valid - check if word is valid guess
  .post(async (req, res) => {
    const word = req.body.guess;
    const isValid = await gameService.checkValidGuess(word);
    res.send(isValid);
  })

module.exports = router;

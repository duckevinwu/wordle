const express = require('express');
const challengeService = require('./challenge.service.js');

const router = express.Router();

router.route('/')
  // POST /api/v1/challenge - generate a challenge
  .post((req, res) => {
    const answer = req.body.answer;
    challengeService.generateChallenge(answer, (result) => {
      const {status, id} = result;
      if (status === 'error') res.status(500).send();
      else res.status(200).send({id: id});
    });
  })

router.route('/:id')
  // GET /api/v1/challenge/:id - visit a challenge
  .get(async (req, res) => {
    const challengeId = req.params.id;
    res.send(challengeId);
  })

module.exports = router;

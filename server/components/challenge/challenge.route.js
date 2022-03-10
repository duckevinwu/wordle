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

  // GET /api/v1/challenge - visit a challenge
  .get((req, res) => {
    const challengeId = req.query.id;
    challengeService.getChallenge(challengeId, (result) => {
      const status = result.status;
      if (status === 'error') res.status(500).send();
      else {
        const answer = result.rows[0]['Word'];
        res.status(200).send({answer: answer});
      }
    })
  })

module.exports = router;

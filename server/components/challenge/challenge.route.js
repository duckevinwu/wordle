const express = require('express');

const router = express.Router();

router.route('/')
  // POST /api/v1/challenge - generate a challenge
  .post(async (req, res) => {

  })

router.route('/:id')
  // GET /api/v1/challenge/:id - visit a challenge
  .get(async (req, res) => {
    const challengeId = req.params.id;
    res.send(challengeId);
  })

module.exports = router;

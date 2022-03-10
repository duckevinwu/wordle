const express = require('express');
const cors = require('cors');
const gameRoutes = require('./components/game/game.route.js');
const challengeRoutes = require('./components/challenge/challenge.route.js');

const app = express();
const port = 8080;
const routePrefix = '/api/v1';

// set cors policy
app.use(cors({
  origin: 'http://localhost:3000'
}));

// parse json body
app.use(express.json());

// game routes
app.use(`${routePrefix}/game`, gameRoutes);

// challenge routes
app.use(`${routePrefix}/challenge`, challengeRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});

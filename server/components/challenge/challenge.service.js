const challengeDataAccess = require('./challenge.data.js');
const Snowflake = require('../utils/snowflake/snowflake.js');

const snowflake = new Snowflake(0);

const generateChallenge = (answer, callback) => {
  const challengeId = snowflake.generateId();
  challengeDataAccess.insertChallenge(challengeId, answer, (res) => {
    callback({ status: res.status, id: challengeId });
  });
}

module.exports = {
  generateChallenge: generateChallenge
}

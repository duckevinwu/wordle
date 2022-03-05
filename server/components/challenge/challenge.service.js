const Snowflake = require('../utils/snowflake/snowflake.js');

const snowflake = new Snowflake(0);

const generateChallenge = () => {
  const challengeId = snowflake.generateId();

  // insert into challenge into database

  // update the recently submitted solution
}

module.exports = {
  generateChallenge: generateChallenge
}

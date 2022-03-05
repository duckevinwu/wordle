const Snowflake = require('./snowflake.js');

// test generate id
const testGenerateId = () => {
  const snowflake = new Snowflake(0);
  const id = snowflake.generateId();
  console.log(id);
}

// run tests
testGenerateId();

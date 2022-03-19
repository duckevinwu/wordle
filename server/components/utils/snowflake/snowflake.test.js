const Snowflake = require('./snowflake.js');

test('snowflake ids to be unique', () => {
  const snowflake = new Snowflake(0);
  const ids = [];
  for (let i = 0; i < 10; i++) {
    ids.push(snowflake.generateId());
  }

  for (let i = 0; i < 10; i++) {
    for (let j = i + 1; j < 10; j++) {
      expect(ids[i]).not.toBe(ids[j]);
    }
  }
});

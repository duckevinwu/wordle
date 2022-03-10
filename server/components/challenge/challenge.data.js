const db = require('../db/db.js');

const insertChallenge = (id, answer, callback) => {
  const insertQuery = `
    INSERT INTO Challenge (ChallengeID, Word)
    VALUES (?, ?)
  `;
  db.insert(insertQuery, [id, answer], (res) => {
    callback({status: res.status, id: id});
  });
}

const getChallenge = (id, callback) => {
  const selectQuery = `
    SELECT Word
    FROM Challenge
    WHERE ChallengeID = ?
  `;
  db.select(selectQuery, [id], (res) => {
    callback(res);
  });
}

module.exports = {
  insertChallenge: insertChallenge,
  getChallenge: getChallenge
}

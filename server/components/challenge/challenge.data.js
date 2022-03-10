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

module.exports = {
  insertChallenge: insertChallenge
}

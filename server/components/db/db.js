const sqlite3 = require('sqlite3').verbose();

const dbPath = '../db/wordle.db';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error(err.message);
  else console.log('connected to database');
});

const select = (sql, params) => {
  db.all(sql, params, (err, rows) => {
    if (err) return {status: 'error', message: err.message}
    return {status: 'success', rows: rows}
  })
}

const insert = (sql, params, callback) => {
  db.run(sql, params, (err) => {
    if (err) {
      console.log(err.message);
      callback({status: 'error'});
    } else {
      callback({status: 'success'});
    }
  })
}

module.exports = {
  select: select,
  insert: insert
}

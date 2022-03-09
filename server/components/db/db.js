const sqlite3 = require('sqlite3').verbose();

const dbPath = '../../../db/wordle.db';
const db = new sqlite3.Database('./db/wordle.db');

const select = (sql, params) => {
  db.all(sql, params, (err, rows) => {
    if (err) return {status: 'error', message: err.message}
    return {status: 'success', rows: rows}
  })
}

const insert = (sql, params) => {
  db.run(sql, params, (err) => {
    if (err) return {status: 'error', message: err.message}
    return {status: 'success'}
  })
}
